// Animal data types

export type AnimalSpecies = 'cat' | 'dog' | 'other';

export type AnimalStatus = 'available' | 'reserved' | 'adopted';

export type Animal = {
  id: string;
  name: string;
  species: AnimalSpecies;
  breed: string;
  age: number;
  ageUnit: 'years' | 'months';
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
  status: AnimalStatus;
  images: string[];
  arrivalDate: string;
  adoptionFee: number;
  language: 'fi' | 'en' | 'sv';
};

export type AnimalListFilters = {
  species?: AnimalSpecies;
  status?: AnimalStatus;
  goodWithChildren?: boolean;
  goodWithCats?: boolean;
  goodWithDogs?: boolean;
};
