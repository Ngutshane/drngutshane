# Dr B. Ngutshane Inc. - Product Requirements Document

## Project Description
I am a cardiothoracic surgeon in Southrand and Westrand, Gauteng, South Africa. I want to create a website that will provide information about the services I offer, improve visibility on the web, and improve patients ability to find me. I want them to be able to book appointments online and to enter their basic information and medical aid online decrease paper work. I want to have ability to receive reviews but also to filter out any negative feedback. I want to have a blog function where I can write interesting topics about cardiac and thoracic topics and also a separate blog about my personal adventures or thoughts on other topics. The website should be adopted to all types of screens. Keep the style simple and modern. Examples of websites to follow (gty.org).

## Product Requirements Document
PRODUCT REQUIREMENTS DOCUMENT: DR B. NGUTSHANE INC.

1. EXECUTIVE SUMMARY
The objective is to establish a professional digital presence for Dr B. Ngutshane, a cardiothoracic surgeon operating in Southrand and Westrand, Gauteng. The platform will serve as a hub for information, patient intake, and educational outreach. Key priorities include POPIA-compliant data handling, a simplified patient booking workflow, and a managed feedback loop to protect professional reputation.

2. PROJECT GOALS
- Improve discoverability in the Gauteng region for cardiothoracic services.
- Reduce physical paperwork through secure digital intake forms.
- Facilitate an efficient, manual-approval appointment booking system.
- Maintain a clear separation between professional medical content and personal blog posts via robust taxonomy.
- Ensure strict adherence to POPIA data sovereignty requirements using South African hosting (AWS Johannesburg).

3. TARGET AUDIENCE
- Primary: Adults (18+) requiring cardiothoracic evaluation or surgery.
- Secondary: Referring general practitioners and healthcare providers.
- Context: Patients represent a wide spectrum of health literacy; therefore, content must be clear, concise, and accessible.

4. FUNCTIONAL REQUIREMENTS
4.1 Appointment Booking System
- Public-facing calendar displaying real-time availability.
- Inquiry-based form where patients select a slot and provide basic medical aid/personal details.
- Manual approval workflow: Appointments remain "Pending" in the dashboard until the practice administrator confirms the slot.

4.2 Patient Intake & Data Privacy
- Encrypted digital forms for patient history and medical aid details.
- Data at rest must use AES-256 encryption.
- Data in transit must use TLS 1.2+ encryption.
- Hosting: AWS Johannesburg Region (Data Sovereignty).
- Clear, accessible Privacy Policy and ROA (Record of Processing Activities).

4.3 Review Management System (Pre-screening Logic)
- Post-visit prompt integrated into the secure patient portal.
- Logic:
  - If Positive Feedback: Redirect to Google Business Profile links.
  - If Negative Feedback: Redirect to an internal "Private Contact Form" sent directly to the practice administrator for resolution.

4.4 Blog Functionality
- Dual-blog architecture with distinct categorization (Professional vs. Personal).
- SEO taxonomy to ensure Google indexes professional content independently of lifestyle posts.
- Bi-weekly publishing capability.

4.5 Marketing & Integrations
- Integration with third-party marketing and analytics platforms.
- Responsive design: Fully functional across mobile, tablet, and desktop (GTY.org style aesthetic).

5. TECHNICAL SPECIFICATIONS
- Platform Architecture: CMS-based with custom dashboard for the practice administrator.
- Performance: Static-optimized pages for fast load times.
- Security: "Privacy by Design" implementation, daily automated backups, and WAF (Web Application Firewall) protection.
- Hosting: AWS (Johannesburg Region).

6. NON-FUNCTIONAL REQUIREMENTS
- Usability: Navigation must be intuitive for users with varying levels of health and digital literacy.
- Aesthetics: Simple, clean, modern, and trustworthy (Medical standard).
- Maintenance: Content updates handled by the practice administrator via custom dashboard.
- Scalability: System must support modest traffic growth without performance degradation.

7. PROJECT TIMELINE
- Phase 1: Planning & Branding (Design/Color Palette definition) - Weeks 1-2.
- Phase 2: Development & Infrastructure Setup (AWS) - Weeks 3-5.
- Phase 3: Content Integration & Privacy Compliance - Weeks 6-7.
- Phase 4: UAT (User Acceptance Testing) & Launch - Week 8.

8. BUDGET ALLOCATION
- Development Budget: R50,000 - R90,000 (inclusive of infrastructure setup and design).
- Operational Maintenance: R1,500 - R3,000 per month (includes server costs, security patching, and technical support).

9. RISK MANAGEMENT
- Data Sovereignty: Strict adherence to hosting within SA borders.
- Reputation: The review filtering system prevents public negative sentiment from damaging the Google Business Profile rating.
- Accessibility: Mobile-first design ensures accessibility for patients in lower-resource areas who rely primarily on mobile devices.
