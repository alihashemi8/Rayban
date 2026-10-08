from PIL import Image, ImageFilter
import numpy as np
from collections import deque, defaultdict
import json
from pathlib import Path
im=Image.open('public/raiban-logo.webp').resize((250,250),Image.Resampling.LANCZOS)
a=np.array(im); mask=(a[:,:,:3].min(2)>180)&(a[:,:,3]>150)
mask=np.array(Image.fromarray((mask*255).astype("uint8")).filter(ImageFilter.GaussianBlur(.7)))>127
seen=set(); clean=np.zeros(mask.shape,dtype=bool)
for y,x in zip(*np.where(mask)):
    if (x,y) in seen: continue
    q=deque([(x,y)]);seen.add((x,y)); component=[]
    while q:
        u,v=q.popleft();component.append((u,v))
        for nx,ny in [(u+1,v),(u-1,v),(u,v+1),(u,v-1)]:
            if 0<=nx<250 and 0<=ny<250 and mask[ny,nx] and (nx,ny) not in seen:
                seen.add((nx,ny));q.append((nx,ny))
    if len(component)>=18:
        for u,v in component:clean[v,u]=True
edges=defaultdict(list)
for y,x in zip(*np.where(clean)):
    for neighbor,start,end in [((x,y-1),(x,y),(x+1,y)),((x+1,y),(x+1,y),(x+1,y+1)),((x,y+1),(x+1,y+1),(x,y+1)),((x-1,y),(x,y+1),(x,y))]:
        nx,ny=neighbor
        if nx<0 or ny<0 or nx>=250 or ny>=250 or not clean[ny,nx]:edges[start].append(end)
def simplify(points,epsilon=.55):
    if len(points)<3:return points
    a=np.array(points[0]);b=np.array(points[-1]);v=b-a
    d=[abs(v[0]*(p[1]-a[1])-v[1]*(p[0]-a[0]))/max(np.linalg.norm(v),1e-9) for p in points[1:-1]]
    if d and max(d)>epsilon:
        i=d.index(max(d))+1
        return simplify(points[:i+1])+simplify(points[i:])[1:]
    return [points[0],points[-1]]
loops=[]
while edges:
    start=next(iter(edges));p=start;loop=[]
    while True:
        loop.append(p);n=edges[p].pop()
        if not edges[p]:del edges[p]
        p=n
        if p==start:break
    if len(loop)>8:
        k=max(range(len(loop)),key=lambda i:(loop[i][0]-start[0])**2+(loop[i][1]-start[1])**2)
        loop=simplify(loop[:k+1])[:-1]+simplify(loop[k:]+[start])[:-1]
        loops.append(loop)
def area(p):return sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(p,p[1:]+p[:1]))/2
def inside(point,poly):
    x,y=point;hit=False
    for a,b in zip(poly,poly[1:]+poly[:1]):
        if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:hit=not hit
    return hit
outers=[p for p in loops if area(p)>0];holes=[p for p in loops if area(p)<0]
def normalize(p):return [[round((x-125)/125,4),round((125-y)/125,4)] for x,y in p]
shapes=[{'outline':normalize(p),'holes':[normalize(h) for h in holes if inside(h[0],p)]} for p in outers]
Path('src/assets/rayban-logo-shapes.json').write_text(json.dumps(shapes,separators=(',',':')))
print('Logo shapes:',len(shapes),'holes:',len(holes),'vertices:',sum(len(p) for p in loops))
