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
    url: "https://t.me/rayban",
    Icon: Send,
    handle: "rayban",
  },
  {
    fa: "ایتا",
    en: "Eitaa",
    url: "https://eitaa.com/rayban",
    brand: "eitaa" as const,
    handle: "rayban",
  },
  {
    fa: "روبیکا",
    en: "Rubika",
    url: "https://rubika.ir/rayban",
    brand: "rubika" as const,
    handle: "rayban",
  },
  {
    fa: "بله",
    en: "Bale",
    url: "https://ble.ir/rayban",
    brand: "bale" as const,
    handle: "rayban",
  },
  {
    fa: "لینکدین",
    en: "LinkedIn",
    url: "https://www.linkedin.com/company/rayban/",
    Icon: Linkedin,
    handle: "rayban",
  },
  {
    fa: "گیت‌هاب",
    en: "GitHub",
    url: "https://github.com/rayban",
    Icon: Github,
    handle: "rayban",
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
    handle: "rayban",
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
            {phrase(lang, "شروع همکاری", "LET’S TALK")}
          </span>
          <h1>
            {phrase(lang, "پروژه‌ای در ذهن دارید؟", "Have a project in mind?")}
            <br />
            <span>{phrase(lang, "همراه شما در ساخت آن هستیم.", "Let's build it together.")}</span>
          </h1>
          <p>
            {phrase(
              lang,
              "برای بررسی نیازمندی‌های پروژه، برآورد فنی یا آغاز همکاری، از راه‌های زیر با تیم رایبان در ارتباط باشید.",
              "Reach out to the Rayban team through your preferred channel to discuss project requirements, technical scoping or collaboration.",
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
          <a className="contact-channel" href="mailto:contact@rayban.studio">
            <span className="channel-icon">
              <Mail size={25} />
            </span>
            <div>
              <h2>{phrase(lang, "ایمیل استودیو", "Email us")}</h2>
              <span dir="ltr">contact@rayban.studio</span>
            </div>
            <ArrowUpRight size={21} />
          </a>
        </div>
        <div className="channel-heading">
          <h2>
            {phrase(
              lang,
              "پیام‌رسان‌ها و شبکه‌های اجتماعی",
              "Messengers & social channels",
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
                  <span dir="ltr">@{handle ?? "rayban"}</span>
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
