import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Language } from "../data";
import { phrase } from "../data";

export default function Footer({ lang }: { lang: Language }) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-links">
          <Link to="/projects">{phrase(lang, "پروژه‌ها", "Projects")}</Link>
          <Link to="/team">{phrase(lang, "اعضای تیم", "Team")}</Link>
          <Link to="/#about">{phrase(lang, "درباره ما", "About")}</Link>
          <Link to="/contact">{phrase(lang, "ارتباط با ما", "Contact")}</Link>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()}{" "}
            {phrase(lang, "تمام حقوق محفوظ است.", "All rights reserved.")}
          </span>
          <a href="#top">
            {phrase(lang, "بازگشت به بالا", "Back to top")}
            <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
