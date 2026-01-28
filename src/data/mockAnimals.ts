// Mock animal data for development

import type { Animal } from '../types/animal';

export const mockAnimals: Animal[] = [
  {
    id: 'cat-001',
    name: 'Viiru',
    species: 'cat',
    breed: 'Eurooppalainen kotikissa',
    age: 3,
    ageUnit: 'years',
    gender: 'male',
    size: 'medium',
    description: 'Viiru on rauhallinen ja ystävällinen kissa, joka nauttii seurustelusta ja rapsuttelusta. Hän on tottunut sisäkissaksi ja sopii hyvin rauhalliseen kotiin.',
    temperament: ['rauhallinen', 'ystävällinen', 'seurallinen'],
    specialNeeds: 'Ei erityistarpeita',
    goodWith: {
      children: true,
      cats: true,
      dogs: false,
    },
    status: 'available',
    images: ['/images/animals/cats/cat2.jpg'],
    arrivalDate: '2025-01-15',
    adoptionFee: 60,
    language: 'fi',
  },
  {
    id: 'cat-002',
    name: 'Mirri',
    species: 'cat',
    breed: 'Sekarotuinen',
    age: 8,
    ageUnit: 'months',
    gender: 'female',
    size: 'small',
    description: 'Mirri on leikkisä ja energinen kissanpentu, joka rakastaa leikkimistä ja seikkailua. Hän tarvitsee aktiivisen kodin, jossa on aikaa ja intoa leikkiin.',
    temperament: ['leikkisä', 'energinen', 'utelias'],
    specialNeeds: 'Ei erityistarpeita',
    goodWith: {
      children: true,
      cats: true,
      dogs: true,
    },
    status: 'available',
    images: ['/images/animals/cats/cat3.jpg'],
    arrivalDate: '2025-01-20',
    adoptionFee: 60,
    language: 'fi',
  },
  {
    id: 'dog-001',
    name: 'Assa',
    species: 'dog',
    breed: 'Sekarotuinen',
    age: 5,
    ageUnit: 'years',
    gender: 'male',
    size: 'medium',
    description: 'Assa on rauhallinen ja hyväluontoinen koira, joka sopii hyvin ensimmäiseksi koiraksi. Hän osaa peruskäskyt ja kävelee hyvin talutushihnassa. Assa nauttii päivittäisistä kävelylenkeistä ja rauhallisesta seurustelusta.',
    temperament: ['rauhallinen', 'ystävällinen', 'tottelevainen'],
    specialNeeds: 'Tarvitsee säännöllistä liikuntaa päivittäin',
    goodWith: {
      children: true,
      cats: false,
      dogs: true,
    },
    status: 'available',
    images: ['/images/animals/dogs/Assa.png'],
    arrivalDate: '2025-01-10',
    adoptionFee: 150,
    language: 'fi',
  },
  {
    id: 'dog-002',
    name: 'Musti',
    species: 'dog',
    breed: 'Sekarotuinen',
    age: 3,
    ageUnit: 'years',
    gender: 'male',
    size: 'medium',
    description: 'Musti on energinen ja iloinen koira, joka rakastaa liikkumista ja leikkimistä. Hän tarvitsee aktiivisen kodin, jossa hänelle voidaan tarjota riittävästi liikuntaa ja tekemistä. Musti on ystävällinen ja rakastaa kaikkia ihmisiä.',
    temperament: ['energinen', 'ystävällinen', 'leikkisä'],
    specialNeeds: 'Tarvitsee paljon liikuntaa ja aktiviteetteja',
    goodWith: {
      children: true,
      cats: false,
      dogs: true,
    },
    status: 'available',
    images: ['/images/animals/dogs/dog2.jpg'],
    arrivalDate: '2025-01-12',
    adoptionFee: 150,
    language: 'fi',
  },
  {
    id: 'dog-003',
    name: 'Bella',
    species: 'dog',
    breed: 'Labradornoutaja',
    age: 2,
    ageUnit: 'years',
    gender: 'female',
    size: 'large',
    description: 'Bella on energinen ja iloinen labradori, joka rakastaa liikkumista ja uimista. Hän tarvitsee aktiivisen kodin, jossa hänelle voidaan tarjota riittävästi liikuntaa ja tekemistä. Bella on ystävällinen ja rakastaa kaikkia ihmisiä.',
    temperament: ['energinen', 'ystävällinen', 'leikkisä', 'älykäs'],
    specialNeeds: 'Tarvitsee paljon liikuntaa ja aktiviteetteja',
    goodWith: {
      children: true,
      cats: false,
      dogs: true,
    },
    status: 'reserved',
    images: ['/images/animals/dogs/dog3.jpg'],
    arrivalDate: '2024-12-05',
    adoptionFee: 150,
    language: 'fi',
  },
];

// Helper function to get animals by species
export const getAnimalsBySpecies = (
  species: 'cat' | 'dog' | 'other'
): Animal[] => {
  return mockAnimals.filter((animal) => animal.species === species);
};

// Helper function to get available animals
export const getAvailableAnimals = (): Animal[] => {
  return mockAnimals.filter((animal) => animal.status === 'available');
};

// Helper function to get animal by id
export const getAnimalById = (id: string): Animal | undefined => {
  return mockAnimals.find((animal) => animal.id === id);
};
