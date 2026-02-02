// Hook to fetch animals from Firebase

import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Animal } from '../types/animal';

type UseAnimalsResult = {
  animals: Animal[];
  loading: boolean;
  error: string | null;
};

export function useAnimals(species?: 'cat' | 'dog' | 'other'): UseAnimalsResult {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAnimals() {
      try {
        setLoading(true);
        setError(null);

        const animalsRef = collection(db, 'animals');
        const q = species
          ? query(animalsRef, where('species', '==', species))
          : animalsRef;

        const querySnapshot = await getDocs(q);
        const fetchedAnimals: Animal[] = [];

        querySnapshot.forEach((doc) => {
          fetchedAnimals.push({ ...doc.data(), id: doc.id } as Animal);
        });

        setAnimals(fetchedAnimals);
      } catch (err) {
        console.error('Error fetching animals:', err);
        setError('Failed to load animals. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchAnimals();
  }, [species]);

  return { animals, loading, error };
}

// Helper hook to get available animals
export function useAvailableAnimals(
  species?: 'cat' | 'dog' | 'other'
): UseAnimalsResult {
  const { animals, loading, error } = useAnimals(species);

  const availableAnimals = animals.filter(
    (animal) => animal.status === 'available'
  );

  return { animals: availableAnimals, loading, error };
}
