#!/usr/bin/env python3
"""
Website Analyzer — Extracts structure, colors, fonts, and content from scraped HTML/Markdown.

Usage:
    python3 analyze_website.py --file <path>    # Read from file
    echo "content" | python3 analyze_website.py --stdin   # Read from stdin
    python3 analyze_website.py --help
"""

import sys
import re
import json
import argparse
from collections import Counter


def extract_colors(content):
    """Extract hex and rgb colors from content."""
    hex_colors = re.findall(r'#(?:[0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', content)
    rgb_colors = re.findall(r'rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)', content)
    rgba_colors = re.findall(r'rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)', content)
    hsl_colors = re.findall(r'hsl\(\s*\d+\s*,\s*\d+%?\s*,\s*\d+%?\s*\)', content)

    # Count frequency, return most common
    all_colors = hex_colors + rgb_colors + rgba_colors + hsl_colors
    color_counts = Counter(c.lower() for c in all_colors)

    # Filter out common defaults
    defaults = {'#000', '#fff', '#000000', '#ffffff', '#333', '#333333', '#666', '#999'}
    filtered = {c: n for c, n in color_counts.items() if c not in defaults}

    return {
        "all_colors": [c for c, _ in color_counts.most_common(20)],
        "brand_colors": [c for c, _ in Counter(filtered).most_common(6)],
        "total_unique": len(set(all_colors))
    }


def extract_fonts(content):
    """Extract font families from content."""
    # Google Fonts links
    gfonts = re.findall(r'fonts\.googleapis\.com/css2?\?family=([^"&\s]+)', content)
    font_families_from_links = []
    for gf in gfonts:
        families = gf.replace('+', ' ').split('|')
        for f in families:
            name = f.split(':')[0].strip()
            if name:
                font_families_from_links.append(name)

    # font-family declarations
    ff_matches = re.findall(r'font-family\s*:\s*([^;}{]+)', content)
    font_families_from_css = []
    for ff in ff_matches:
        fonts = [f.strip().strip("'\"") for f in ff.split(',')]
        for f in fonts:
            if f and f.lower() not in ('serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'inherit'):
                font_families_from_css.append(f)

    all_fonts = list(dict.fromkeys(font_families_from_links + font_families_from_css))
    return {
        "google_fonts": font_families_from_links,
        "css_fonts": list(set(font_families_from_css)),
        "primary": all_fonts[0] if all_fonts else None,
        "secondary": all_fonts[1] if len(all_fonts) > 1 else None
    }


def detect_sections(content):
    """Detect page sections from content structure."""
    content_lower = content.lower()

    section_keywords = {
        "hero": ["hero", "banner", "jumbotron", "welcome", "main-banner"],
        "navigation": ["nav", "navbar", "menu", "header"],
        "services": ["service", "treatment", "procedure", "what we offer", "our services"],
        "about": ["about", "who we are", "our story", "our mission", "our clinic"],
        "doctors": ["doctor", "dentist", "our team", "meet our", "specialist", "staff"],
        "testimonials": ["testimonial", "review", "patient says", "what our patients", "feedback"],
        "gallery": ["gallery", "photos", "before and after", "our work", "portfolio"],
        "contact": ["contact", "get in touch", "reach us", "book appointment", "schedule"],
        "pricing": ["pricing", "price", "cost", "fee", "plan"],
        "faq": ["faq", "frequently asked", "questions"],
        "footer": ["footer", "copyright", "all rights reserved"],
        "cta": ["book now", "call now", "schedule", "appointment", "get started", "whatsapp"],
        "why_choose_us": ["why choose", "why us", "our advantage", "benefits"],
        "insurance": ["insurance", "payment", "accepted plans"],
        "hours": ["hours", "timing", "schedule", "open", "working hours"],
        "map": ["map", "location", "find us", "directions", "google map"]
    }

    detected = {}
    for section, keywords in section_keywords.items():
        matches = [kw for kw in keywords if kw in content_lower]
        if matches:
            detected[section] = {
                "found": True,
                "matched_keywords": matches,
                "confidence": min(len(matches) / len(keywords) * 2, 1.0)
            }

    return detected


def extract_headings(content):
    """Extract heading hierarchy from markdown or HTML."""
    # Markdown headings
    md_headings = re.findall(r'^(#{1,6})\s+(.+)$', content, re.MULTILINE)
    # HTML headings
    html_headings = re.findall(r'<h([1-6])[^>]*>([^<]+)</h[1-6]>', content, re.IGNORECASE)

    headings = []
    for prefix, text in md_headings:
        headings.append({"level": len(prefix), "text": text.strip()})
    for level, text in html_headings:
        headings.append({"level": int(level), "text": text.strip()})

    return headings


def extract_ctas(content):
    """Extract call-to-action buttons and links."""
    content_lower = content.lower()
    cta_patterns = [
        "book now", "book appointment", "schedule appointment", "call now",
        "call us", "contact us", "get started", "learn more", "sign up",
        "free consultation", "book online", "whatsapp", "chat with us",
        "request appointment", "visit us", "enquire now", "get in touch"
    ]

    found_ctas = []
    for cta in cta_patterns:
        if cta in content_lower:
            found_ctas.append(cta.title())

    return found_ctas


def extract_contact_info(content):
    """Extract phone numbers, emails, and addresses."""
    phones = re.findall(r'(?:\+91[\s-]?)?(?:\d[\s-]?){10}', content)
    emails = re.findall(r'[\w.+-]+@[\w-]+\.[\w.-]+', content)
    # Common address patterns (India)
    addresses = re.findall(r'\d+[,\s]+[\w\s]+(?:road|rd|street|st|nagar|colony|sector|block|market|chowk)[\w\s,.-]+\d{6}', content, re.IGNORECASE)

    return {
        "phones": list(set(phones[:5])),
        "emails": list(set(emails[:5])),
        "addresses": list(set(addresses[:3]))
    }


def extract_images(content):
    """Extract image references."""
    # Markdown images
    md_imgs = re.findall(r'!\[([^\]]*)\]\(([^)]+)\)', content)
    # HTML images
    html_imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\'][^>]*(?:alt=["\']([^"\']*)["\'])?', content, re.IGNORECASE)

    images = []
    for alt, src in md_imgs:
        images.append({"src": src, "alt": alt})
    for src, alt in html_imgs:
        images.append({"src": src, "alt": alt})

    return images[:20]


def extract_navigation(content):
    """Extract navigation menu items."""
    # Look for common nav patterns in markdown links
    nav_links = re.findall(r'\[([^\]]+)\]\(#[^\)]*\)', content)

    # Common dental nav items to detect
    common_nav = ["home", "about", "services", "doctors", "team", "gallery",
                  "testimonials", "contact", "blog", "faq", "pricing", "book"]
    content_lower = content.lower()

    detected_nav = [item.title() for item in common_nav if item in content_lower]

    return {
        "detected_links": nav_links[:10],
        "likely_menu_items": detected_nav
    }


def analyze(content):
    """Main analysis function."""
    return {
        "sections": detect_sections(content),
        "colors": extract_colors(content),
        "fonts": extract_fonts(content),
        "headings": extract_headings(content),
        "navigation": extract_navigation(content),
        "ctas": extract_ctas(content),
        "contact_info": extract_contact_info(content),
        "images": extract_images(content),
        "content_stats": {
            "total_length": len(content),
            "line_count": content.count('\n'),
            "word_count": len(content.split()),
            "has_forms": bool(re.search(r'<form|form|input|submit', content, re.IGNORECASE)),
            "has_map": bool(re.search(r'google\.com/maps|maps\.google|iframe.*map', content, re.IGNORECASE)),
            "has_video": bool(re.search(r'youtube|vimeo|video|<video', content, re.IGNORECASE))
        }
    }


def main():
    parser = argparse.ArgumentParser(
        description="Analyze a scraped website and extract structure, colors, fonts, and content."
    )
    parser.add_argument('--file', '-f', help='Path to scraped content file')
    parser.add_argument('--stdin', action='store_true', help='Read content from stdin')
    parser.add_argument('--pretty', action='store_true', default=True, help='Pretty-print JSON output')

    args = parser.parse_args()

    if args.stdin:
        content = sys.stdin.read()
    elif args.file:
        with open(args.file, 'r', encoding='utf-8', errors='ignore') as f:
            content = f.read()
    else:
        parser.print_help()
        sys.exit(1)

    if not content.strip():
        print(json.dumps({"error": "Empty content provided"}))
        sys.exit(1)

    result = analyze(content)

    if args.pretty:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print(json.dumps(result, ensure_ascii=False))


if __name__ == '__main__':
    main()
