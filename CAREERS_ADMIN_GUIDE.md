# ASN Creative Agency - Careers Page Admin Guide

## 📋 Overview

This guide explains how to manage the careers page for ASN Creative Agency, including adding new internship openings, updating content, and managing applications.

## 🚀 Quick Start

### 1. Adding New Internship Openings

To add a new internship position, edit the `src/config/internships.ts` file:

```typescript
{
  id: "unique-id",
  title: "Internship Title",
  titleHindi: "हिंदी में शीर्षक",
  responsibilities: [
    "Responsibility 1",
    "Responsibility 2"
  ],
  responsibilitiesHindi: [
    "जिम्मेदारी 1",
    "जिम्मेदारी 2"
  ],
  requirements: [
    "Requirement 1",
    "Requirement 2"
  ],
  requirementsHindi: [
    "आवश्यकता 1",
    "आवश्यकता 2"
  ],
  duration: "3-6 months",
  durationHindi: "3-6 महीने",
  location: "Hyderabad, India",
  locationHindi: "हैदराबाद, भारत",
  type: "hybrid", // "remote", "hybrid", or "onsite"
  isActive: true,
  postedDate: "2025-01-27"
}
```

### 2. Updating Existing Openings

To update an existing internship:

```typescript
import { updateInternship } from '@/config/internships';

// Update specific fields
updateInternship("web-dev", {
  isActive: false, // Deactivate
  requirements: ["Updated requirement 1", "Updated requirement 2"]
});
```

### 3. Managing Application Status

The application form currently sends a success message. To integrate with real systems:

#### Option A: Email Integration
Update the form submission in `src/pages/Careers.tsx`:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // Send to your email service
  const response = await fetch('/api/submit-application', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
  
  if (response.ok) {
    setShowSuccess(true);
  }
};
```

#### Option B: Google Forms Integration
Replace the form with a Google Forms embed:

```tsx
<iframe 
  src="YOUR_GOOGLE_FORM_URL/viewform?embedded=true"
  width="100%"
  height="800px"
  frameBorder="0"
  marginHeight={0}
  marginWidth={0}
>
  Loading…
</iframe>
```

#### Option C: Airtable Integration
Use Airtable as a simple CMS:

```typescript
const AIRTABLE_API_KEY = 'your_api_key';
const AIRTABLE_BASE_ID = 'your_base_id';
const AIRTABLE_TABLE_NAME = 'Applications';

const submitToAirtable = async (formData) => {
  const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${AIRTABLE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      records: [{
        fields: {
          'Full Name': formData.fullName,
          'Email': formData.email,
          'Phone': formData.phone,
          'Role': formData.selectedRole,
          'Cover Letter': formData.coverLetter,
          'Status': 'New'
        }
      }]
    })
  });
  
  return response.ok;
};
```

## 🎨 Content Management

### 1. Updating Page Content

Main content is in `src/pages/Careers.tsx`. Key sections to customize:

- **Hero Section**: Update headline and subheadline
- **About Section**: Modify company description and culture points
- **Benefits**: Add/remove benefits and perks
- **Testimonials**: Update intern testimonials
- **FAQs**: Modify frequently asked questions

### 2. Language Support

The page supports both English and Hindi. To add new languages:

1. Add language prop to the component
2. Create language-specific content arrays
3. Update the language toggle logic

### 3. Styling and Branding

Customize the appearance by modifying:

- **Colors**: Update Tailwind CSS classes
- **Typography**: Modify the `asn-headline` and `asn-body` classes
- **Icons**: Replace Lucide React icons with custom ones
- **Layout**: Adjust grid layouts and spacing

## 📱 SEO Optimization

### 1. Meta Tags

Add proper meta tags to the page:

```tsx
import { Helmet } from 'react-helmet';

<Helmet>
  <title>Careers at ASN Creative Agency – Internships & Opportunities</title>
  <meta name="description" content="Join ASN Creative Agency as an intern. Experience real projects, creative freedom, and mentorship in a globally recognized agency." />
  <meta name="keywords" content="internship, careers, ASN Creative Agency, web development, digital marketing, UI/UX design" />
  <meta property="og:title" content="Careers at ASN Creative Agency" />
  <meta property="og:description" content="Join our team and kickstart your digital career" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://asncreativeagency.in/careers" />
</Helmet>
```

### 2. Structured Data

Add structured data for job postings:

```tsx
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "JobPosting",
  "title": "Web Development Intern",
  "description": "Join ASN Creative Agency as a Web Development Intern...",
  "datePosted": "2025-01-27",
  "employmentType": "INTERN",
  "jobLocation": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Hyderabad",
      "addressCountry": "IN"
    }
  }
}
</script>
```

## 🔧 Technical Features

### 1. Form Validation

The application form includes:

- Required field validation
- File upload (PDF/DOC)
- Email format validation
- Role selection dropdown

### 2. Responsive Design

The page is fully responsive with:

- Mobile-first approach
- Touch-friendly interactions
- Optimized layouts for all screen sizes

### 3. Accessibility

Built with accessibility in mind:

- Proper heading hierarchy (H1, H2, H3)
- Alt text for images
- High contrast colors
- Keyboard navigation support

## 📊 Analytics and Tracking

### 1. Application Tracking

Track application submissions:

```typescript
// Google Analytics 4
gtag('event', 'submit_application', {
  'event_category': 'careers',
  'event_label': selectedRole,
  'value': 1
});

// Custom tracking
const trackApplication = (role: string) => {
  // Send to your analytics service
  analytics.track('Application Submitted', {
    role,
    timestamp: new Date().toISOString()
  });
};
```

### 2. Page Performance

Monitor page performance:

- Core Web Vitals
- Page load times
- Form completion rates
- Bounce rates

## 🚀 Future Enhancements

### 1. Admin Dashboard

Create an admin interface for:

- Managing internship postings
- Reviewing applications
- Updating content
- Analytics dashboard

### 2. Application Management System

Build a full application tracking system:

- Application status tracking
- Interview scheduling
- Communication tools
- Document management

### 3. Integration Options

Connect with external services:

- LinkedIn Easy Apply
- Indeed Apply
- Workday
- Greenhouse

## 📞 Support

For technical support or questions about managing the careers page:

- **Developer**: Check the codebase documentation
- **Content Updates**: Modify the configuration files
- **New Features**: Create feature requests in the project repository

## 🔄 Maintenance

### Regular Tasks

1. **Weekly**: Review and respond to applications
2. **Monthly**: Update internship openings
3. **Quarterly**: Review and update page content
4. **Annually**: Evaluate and improve the application process

### Performance Monitoring

- Monitor page load times
- Track application conversion rates
- Review user feedback
- Update content based on analytics

---

*Last updated: January 27, 2025*
*Version: 1.0* 