// Migration script to upload animals data to Firebase (images as public URLs)

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTTcip9PI6nXfrZByUWp9tHgF4Bm7OLBs",
  authDomain: "hesy-website.firebaseapp.com",
  projectId: "hesy-website",
  storageBucket: "hesy-website.firebasestorage.app",
  messagingSenderId: "271731789468",
  appId: "1:271731789468:web:4a097c76d246861c1aa759"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type Animal = {
  id: string;
  name: string;
  species: 'cat' | 'dog' | 'other';
  breed: string;
  age: number;
  ageUnit: 'months' | 'years';
  gender: 'male' | 'female';
  size: 'small' | 'medium' | 'large';
  description: string;
  temperament: string[];
  specialNeeds: string;
  goodWith: {
    children: boolean;
    cats: boolean;
    dogs: boolean;
  };
  status: 'available' | 'reserved' | 'adopted';
  images: string[];
  arrivalDate: string;
  adoptionFee: number;
  language: string;
};

// Images will be served from public folder, no conversion needed

const mockAnimals: Animal[] = [
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

async function migrateAnimals() {
  console.log('Starting animal migration to Firebase...');

  for (const animal of mockAnimals) {
    try {
      console.log(`\nProcessing ${animal.name} (${animal.id})...`);

      // Upload to Firestore with existing image paths
      const animalRef = doc(db, 'animals', animal.id);
      await setDoc(animalRef, animal);
      console.log(`  ✓ Uploaded ${animal.name} to Firestore`);
    } catch (error) {
      console.error(`  ✗ Error uploading ${animal.name}:`, error);
    }
  }

  console.log('\n✓ Migration completed!');
  process.exit(0);
}

migrateAnimals().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
