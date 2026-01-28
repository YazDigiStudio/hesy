# HESY Website - Development Guide

## Project Setup

This is the new HESY website built with React + Vite + TypeScript.

### Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Current Status

### ✅ Completed

- Project structure set up
- Mock animal data structure created
- Basic navigation component with language switching (FI/EN/SV)
- Footer component with organization info
- Animals listing page with filtering
- Responsive design foundations

### 🚧 In Development (Mock Mode)

- Animal data is currently mocked in `/src/data/mockAnimals.ts`
- Firebase integration pending (console.log placeholders)
- Images are placeholders (need actual animal photos)

### 📋 To Do

- Firebase setup (Firestore, Auth, Storage, Functions)
- User authentication flows
- Membership application form with payment
- Adoption application form
- Staff admin panel for animal management
- Decap CMS setup for static pages
- Blog/news section
- Static pages (About, Services, Contact, etc.)
- Multi-language content management
- Payment integration
- CRM service integration

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Navigation.tsx # Main navigation with language switcher
│   └── Footer.tsx     # Site footer
├── pages/            # Page components
│   └── AnimalsPage.tsx # Animal listings with filtering
├── types/            # TypeScript type definitions
│   └── animal.ts     # Animal data types
├── data/             # Mock data (temporary)
│   └── mockAnimals.ts # Example animal data
├── contexts/         # React contexts (to be added)
├── hooks/            # Custom React hooks (to be added)
├── utils/            # Utility functions (to be added)
└── assets/           # Static assets

public/
└── images/
    └── animals/      # Animal photos (placeholders for now)
```

## Mock Data Structure

See `/src/types/animal.ts` for the Animal type definition.

Example animal object:
```typescript
{
  id: 'cat-001',
  name: 'Viiru',
  species: 'cat',
  breed: 'Eurooppalainen kotikissa',
  age: 3,
  ageUnit: 'years',
  gender: 'male',
  size: 'medium',
  description: '...',
  temperament: ['rauhallinen', 'ystävällinen'],
  specialNeeds: 'Ei erityistarpeita',
  goodWith: { children: true, cats: true, dogs: false },
  status: 'available',
  images: ['/images/animals/viiru-1.jpg'],
  arrivalDate: '2025-01-15',
  adoptionFee: 60,
  language: 'fi'
}
```

## Languages

The site supports three languages:
- Finnish (fi) - Primary
- English (en)
- Swedish (sv)

Currently only UI text is translated. Animal descriptions are in Finnish only (can be multilingual later).

## Styling

Using inline styles with React.CSSProperties for type safety.
Global styles in App.css.

Colors:
- Primary green: `#2c5f2d`
- Dark green: `#1a3a1b`
- Light green: `#a8d5a8`

## Next Steps

1. Add Firebase configuration
2. Replace mock data with Firestore queries
3. Build authentication system
4. Create application forms
5. Set up Decap CMS for static content

## Notes

- This is a work in progress
- Mock data will be replaced with real Firebase data
- Images are placeholders (use animal photos from current site or new ones)
- Console logs indicate where Firebase operations will happen
