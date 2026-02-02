// Footer component - reads data from settings.json

import { useTranslations } from "../hooks/useTranslations";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { SocialMediaIcons } from "./SocialMediaIcons";

type FooterProps = {
  language: "fi" | "en" | "sv";
};

export function Footer({ language }: FooterProps) {
  const t = useTranslations(language);
  const text = t.footer;
  const settings = useSiteSettings();

  // Use settings data with fallbacks
  const org = settings?.organization;
  const contact = settings?.contact;
  const hours = settings?.hours;
  const social = settings?.socialMedia;

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Organization Info */}
        <div style={styles.section}>
          <h3 style={styles.heading}>{org?.name || text.organization}</h3>
          {org?.businessId && (
            <p style={styles.text}>Y-tunnus: {org.businessId}</p>
          )}
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          {contact?.phone && (
            <>
              <h4 style={styles.subheading}>{text.phone}</h4>
              <p style={styles.text}>{contact.phone}</p>
              {contact.phoneHours && (
                <p style={styles.smallText}>{contact.phoneHours}</p>
              )}
            </>
          )}

          {contact?.email && (
            <>
              <h4 style={styles.subheading}>{text.email}</h4>
              <p style={styles.text}>
                <a href={`mailto:${contact.email}`} style={styles.link}>
                  {contact.email}
                </a>
              </p>
            </>
          )}

          {(contact?.addressLine1 || contact?.addressLine2) && (
            <>
              <h4 style={styles.subheading}>{text.address}</h4>
              <p style={styles.text}>
                {contact.addressLine1}
                {contact.addressLine1 && contact.addressLine2 && <br />}
                {contact.addressLine2}
              </p>
            </>
          )}
        </div>

        {/* Opening Hours */}
        {(hours?.shop || hours?.catFacility) && (
          <div style={styles.section}>
            <h4 style={styles.subheading}>{text.openingHours}</h4>
            {hours.shop && (
              <p style={styles.smallText}>
                HESY-puoti: {hours.shop}
              </p>
            )}
            {hours.catFacility && (
              <p style={styles.smallText}>
                Kissatilat: {hours.catFacility}
              </p>
            )}
          </div>
        )}

        {/* Social Media */}
        {social && (
          <div style={styles.section}>
            <h4 style={styles.subheading}>{text.socialMedia}</h4>
            <SocialMediaIcons socialMedia={social} />
          </div>
        )}
      </div>

      {/* Bottom Links */}
      <div style={styles.bottomBar}>
        <div style={styles.bottomContainer}>
          <div style={styles.bottomLinks}>
            <a href="/newsletter" style={styles.bottomLink}>{text.newsletter}</a>
            <a href="/terms" style={styles.bottomLink}>{text.terms}</a>
            <a href="/privacy" style={styles.bottomLink}>{text.privacy}</a>
          </div>
          <p style={styles.copyright}>
            © {new Date().getFullYear()} HESY
          </p>
        </div>
      </div>
    </footer>
  );
}

const styles: Record<string, React.CSSProperties> = {
  footer: {
    backgroundColor: "#a0a0a0",
    color: "#1a1a1a",
    padding: "clamp(2rem, 4vw, 3rem) 0 0",
    marginTop: "auto",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 clamp(0.75rem, 2vw, 1rem)",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
    gap: "clamp(1.5rem, 3vw, 2rem)",
  },
  bottomContainer: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 clamp(0.75rem, 2vw, 1rem)",
  },
  section: {
    marginBottom: "clamp(1rem, 2vw, 1.5rem)",
  },
  heading: {
    fontSize: "clamp(1rem, 1.5vw, 1.1rem)",
    marginBottom: "0.5rem",
    color: "#FDB913",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: "clamp(0.875rem, 1.5vw, 0.95rem)",
    marginTop: "clamp(0.75rem, 1.5vw, 1rem)",
    marginBottom: "0.25rem",
    color: "#2c2c2c",
    fontWeight: "600",
  },
  text: {
    fontSize: "clamp(0.85rem, 1.5vw, 0.9rem)",
    lineHeight: "1.6",
    margin: "0.25rem 0",
    color: "#2c2c2c",
  },
  smallText: {
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    lineHeight: "1.5",
    margin: "0.25rem 0",
    color: "#3a3a3a",
  },
  link: {
    color: "#FDB913",
    textDecoration: "none",
    transition: "color 0.2s ease",
  },
  bottomBar: {
    backgroundColor: "#808080",
    marginTop: "clamp(1.5rem, 3vw, 2rem)",
    padding: "clamp(1rem, 2vw, 1.5rem) 0",
  },
  bottomLinks: {
    display: "flex",
    gap: "clamp(1rem, 2vw, 1.5rem)",
    marginBottom: "clamp(0.75rem, 1.5vw, 1rem)",
    flexWrap: "wrap",
  },
  bottomLink: {
    color: "#1a1a1a",
    textDecoration: "none",
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    transition: "color 0.2s ease",
  },
  copyright: {
    fontSize: "clamp(0.8rem, 1.5vw, 0.85rem)",
    color: "#4a4a4a",
    margin: 0,
  },
};
