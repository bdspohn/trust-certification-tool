import os
from notion_client import Client

# Prompt for Notion integration token
NOTION_TOKEN = os.environ.get('NOTION_TOKEN') or input('Enter your Notion integration token: ').strip()
notion = Client(auth=NOTION_TOKEN)

def get_page_id(section):
    return os.environ.get(f'NOTION_{section.upper()}_PAGE_ID') or input(f'Enter the Notion page ID for {section}: ').strip()

def text_block(text):
    return {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

def bulleted_list(items):
    return [{"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}} for item in items]

def heading(text, level=2):
    return {"object": "block", f"heading_{level}": {"rich_text": [{"type": "text", "text": {"content": text}}]}, "type": f"heading_{level}"}

# 1. Business Roadmap
roadmap_id = get_page_id('Roadmap')
roadmap_blocks = [
    heading("Business Roadmap", 2),
    text_block("A clear, milestone-based roadmap with target dates, owners, dependencies, and status."),
    text_block("Milestone | Owner | Target Date | Status | Dependencies | Notes\n---|---|---|---|---|---\nMVP Launch | Ben | 2024-09-01 | In Progress | Intake, Legal Review | Manual + web intake, test with FIs\nContent Engine Live | Ben/Neil | 2024-09-15 | Planned | MVP | SEO, FAQ, blog, articles\nFirst FI Partnership | Ben | 2024-10-01 | Planned | MVP | Target AZ banks, pilot program\nLegal Services Workflow | Neil | 2024-10-15 | Planned | MVP, ABS Integration | Deed drafting, recording, e-signature\nAutomation/AI Extraction | Dev Lead | 2024-12-01 | Planned | MVP | PDF/DOCX, LLM, mapping\nAPI Integrations | Dev Lead | 2025-02-01 | Planned | Automation | For banks, partners\nNational Expansion | Ben/Neil | 2025-06-01 | Planned | Legal, API | Multi-state legal compliance\nFortune 500 Partnerships | Ben | 2025-09-01 | Planned | National Expansion | Target large banks, insurers, etc.\nFull Legal Marketplace Live | Neil | 2025-12-01 | Planned | Legal Services | One-stop shop for trust transactions")
]
notion.blocks.children.append(roadmap_id, children=roadmap_blocks)

# 2. Pitch Deck Outline
deck_id = get_page_id('Decks & Presentations')
deck_blocks = [
    heading("Pitch Deck Outline", 2),
    *bulleted_list([
        "Cover Slide: Logo, tagline, your name/title, date",
        "The Problem: Trust transactions are slow, risky, and expensive for banks and consumers. Persona quotes: 'It took me weeks to get my trust certified!' — Homeowner",
        "Market Opportunity: $X trillion in trust assets, millions of transactions annually. Macro + micro stats, LTV, frequency",
        "The Solution: Trusto: The Stripe/Plaid for trust transactions. Diagram: Upload → AI extraction → Review → E-sign → Bank approval → Legal services",
        "How It Works: User flow with visuals. 'Frictionless, compliant, and integrated with legal services.'",
        "Why Now?: Regulatory tailwinds (AZ sandbox, ABS), Tech readiness (AI, e-signature, APIs)",
        "Business Model: SaaS + legal services overlay. Pricing tiers, referral/partner programs",
        "Go-to-Market: Launch in AZ, target private banks/estate planners. Content engine, partnerships, channel sales",
        "Traction & Roadmap: MVP, pilot partners, upcoming milestones (from roadmap)",
        "Team: Ben (Founder, legal/fintech), Neil (Law firm, ABS, compliance), Advisors, dev partners",
        "The Ask: Funding, partnerships, pilot customers",
        "Contact: Your info, website, QR code"
    ])
]
notion.blocks.children.append(deck_id, children=deck_blocks)

# 3. Neil's Feedback
feedback_id = get_page_id('Research & Feedback')
feedback_blocks = [
    heading("Neil’s Feedback — Actionable Recommendations", 2),
    heading("A. MVP Approach", 3),
    *bulleted_list([
        "Start with manual intake, web front-end, and spreadsheet backend.",
        "Validate demand before heavy tech investment.",
        "Action: Keep MVP lean, focus on user validation."
    ]),
    heading("B. Market & GTM", 3),
    *bulleted_list([
        "Target FIs, mid-market lenders, private banks.",
        "Build a content engine around trust FAQs and pain points.",
        "Action: Launch content marketing, prioritize AZ partnerships."
    ]),
    heading("C. Product Vision", 3),
    *bulleted_list([
        "Trust Certification Transformer (TCT): Automate extraction and population of bank-specific trust cert forms.",
        "Plaid for Trusts: Persistent, portable trust data layer.",
        "Action: Architect for SaaS + legal overlay, plan for API/third-party integrations."
    ]),
    heading("D. Legal Services Integration", 3),
    *bulleted_list([
        "Use Neil’s law firm as the legal services engine for all trust-related transactions.",
        "Action: Build legal workflow into product roadmap, ensure multi-state compliance."
    ]),
    heading("E. Brand & Positioning", 3),
    *bulleted_list([
        "Name should be unique, pronounceable, defensible.",
        "Use 'passport' or 'port' as a product line.",
        "Action: Revisit naming, focus on story and defensibility."
    ])
]
notion.blocks.children.append(feedback_id, children=feedback_blocks)

# 4. Templates
product_id = get_page_id('Product & Tech')
templates_blocks = [
    heading("Templates", 2),
    heading("Meeting Notes Template", 3),
    text_block("Date:\nAttendees:\nAgenda:\nKey Decisions:\nAction Items:\nNext Steps:"),
    heading("Decision Log Template", 3),
    text_block("Date:\nDecision:\nRationale:\nOwner:\nLinked Docs:"),
    heading("Research Intake Template", 3),
    text_block("Date:\nSource:\nSummary:\nRelevance:\nAction:")
]
notion.blocks.children.append(product_id, children=templates_blocks)

print("All content created and organized in Notion!") 