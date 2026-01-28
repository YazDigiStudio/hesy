# HESY Website – Technical Architecture Summary

## Background
The current HESY website is based on an outdated WordPress setup that includes member registration and an adoption/booking-like workflow. The site is no longer actively maintained, and there are concerns about security, scalability, and long-term sustainability.

The new requirement is a **modern, secure, and frequently updated website**, where animal information changes multiple times per day. WordPress is explicitly excluded from the new solution.

## Core Constraints
- Content (especially animal listings) is updated **many times per day**
- Updates must **not trigger site rebuilds or deployments**
- Website content should be **separate from the existing CRM system**, which serves multiple organizational units
- Membership applications and animal adoption applications must be secure and verifiable
- Data must ultimately be transferred to the existing CRM service

## High-Level Solution
The proposed solution is a **Firebase-based architecture** with a statically hosted frontend and a lightweight backend.

Key principle:
> *Editing content or submitting applications should never require redeploying the website.*

## Frontend
- **React + Vite**
- Deployed as a static site
- Hosted on **Firebase Hosting**
- No Git-based CMS for frequently changing content

## Authentication
- **Firebase Authentication**
- Required for:
  - Membership applications
  - Animal adoption applications
- Email verification enabled to reduce spam and invalid submissions
- Authentication ensures that all applications are tied to a real user account

## Data Storage
### Firestore (Primary Website Data)
Used as the website’s operational database:

- `users`
  - Profile information (name, address, phone, consents)
- `animals`
  - Animal listings (name, description, status, images, adoption conditions)
- `membershipApplications`
- `adoptionApplications`
  - References the authenticated user and the animal
  - Includes status fields (`pending`, `sent`, `confirmed`, `failed`)

### Cloud Storage
- Animal images and related media

## Backend Logic
### Cloud Functions (2nd generation)
Cloud Functions act as the secure backend layer:

- Validate submitted applications
- Enforce access control and business rules
- Automatically transfer data to the CRM service
- Handle retries and error states if CRM service is unavailable
- Store CRM record identifiers and sync status

**Important rule:**
CRM service APIs are never called directly from the browser.

## CRM Service Integration
- CRM remains the system of record for internal operations
- Website sends applications **one-way** to CRM via Cloud Functions
- Mapping layer converts website data to CRM-specific formats
- Each application uses a unique external ID to avoid duplicates

## Security & Privacy
- Firestore Security Rules restrict users to their own data
- Admin access managed via Firebase Custom Claims
- All personal data transfers are logged
- Consent timestamp and privacy policy version stored with each application
- HTTPS enforced by default via Firebase Hosting

## Benefits of This Architecture
- No WordPress, no plugins, no manual updates
- Content updates are instant and safe
- Strong reduction of attack surface
- Clear separation of responsibilities:
  - Website content and UX
  - Authentication and validation
  - CRM integration
- Scales well for high traffic and frequent updates

## Future Extensions
- Admin UI for staff to manage animal listings
- Role-based permissions (editor / admin)
- Automated email confirmations
- Analytics and monitoring

## Summary
This architecture provides HESY with a modern, secure, and maintainable platform designed specifically for **high-frequency content updates** and **sensitive personal data handling**, while keeping the existing CRM system intact and isolated from public exposure.