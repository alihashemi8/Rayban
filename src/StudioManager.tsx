import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Plus,
  Pencil,
  Trash2,
  Download,
  Upload,
  Check,
  X,
  Users,
  Layers,
  ExternalLink,
} from "lucide-react";
import {
  contributorRoles,
  useStudio,
  validateContent,
  safeUrl,
} from "./studio";
import type { Member, Project } from "./studio";
import type { Language } from "./data";
import { phrase } from "./data";
const memberBlank: Member = {
  id: "",
  name: "",
  enName: "",
  role: "",
  enRole: "",
  bio: "",
  enBio: "",
  skills: [],
  contributions: "",
  email: "",
  github: "",
  linkedin: "",
  demo: false,
  initials: "",
  status: "current",
  collaborationPeriod: "",
};
const projectBlank: Project = {
  id: "",
  number: "",
  title: ["", ""],
  category: ["", ""],
  description: ["", ""],
  stack: [],
  visual: "school",
  color: "sage",
  features: [],
  enFeatures: [],
  status: "در حال توسعه",
  problem: "",
  solution: "",
  architecture: "",
  achievements: "",
  image: "",
  timeline: "",
  contributors: {},
  demo: false,
};
export default function StudioManager({ lang }: { lang: Language }) {
  const { members, projects, save, storageError } = useStudio();
  const [tab, setTab] = useState<"members" | "projects">("members");
  const [member, setMember] = useState<Member | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [notice, setNotice] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const [backupText, setBackupText] = useState("");
  const [backupUrl, setBackupUrl] = useState("");
  useEffect(
    () => () => {
      if (backupUrl) URL.revokeObjectURL(backupUrl);
    },
    [backupUrl],
  );
  const input = useRef<HTMLInputElement>(null);
  const say = (fa: string, en: string) => setNotice(phrase(lang, fa, en));
  const startMember = (m: Member) => {
    setMember({ ...m, skills: [...m.skills] });
    setProject(null);
    setNotice("");
  };
  const startProject = (p: Project) => {
    setProject({ ...p, contributors: { ...p.contributors } });
    setMember(null);
    setNotice("");
  };
  const saveMember = async (event: FormEvent) => {
    event.preventDefault();
    if (!member) return;
    if (!safeUrl(member.github) || !safeUrl(member.linkedin)) {
      say(
        "لینک‌ها باید با https:// یا http:// شروع شوند.",
        "Links must start with https:// or http://.",
      );
      return;
    }
    const data = {
      ...member,
      id: member.id || `member-${crypto.randomUUID()}`,
      enName: member.enName || member.name,
      enRole: member.enRole || member.role,
      enBio: member.enBio || member.bio,
      initials: member.initials || "RB",
      skills: member.skills.map((s) => s.trim()).filter(Boolean),
    };
    const next = members.some((m) => m.id === data.id)
      ? members.map((m) => (m.id === data.id ? data : m))
      : [...members, data];
    if (await save({ members: next, projects })) {
      setMember(null);
      say(
        "عضو ذخیره شد و در سایت نمایش داده می‌شود.",
        "Member saved and visible on the site.",
      );
    }
  };
  const saveProject = async (event: FormEvent) => {
    event.preventDefault();
    if (!project) return;
    if (!safeUrl(project.image)) {
      say(
        "لینک تصویر باید با https:// یا http:// شروع شود.",
        "Image URL must start with https:// or http://.",
      );
      return;
    }
    const data = {
      ...project,
      id: project.id || `project-${crypto.randomUUID()}`,
      number: project.number || String(projects.length + 1).padStart(2, "0"),
      title: [project.title[0], project.title[1] || project.title[0]],
      category: [
        project.category[0],
        project.category[1] || project.category[0],
      ],
      description: [
        project.description[0],
        project.description[1] || project.description[0],
      ],
      enFeatures: project.enFeatures.length
        ? project.enFeatures.map((s) => s.trim()).filter(Boolean)
        : project.features.map((s) => s.trim()).filter(Boolean),
      features: project.features.map((s) => s.trim()).filter(Boolean),
      stack: project.stack.map((s) => s.trim()).filter(Boolean),
    };
    const next = projects.some((p) => p.id === data.id)
      ? projects.map((p) => (p.id === data.id ? data : p))
      : [...projects, data];
    if (await save({ members, projects: next })) {
      setProject(null);
      say(
        "پروژه ذخیره شد و صفحه اختصاصی آن آماده است.",
        "Project saved. Its detail page is ready.",
      );
    }
  };
  const remove = async (id: string) => {
    const next =
      tab === "members"
        ? {
            members: members.filter((m) => m.id !== id),
            projects: projects.map((p) => ({
              ...p,
              contributors: Object.fromEntries(
                Object.entries(p.contributors).filter(
                  ([, value]) => value !== id,
                ),
              ),
            })),
          }
        : { members, projects: projects.filter((p) => p.id !== id) };
    if (await save(next)) {
      setDeleteId("");
      say("حذف انجام شد.", "Entry deleted.");
    }
  };
  const exportData = () => {
    const content = JSON.stringify({ members, projects }, null, 2);
    const url = URL.createObjectURL(
      new Blob([content], {
        type: "application/json",
      }),
    );
    setBackupText(content);
    setBackupUrl(url);
    say("فایل پشتیبان آماده دانلود است.", "Backup is ready to download.");
  };
  const importData = async (file: File) => {
    try {
      if (file.size > 2_000_000) throw new Error("size");
      const data = JSON.parse(await file.text());
      if (!validateContent(data)) throw new Error("format");
      if (await save(data)) {
        setMember(null);
        setProject(null);
        say("اطلاعات فایل بازیابی شد.", "Content restored from the file.");
      }
    } catch {
      say(
        "فایل معتبر نیست. یک فایل JSON خروجی‌گرفته‌شده از همین بخش انتخاب کنید.",
        "Invalid file. Select a JSON backup exported from this manager.",
      );
    }
    if (input.current) input.current.value = "";
  };
  const tf = (fa: string, en: string) => phrase(lang, fa, en);
  return (
    <main className="manager wrap">
      <Link to="/" className="detail-back">
        <ArrowRight size={16} />
        {tf("بازگشت به سایت", "Back to website")}
      </Link>
      <div className="manager-header">
        <div>
          <span className="section-label">
            <span className="signal-dot" />
            RAYBAN / STUDIO MANAGER
          </span>
          <h1>{tf("مدیریت محتوای رایبان", "Rayban content studio")}</h1>
          <p>
            {tf(
              "اعضا و پروژه‌ها را اینجا بسازید، ویرایش کنید و به نمایش بگذارید.",
              "Create, edit and showcase team members and projects.",
            )}
          </p>
        </div>
        <Link className="button button-dark" to="/">
          {tf("مشاهده سایت", "View website")}
          <ExternalLink size={16} />
        </Link>
      </div>
      <div className="storage-notice">
        <span>
          <Layers size={18} />
          <b>{tf("ذخیره روی سرور", "Saved on the server")}</b>
        </span>
        <p>
          {tf(
            "تغییرات پس از ورود ادمین روی سرور ذخیره می‌شوند و برای بازدیدکنندگان سایت قابل مشاهده‌اند. برای نگهداری اطلاعات، فایل پشتیبان بگیرید؛ بازیابی فایل، محتوای فعلی را جایگزین می‌کند.",
            "Changes are saved on the server after admin authentication and are visible to site visitors. Export a backup to keep your content. Restoring a file replaces the current content.",
          )}
        </p>
        <div className="backup-actions">
          <button onClick={exportData}>
            <Download size={15} />
            {tf("خروجی و پشتیبان", "Export backup")}
          </button>
          <label className="import-button">
            <Upload size={15} />
            {tf("بازیابی فایل", "Restore file")}
            <input
              type="file"
              accept=".json,application/json"
              ref={input}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void importData(file);
              }}
            />
          </label>
        </div>
      </div>
      {backupUrl && (
        <section className="backup-preview">
          <div>
            <h2>{tf("پشتیبان محتوای فعلی", "Current content backup")}</h2>
            <a
              className="button button-dark"
              href={backupUrl}
              download="rayban-studio-content.json"
            >
              <Download size={16} />
              {tf("دانلود فایل JSON", "Download JSON file")}
            </a>
            <button
              onClick={() => {
                setBackupUrl("");
                setBackupText("");
              }}
              aria-label={tf("بستن پیش‌نمایش پشتیبان", "Close backup preview")}
            >
              <X size={17} />
            </button>
          </div>
          <label>
            {tf("متن فایل پشتیبان", "Backup file contents")}
            <textarea readOnly dir="ltr" rows={5} value={backupText} />
          </label>
        </section>
      )}
      <div className="manager-notice" role="status">
        {notice && (
          <>
            <Check size={15} />
            {notice}
          </>
        )}
        {storageError && <span role="alert">{storageError}</span>}
      </div>
      <div className="manager-toolbar">
        <div className="manager-tabs">
          <button
            aria-pressed={tab === "members"}
            className={tab === "members" ? "active" : ""}
            onClick={() => {
              setTab("members");
              setMember(null);
              setProject(null);
              setDeleteId("");
            }}
          >
            <Users size={16} />
            {tf("اعضای تیم", "Team members")}
            <span>{members.length}</span>
          </button>
          <button
            aria-pressed={tab === "projects"}
            className={tab === "projects" ? "active" : ""}
            onClick={() => {
              setTab("projects");
              setMember(null);
              setProject(null);
              setDeleteId("");
            }}
          >
            <Layers size={16} />
            {tf("پروژه‌ها", "Projects")}
            <span>{projects.length}</span>
          </button>
        </div>
        <button
          className="button button-dark"
          onClick={() =>
            tab === "members"
              ? startMember(memberBlank)
              : startProject(projectBlank)
          }
        >
          <Plus size={16} />
          {tab === "members"
            ? tf("عضو جدید", "New member")
            : tf("پروژه جدید", "New project")}
        </button>
      </div>
      {member && (
        <form className="editor-form" onSubmit={saveMember}>
          <div className="editor-heading">
            <h2>
              {member.id
                ? tf("ویرایش عضو", "Edit member")
                : tf("افزودن عضو", "Add member")}
            </h2>
            <button
              type="button"
              onClick={() => setMember(null)}
              aria-label={tf("بستن ویرایشگر", "Close editor")}
            >
              <X />
            </button>
          </div>
          <div className="editor-grid">
            <label>
              {tf("نام فارسی *", "Persian name *")}
              <input
                required
                value={member.name}
                maxLength={100}
                onChange={(e) => setMember({ ...member, name: e.target.value })}
              />
            </label>
            <label>
              {tf("نام انگلیسی", "English name")}
              <input
                dir="ltr"
                value={member.enName}
                maxLength={100}
                onChange={(e) =>
                  setMember({ ...member, enName: e.target.value })
                }
              />
            </label>
            <label>
              {tf("نقش *", "Role *")}
              <input
                required
                value={member.role}
                maxLength={100}
                onChange={(e) => setMember({ ...member, role: e.target.value })}
              />
            </label>
            <label>
              {tf("نقش انگلیسی", "English role")}
              <input
                dir="ltr"
                value={member.enRole}
                maxLength={100}
                onChange={(e) =>
                  setMember({ ...member, enRole: e.target.value })
                }
              />
            </label>
            <label className="wide">
              {tf("رزومه و معرفی *", "Biography *")}
              <textarea
                required
                rows={3}
                maxLength={3000}
                value={member.bio}
                onChange={(e) => setMember({ ...member, bio: e.target.value })}
              />
            </label>
            <label className="wide">
              {tf("معرفی انگلیسی", "English biography")}
              <textarea
                dir="ltr"
                rows={2}
                maxLength={3000}
                value={member.enBio}
                onChange={(e) =>
                  setMember({ ...member, enBio: e.target.value })
                }
              />
            </label>
            <label>
              {tf("مهارت‌ها (با کاما جدا کنید)", "Skills (comma separated)")}
              <input
                dir="ltr"
                value={member.skills.join(", ")}
                onChange={(e) =>
                  setMember({
                    ...member,
                    skills: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </label>
            <label>
              {tf("وضعیت همکاری", "Collaboration status")}
              <select
                value={member.status || "current"}
                onChange={(e) =>
                  setMember({
                    ...member,
                    status: e.target.value as "current" | "former",
                  })
                }
              >
                <option value="current">
                  {tf("عضو فعلی", "Current member")}
                </option>
                <option value="former">
                  {tf("همکار پیشین", "Former collaborator")}
                </option>
              </select>
            </label>
            <label>
              {tf("دوره همکاری (اختیاری)", "Collaboration period (optional)")}
              <input
                value={member.collaborationPeriod || ""}
                maxLength={100}
                onChange={(e) =>
                  setMember({ ...member, collaborationPeriod: e.target.value })
                }
              />
            </label>
            <label>
              {tf("حروف پروفایل", "Profile initials")}
              <input
                dir="ltr"
                value={member.initials}
                maxLength={3}
                onChange={(e) =>
                  setMember({ ...member, initials: e.target.value })
                }
              />
            </label>
            <label className="wide">
              {tf("مشارکت‌ها", "Contributions")}
              <textarea
                rows={2}
                value={member.contributions}
                maxLength={3000}
                onChange={(e) =>
                  setMember({ ...member, contributions: e.target.value })
                }
              />
            </label>
            <label>
              {tf("ایمیل", "Email")}
              <input
                type="email"
                dir="ltr"
                value={member.email}
                maxLength={254}
                onChange={(e) =>
                  setMember({ ...member, email: e.target.value })
                }
              />
            </label>
            <label>
              GitHub
              <input
                type="url"
                dir="ltr"
                placeholder="https://github.com/…"
                value={member.github}
                onChange={(e) =>
                  setMember({ ...member, github: e.target.value })
                }
              />
            </label>
            <label>
              LinkedIn
              <input
                type="url"
                dir="ltr"
                placeholder="https://linkedin.com/in/…"
                value={member.linkedin}
                onChange={(e) =>
                  setMember({ ...member, linkedin: e.target.value })
                }
              />
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={member.demo}
                onChange={(e) =>
                  setMember({ ...member, demo: e.target.checked })
                }
              />
              {tf(
                "عضو نمایشی با رزومه ساختگی",
                "Demo member with fictional biography",
              )}
            </label>
          </div>
          <div className="editor-actions">
            <button className="button button-dark" type="submit">
              <Check size={16} />
              {tf("ذخیره عضو", "Save member")}
            </button>
            <button
              className="text-link"
              type="button"
              onClick={() => setMember(null)}
            >
              {tf("انصراف", "Cancel")}
            </button>
          </div>
        </form>
      )}
      {project && (
        <form className="editor-form" onSubmit={saveProject}>
          <div className="editor-heading">
            <h2>
              {project.id
                ? tf("ویرایش پروژه", "Edit project")
                : tf("افزودن پروژه", "Add project")}
            </h2>
            <button
              type="button"
              onClick={() => setProject(null)}
              aria-label={tf("بستن ویرایشگر", "Close editor")}
            >
              <X />
            </button>
          </div>
          <div className="editor-grid">
            {[
              ["title", "عنوان فارسی *", "Persian title *", 0],
              ["title", "عنوان انگلیسی", "English title", 1],
              ["category", "دسته‌بندی فارسی *", "Persian category *", 0],
              ["category", "دسته‌بندی انگلیسی", "English category", 1],
            ].map(([field, fa, en, index]) => {
              const k = field as "title" | "category";
              const i = Number(index);
              return (
                <label key={`${k}-${i}`}>
                  {tf(String(fa), String(en))}
                  <input
                    required={i === 0}
                    maxLength={150}
                    dir={i === 1 ? "ltr" : "rtl"}
                    value={project[k][i]}
                    onChange={(e) => {
                      const next = [...project[k]];
                      next[i] = e.target.value;
                      setProject({ ...project, [k]: next });
                    }}
                  />
                </label>
              );
            })}
            <label className="wide">
              {tf("شرح پروژه *", "Project description *")}
              <textarea
                required
                rows={3}
                maxLength={3000}
                value={project.description[0]}
                onChange={(e) =>
                  setProject({
                    ...project,
                    description: [e.target.value, project.description[1]],
                  })
                }
              />
            </label>
            <label className="wide">
              {tf("شرح انگلیسی", "English description")}
              <textarea
                dir="ltr"
                rows={2}
                maxLength={3000}
                value={project.description[1]}
                onChange={(e) =>
                  setProject({
                    ...project,
                    description: [project.description[0], e.target.value],
                  })
                }
              />
            </label>
            <label>
              {tf("وضعیت *", "Status *")}
              <input
                required
                value={project.status}
                maxLength={80}
                onChange={(e) =>
                  setProject({ ...project, status: e.target.value })
                }
              />
            </label>
            <label>
              {tf("نمای پروژه", "Project visual")}
              <select
                value={project.visual}
                onChange={(e) =>
                  setProject({ ...project, visual: e.target.value })
                }
              >
                <option value="school">
                  {tf("پلتفرم آموزشی", "Learning dashboard")}
                </option>
                <option value="ai">{tf("هوش مصنوعی", "AI scene")}</option>
                <option value="business">
                  {tf("داشبورد کسب‌وکار", "Business dashboard")}
                </option>
              </select>
            </label>
            <label>
              {tf(
                "فناوری‌ها (با کاما جدا کنید)",
                "Technologies (comma separated)",
              )}
              <input
                dir="ltr"
                value={project.stack.join(", ")}
                onChange={(e) =>
                  setProject({
                    ...project,
                    stack: e.target.value.split(",").map((s) => s.trim()),
                  })
                }
              />
            </label>
            <label>
              {tf("لینک تصویر یا اسکرین‌شات", "Cover / screenshot URL")}
              <input
                dir="ltr"
                type="url"
                value={project.image}
                placeholder="https://…"
                onChange={(e) =>
                  setProject({ ...project, image: e.target.value })
                }
              />
            </label>
            {[
              ["problem", "صورت مسئله", "Problem statement"],
              [
                "enProblem",
                "صورت مسئله به انگلیسی",
                "English problem statement",
              ],
              ["solution", "راه‌حل", "Solution"],
              ["enSolution", "راه‌حل به انگلیسی", "English solution"],
              ["architecture", "معماری", "Architecture"],
              [
                "achievements",
                "دستاوردها (هر مورد یک خط)",
                "Achievements (one per line)",
              ],
              [
                "timeline",
                "تایم‌لاین (عنوان | تاریخ، هر مورد یک خط)",
                "Timeline (title | date, one per line)",
              ],
              [
                "enAchievements",
                "دستاوردها به انگلیسی (هر مورد یک خط)",
                "English achievements (one per line)",
              ],
            ].map(([key, fa, en]) => (
              <label className="wide" key={key}>
                {tf(fa, en)}
                <textarea
                  rows={3}
                  maxLength={5000}
                  dir={key.startsWith("en") ? "ltr" : undefined}
                  value={project[key as "problem"] ?? ""}
                  onChange={(e) =>
                    setProject({ ...project, [key]: e.target.value })
                  }
                />
              </label>
            ))}
            <label>
              {tf("قابلیت‌ها (هر مورد یک خط)", "Features (one per line)")}
              <textarea
                rows={4}
                value={project.features.join("\n")}
                onChange={(e) =>
                  setProject({
                    ...project,
                    features: e.target.value.split("\n"),
                  })
                }
              />
            </label>
            <label>
              {tf("قابلیت‌ها به انگلیسی", "English features")}
              <textarea
                rows={4}
                dir="ltr"
                value={project.enFeatures.join("\n")}
                onChange={(e) =>
                  setProject({
                    ...project,
                    enFeatures: e.target.value.split("\n"),
                  })
                }
              />
            </label>
            <label className="checkbox-label wide">
              <input
                type="checkbox"
                checked={project.demo}
                onChange={(e) =>
                  setProject({ ...project, demo: e.target.checked })
                }
              />
              {tf("پروژه نمایشی / مفهومی", "Demo / concept project")}
            </label>
          </div>
          <h3 className="editor-subheading">
            {tf("مشارکت‌کنندگان پروژه", "Project contributors")}
          </h3>
          <div className="editor-grid">
            {contributorRoles.map((role, i) => (
              <label key={role}>
                {tf(
                  [
                    "رهبر پروژه",
                    "فرانت‌اند",
                    "بک‌اند",
                    "طراح UI/UX",
                    "مهندس DevOps",
                    "هوش مصنوعی",
                    "تستر",
                  ][i],
                  role,
                )}
                <select
                  value={project.contributors[role] || ""}
                  onChange={(e) => {
                    const contributors = { ...project.contributors };
                    if (e.target.value) contributors[role] = e.target.value;
                    else delete contributors[role];
                    setProject({ ...project, contributors });
                  }}
                >
                  <option value="">{tf("انتخاب نشده", "Not assigned")}</option>
                  {members.map((m) => (
                    <option value={m.id} key={m.id}>
                      {lang === "fa" ? m.name : m.enName}
                      {m.demo ? tf(" (نمایشی)", " (Demo)") : ""}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <div className="editor-actions">
            <button className="button button-dark" type="submit">
              <Check size={16} />
              {tf("ذخیره پروژه", "Save project")}
            </button>
            <button
              className="text-link"
              type="button"
              onClick={() => setProject(null)}
            >
              {tf("انصراف", "Cancel")}
            </button>
          </div>
        </form>
      )}
      <div className="manager-list">
        {(tab === "members" ? members : projects).map((item) => {
          const isMember = "name" in item;
          return (
            <article key={item.id}>
              <div
                className={`manager-avatar ${isMember ? "" : "project-avatar"}`}
              >
                {isMember ? item.initials : <Layers size={23} />}
              </div>
              <div className="manager-entry">
                <h3>
                  {isMember
                    ? lang === "fa"
                      ? item.name
                      : item.enName
                    : item.title[lang === "fa" ? 0 : 1]}
                  {item.demo && (
                    <span className="demo-badge">{tf("نمایشی", "Demo")}</span>
                  )}
                </h3>
                <p>
                  {isMember
                    ? lang === "fa"
                      ? item.role
                      : item.enRole
                    : item.status}
                </p>
                <div className="tag-list" dir="ltr">
                  {(isMember ? item.skills : item.stack)
                    .filter(Boolean)
                    .slice(0, 4)
                    .map((s) => (
                      <span key={s}>{s}</span>
                    ))}
                </div>
              </div>
              <div className="entry-actions">
                {!isMember && (
                  <Link
                    to={`/projects/${item.id}`}
                    aria-label={tf("دیدن پروژه", "View project")}
                  >
                    <ExternalLink size={17} />
                  </Link>
                )}
                <button
                  aria-label={`${tf("ویرایش", "Edit")} ${isMember ? item.name : item.title[0]}`}
                  onClick={() =>
                    isMember ? startMember(item) : startProject(item)
                  }
                >
                  <Pencil size={17} />
                </button>
                <button
                  className="delete-button"
                  aria-label={`${tf("حذف", "Delete")} ${isMember ? item.name : item.title[0]}`}
                  onClick={() => setDeleteId(item.id)}
                >
                  <Trash2 size={17} />
                </button>
              </div>
              {deleteId === item.id && (
                <div className="delete-confirm">
                  <span>
                    {tf("این مورد حذف شود؟", "Delete this entry?")}
                    {isMember && (
                      <small>
                        {tf(
                          " ارجاع‌های این عضو از پروژه‌ها نیز برداشته می‌شود.",
                          " This member’s project assignments will also be removed.",
                        )}
                      </small>
                    )}
                  </span>
                  <button onClick={() => remove(item.id)}>
                    {tf("بله، حذف کن", "Yes, delete")}
                  </button>
                  <button onClick={() => setDeleteId("")}>
                    {tf("انصراف", "Cancel")}
                  </button>
                </div>
              )}
            </article>
          );
        })}
        {(tab === "members" ? members : projects).length === 0 && (
          <div className="empty-state">
            <Plus size={30} />
            <h3>{tf("اولین مورد را اضافه کنید.", "Add your first entry.")}</h3>
            <p>
              {tf(
                "از دکمه افزودن در بالای صفحه شروع کنید.",
                "Start with the add button above.",
              )}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
