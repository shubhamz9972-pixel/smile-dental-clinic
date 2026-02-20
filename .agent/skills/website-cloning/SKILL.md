---
name: website-cloning
description: Clones and replicates existing websites for new businesses. Use when the user mentions clone, replicate, copy website, website cloning, make a similar site, or rebuild a site for a different business. Analyzes reference website structure, design, and content, then generates a customized version for a new client.
---

# Website Cloning Skill

Scrape a reference website, analyze its structure/design/content, and generate a customized replica for a new business (optimized for dental clinics but works for any industry).

## When to Use This Skill

- User says "clone this website for [business]"
- User says "make a similar site like [URL]"
- User says "replicate this design for my client"
- User provides a website URL and wants a version for a different business
- User wants to build a website based on a competitor's site

## Prerequisites

```bash
python3 --version || python --version
```

---

## Workflow

When user provides a reference website URL and new business details, follow this checklist:

### Checklist

```
[ ] Step 1: Collect inputs (URL + new business details)
[ ] Step 2: Scrape the reference website
[ ] Step 3: Analyze the scraped content
[ ] Step 4: Generate design system (via UI/UX Pro Max)
[ ] Step 5: Build the new website
[ ] Step 6: Validate with pre-delivery checklist
```

---

### Step 1: Collect Inputs

Gather from the user:

| Required | Field | Example |
|----------|-------|---------|
| ✅ | Reference website URL | `https://example-dental.com` |
| ✅ | New business name | `Smile Dental Clinic` |
| ✅ | Phone number | `+91 98765 43210` |
| ✅ | Address | `123 Main St, Ludhiana, Punjab` |
| ⬚ | Services (or use defaults) | Cleaning, Root Canal, Implants |
| ⬚ | Doctor name(s) | Dr. Amanpreet Singh |
| ⬚ | Email | `info@smiledental.com` |
| ⬚ | Working hours | Mon-Sat 9AM-7PM |
| ⬚ | Tagline | "Your Smile, Our Priority" |
| ⬚ | Logo image path | `/assets/logo.png` |

If optional fields are missing, use sensible defaults from the dental industry.

### Step 2: Scrape the Reference Website

Use the `read_url_content` tool or the Apify `rag-web-browser` to fetch the reference site:

```
# Option A: read_url_content tool (preferred for simple sites)
Use the read_url_content tool with the reference URL

# Option B: Apify rag-web-browser (for JS-heavy sites)
Use mcp_apify_apify-slash-rag-web-browser with the URL
```

Save the scraped markdown/HTML content for analysis.

### Step 3: Analyze the Scraped Content

Run the analysis script on the scraped content:

```bash
python3 skills/website-cloning/scripts/analyze_website.py --file <scraped_content_file>
```

Or pipe content directly:

```bash
echo "<scraped content>" | python3 skills/website-cloning/scripts/analyze_website.py --stdin
```

**Output:** A JSON report with:
- `sections` — detected page sections (hero, services, about, etc.)
- `colors` — extracted color palette
- `fonts` — detected font families
- `navigation` — menu structure
- `ctas` — call-to-action patterns
- `contact_patterns` — phone/email/address formats
- `content_structure` — heading hierarchy and content blocks

If the script is unavailable, manually analyze the scraped content by identifying:
- What sections does the page have? (hero, services, about, testimonials, contact, footer)
- What colors dominate? (background, text, accent, CTA button colors)
- What fonts are used? (check Google Fonts links or font-family declarations)
- What is the navigation layout? (sticky top, hamburger on mobile, etc.)
- What CTAs are present? ("Book Now", "Call Us", "Schedule Appointment")

### Step 4: Generate Design System

Use the **UI/UX Pro Max** skill to generate a design system based on the analysis:

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "<industry> <style_keywords>" --design-system -p "<Business Name>"
```

**For dental clinics:**
```bash
python3 skills/ui-ux-pro-max/scripts/search.py "dental clinic healthcare professional" --design-system -p "Smile Dental"
```

**Decision logic:**
- If the reference site has a **modern/clean** style → use `"dental clean minimal professional"`
- If the reference site has a **colorful/playful** style → use `"dental friendly colorful"`
- If the reference site has a **premium/luxury** style → use `"dental premium luxury elegant"`
- If the reference site has a **dark mode** → use `"dental dark mode professional"`

### Step 5: Build the New Website

Create the website files using the analysis + design system + new business details.

**File structure to generate:**

```
<project-dir>/
├── index.html          # Main page
├── css/
│   └── style.css       # All styles
├── js/
│   └── main.js         # Interactions (mobile menu, smooth scroll, etc.)
└── assets/             # Images, icons
```

**Section order** — match the reference site's section order. Common dental site sections:

1. **Navigation** — Logo + menu items + CTA button
2. **Hero** — Headline + tagline + CTA + hero image
3. **Services** — Grid/cards of dental services with icons
4. **About/Doctor** — Doctor photo + bio + qualifications
5. **Why Choose Us** — Differentiators (experience, technology, comfort)
6. **Testimonials** — Patient reviews (carousel or grid)
7. **Gallery** — Clinic interior photos (optional)
8. **Contact/Booking** — Form + map + phone + hours
9. **Footer** — Links + social media + copyright

**Implementation rules:**
- Use **vanilla HTML + CSS + JS** (no frameworks unless user specifies)
- Use **Google Fonts** from the design system
- Use **SVG icons** from Lucide or Heroicons (never emojis)
- Add **WhatsApp chat widget** (essential for Indian market)
- Include **click-to-call** on phone numbers
- Embed **Google Maps** iframe for location
- Make it **fully responsive** (mobile-first)
- Add **smooth scroll** and **subtle animations**
- Include proper **meta tags** for SEO (title, description, OG tags)
- Use `generate_image` tool for hero/banner images if needed

**Populate with new business data:**
- Replace all clinic names, addresses, phone numbers
- Replace doctor names and bios
- Replace service lists
- Update colors to match design system
- Update fonts to match design system

### Step 6: Pre-Delivery Validation

Before delivering, verify:

```
[ ] All placeholder text replaced with real business data
[ ] Phone numbers are click-to-call (<a href="tel:...">)
[ ] WhatsApp link uses correct number
[ ] Google Maps shows correct address
[ ] No lorem ipsum or placeholder images remain
[ ] Mobile responsive (test at 375px, 768px, 1024px)
[ ] All clickable elements have cursor-pointer
[ ] Hover states have smooth transitions (200-300ms)
[ ] Color contrast meets WCAG AA (4.5:1 minimum)
[ ] No emojis used as icons (use SVG)
[ ] Meta title and description are set
[ ] All images have alt text
[ ] Smooth scroll works on navigation links
```

---

## Quick Reference: Dental Industry Defaults

When user doesn't provide details, use these defaults:

**Default Services:**
- Teeth Cleaning & Polishing
- Root Canal Treatment
- Dental Implants
- Teeth Whitening
- Braces & Orthodontics
- Crowns & Bridges
- Tooth Extraction
- Cavity Filling
- Pediatric Dentistry
- Emergency Dental Care

**Default Working Hours:**
- Monday - Saturday: 9:00 AM - 7:00 PM
- Sunday: 10:00 AM - 2:00 PM (or Closed)

**Default Taglines:**
- "Your Smile, Our Priority"
- "Advanced Dental Care for the Whole Family"
- "Gentle Care, Beautiful Smiles"

**Default WhatsApp Message:**
- "Hi, I'd like to book a dental appointment."

---

## Resources

- [Clinic config template](resources/clinic-config-template.json) — JSON template for new clinic data
- [Sections reference](resources/sections-reference.md) — Detailed section descriptions
- [Example config](examples/example-config.json) — Sample filled-out config
