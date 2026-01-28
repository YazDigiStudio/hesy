# HESY Website Project Plan

## What Goes Where

### Firebase (Real-time Database & User Accounts)

**Animal Listings**
- Staff adds new animals
- Staff updates animal information
- Staff changes status (available, reserved, adopted)
- Staff uploads animal photos
- Changes appear immediately on website
- No website rebuild needed

**User Accounts**
- People create accounts to apply for membership or adoption
- Email verification required
- Secure login system

**Applications**
- Membership applications submitted by public users
- Adoption applications submitted by public users
- Applications stored temporarily
- Automatically sent to CRM service
- Staff can view submitted applications

**Staff Admin Area**
- Password-protected section for HESY staff
- Manage animal listings
- View applications

### GitHub + Netlify (Static Website Content)

**All Website Pages (50 pages in 3 languages)**
- About HESY
- Services information
- How to adopt
- How to help
- Contact information
- FAQ pages
- Legal pages
- All other informational pages

**Blog and News**
- News articles
- Event announcements
- Updates from HESY

**Website Structure**
- Navigation menus
- Footer
- Site settings
- Design and styling

**How Updates Work**
- Staff edits content using admin interface
- Changes saved to version control
- Website rebuilds (takes 2-3 minutes)
- Updated pages go live
- Happens only when pages or blog posts change (weekly or monthly)

## How The Website Works

### For Public Visitors

**Browsing Animals**
1. Visitor goes to animals page
2. Website loads animal information from database
3. Shows current, up-to-date listings
4. Updates happen instantly when staff adds new animals

**Applying for Membership**
1. Visitor clicks "Become a Member"
2. Creates an account with email and password
3. Verifies email address
4. Fills out membership application form
5. Submits application
6. Application automatically sent to CRM service
7. Staff can see the application

**Applying to Adopt**
1. Visitor browses animals
2. Finds animal they want to adopt
3. Creates account (or logs in)
4. Fills out adoption application
5. Submits application
6. Application automatically sent to CRM service with animal information
7. Staff can see the application

### For HESY Staff

**Managing Animals**
1. Staff logs into admin area
2. Can add new animal (name, age, description, photo, status)
3. Can edit existing animals
4. Can change status (available → reserved → adopted)
5. Changes appear on website immediately
6. No waiting for website to rebuild

**Managing Website Content**
1. Staff logs into content management system
2. Can edit any of the 50 pages
3. Can add blog posts or news
4. Can update in all three languages
5. Saves changes
6. Website rebuilds with new content (2-3 minutes)

**Viewing Applications**
1. Staff logs into admin area
2. Can see list of membership applications
3. Can see list of adoption applications
4. Applications already sent to CRM service automatically
5. Read-only view for reference

## Data Flow

### When Staff Adds Animal
Staff → Admin Panel → Database → Website (instant)

### When User Applies
User → Application Form → Database → CRM Service
Staff can view in Admin Panel

### When Staff Updates Page Content
Staff → Content Editor → Version Control → Website Rebuild → Live Site (2-3 minutes)

### When Staff Publishes Blog Post
Staff → Content Editor → Version Control → Website Rebuild → Live Site (2-3 minutes)

## Why This Split

**Firebase for frequent changes**
- Animals updated 10+ times per day
- Users submitting applications anytime
- Needs to be instant
- No rebuilding entire website

**GitHub + Netlify for occasional changes**
- Website pages rarely change (monthly)
- Blog posts few times per week
- Version control keeps history of changes
- Rebuilding is acceptable for infrequent updates

## What Staff Needs to Learn

**Two systems:**
1. Admin panel for animals and viewing applications (simple forms)
2. Content editor for pages and blog posts (similar to WordPress editor)

**Different update speeds:**
- Animal changes: Instant
- Page/blog changes: 2-3 minutes

## Languages

All static content (pages, blog) managed in three languages:
- Finnish
- English
- Swedish

Animal listings and applications support all three languages.

## Security

- User accounts required for applications (reduces spam)
- Email verification required
- Staff admin area password-protected
- All data encrypted in transit
- CRM service never accessed directly from browser
- Server validates all applications before sending to CRM

## Summary

**What changes often → Firebase (instant updates)**
- Animals
- Applications

**What changes rarely → GitHub + Netlify (2-3 minute updates)**
- Website pages
- Blog posts
- Site structure

Staff uses two simple tools. Visitors see fast, up-to-date website.
