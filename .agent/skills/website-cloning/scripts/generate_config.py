#!/usr/bin/env python3
"""
Config Generator — Merges website analysis with new business details to create a site config.

Usage:
    python3 generate_config.py --analysis <analysis.json> --name "Clinic Name" --phone "+91 98765 43210" --address "123 Main St"
    python3 generate_config.py --help
"""

import sys
import json
import argparse
import os


DEFAULT_SERVICES = [
    {"name": "Teeth Cleaning & Polishing", "icon": "sparkles", "description": "Professional cleaning to remove plaque and tartar for a brighter, healthier smile."},
    {"name": "Root Canal Treatment", "icon": "heart-pulse", "description": "Pain-free root canal therapy to save damaged teeth using modern techniques."},
    {"name": "Dental Implants", "icon": "pin", "description": "Permanent tooth replacement with natural-looking implants for a confident smile."},
    {"name": "Teeth Whitening", "icon": "sun", "description": "Advanced whitening treatments to brighten your smile by several shades."},
    {"name": "Braces & Orthodontics", "icon": "align-center", "description": "Straighten teeth with traditional braces or clear aligners for all ages."},
    {"name": "Crowns & Bridges", "icon": "shield", "description": "Custom-made crowns and bridges to restore damaged or missing teeth."},
    {"name": "Tooth Extraction", "icon": "minus-circle", "description": "Safe and gentle tooth removal with minimal discomfort and quick recovery."},
    {"name": "Cavity Filling", "icon": "check-circle", "description": "Tooth-colored fillings that blend naturally and protect against further decay."},
    {"name": "Pediatric Dentistry", "icon": "baby", "description": "Gentle dental care specially designed for children in a friendly environment."},
    {"name": "Emergency Dental Care", "icon": "alert-triangle", "description": "Immediate care for dental emergencies including pain, trauma, and infections."}
]

DEFAULT_HOURS = {
    "monday": "9:00 AM - 7:00 PM",
    "tuesday": "9:00 AM - 7:00 PM",
    "wednesday": "9:00 AM - 7:00 PM",
    "thursday": "9:00 AM - 7:00 PM",
    "friday": "9:00 AM - 7:00 PM",
    "saturday": "9:00 AM - 7:00 PM",
    "sunday": "10:00 AM - 2:00 PM"
}

DEFAULT_TAGLINES = [
    "Your Smile, Our Priority",
    "Advanced Dental Care for the Whole Family",
    "Gentle Care, Beautiful Smiles"
]


def generate_config(analysis, args):
    """Generate a complete site config from analysis + user inputs."""

    # Extract design cues from analysis
    brand_colors = analysis.get("colors", {}).get("brand_colors", [])
    fonts = analysis.get("fonts", {})
    sections = analysis.get("sections", {})
    ctas = analysis.get("ctas", [])
    nav = analysis.get("navigation", {})

    # Determine section order from analysis
    section_priority = [
        "navigation", "hero", "services", "about", "doctors",
        "why_choose_us", "testimonials", "gallery", "pricing",
        "faq", "contact", "hours", "map", "footer"
    ]
    detected_sections = [s for s in section_priority if s in sections]
    if not detected_sections:
        detected_sections = ["navigation", "hero", "services", "about", "testimonials", "contact", "footer"]

    config = {
        "business": {
            "name": args.name,
            "tagline": args.tagline or DEFAULT_TAGLINES[0],
            "phone": args.phone,
            "email": args.email or f"info@{args.name.lower().replace(' ', '')}.com",
            "address": args.address,
            "whatsapp": args.phone.replace(' ', '').replace('-', '') if args.phone else None,
            "whatsapp_message": "Hi, I'd like to book a dental appointment.",
            "working_hours": DEFAULT_HOURS,
            "google_maps_embed": None
        },
        "doctors": [
            {
                "name": args.doctor or "Dr. " + args.name.split()[0],
                "title": "BDS, MDS",
                "specialization": "General & Cosmetic Dentistry",
                "experience": "10+ years",
                "bio": f"Leading dental professional with extensive experience in modern dentistry, dedicated to providing the best care at {args.name}."
            }
        ],
        "services": DEFAULT_SERVICES,
        "testimonials": [
            {"name": "Happy Patient", "rating": 5, "text": "Excellent dental care! The doctor was very gentle and professional. Highly recommended.", "date": "2025"},
            {"name": "Satisfied Customer", "rating": 5, "text": "Best dental clinic in the area. Modern equipment and very friendly staff.", "date": "2025"},
            {"name": "Regular Visitor", "rating": 5, "text": "I've been coming here for years. Always a great experience with amazing results.", "date": "2025"}
        ],
        "design": {
            "colors": {
                "primary": brand_colors[0] if len(brand_colors) > 0 else "#2563EB",
                "secondary": brand_colors[1] if len(brand_colors) > 1 else "#10B981",
                "accent": brand_colors[2] if len(brand_colors) > 2 else "#F59E0B",
                "background": "#FFFFFF",
                "text": "#1E293B",
                "muted": "#64748B"
            },
            "fonts": {
                "primary": fonts.get("primary", "Inter"),
                "secondary": fonts.get("secondary", "Poppins")
            },
            "style_keywords": "clean, professional, modern, trustworthy"
        },
        "sections": detected_sections,
        "ctas": ctas if ctas else ["Book Appointment", "Call Now"],
        "navigation": nav.get("likely_menu_items", ["Home", "Services", "About", "Contact"]),
        "seo": {
            "title": f"{args.name} - Best Dental Clinic in {args.address.split(',')[-2].strip() if ',' in args.address else 'Your City'}",
            "description": f"{args.name} offers professional dental care including teeth cleaning, root canal, implants, braces and more. Book your appointment today!",
            "keywords": f"dentist, dental clinic, {args.name}, teeth cleaning, root canal, dental implants"
        },
        "source_analysis": {
            "reference_url": args.url or "N/A",
            "detected_sections_count": len(detected_sections),
            "colors_extracted": len(brand_colors),
            "fonts_detected": bool(fonts.get("primary"))
        }
    }

    return config


def main():
    parser = argparse.ArgumentParser(
        description="Generate a site config from website analysis and new business details."
    )
    parser.add_argument('--analysis', '-a', required=True, help='Path to analysis JSON file')
    parser.add_argument('--name', '-n', required=True, help='New business name')
    parser.add_argument('--phone', '-p', required=True, help='Phone number')
    parser.add_argument('--address', required=True, help='Business address')
    parser.add_argument('--email', '-e', help='Email address')
    parser.add_argument('--doctor', '-d', help='Doctor name')
    parser.add_argument('--tagline', '-t', help='Business tagline')
    parser.add_argument('--url', '-u', help='Reference URL (for record keeping)')
    parser.add_argument('--output', '-o', help='Output file path (default: stdout)')

    args = parser.parse_args()

    # Load analysis
    with open(args.analysis, 'r', encoding='utf-8') as f:
        analysis = json.load(f)

    config = generate_config(analysis, args)

    output = json.dumps(config, indent=2, ensure_ascii=False)

    if args.output:
        with open(args.output, 'w', encoding='utf-8') as f:
            f.write(output)
        print(f"Config written to {args.output}")
    else:
        print(output)


if __name__ == '__main__':
    main()
