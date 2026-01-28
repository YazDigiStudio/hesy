// Animals listing page

import { useState } from 'react';
import { mockAnimals, getAnimalsBySpecies } from '../data/mockAnimals';
import type { Animal, AnimalSpecies } from '../types/animal';

type AnimalsPageProps = {
  language: 'fi' | 'en' | 'sv';
};

export function AnimalsPage({ language }: AnimalsPageProps) {
  const [selectedSpecies, setSelectedSpecies] = useState<AnimalSpecies | 'all'>('all');

  const content = {
    fi: {
      title: 'Kotia etsivät eläimet',
      subtitle: 'Kaikki eläimemme etsivät rakkautta ja pysyvää kotia',
      filterAll: 'Kaikki',
      filterCats: 'Kissat',
      filterDogs: 'Koirat',
      filterOther: 'Muut eläimet',
      available: 'Vapaana',
      reserved: 'Varattu',
      adopted: 'Adoptoitu',
      age: 'Ikä',
      years: 'vuotta',
      months: 'kuukautta',
      adoptionFee: 'Adoptoimaksu',
      goodWith: 'Sopii yhteen',
      children: 'Lasten',
      cats: 'Kissojen',
      dogs: 'Koirien',
      contactUs: 'Ota yhteyttä',
    },
    en: {
      title: 'Animals Seeking Homes',
      subtitle: 'All our animals are looking for love and a permanent home',
      filterAll: 'All',
      filterCats: 'Cats',
      filterDogs: 'Dogs',
      filterOther: 'Other Animals',
      available: 'Available',
      reserved: 'Reserved',
      adopted: 'Adopted',
      age: 'Age',
      years: 'years',
      months: 'months',
      adoptionFee: 'Adoption Fee',
      goodWith: 'Good with',
      children: 'Children',
      cats: 'Cats',
      dogs: 'Dogs',
      contactUs: 'Contact Us',
    },
    sv: {
      title: 'Djur söker hem',
      subtitle: 'Alla våra djur söker kärlek och ett permanent hem',
      filterAll: 'Alla',
      filterCats: 'Katter',
      filterDogs: 'Hundar',
      filterOther: 'Andra djur',
      available: 'Tillgänglig',
      reserved: 'Reserverad',
      adopted: 'Adopterad',
      age: 'Ålder',
      years: 'år',
      months: 'månader',
      adoptionFee: 'Adoptionsavgift',
      goodWith: 'Bra med',
      children: 'Barn',
      cats: 'Katter',
      dogs: 'Hundar',
      contactUs: 'Kontakta oss',
    },
  };

  const text = content[language];

  const filteredAnimals = selectedSpecies === 'all'
    ? mockAnimals
    : getAnimalsBySpecies(selectedSpecies);

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

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>{text.title}</h1>
        <p style={styles.subtitle}>{text.subtitle}</p>
      </div>

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
      <div style={styles.grid}>
        {filteredAnimals.map((animal) => (
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

              <button style={styles.contactButton}>
                {text.contactUs}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Mock Console Log */}
      <div style={styles.mockLog}>
        <h3>🔧 Development Mode - Mock Data</h3>
        <p>Animals are loaded from mock data. When Firebase is connected, this will be real-time data.</p>
        <p>Total animals: {filteredAnimals.length}</p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#FDB913',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: '#666',
  },
  filters: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  filterButton: {
    padding: '0.75rem 1.5rem',
    border: '2px solid #FDB913',
    backgroundColor: 'white',
    color: '#1a1a1a',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
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
    height: '250px',
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
    padding: '0.5rem 1rem',
    borderRadius: '20px',
    color: 'white',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  cardContent: {
    padding: '1.5rem',
  },
  animalName: {
    fontSize: '1.5rem',
    marginBottom: '0.25rem',
    color: '#FDB913',
    fontWeight: 'bold',
  },
  breed: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '1rem',
  },
  detail: {
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  description: {
    fontSize: '0.9rem',
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
    fontSize: '0.9rem',
  },
  tag: {
    backgroundColor: '#FFF4D9',
    color: '#1a1a1a',
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    border: '1px solid #FDB913',
  },
  fee: {
    fontSize: '1rem',
    color: '#FDB913',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  contactButton: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#FDB913',
    color: '#1a1a1a',
    border: '2px solid #FDB913',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  mockLog: {
    backgroundColor: '#fff3cd',
    border: '1px solid #ffc107',
    borderRadius: '8px',
    padding: '1.5rem',
    marginTop: '2rem',
    textAlign: 'center',
  },
};
