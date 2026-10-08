"""Trace the owner's logo at native resolution for the 3D mesh and SVG fallback.

Interpolated marching-squares contours avoid grid-aligned stair steps. Gentle
corner-aware subdivision smooths curves without rounding the emblem's corners.
The source bitmap is read unchanged; no image enlargement or invented detail.
"""
from collections import defaultdict, deque
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
source = Image.open(ROOT / 'public/raiban-logo.webp').convert('RGBA')
width, height = source.size
pixels = np.asarray(source)
mask = (pixels[:, :, :3].min(axis=2) > 180) & (pixels[:, :, 3] > 150)
mask = np.asarray(Image.fromarray((mask * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.7))) > 127

# Remove isolated source-image speckles while retaining detached emblem strokes.
seen = set()
clean = np.zeros_like(mask)
for y, x in zip(*np.where(mask)):
    if (x, y) in seen:
        continue
    queue = deque([(x, y)])
    seen.add((x, y))
    component = []
    while queue:
        u, v = queue.popleft()
        component.append((u, v))
        for nx, ny in ((u + 1, v), (u - 1, v), (u, v + 1), (u, v - 1)):
            if 0 <= nx < width and 0 <= ny < height and mask[ny, nx] and (nx, ny) not in seen:
                seen.add((nx, ny))
                queue.append((nx, ny))
    if len(component) >= 72:
        for u, v in component:
            clean[v, u] = True

field = np.pad(np.asarray(Image.fromarray((clean * 255).astype('uint8')).filter(ImageFilter.GaussianBlur(0.8)), dtype=float), 1)
adjacency = defaultdict(list)
threshold = 127.5
cases = {
    1: [('left', 'top')], 2: [('top', 'right')],
    3: [('left', 'right')], 4: [('right', 'bottom')],
    6: [('top', 'bottom')], 7: [('left', 'bottom')],
    8: [('bottom', 'left')], 9: [('top', 'bottom')],
    11: [('right', 'bottom')], 12: [('left', 'right')],
    13: [('top', 'right')], 14: [('left', 'top')],
}

def interpolate(a, b, va, vb):
    t = (threshold - va) / (vb - va)
    return tuple(round(a[i] + (b[i] - a[i]) * t - 1, 7) for i in range(2))

for y in range(height + 1):
    for x in range(width + 1):
        tl, tr, br, bl = field[y, x], field[y, x + 1], field[y + 1, x + 1], field[y + 1, x]
        case = int(tl >= threshold) + 2 * int(tr >= threshold) + 4 * int(br >= threshold) + 8 * int(bl >= threshold)
        if case in (0, 15):
            continue
        pairs = cases.get(case)
        if case in (5, 10):
            connected = (tl + tr + br + bl) / 4 >= threshold
            pairs = [('top', 'right'), ('bottom', 'left')] if (case == 5) == connected else [('left', 'top'), ('right', 'bottom')]
        positions = {}
        ends = {
            'top': ((x, y), (x + 1, y), tl, tr),
            'right': ((x + 1, y), (x + 1, y + 1), tr, br),
            'bottom': ((x, y + 1), (x + 1, y + 1), bl, br),
            'left': ((x, y), (x, y + 1), tl, bl),
        }
        for start, end in pairs:
            for edge in (start, end):
                if edge not in positions:
                    positions[edge] = interpolate(*ends[edge])
            a, b = positions[start], positions[end]
            adjacency[a].append(b)
            adjacency[b].append(a)

assert all(len(neighbors) == 2 for neighbors in adjacency.values()), 'Contours must be closed'
loops = []
while adjacency:
    start = next(iter(adjacency))
    previous, current = None, start
    loop = []
    while True:
        loop.append(current)
        neighbors = adjacency[current]
        following = next(point for point in neighbors if point != previous)
        previous, current = current, following
        if current == start:
            break
    for point in loop:
        del adjacency[point]
    loops.append(loop)

def simplify(points, epsilon=0.6):
    if len(points) < 3:
        return points
    a, b = np.asarray(points[0]), np.asarray(points[-1])
    v = b - a
    distances = [abs(v[0] * (p[1] - a[1]) - v[1] * (p[0] - a[0])) / max(np.linalg.norm(v), 1e-9) for p in points[1:-1]]
    if distances and max(distances) > epsilon:
        i = distances.index(max(distances)) + 1
        return simplify(points[:i + 1])[:-1] + simplify(points[i:])
    return [points[0], points[-1]]

def smooth(points):
    result = []
    for i, point in enumerate(points):
        previous, current, following = (np.asarray(points[(i - 1) % len(points)]), np.asarray(point), np.asarray(points[(i + 1) % len(points)]))
        incoming, outgoing = current - previous, following - current
        length_a, length_b = np.linalg.norm(incoming), np.linalg.norm(outgoing)
        cosine = np.dot(incoming, outgoing) / max(length_a * length_b, 1e-9)
        if cosine < 0.45 and min(length_a, length_b) > 2:
            result.append(current.tolist())
        else:
            result.extend([(0.25 * previous + 0.75 * current).tolist(), (0.75 * current + 0.25 * following).tolist()])
    return result

for i, loop in enumerate(loops):
    k = max(range(len(loop)), key=lambda j: (loop[j][0] - loop[0][0]) ** 2 + (loop[j][1] - loop[0][1]) ** 2)
    reduced = simplify(loop[:k + 1])[:-1] + simplify(loop[k:] + [loop[0]])[:-1]
    loops[i] = smooth(smooth(reduced))

def area(points):
    return sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(points, points[1:] + points[:1])) / 2

def inside(point, polygon):
    x, y = point
    hit = False
    for a, b in zip(polygon, polygon[1:] + polygon[:1]):
        if (a[1] > y) != (b[1] > y) and x < (b[0] - a[0]) * (y - a[1]) / (b[1] - a[1]) + a[0]:
            hit = not hit
    return hit

# Nesting depth, rather than tracing direction, identifies holes and islands.
depths = [sum(inside(loop[0], other) for other in loops if other is not loop and abs(area(other)) > abs(area(loop))) for loop in loops]
scale = max(width, height) / 2

def normalize(points):
    return [[round((x - width / 2) / scale, 6), round((height / 2 - y) / scale, 6)] for x, y in points]

shapes = []
for i, loop in enumerate(loops):
    if depths[i] % 2:
        continue
    holes = [normalize(hole) for j, hole in enumerate(loops) if depths[j] == depths[i] + 1 and inside(hole[0], loop)]
    shapes.append({'outline': normalize(loop), 'holes': holes})

(ROOT / 'src/assets/rayban-logo-shapes.json').write_text(json.dumps(shapes, separators=(',', ':')) + '\n', encoding='utf8')
paths = []
for loop in loops:
    paths.append('M' + 'L'.join(f'{x:.3f},{y:.3f}' for x, y in loop) + 'Z')
svg = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}"><path fill="#fff" fill-rule="evenodd" d="{"".join(paths)}"/></svg>\n'
(ROOT / 'public/rayban-logo.svg').write_text(svg, encoding='utf8')
print(f'Native {width}x{height}: {len(shapes)} shapes, {sum(len(s["holes"]) for s in shapes)} holes, {sum(len(loop) for loop in loops)} smooth contour vertices')
