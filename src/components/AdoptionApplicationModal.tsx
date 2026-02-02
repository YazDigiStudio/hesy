// Adoptiohakemuslomake - monivaiheinen kysely

import { useState, type FormEvent } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useAuth } from "../hooks/useAuth";
import type { Animal } from "../types/animal";
import type { AdoptionFormData } from "../types/user";

type AdoptionApplicationModalProps = {
  animal: Animal;
  onClose: () => void;
  onSuccess: () => void;
};

const emptyForm: AdoptionFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: 18,
  animalName: "",
  animalSpecies: "cat",
  whyGoodHome: "",
  livingArea: "city",
  municipality: "",
  housingType: "apartment",
  apartmentSize: 0,
  hasBalcony: false,
  householdType: "alone",
  hasChildren: false,
  childrenAges: "",
  otherPets: "",
  petsNeutered: false,
  petsVaccinated: false,
  lifeSituation: "",
  animalExperience: "",
  knowledgeSource: "",
  livingEnvironment: "",
  timeAvailable: "",
  financialResponsibility: "",
  expectations: "",
  responsiblePerson: "",
  backupPlan: "",
  challengeHandling: "",
  givingUpConditions: "",
  additionalInfo: "",
  dataRetentionConsent: false,
  termsRead: false,
};

export function AdoptionApplicationModal({
  animal,
  onClose,
  onSuccess,
}: AdoptionApplicationModalProps) {
  const { user, userProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<AdoptionFormData>({
    ...emptyForm,
    animalName: animal.name,
    animalSpecies: animal.species,
    firstName: userProfile?.firstName || "",
    lastName: userProfile?.lastName || "",
    email: user?.email || "",
    phone: userProfile?.mobile || userProfile?.phone || "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = 4;

  const updateField = <K extends keyof AdoptionFormData>(
    key: K,
    value: AdoptionFormData[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!form.dataRetentionConsent || !form.termsRead) {
      setError("Sinun täytyy hyväksyä ehdot lähettääksesi hakemuksen.");
      return;
    }

    if (!user) {
      setError("Kirjaudu sisään lähettääksesi hakemuksen.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      await addDoc(collection(db, "adoptionApplications"), {
        userId: user.uid,
        animalId: animal.id,
        status: "pending",
        formData: form,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      onSuccess();
    } catch (err) {
      console.error("Virhe hakemuksen lähetyksessä:", err);
      setError("Hakemuksen lähetys epäonnistui. Yritä uudelleen.");
    } finally {
      setSubmitting(false);
    }
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeButton} onClick={onClose}>
          ×
        </button>

        <h2 style={styles.title}>Adoptiohakemus: {animal.name}</h2>

        {/* Vaiheet */}
        <div style={styles.steps}>
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              style={{
                ...styles.step,
                ...(step === s ? styles.stepActive : {}),
                ...(step > s ? styles.stepComplete : {}),
              }}
            >
              {s}
            </div>
          ))}
        </div>

        <p style={styles.stepLabel}>
          {step === 1 && "Yhteystiedot"}
          {step === 2 && "Asuminen"}
          {step === 3 && "Elämäntilanne"}
          {step === 4 && "Vahvistus"}
        </p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Vaihe 1: Yhteystiedot */}
          {step === 1 && (
            <div style={styles.stepContent}>
              <p style={styles.info}>
                Tarkista ennen hakemuksen lähettämistä, että yhteystietosi ovat
                oikein!
              </p>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Etunimi *</label>
                  <input
                    type="text"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Sukunimi *</label>
                  <input
                    type="text"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Sähköposti *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    style={styles.input}
                    required
                  />
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Puhelin</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <p style={styles.info}>
                Helsingin eläinsuojeluyhdistys luovuttaa eläimiä vain
                täysi-ikäisille henkilöille.
              </p>

              <div style={styles.field}>
                <label style={styles.label}>Ikä *</label>
                <input
                  type="number"
                  value={form.age}
                  onChange={(e) => updateField("age", Number(e.target.value))}
                  style={{ ...styles.input, width: "100px" }}
                  min={18}
                  required
                />
              </div>

            </div>
          )}

          {/* Vaihe 2: Asuminen */}
          {step === 2 && (
            <div style={styles.stepContent}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Miksi olisit hyvä koti juuri tälle eläimelle?
                </label>
                <textarea
                  value={form.whyGoodHome}
                  onChange={(e) => updateField("whyGoodHome", e.target.value)}
                  style={styles.textarea}
                  rows={3}
                />
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Missä asut?</label>
                  <select
                    value={form.livingArea}
                    onChange={(e) =>
                      updateField(
                        "livingArea",
                        e.target.value as "city" | "suburb" | "rural"
                      )
                    }
                    style={styles.input}
                  >
                    <option value="city">Kaupungissa tai kuntakeskuksessa</option>
                    <option value="suburb">Esikaupunkialueella</option>
                    <option value="rural">Maaseudulla</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Paikkakunta</label>
                  <input
                    type="text"
                    value={form.municipality}
                    onChange={(e) => updateField("municipality", e.target.value)}
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Asumismuoto</label>
                  <select
                    value={form.housingType}
                    onChange={(e) =>
                      updateField(
                        "housingType",
                        e.target.value as "apartment" | "rowhouse" | "house" | "farm"
                      )
                    }
                    style={styles.input}
                  >
                    <option value="apartment">Kerrostalo</option>
                    <option value="rowhouse">Rivitalo</option>
                    <option value="house">Omakotitalo</option>
                    <option value="farm">Maatila</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Asunnon koko m²</label>
                  <input
                    type="number"
                    value={form.apartmentSize || ""}
                    onChange={(e) =>
                      updateField("apartmentSize", Number(e.target.value))
                    }
                    style={styles.input}
                    min={0}
                  />
                </div>
              </div>

              <div style={styles.row}>
                <div style={styles.field}>
                  <label style={styles.label}>Onko asunnossasi parveketta?</label>
                  <select
                    value={form.hasBalcony ? "yes" : "no"}
                    onChange={(e) =>
                      updateField("hasBalcony", e.target.value === "yes")
                    }
                    style={styles.input}
                  >
                    <option value="no">Ei</option>
                    <option value="yes">Kyllä</option>
                  </select>
                </div>
                <div style={styles.field}>
                  <label style={styles.label}>Talouden kokoonpano</label>
                  <select
                    value={form.householdType}
                    onChange={(e) =>
                      updateField(
                        "householdType",
                        e.target.value as "alone" | "partner" | "family" | "shared"
                      )
                    }
                    style={styles.input}
                  >
                    <option value="alone">Asun yksin</option>
                    <option value="partner">Asun puolison kanssa</option>
                    <option value="family">Perhe</option>
                    <option value="shared">Kimppakämppä</option>
                  </select>
                </div>
              </div>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.hasChildren}
                  onChange={(e) => {
                    updateField("hasChildren", e.target.checked);
                    if (!e.target.checked) updateField("childrenAges", "");
                  }}
                />
                Onko taloudessa lapsia?
              </label>

              {form.hasChildren && (
                <div style={styles.field}>
                  <label style={styles.label}>Anna heidän ikänsä:</label>
                  <input
                    type="text"
                    value={form.childrenAges}
                    onChange={(e) => updateField("childrenAges", e.target.value)}
                    style={styles.input}
                    placeholder="esim. 5v, 8v"
                  />
                </div>
              )}

              <div style={styles.field}>
                <label style={styles.label}>
                  Onko taloudessa muita lemmikkejä? Jos on, mitä (ml. rotu, ikä,
                  sukupuoli)?
                </label>
                <textarea
                  value={form.otherPets}
                  onChange={(e) => updateField("otherPets", e.target.value)}
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.petsNeutered}
                  onChange={(e) => updateField("petsNeutered", e.target.checked)}
                />
                Lemmikkini ovat leikattuja / steriloituja.
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.petsVaccinated}
                  onChange={(e) => updateField("petsVaccinated", e.target.checked)}
                />
                Lemmikkieni rokotukset ovat voimassa.
              </label>
            </div>
          )}

          {/* Vaihe 3: Elämäntilanne */}
          {step === 3 && (
            <div style={styles.stepContent}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Kerro elämäntilanteestasi: oletko opiskelija, töissä,
                  eläkkeellä; onko tiedossa muuttoa, perheen perustamista, isoja
                  remontteja jne.
                </label>
                <textarea
                  value={form.lifeSituation}
                  onChange={(e) => updateField("lifeSituation", e.target.value)}
                  style={styles.textarea}
                  rows={3}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Kerro eläinkokemuksestasi.</label>
                <textarea
                  value={form.animalExperience}
                  onChange={(e) =>
                    updateField("animalExperience", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Mistä ja miten olet hankkinut tietoa eläinten tarpeista ja
                  hoidosta?
                </label>
                <textarea
                  value={form.knowledgeSource}
                  onChange={(e) =>
                    updateField("knowledgeSource", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Millaisen elinympäristön tarjoat eläimelle?
                </label>
                <textarea
                  value={form.livingEnvironment}
                  onChange={(e) =>
                    updateField("livingEnvironment", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Kuinka paljon aikaa sinulla on käytettävissä eläimen hoitoon?
                </label>
                <textarea
                  value={form.timeAvailable}
                  onChange={(e) => updateField("timeAvailable", e.target.value)}
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Pystytkö huolehtimaan taloudellisesti eläimestä koko sen
                  eliniän ajan - myös siinä tapauksessa, että eläin sairastuu?
                  Perustele myös vastauksesi.
                </label>
                <textarea
                  value={form.financialResponsibility}
                  onChange={(e) =>
                    updateField("financialResponsibility", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Mitä toivot eläimeltä ja sen kanssa elämiseltä? Miltä arkesi
                  eläimen kanssa näyttää?
                </label>
                <textarea
                  value={form.expectations}
                  onChange={(e) => updateField("expectations", e.target.value)}
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Kuka taloudessasi on vastuussa eläimen hoidosta?
                </label>
                <input
                  type="text"
                  value={form.responsiblePerson}
                  onChange={(e) =>
                    updateField("responsiblePerson", e.target.value)
                  }
                  style={styles.input}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Miten eläimen hoidosta huolehditaan, jos vastuuhenkilö on
                  estynyt (esim. lomamatkat, sairastumistapaukset)?
                </label>
                <textarea
                  value={form.backupPlan}
                  onChange={(e) => updateField("backupPlan", e.target.value)}
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Miten toimit, jos eläimen käyttäytymisessä tai terveydentilassa
                  ilmenee haasteita?
                </label>
                <textarea
                  value={form.challengeHandling}
                  onChange={(e) =>
                    updateField("challengeHandling", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>
                  Millaisessa tilanteessa olisit valmis luopumaan eläimestä?
                </label>
                <textarea
                  value={form.givingUpConditions}
                  onChange={(e) =>
                    updateField("givingUpConditions", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>

              <div style={styles.field}>
                <label style={styles.label}>Lisätietoja:</label>
                <textarea
                  value={form.additionalInfo}
                  onChange={(e) =>
                    updateField("additionalInfo", e.target.value)
                  }
                  style={styles.textarea}
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Vaihe 4: Vahvistus */}
          {step === 4 && (
            <div style={styles.stepContent}>
              <p style={styles.info}>
                Lomakkeen tietoja säilytetään vuoden ajan. Voit milloin tahansa
                pyytää HESYä poistamaan tietosi lähettämällä viestin osoitteeseen
                hesy@hesy.fi.
              </p>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.dataRetentionConsent}
                  onChange={(e) =>
                    updateField("dataRetentionConsent", e.target.checked)
                  }
                />
                Selvä!
              </label>

              <p style={styles.info}>
                Olen lukenut sivun{" "}
                <a href="/animals/info" target="_blank" rel="noopener">
                  Tietoa eläimen hankinnasta
                </a>{" "}
                sekä tutustunut{" "}
                <a href="/animals/contract" target="_blank" rel="noopener">
                  HESYn sopimusehtoihin
                </a>
                .
              </p>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={form.termsRead}
                  onChange={(e) => updateField("termsRead", e.target.checked)}
                />
                Luettu!
              </label>

              <div style={styles.summary}>
                <h3 style={styles.summaryTitle}>Yhteenveto</h3>
                <p>
                  <strong>Hakija:</strong> {form.firstName} {form.lastName}
                </p>
                <p>
                  <strong>Eläin:</strong> {form.animalName}
                </p>
                <p>
                  <strong>Sähköposti:</strong> {form.email}
                </p>
              </div>
            </div>
          )}

          {/* Napit */}
          <div style={styles.buttons}>
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                style={styles.prevButton}
              >
                Edellinen
              </button>
            )}
            {step < totalSteps && (
              <button
                type="button"
                onClick={nextStep}
                style={styles.nextButton}
              >
                Seuraava
              </button>
            )}
            {step === totalSteps && (
              <button
                type="submit"
                style={styles.submitButton}
                disabled={submitting}
              >
                {submitting ? "Lähetetään..." : "Lähetä hakemus"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    maxWidth: "700px",
    width: "100%",
    maxHeight: "90vh",
    overflow: "auto",
    position: "relative",
    padding: "32px",
  },
  closeButton: {
    position: "absolute",
    top: "16px",
    right: "16px",
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: "#666",
  },
  title: {
    fontSize: "24px",
    color: "#FDB913",
    marginBottom: "16px",
    fontWeight: "bold",
  },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  step: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: "#e0e0e0",
    color: "#666",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "bold",
  },
  stepActive: {
    backgroundColor: "#FDB913",
    color: "#1a1a1a",
  },
  stepComplete: {
    backgroundColor: "#4caf50",
    color: "#fff",
  },
  stepLabel: {
    textAlign: "center",
    color: "#666",
    marginBottom: "24px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  stepContent: {
    minHeight: "300px",
  },
  info: {
    backgroundColor: "#FFF4D9",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
    fontSize: "14px",
    color: "#1a1a1a",
  },
  row: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap",
  },
  field: {
    flex: "1 1 200px",
    marginBottom: "16px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#333",
    marginBottom: "4px",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    boxSizing: "border-box",
    resize: "vertical",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "flex-start",
    gap: "8px",
    fontSize: "14px",
    color: "#333",
    marginBottom: "16px",
    cursor: "pointer",
  },
  error: {
    backgroundColor: "#ffebee",
    color: "#c62828",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "16px",
  },
  summary: {
    backgroundColor: "#f5f5f5",
    padding: "16px",
    borderRadius: "8px",
    marginTop: "16px",
  },
  summaryTitle: {
    margin: "0 0 12px",
    fontSize: "16px",
    color: "#333",
  },
  buttons: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "24px",
    gap: "12px",
  },
  prevButton: {
    padding: "12px 24px",
    backgroundColor: "#f5f5f5",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  nextButton: {
    padding: "12px 24px",
    backgroundColor: "#FDB913",
    color: "#1a1a1a",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "auto",
  },
  submitButton: {
    padding: "12px 24px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "auto",
  },
};
