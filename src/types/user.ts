// User profile and application types for Firestore data

import type { Timestamp } from "firebase/firestore";

export type MembershipType = "regular" | "lifetime";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export type MembershipStatus = "no" | "applied" | "yes";

// Consolidated user profile with membership data
export type UserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phone: string;
  address: string;
  membershipStatus: MembershipStatus;
  memberSince: Timestamp | null;
  // Membership-specific fields (only set when membershipStatus is "applied" or "yes")
  firstName?: string;
  lastName?: string;
  mobile?: string;
  dateOfBirth?: string;
  street?: string;
  zip?: string;
  city?: string;
  membershipType?: MembershipType;
  receiveMagazine?: boolean;
  receiveNewsletter?: boolean;
  approved?: boolean;
  syncedToCRM?: boolean;
  approvedAt?: Timestamp | null;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

export type MembershipFormData = {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  dateOfBirth: string;
  receiveMagazine: boolean;
  receiveNewsletter: boolean;
  street: string;
  zip: string;
  city: string;
  membershipType: MembershipType;
  consentToStore: boolean;
};

// Membership application (saved to membershipApplications collection)
export type MembershipApplication = {
  id: string;
  userId: string;
  status: ApplicationStatus;
  formData: MembershipFormData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// Adoption application form data
export type AdoptionFormData = {
  // Yhteystiedot
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;

  // Eläimen tiedot
  animalName: string;
  animalSpecies: "dog" | "cat" | "other";

  // Asuminen
  whyGoodHome: string;
  livingArea: "city" | "suburb" | "rural";
  municipality: string;
  housingType: "apartment" | "rowhouse" | "house" | "farm";
  apartmentSize: number;
  hasBalcony: boolean;
  householdType: "alone" | "partner" | "family" | "shared";
  hasChildren: boolean;
  childrenAges: string;
  otherPets: string;
  petsNeutered: boolean;
  petsVaccinated: boolean;

  // Elämäntilanne
  lifeSituation: string;
  animalExperience: string;
  knowledgeSource: string;
  livingEnvironment: string;
  timeAvailable: string;
  financialResponsibility: string;
  expectations: string;
  responsiblePerson: string;
  backupPlan: string;
  challengeHandling: string;
  givingUpConditions: string;
  additionalInfo: string;

  // Suostumukset
  dataRetentionConsent: boolean;
  termsRead: boolean;
};

// Adoption application (saved to adoptionApplications collection)
export type AdoptionApplication = {
  id: string;
  userId: string;
  status: ApplicationStatus;
  animalId: string;
  formData: AdoptionFormData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};

// For creating new profiles (without server timestamps)
export type CreateUserProfile = {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phone: string;
  address: string;
  isMember: boolean;
};

// For updating profiles
export type UpdateUserProfile = {
  displayName?: string;
  phone?: string;
  address?: string;
};
