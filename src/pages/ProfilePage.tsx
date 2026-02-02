// User profile page
// Displays user information, membership status, and applications

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUserProfile } from "../hooks/useUserProfile";
import { useApplications } from "../hooks/useApplications";
import { MembershipFormModal } from "../components/MembershipFormModal";
import { colors } from "../config/colors";
import type { ApplicationStatus } from "../types/user";

type ProfilePageProps = {
  language: "fi" | "en" | "sv";
};

const translations = {
  fi: {
    title: "Profiili",
    notLoggedIn: "Et ole kirjautunut sisään",
    loading: "Ladataan...",
    basicInfo: "Perustiedot",
    name: "Nimi",
    email: "Sähköposti",
    phone: "Puhelin",
    address: "Osoite",
    membershipStatus: "Jäsenyys",
    member: "Jäsen",
    notMember: "Ei jäsen",
    applicationPending: "Hakemus käsittelyssä",
    memberSince: "Jäsen alkaen",
    becomeMember: "Liity jäseneksi",
    applications: "Hakemukset",
    noApplications: "Ei hakemuksia",
    applicationTypes: {
      membership: "Jäsenhakemus",
      adoption: "Adoptointihakemus",
    },
    statusLabels: {
      pending: "Käsittelyssä",
      approved: "Hyväksytty",
      rejected: "Hylätty",
    },
    edit: "Muokkaa",
    save: "Tallenna",
    cancel: "Peruuta",
    emailVerified: "Sähköposti vahvistettu",
    emailNotVerified: "Sähköposti ei vahvistettu",
    verifyEmail: "Lähetä vahvistus",
    verificationSent: "Vahvistus lähetetty",
  },
  en: {
    title: "Profile",
    notLoggedIn: "You are not logged in",
    loading: "Loading...",
    basicInfo: "Basic Information",
    name: "Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    membershipStatus: "Membership",
    member: "Member",
    notMember: "Not a member",
    applicationPending: "Application pending",
    memberSince: "Member since",
    becomeMember: "Become a member",
    applications: "Applications",
    noApplications: "No applications",
    applicationTypes: {
      membership: "Membership application",
      adoption: "Adoption application",
    },
    statusLabels: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },
    edit: "Edit",
    save: "Save",
    cancel: "Cancel",
    emailVerified: "Email verified",
    emailNotVerified: "Email not verified",
    verifyEmail: "Send verification",
    verificationSent: "Verification sent",
  },
  sv: {
    title: "Profil",
    notLoggedIn: "Du är inte inloggad",
    loading: "Laddar...",
    basicInfo: "Grundläggande information",
    name: "Namn",
    email: "E-post",
    phone: "Telefon",
    address: "Adress",
    membershipStatus: "Medlemskap",
    member: "Medlem",
    notMember: "Inte medlem",
    applicationPending: "Ansökan pågår",
    memberSince: "Medlem sedan",
    becomeMember: "Bli medlem",
    applications: "Ansökningar",
    noApplications: "Inga ansökningar",
    applicationTypes: {
      membership: "Medlemsansökan",
      adoption: "Adoptionsansökan",
    },
    statusLabels: {
      pending: "Under behandling",
      approved: "Godkänd",
      rejected: "Avvisad",
    },
    edit: "Redigera",
    save: "Spara",
    cancel: "Avbryt",
    emailVerified: "E-post verifierad",
    emailNotVerified: "E-post ej verifierad",
    verifyEmail: "Skicka verifiering",
    verificationSent: "Verifiering skickad",
  },
};

export function ProfilePage({ language }: ProfilePageProps) {
  const t = translations[language];
  const { user, loading: authLoading, sendVerificationEmail } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile(user?.uid || null);
  const { applications, loading: appsLoading } = useApplications(user?.uid || null);

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPhone, setEditPhone] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);

  // Redirect if not logged in
  if (!authLoading && !user) {
    return <Navigate to="/" replace />;
  }

  if (authLoading || profileLoading) {
    return (
      <div style={styles.page}>
        <div style={styles.loading}>{t.loading}</div>
      </div>
    );
  }

  const handleEdit = () => {
    setEditName(profile?.displayName || user?.displayName || "");
    setEditPhone(profile?.phone || "");
    setEditAddress(profile?.address || "");
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateProfile({
        displayName: editName,
        phone: editPhone,
        address: editAddress,
      });
      setIsEditing(false);
    } catch {
      // Error handled in hook
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendVerification = async () => {
    try {
      await sendVerificationEmail();
      setVerificationSent(true);
    } catch {
      // Error handled in context
    }
  };

  const formatDate = (timestamp: { toDate: () => Date } | null) => {
    if (!timestamp) return "-";
    const date = timestamp.toDate();
    return date.toLocaleDateString(language === "fi" ? "fi-FI" : language === "sv" ? "sv-SE" : "en-US");
  };

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return colors.status.reserved;
      case "approved":
        return colors.status.available;
      case "rejected":
        return "#c62828";
      default:
        return colors.text.tertiary;
    }
  };

  const displayName = profile?.displayName || user?.displayName || "";
  const photoURL = profile?.photoURL || user?.photoURL;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>{t.title}</h1>

      {/* Profile Header */}
      <div style={styles.header}>
        <div style={styles.avatar}>
          {photoURL ? (
            <img src={photoURL} alt="" style={styles.avatarImage} />
          ) : (
            <span style={styles.avatarInitial}>
              {displayName.charAt(0).toUpperCase() || "?"}
            </span>
          )}
        </div>
        <div style={styles.headerInfo}>
          <h2 style={styles.headerName}>{displayName || user?.email}</h2>
          <div style={styles.emailVerification}>
            {user?.emailVerified ? (
              <span style={styles.verified}>{t.emailVerified}</span>
            ) : (
              <span style={styles.notVerified}>
                {t.emailNotVerified}
                <button
                  style={styles.verifyButton}
                  onClick={handleSendVerification}
                  disabled={verificationSent}
                >
                  {verificationSent ? t.verificationSent : t.verifyEmail}
                </button>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Basic Info Section */}
      <div style={styles.section}>
        <div style={styles.sectionHeader}>
          <h3 style={styles.sectionTitle}>{t.basicInfo}</h3>
          {!isEditing && (
            <button style={styles.editButton} onClick={handleEdit}>
              {t.edit}
            </button>
          )}
        </div>

        {isEditing ? (
          <div style={styles.editForm}>
            <div style={styles.field}>
              <label style={styles.label}>{t.name}</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>{t.phone}</label>
              <input
                type="tel"
                value={editPhone}
                onChange={(e) => setEditPhone(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.field}>
              <label style={styles.label}>{t.address}</label>
              <input
                type="text"
                value={editAddress}
                onChange={(e) => setEditAddress(e.target.value)}
                style={styles.input}
              />
            </div>
            <div style={styles.editButtons}>
              <button
                style={styles.saveButton}
                onClick={handleSave}
                disabled={isSaving}
              >
                {t.save}
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setIsEditing(false)}
              >
                {t.cancel}
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.infoGrid}>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>{t.name}</span>
              <span style={styles.infoValue}>{displayName || "-"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>{t.email}</span>
              <span style={styles.infoValue}>{user?.email || "-"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>{t.phone}</span>
              <span style={styles.infoValue}>{profile?.phone || "-"}</span>
            </div>
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>{t.address}</span>
              <span style={styles.infoValue}>{profile?.address || "-"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Membership Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t.membershipStatus}</h3>
        <div style={styles.membershipBadge}>
          {profile?.membershipStatus === "yes" ? (
            <>
              <span style={styles.memberBadge}>{t.member}</span>
              {profile.memberSince && (
                <span style={styles.memberSince}>
                  {t.memberSince}: {formatDate(profile.memberSince)}
                </span>
              )}
            </>
          ) : profile?.membershipStatus === "applied" ? (
            <span style={styles.pendingBadge}>{t.applicationPending}</span>
          ) : (
            <>
              <span style={styles.notMemberBadge}>{t.notMember}</span>
              <button
                style={styles.becomeMemberButton}
                onClick={() => setIsMembershipModalOpen(true)}
              >
                {t.becomeMember}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Applications Section */}
      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>{t.applications}</h3>
        {appsLoading ? (
          <p style={styles.loading}>{t.loading}</p>
        ) : applications.length === 0 ? (
          <p style={styles.noApplications}>{t.noApplications}</p>
        ) : (
          <div style={styles.applicationsList}>
            {applications.map((app) => (
              <div key={app.id} style={styles.applicationCard}>
                <div style={styles.applicationHeader}>
                  <span style={styles.applicationType}>
                    {t.applicationTypes[app.type]}
                  </span>
                  <span
                    style={{
                      ...styles.applicationStatus,
                      backgroundColor: getStatusColor(app.status),
                    }}
                  >
                    {t.statusLabels[app.status]}
                  </span>
                </div>
                {app.type === "adoption" && (
                  <p style={styles.applicationAnimal}>{app.animalName}</p>
                )}
                <p style={styles.applicationDate}>{formatDate(app.createdAt)}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Membership Form Modal */}
      {user && (
        <MembershipFormModal
          isOpen={isMembershipModalOpen}
          onClose={() => setIsMembershipModalOpen(false)}
          userId={user.uid}
          userEmail={user.email || ""}
          language={language}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    padding: "40px 20px",
    maxWidth: "800px",
    margin: "0 auto",
    minHeight: "100vh",
  },
  title: {
    fontSize: "36px",
    color: colors.green.dark,
    marginBottom: "32px",
  },
  loading: {
    textAlign: "center",
    color: colors.text.tertiary,
    padding: "40px",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    marginBottom: "32px",
    padding: "24px",
    backgroundColor: colors.background.card,
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    backgroundColor: colors.green.medium,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  avatarInitial: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "white",
  },
  headerInfo: {
    flex: 1,
  },
  headerName: {
    fontSize: "24px",
    fontWeight: 600,
    color: colors.text.primary,
    margin: "0 0 8px 0",
  },
  emailVerification: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  verified: {
    color: colors.status.available,
    fontSize: "14px",
  },
  notVerified: {
    color: colors.status.reserved,
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  verifyButton: {
    padding: "4px 8px",
    fontSize: "12px",
    backgroundColor: colors.primary,
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  section: {
    marginBottom: "24px",
    padding: "24px",
    backgroundColor: colors.background.card,
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
  },
  sectionHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: 600,
    color: colors.green.dark,
    margin: 0,
  },
  editButton: {
    padding: "6px 12px",
    fontSize: "14px",
    backgroundColor: "transparent",
    color: colors.green.medium,
    border: `1px solid ${colors.green.medium}`,
    borderRadius: "6px",
    cursor: "pointer",
  },
  infoGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: `1px solid ${colors.border.light}`,
  },
  infoLabel: {
    color: colors.text.tertiary,
    fontSize: "14px",
  },
  infoValue: {
    color: colors.text.primary,
    fontSize: "14px",
    fontWeight: 500,
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 500,
    color: colors.text.secondary,
  },
  input: {
    padding: "10px 12px",
    fontSize: "16px",
    border: `1px solid ${colors.border.light}`,
    borderRadius: "6px",
    outline: "none",
  },
  editButtons: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  saveButton: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: colors.primary,
    color: colors.text.primary,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelButton: {
    padding: "10px 20px",
    fontSize: "14px",
    backgroundColor: "transparent",
    color: colors.text.secondary,
    border: `1px solid ${colors.border.light}`,
    borderRadius: "6px",
    cursor: "pointer",
  },
  membershipBadge: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  memberBadge: {
    padding: "8px 16px",
    backgroundColor: colors.status.available,
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
  },
  notMemberBadge: {
    padding: "8px 16px",
    backgroundColor: colors.text.tertiary,
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
  },
  pendingBadge: {
    padding: "8px 16px",
    backgroundColor: colors.status.reserved,
    color: "white",
    borderRadius: "20px",
    fontSize: "14px",
    fontWeight: 600,
  },
  memberSince: {
    color: colors.text.tertiary,
    fontSize: "14px",
  },
  becomeMemberButton: {
    padding: "8px 16px",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: colors.primary,
    color: colors.text.primary,
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  noApplications: {
    color: colors.text.tertiary,
    fontSize: "14px",
    textAlign: "center",
    padding: "20px",
  },
  applicationsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  applicationCard: {
    padding: "16px",
    backgroundColor: colors.background.section,
    borderRadius: "8px",
  },
  applicationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  applicationType: {
    fontSize: "16px",
    fontWeight: 500,
    color: colors.text.primary,
  },
  applicationStatus: {
    padding: "4px 10px",
    color: "white",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 600,
  },
  applicationAnimal: {
    margin: "8px 0 0 0",
    color: colors.text.secondary,
    fontSize: "14px",
  },
  applicationDate: {
    margin: "8px 0 0 0",
    color: colors.text.tertiary,
    fontSize: "12px",
  },
};
