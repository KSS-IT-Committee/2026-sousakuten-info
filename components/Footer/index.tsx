import styles from "./Footer.module.css";

const FOOTER_TEXT = {
  eventWeek: "行事週間2026",
  theme: "青、薫る",
  schoolCopyright: "© 2026 東京都立小石川中等教育学校",
  committees: "行事運営委員会・IT委員会",
};

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTheme}>
        <span>{FOOTER_TEXT.eventWeek}</span>
        <span>{FOOTER_TEXT.theme}</span>
      </div>
      <address
        className={styles.footerMeta}
        aria-label="著作権および運営組織情報"
      >
        <span>{FOOTER_TEXT.schoolCopyright}</span>
        <span>{FOOTER_TEXT.committees}</span>
      </address>
    </footer>
  );
}
