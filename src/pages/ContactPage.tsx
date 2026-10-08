import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  ArrowLeft,
  Phone,
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
} from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";
import MessengerMark from "../components/MessengerMark";

const channels = [
  {
    fa: "تلگرام",
    en: "Telegram",
    url: "https://t.me/ali_hashemi8",
    Icon: Send,
  },
  {
    fa: "ایتا",
    en: "Eitaa",
    url: "https://eitaa.com/ali_hashemi8",
    brand: "eitaa" as const,
  },
  {
    fa: "روبیکا",
    en: "Rubika",
    url: "https://rubika.ir/ali_hashemi8",
    brand: "rubika" as const,
  },
  {
    fa: "بله",
    en: "Bale",
    url: "https://ble.ir/ali_hashemi8",
    brand: "bale" as const,
  },
  {
    fa: "لینکدین",
    en: "LinkedIn",
    url: "https://www.linkedin.com/in/alihashemi8/",
    Icon: Linkedin,
    handle: "alihashemi8",
  },
  {
    fa: "گیت‌هاب",
    en: "GitHub",
    url: "https://github.com/alihashemi8",
    Icon: Github,
    handle: "alihashemi8",
  },
  {
    fa: "واتس‌اپ",
    en: "WhatsApp",
    url: "https://wa.me/989045911122",
    brand: "whatsapp" as const,
    handle: "09045911122",
  },
  {
    fa: "اینستاگرام",
    en: "Instagram",
    url: "",
    Icon: Instagram,
    handle: "ali_hashemi8",
  },
];

export default function ContactPage({ lang }: { lang: Language }) {
  return (
    <main className="contact-page">
      <section className="wrap contact-directory">
        <Link className="detail-back" to="/">
          <ArrowLeft size={16} />
          {phrase(lang, "صفحه اصلی", "Home")}
        </Link>
        <div className="page-intro">
          <span className="eyebrow">
            <span className="signal-dot" />
            {phrase(lang, "شروع یک گفت‌وگو", "LET’S TALK")}
          </span>
          <h1>
            {phrase(lang, "از یک گفت‌وگو،", "One conversation.")}
            <br />
            <span>{phrase(lang, "تا ایده بعدی.", "Your next idea.")}</span>
          </h1>
          <p>
            {phrase(
              lang,
              "برای معرفی ایده، سؤال درباره پروژه‌ها یا شروع همکاری، از راهی که راحت‌ترید با علی هاشمی در ارتباط باشید.",
              "Reach Ali Hashemi through your preferred channel to share an idea, ask about a project or discuss working together.",
            )}
          </p>
        </div>
        <div className="direct-contact-grid">
          <a className="contact-channel contact-phone" href="tel:+989045911122">
            <span className="channel-icon">
              <Phone size={25} />
            </span>
            <div>
              <h2>{phrase(lang, "تماس تلفنی", "Call us")}</h2>
              <span dir="ltr">0904 591 1122</span>
            </div>
            <ArrowUpRight size={21} />
          </a>
          <a className="contact-channel" href="mailto:alihashemi5553@gmail.com">
            <span className="channel-icon">
              <Mail size={25} />
            </span>
            <div>
              <h2>{phrase(lang, "ایمیل", "Email")}</h2>
              <span dir="ltr">alihashemi5553@gmail.com</span>
            </div>
            <ArrowUpRight size={21} />
          </a>
        </div>
        <div className="channel-heading">
          <h2>
            {phrase(
              lang,
              "ارتباط از طریق پیام رسان ها",
              "Connect through messengers",
            )}
          </h2>
          <span className="mono">SOCIAL / CONNECT</span>
        </div>
        <div className="contact-channel-grid">
          {channels.map(({ fa, en, url, Icon, handle, brand }) => {
            const Channel = url ? "a" : "article";
            return (
              <Channel
                key={en}
                className="contact-channel"
                href={url || undefined}
                aria-disabled={!url || undefined}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="channel-icon">
                  {brand ? (
                    <MessengerMark brand={brand} />
                  ) : (
                    Icon && <Icon size={25} />
                  )}
                </span>
                <div>
                  <h3>{phrase(lang, fa, en)}</h3>
                  <span dir="ltr">@{handle ?? "ali_hashemi8"}</span>
                  {!url && (
                    <small className="channel-pending">
                      {phrase(
                        lang,
                        "به‌زودی؛ حساب در حال آماده‌سازی است",
                        "Coming soon; account being prepared",
                      )}
                    </small>
                  )}
                </div>
                {url && <ArrowUpRight size={19} />}
              </Channel>
            );
          })}
        </div>
      </section>
    </main>
  );
}
