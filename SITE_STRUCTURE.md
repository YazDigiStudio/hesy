# HESY Website Structure Plan

Based on current hesy.fi website, reorganized for new architecture.

## Main Navigation

### 1. Kotia etsivät eläimet (Animals Seeking Homes) 🔥 FIREBASE
- **Kissat** (Cats) - Dynamic animal listings from database
- **Koirat** (Dogs) - Dynamic animal listings from database
- **Muut eläimet** (Other Animals) - Dynamic animal listings from database
- Tietoa eläimen hankinnasta (Info on Acquiring Animals) - Static page
- Sopimusehdot (Contract Terms) - Static page
- Sijoitusmaksut (Placement Fees) - Static page
- Pääkaupunkiseudun Löytöeläimet (Found Animals) - Static page

### 2. Näin autat (How You Can Help)

**Rahalahjoitukset (Monetary Donations)**
- Verkkokauppa (Online Shop) → Link to Shopify
- MobilePay - Static page with instructions
- Tekstiviestilahjoitus (SMS Donations) - Static page
- Kuukausilahjoitus (Monthly Giving) - Static page or payment form
- Tilisiirto (Bank Transfer) - Static page with account details

**Other Support**
- Tavaralahjoitukset (Goods Donations) - Static page
- Tavaratonkka (Thrift Store) - Static page with info/link
- Testamentit (Bequests) - Static page
- Vapaaehtoistyö (Volunteering) - Static page with form or email
- **Liity jäseneksi** (Join as Member) 🔥 FIREBASE - Application with payment

### 3. Hesy (Organization)

**Toiminta (Operations)**
- Yleistä (General Info) - Static page
- Säännöt (Rules) - Static page
- Vuosikertomukset (Annual Reports) - Static page with PDF downloads
- Jäsenyhdistykset (Member Associations) - Static page
- Yhteistyö (Collaboration) - Static page
- UKK (FAQs) - Static page

**Ihmiset (People)**
- Henkilökunta (Staff) - Static page
- Hallitus (Board) - Static page

**Paikat (Locations)**
- HESY-keskus (HESY Center) - Static page
- HESY-Puoti (Shop) - Static page
- HESY-areena (Arena) - Static page
- Hautausmaa (Cemetery) - Static page
- Viikin löytöeläintalo (Viik Lost Animal House) - Static page

**Muut (Other)**
- Eläinsuojelun Topelius -palkinto (Award) - Static page
- Hesy-lehti (Magazine) - Static page
- Esitteet (Brochures) - Static page with PDF downloads
- Yhteistyökumppanit (Partners) - Static page
- Historia (History) - Static page
- Rekisteriseloste (Privacy Notice) - Static page

### 4. Ajankohtaista (Current Events) 📝 DECAP CMS
- Tiedotteet (Press Releases) - Blog posts
- Tapahtumat (Events) - Blog posts or event listings
- Lausunnot (Statements) - Blog posts
- Blogi (Blog) - Blog posts
- Tilaa HESYn uutiskirje (Newsletter Signup) - Form

### 5. Yhteystiedot (Contact Info)
- Contact page - Static page with contact form

### 6. Language Switcher
- FI / EN / SV

---

## Footer

**Organization Info**
- Name: Helsingin eläinsuojeluyhdistys HESY ry
- Business ID: 0201239-8

**Contact Details**
- Phone: 09 5420 0100
- Hours: ma-pe klo 09-16
- Email: hesy@hesy.fi
- Address: Muonamiehentie 7, 00390 Helsinki

**Opening Hours**
- HESY-puoti: ti-pe klo 11-19, la klo 10-16
- Kissatilat: ti ja to klo 16-19

**Social Media**
- Facebook
- Instagram
- LinkedIn
- TikTok
- YouTube

**Footer Links**
- Tilaa uutiskirje (Newsletter)
- Tilaus- ja toimitusehdot (Terms)
- Rekisteriseloste (Privacy)

---

## Content Distribution

### Firebase (Real-time, Frequent Updates)

**Animals**
- Cat listings (with photos, descriptions, status)
- Dog listings (with photos, descriptions, status)
- Other animal listings (with photos, descriptions, status)

**Applications**
- Membership applications (with payment processing)
- Adoption applications (user authentication required)

**Users**
- User accounts (authentication)
- Email verification

### Decap CMS (Static, Occasional Updates)

**Blog/News**
- Press releases
- Events
- Statements
- Blog posts

**Static Pages (50+ pages)**
- All informational pages listed above
- About organization
- Services and fees
- How to help
- Location information
- FAQs
- Legal pages

**Site Settings**
- Navigation structure
- Footer content
- Contact information
- Opening hours

---

## Special Features

### Payment Integration Required
- Membership fee payment (before application submitted)
- Possible donation payment forms

### Forms
- Contact form
- Newsletter signup
- Volunteer application (or email link)

### External Links
- Verkkokauppa → Shopify store
- Social media profiles

---

## Multi-Language Support

All content available in three languages:
- **Finnish (FI)** - Primary language
- **English (EN)** - Secondary
- **Swedish (SV)** - Secondary

**Dynamic content** (animals, applications):
- Language selection affects UI text
- Animal descriptions can be multilingual or Finnish only (to be decided)

**Static content** (pages, blog):
- Full translations managed in Decap CMS
- Separate content files per language

---

## Page Count Estimate

**Static pages**: ~50 pages
- Organization info: ~15 pages
- How to help: ~10 pages
- Animals info (static): ~5 pages
- Locations: ~5 pages
- Contact & legal: ~5 pages
- Other: ~10 pages

**× 3 languages = ~150 pages total**

**Blog/News**: Unlimited, created ongoing

**Dynamic pages**: 3 animal listing pages (cats, dogs, other)

---

## Summary

**Firebase handles:**
- Animal listings (3 pages, updated 10+ times/day)
- User accounts and authentication
- Membership applications with payment
- Adoption applications

**Decap CMS handles:**
- 50+ static pages × 3 languages
- Blog and news posts
- Site configuration

**External:**
- Shop → Shopify
- Payments → Stripe/PayPal (to be chosen)

This structure keeps the site maintainable while allowing frequent animal updates without constant rebuilds.
