import { Link, useParams } from "react-router-dom";
import {
  ArrowUpLeft,
  ArrowLeft,
  Github,
  Mail,
  Linkedin,
  Users,
} from "lucide-react";
import { useStudio } from "../studio";
import type { Member } from "../studio";
import type { Language } from "../data";
import { phrase } from "../data";
import CardRail from "./CardRail";

function MemberCard({
  member,
  lang,
  index,
  full,
}: {
  member: Member;
  lang: Language;
  index: number;
  full: boolean;
}) {
  const Heading = full ? "h3" : "h4";
  return (
    <article className={`team-card team-card-${index % 3}`}>
      <div className="profile-art">
        <span className="profile-grid" />
        <span className="profile-initial" dir="ltr">
          {member.initials}
          <span>↗</span>
        </span>
        <span className="profile-index mono">
          RAYBAN / {String(index + 1).padStart(2, "0")}
        </span>
        {member.demo && (
          <span className="profile-demo demo-badge">
            {phrase(lang, "عضو نمایشی", "Demo member")}
          </span>
        )}
      </div>
      <div className="team-card-body">
        <small>{lang === "fa" ? member.role : member.enRole}</small>
        <Heading>{lang === "fa" ? member.name : member.enName}</Heading>
        <p>{lang === "fa" ? member.bio : member.enBio}</p>
        <div className="tag-list" dir="ltr">
          {member.skills.filter(Boolean).map((skill, i) => (
            <span key={i}>{skill}</span>
          ))}
        </div>
        <div className="member-socials">
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              aria-label={`Email — ${member.enName}`}
            >
              <Mail size={17} />
            </a>
          )}
          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub — ${member.enName}`}
            >
              <Github size={17} />
            </a>
          )}
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn — ${member.enName}`}
            >
              <Linkedin size={17} />
            </a>
          )}
        </div>
        <Link className="team-expand" to={`/team/${member.id}`}>
          {phrase(lang, "رزومه و مشارکت‌ها", "Biography & contributions")}
          <ArrowUpLeft size={17} />
        </Link>
      </div>
    </article>
  );
}

export default function TeamSection({
  lang,
  full = false,
}: {
  lang: Language;
  full?: boolean;
}) {
  const { members } = useStudio();
  const Heading = full ? "h1" : "h2";
  const GroupHeading = full ? "h2" : "h3";
  const groups = [
    {
      id: "current",
      fa: "اعضای فعلی",
      en: "Current team",
      list: members.filter((m) => m.status !== "former"),
    },
    {
      id: "former",
      fa: "همکاران پیشین",
      en: "Former collaborators",
      list: members.filter((m) => m.status === "former"),
    },
  ];
  return (
    <section
      id="team"
      className={`team-section section${full ? " team-directory" : ""}`}
    >
      <div className="wrap">
        <div className="section-label">
          <span className="signal-dot" />
          {phrase(lang, "آدم‌های پشت ایده‌ها", "PEOPLE BEHIND THE IDEAS")}
        </div>
        <div className="section-heading">
          <Heading>
            {phrase(lang, "نگاه‌های متفاوت.", "Different perspectives.")}
            <br />
            <span>
              {phrase(lang, "یک مسیر مشترک.", "One shared direction.")}
            </span>
          </Heading>
          <div>
            <p>
              {phrase(
                lang,
                "قدرت یک تیم در کنار هم قرار گرفتن تخصص‌هاست. ما با هم فکر می‌کنیم، می‌سازیم و یاد می‌گیریم.",
                "A team’s strength is in its connected expertise. We think, build and learn together.",
              )}
            </p>
            {members.some((m) => m.demo) && (
              <span className="sample-note">
                {phrase(
                  lang,
                  "پروفایل‌های دارای برچسب نمایشی، رزومه ساختگی برای نمایش UI دارند.",
                  "Profiles marked Demo have fictional biographies for UI preview.",
                )}
              </span>
            )}
          </div>
        </div>
        {!full && (
          <div className="team-directory-action">
            <Link className="show-all button" to="/team">
              <Users size={17} />
              {phrase(lang, "همه اعضا", "All members")}
              <ArrowUpLeft size={17} />
            </Link>
          </div>
        )}
        {groups
          .filter((group) => full || group.id === "current")
          .map((group) => (
            <div className="team-group" key={group.id}>
              <div className="team-group-heading">
                <GroupHeading>{phrase(lang, group.fa, group.en)}</GroupHeading>
                <span>{group.list.length}</span>
              </div>
              {group.id === "former" && (
                <p className="team-group-description">
                  {phrase(
                    lang,
                    "همکارانی که بخشی از مسیر رایبان را با ما ساخته‌اند؛ امروز همراه ما نیستند، اما سهمشان در این مسیر ماندگار است.",
                    "People who helped shape Rayban along the way. Their contributions remain part of our story.",
                  )}
                </p>
              )}
              {group.list.length ? (
                full ? (
                  <div className="team-grid">
                    {group.list.map((m, i) => (
                      <MemberCard
                        key={m.id}
                        member={m}
                        index={i}
                        lang={lang}
                        full
                      />
                    ))}
                  </div>
                ) : (
                  <CardRail
                    kind="team"
                    lang={lang}
                    label={phrase(lang, group.fa, group.en)}
                  >
                    {group.list.map((m, i) => (
                      <div key={m.id}>
                        <MemberCard
                          member={m}
                          index={i}
                          lang={lang}
                          full={false}
                        />
                      </div>
                    ))}
                  </CardRail>
                )
              ) : (
                <p className="empty-state">
                  {phrase(
                    lang,
                    "هنوز اطلاعاتی برای این بخش ثبت نشده است.",
                    "No profiles have been added to this group yet.",
                  )}
                </p>
              )}
            </div>
          ))}
      </div>
    </section>
  );
}

export function MemberPage({ lang }: { lang: Language }) {
  const { id } = useParams();
  const { members, projects } = useStudio();
  const member = members.find((m) => m.id === id);
  if (!member)
    return (
      <main className="wrap section">
        <h1>{phrase(lang, "عضو پیدا نشد", "Member not found")}</h1>
        <Link to="/team">{phrase(lang, "همه اعضا", "All members")}</Link>
      </main>
    );
  return (
    <main className="wrap section member-page">
      <Link className="detail-back" to="/team">
        <ArrowLeft size={17} />
        {phrase(lang, "همه اعضا", "All members")}
      </Link>
      <div className="member-page-header">
        <span className="member-page-avatar">{member.initials}</span>
        <div>
          <span className="eyebrow">
            {phrase(
              lang,
              member.status === "former" ? "همکار پیشین" : "عضو تیم",
              member.status === "former"
                ? "Former collaborator"
                : "Team member",
            )}
          </span>
          <h1>{lang === "fa" ? member.name : member.enName}</h1>
          <p>{lang === "fa" ? member.role : member.enRole}</p>
          {member.collaborationPeriod && (
            <span>{member.collaborationPeriod}</span>
          )}
        </div>
      </div>
      {member.demo && (
        <p className="sample-note">
          {phrase(
            lang,
            "رزومه نمایشی برای پیش‌نمایش رابط کاربری",
            "Fictional biography for UI preview",
          )}
        </p>
      )}
      <section>
        <h2>{phrase(lang, "درباره", "About")}</h2>
        <p>{lang === "fa" ? member.bio : member.enBio}</p>
        <div className="tag-list" dir="ltr">
          {member.skills.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </div>
      </section>
      <section>
        <h2>{phrase(lang, "مشارکت‌ها", "Contributions")}</h2>
        <p>
          {member.contributions ||
            phrase(
              lang,
              "اطلاعات مشارکت‌ها در انتظار تکمیل است.",
              "Contribution details are pending.",
            )}
        </p>
        {projects
          .filter((p) => Object.values(p.contributors).includes(member.id))
          .map((p) => (
            <Link
              className="member-project-link"
              key={p.id}
              to={`/projects/${p.id}`}
            >
              {p.title[lang === "fa" ? 0 : 1]}
              <ArrowUpLeft size={16} />
            </Link>
          ))}
      </section>
    </main>
  );
}
