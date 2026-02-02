// Reusable page content renderer - renders sections from JSON data

import ReactMarkdown from "react-markdown";
import { useTranslations } from "../hooks/useTranslations";
import { usePageContent } from "../hooks/usePageContent";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { SocialMediaIcons } from "./SocialMediaIcons";

type ImagePosition = "left" | "right" | "full";

type PageSection = {
  type?: string;
  header?: string;
  text?: string;
  image?: string;
  imagePosition?: ImagePosition;
  alt?: string;
};

type PageContentProps = {
  contentFile: string;
  language: "fi" | "en" | "sv";
};

const validPositions: ImagePosition[] = ["left", "right", "full"];

function parseSection(raw: {
  type?: string;
  header?: string;
  text?: string;
  image?: string;
  imagePosition?: string;
  alt?: string;
}): PageSection {
  return {
    type: raw.type,
    header: raw.header,
    text: raw.text,
    image: raw.image,
    alt: raw.alt,
    imagePosition:
      raw.imagePosition && validPositions.includes(raw.imagePosition as ImagePosition)
        ? (raw.imagePosition as ImagePosition)
        : undefined,
  };
}

export function PageContent({ contentFile, language }: PageContentProps) {
  const t = useTranslations(language);
  const data = usePageContent(contentFile);
  const settings = useSiteSettings();

  if (!data) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <p style={styles.placeholder}>
            {t.common.contentComingSoon}
          </p>
        </div>
      </div>
    );
  }

  const sections = data.sections.map(parseSection);
  const showSocialMedia = data.showSocialMedia && settings?.socialMedia;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {data.showTitle !== false && <h1 style={styles.title}>{data.title}</h1>}
        {sections.length === 0 && (
          <p style={styles.placeholder}>
            {t.common.contentComingSoon}
          </p>
        )}
        {sections.map((section, index) => (
          <div key={index} style={styles.section}>
            {renderSection(section)}
          </div>
        ))}
        {showSocialMedia && settings?.socialMedia && (
          <div style={styles.section}>
            <div style={styles.textOnly}>
              <h2 style={styles.sectionHeader}>{t.footer.socialMedia}</h2>
              <SocialMediaIcons socialMedia={settings.socialMedia} size={28} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function renderSection(section: PageSection) {
  // Handle explicit type field from new markdown format
  if (section.type === "text_only") {
    return renderTextOnly(section);
  }
  if (section.type === "image_text") {
    return renderImageWithText(section);
  }
  if (section.type === "image_only") {
    return renderImageOnly(section);
  }

  // Fallback to old behavior for JSON files without explicit type
  if (section.image && section.imagePosition === "full") {
    return renderFullWidthImage(section);
  }
  if (section.image) {
    return renderImageWithText(section);
  }
  return renderTextOnly(section);
}

function renderTextOnly(section: PageSection) {
  return (
    <div style={styles.textOnly}>
      {section.header && (
        <h2 style={styles.sectionHeader}>{section.header}</h2>
      )}
      {section.text && (
        <div style={styles.textContent}>
          <ReactMarkdown>{section.text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function renderImageWithText(section: PageSection) {
  const isRight = section.imagePosition === "right";
  return (
    <div style={{
      ...styles.imageText,
      flexDirection: isRight ? "row" : "row-reverse",
    }}>
      <div style={styles.imageWrapper}>
        <img
          src={section.image}
          alt={section.header || ""}
          style={styles.sectionImage}
        />
      </div>
      <div style={styles.imageTextContent}>
        {section.header && (
          <h2 style={styles.sectionHeader}>{section.header}</h2>
        )}
        {section.text && (
          <div style={styles.textContent}>
            <ReactMarkdown>{section.text}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function renderImageOnly(section: PageSection) {
  return (
    <div style={styles.fullWidthImage}>
      <img
        src={section.image}
        alt={section.alt || section.header || ""}
        style={styles.fullImage}
      />
    </div>
  );
}

function renderFullWidthImage(section: PageSection) {
  return (
    <div style={styles.fullWidthImage}>
      <img
        src={section.image}
        alt={section.header || ""}
        style={styles.fullImage}
      />
      {section.header && (
        <h2 style={styles.imageCaption}>{section.header}</h2>
      )}
      {section.text && (
        <div style={styles.textContent}>
          <ReactMarkdown>{section.text}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    paddingTop: "clamp(16px, 3vw, 20px)",
    backgroundColor: "#f5f5f5",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "clamp(1.5rem, 3vw, 2rem) clamp(0.75rem, 2vw, 1rem)",
  },
  title: {
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
    color: "#FDB913",
    marginBottom: "clamp(1.5rem, 3vw, 2rem)",
    fontWeight: "bold",
  },
  placeholder: {
    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
    color: "#999",
    fontStyle: "italic",
  },
  section: {
    marginBottom: "clamp(2rem, 4vw, 3rem)",
  },
  textOnly: {
    maxWidth: "900px",
  },
  sectionHeader: {
    fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
    color: "#333",
    marginBottom: "clamp(0.5rem, 1.5vw, 0.75rem)",
    fontWeight: "bold",
  },
  textContent: {
    fontSize: "clamp(0.9rem, 1.5vw, 1rem)",
    lineHeight: "1.7",
    color: "#444",
  },
  paragraph: {
    marginBottom: "0.75rem",
    margin: "0 0 0.75rem 0",
  },
  imageText: {
    display: "flex",
    gap: "clamp(1rem, 3vw, 2rem)",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
  },
  imageWrapper: {
    flex: "1 1 clamp(200px, 35vw, 400px)",
    minWidth: "min(100%, 200px)",
    maxWidth: "100%",
  },
  sectionImage: {
    width: "100%",
    borderRadius: "8px",
    objectFit: "cover" as const,
    maxHeight: "clamp(250px, 35vw, 300px)",
  },
  imageTextContent: {
    flex: "1 1 auto",
    minWidth: "min(100%, 300px)",
  },
  fullWidthImage: {
    textAlign: "center" as const,
  },
  fullImage: {
    width: "100%",
    maxWidth: "clamp(300px, 90vw, 800px)",
    borderRadius: "8px",
    objectFit: "cover" as const,
    maxHeight: "clamp(300px, 50vw, 400px)",
    display: "block",
    margin: "0 auto",
  },
  imageCaption: {
    fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
    color: "#333",
    marginTop: "clamp(0.75rem, 1.5vw, 1rem)",
    marginBottom: "clamp(0.4rem, 1vw, 0.5rem)",
    fontWeight: "bold",
  },
};
