// Animals listing page

import { useState } from 'react';
import { useAnimals } from '../hooks/useAnimals';
import { useAuth } from '../hooks/useAuth';
import type { Animal, AnimalSpecies } from '../types/animal';
import { useTranslations } from '../hooks/useTranslations';
import { AuthModal } from '../components/AuthModal';
import { AdoptionApplicationModal } from '../components/AdoptionApplicationModal';

type AnimalsPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function AnimalsPage({ language }: AnimalsPageProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'all'>('all');
  const [selectedAnimal, setSelectedAnimal] = useState<Animal | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showAdoptionModal, setShowAdoptionModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { user } = useAuth();

  const t = useTranslations(language);
  const text = t.animals;

  const { animals, loading, error } = useAnimals(
    selectedSpecies === 'all' ? undefined : selectedSpecies
  );

  const getStatusColor = (status: Animal['status']) => {
    switch (status) {
      case 'available': return '#4caf50';
      case 'reserved': return '#ff9800';
      case 'adopted': return '#9e9e9e';
    }
  };

  const getStatusText = (status: Animal['status']) => {
    switch (status) {
      case 'available': return text.available;
      case 'reserved': return text.reserved;
      case 'adopted': return text.adopted;
    }
  };

  const handleApplyClick = (animal: Animal) => {
    setSelectedAnimal(animal);
    if (!user) {
      setShowAuthModal(true);
    } else {
      setShowAdoptionModal(true);
    }
  };

  const handleAdoptionSuccess = () => {
    setShowAdoptionModal(false);
    setSelectedAnimal(null);
    setSuccessMessage("Hakemuksesi on lähetetty! Otamme sinuun yhteyttä.");
    // Poista viesti 5 sekunnin kuluttua
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{text.title}</h1>
        <p style={styles.subtitle}>{text.subtitle}</p>
      </div>

      {/* Error Message */}
      {error && (
        <div style={styles.errorBox}>
          <p style={styles.errorText}>{error}</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div style={styles.loadingBox}>
          <p style={styles.loadingText}>Ladataan eläimiä...</p>
        </div>
      )}

      {/* Filters */}
      <div style={styles.filters}>
        <button
          onClick={() => setSelectedSpecies('all')}
          style={{
            ...styles.filterButton,
            ...(selectedSpecies === 'all' ? styles.filterButtonActive : {}),
          }}
        >
          {text.filterAll}
        </button>
        <button
          onClick={() => setSelectedSpecies('cat')}
          style={{
            ...styles.filterButton,
            ...(selectedSpecies === 'cat' ? styles.filterButtonActive : {}),
          }}
        >
          {text.filterCats}
        </button>
        <button
          onClick={() => setSelectedSpecies('dog')}
          style={{
            ...styles.filterButton,
            ...(selectedSpecies === 'dog' ? styles.filterButtonActive : {}),
          }}
        >
          {text.filterDogs}
        </button>
        <button
          onClick={() => setSelectedSpecies('other')}
          style={{
            ...styles.filterButton,
            ...(selectedSpecies === 'other' ? styles.filterButtonActive : {}),
          }}
        >
          {text.filterOther}
        </button>
      </div>

      {/* Animal Grid */}
      {!loading && !error && (
        <div style={styles.grid}>
          {animals.length === 0 && (
            <div style={styles.noAnimals}>
              <p>Ei eläimiä valituilla hakuehdoilla.</p>
            </div>
          )}
          {animals.map((animal: Animal) => (
          <div key={animal.id} style={styles.card}>
            {/* Animal Image */}
            <div style={styles.imageContainer}>
              <img
                src={animal.images[0]}
                alt={animal.name}
                style={styles.animalImage}
              />
            </div>

            {/* Status Badge */}
            <div
              style={{
                ...styles.statusBadge,
                backgroundColor: getStatusColor(animal.status),
              }}
            >
              {getStatusText(animal.status)}
            </div>

            {/* Info */}
            <div style={styles.cardContent}>
              <h3 style={styles.animalName}>{animal.name}</h3>
              <p style={styles.breed}>{animal.breed}</p>

              <p style={styles.detail}>
                <strong>{text.age}:</strong> {animal.age} {animal.ageUnit === 'years' ? text.years : text.months}
              </p>

              <p style={styles.description}>
                {animal.description.length > 120
                  ? animal.description.substring(0, 120) + '...'
                  : animal.description}
              </p>

              <div style={styles.goodWith}>
                <strong>{text.goodWith}:</strong>
                {animal.goodWith.children && <span style={styles.tag}>{text.children}</span>}
                {animal.goodWith.cats && <span style={styles.tag}>{text.cats}</span>}
                {animal.goodWith.dogs && <span style={styles.tag}>{text.dogs}</span>}
              </div>

              <p style={styles.fee}>
                <strong>{text.adoptionFee}:</strong> {animal.adoptionFee}€
              </p>

              <button
                style={{
                  ...styles.contactButton,
                  ...(animal.status !== 'available' ? styles.buttonDisabled : {}),
                }}
                onClick={() => handleApplyClick(animal)}
                disabled={animal.status !== 'available'}
              >
                {animal.status === 'available' ? 'Tee hakemus' : getStatusText(animal.status)}
              </button>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* Onnistumisviesti */}
      {successMessage && (
        <div style={styles.successMessage}>
          {successMessage}
        </div>
      )}

      {/* Kirjautumismodaali */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          // Jos käyttäjä kirjautui, avaa adoptiolomake
          if (user && selectedAnimal) {
            setShowAdoptionModal(true);
          } else {
            setSelectedAnimal(null);
          }
        }}
        language={language}
      />

      {/* Adoptiohakemusmodaali */}
      {showAdoptionModal && selectedAnimal && (
        <AdoptionApplicationModal
          animal={selectedAnimal}
          onClose={() => {
            setShowAdoptionModal(false);
            setSelectedAnimal(null);
          }}
          onSuccess={handleAdoptionSuccess}
        />
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: 'clamp(1rem, 3vw, 2rem) clamp(0.75rem, 2vw, 1rem)',
  },
  header: {
    textAlign: 'center',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  title: {
    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
    color: '#FDB913',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    color: '#666',
  },
  filters: {
    display: 'flex',
    gap: 'clamp(0.5rem, 2vw, 1rem)',
    justifyContent: 'center',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: 'clamp(0.5rem, 1.5vw, 0.75rem) clamp(1rem, 2vw, 1.5rem)',
    border: '2px solid #FDB913',
    backgroundColor: 'white',
    color: '#1a1a1a',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
    transition: 'all 0.2s',
    fontWeight: '500',
  },
  filterButtonActive: {
    backgroundColor: '#FDB913',
    color: '#1a1a1a',
    fontWeight: 'bold',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
    gap: 'clamp(1rem, 3vw, 2rem)',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  card: {
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative',
    backgroundColor: 'white',
  },
  imageContainer: {
    height: 'clamp(200px, 30vw, 250px)',
    overflow: 'hidden',
    borderBottom: '1px solid #e0e0e0',
  },
  animalImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    padding: 'clamp(0.4rem, 1vw, 0.5rem) clamp(0.75rem, 1.5vw, 1rem)',
    borderRadius: '20px',
    color: 'white',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: 'clamp(1rem, 2vw, 1.5rem)',
  },
  animalName: {
    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    marginBottom: '0.25rem',
    color: '#FDB913',
    fontWeight: 'bold',
  },
  breed: {
    color: '#666',
    fontSize: 'clamp(0.875rem, 1.5vw, 0.95rem)',
    marginBottom: '1rem',
  },
  detail: {
    fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '1rem',
  },
  goodWith: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '1rem',
    fontSize: 'clamp(0.85rem, 1.5vw, 0.9rem)',
  },
  tag: {
    backgroundColor: '#FFF4D9',
    color: '#1a1a1a',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: 'clamp(0.75rem, 1.5vw, 0.85rem)',
    border: '1px solid #FDB913',
  },
  fee: {
    fontSize: 'clamp(0.95rem, 1.5vw, 1rem)',
    color: '#FDB913',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  contactButton: {
    width: '100%',
    padding: 'clamp(0.6rem, 1.5vw, 0.75rem)',
    backgroundColor: '#FDB913',
    color: '#1a1a1a',
    border: '2px solid #FDB913',
    borderRadius: '8px',
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  loadingBox: {
    textAlign: 'center',
    padding: 'clamp(2rem, 4vw, 3rem)',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  loadingText: {
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
    color: '#666',
  },
  errorBox: {
    backgroundColor: '#ffebee',
    border: '1px solid #f44336',
    borderRadius: '8px',
    padding: 'clamp(1rem, 2vw, 1.5rem)',
    marginBottom: 'clamp(1.5rem, 3vw, 2rem)',
  },
  errorText: {
    color: '#c62828',
    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
    margin: 0,
  },
  noAnimals: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: 'clamp(2rem, 4vw, 3rem)',
    color: '#666',
    fontSize: 'clamp(1rem, 2vw, 1.1rem)',
  },
  buttonDisabled: {
    backgroundColor: '#e0e0e0',
    borderColor: '#e0e0e0',
    color: '#999',
    cursor: 'not-allowed',
  },
  successMessage: {
    position: 'fixed',
    bottom: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '16px 32px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    zIndex: 1000,
    fontSize: '16px',
    fontWeight: 500,
  },
};
