import os
import sys
from notion_client import Client

# Prompt for Notion integration token and parent page ID
NOTION_TOKEN = os.environ.get('NOTION_TOKEN') or input('Enter your Notion integration token: ').strip()
PARENT_PAGE_ID = os.environ.get('NOTION_PARENT_PAGE_ID') or input('Enter the parent page ID (where to create the workspace): ').strip()

notion = Client(auth=NOTION_TOKEN)

# Helper to create a page
def create_page(title, parent_id, children=None):
    return notion.pages.create(
        parent={"type": "page_id", "page_id": parent_id},
        properties={
            "title": [{"type": "text", "text": {"content": title}}]
        },
        children=children or []
    )

# Sample content blocks for each section
def text_block(text):
    return {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

def bulleted_list(items):
    return [{"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}} for item in items]

# 1. Roadmap
roadmap_blocks = [
    text_block("Track all major milestones, owners, dependencies, and status in one place."),
    text_block("Sample Table (create as a Notion database for full functionality):"),
    text_block("Milestone | Owner | Target Date | Status | Dependencies | Notes\n---|---|---|---|---|---\nMVP Launch | Ben | 2024-09-01 | In Progress | Intake, Legal Review | Manual + web intake\nContent Engine Live | Ben/Neil | 2024-09-15 | Planned | MVP | SEO, FAQ, blog, articles\nFirst FI Partnership | Ben | 2024-10-01 | Planned | MVP | Target AZ banks\nLegal Services Workflow | Neil | 2024-10-15 | Planned | MVP, ABS Integration | Deed drafting, recording\nAutomation/AI Extraction | Dev Lead | 2024-12-01 | Planned | MVP | PDF/DOCX, LLM, mapping\nAPI Integrations | Dev Lead | 2025-02-01 | Planned | Automation | For banks, partners\nNational Expansion | Ben/Neil | 2025-06-01 | Planned | Legal, API | Multi-state legal compliance")
]

# 2. Product & Tech
product_blocks = [
    text_block("Product Vision: To become the Stripe/Plaid for trust transactions—frictionless, compliant, and integrated with legal services."),
    text_block("Sample User Flow:"),
    *bulleted_list([
        "User uploads trust doc",
        "AI extracts fields",
        "User reviews autofilled form",
        "E-signature/notarization",
        "Bank approval",
        "Offer legal services (e.g., deed drafting)"
    ]),
    text_block("Add technical architecture diagrams, feature backlog, and API specs here.")
]

# 3. Legal & Compliance
legal_blocks = [
    text_block("Bonterms Templates (Privacy, Terms, etc.)"),
    text_block("State-by-State Requirements (create as a Notion table):"),
    text_block("State | Requirement Summary | Last Updated | Source/Link\n---|---|---|---\nAZ | Sandbox, ABS allowed | 2024-07-20 | [AZ Sandbox](#)\nCA | Probate 18100.5, notaries | 2024-07-20 | [CA Probate](#)")
]

# 4. Business & GTM
business_blocks = [
    text_block("Business Model: SaaS + Legal Services"),
    text_block("Go-to-Market Plan:"),
    *bulleted_list([
        "Launch in AZ (sandbox, ABS)",
        "Target private banks, estate planners",
        "Content marketing (SEO, FAQs, articles)",
        "Referral/partner programs",
        "Expand to other states"
    ]),
    text_block("Add pricing strategy, partnerships, and sales collateral here.")
]

# 5. Research & Feedback
research_blocks = [
    text_block("Market Research, User Interviews, Neil’s Feedback, Competitive Analysis, Decision Log."),
    text_block("Sample Table (create as a Notion database):"),
    text_block("Date | Source | Key Insight/Feedback | Action Taken/Next Step\n---|---|---|---\n2024-07-18 | Neil | Start with manual MVP, test demand | MVP plan updated\n2024-07-19 | Melody | Content is key for DTC | SEO plan launched")
]

# 6. Decks & Presentations
decks_blocks = [
    text_block("Deck Outlines, Slide Content, Links to Google Slides, Investor/Partner Pitch Versions."),
    text_block("Add deck outlines and links to Google Slides here.")
]

# 7. Reference Files
reference_blocks = [
    text_block("Embed or link your Google Drive folders here. Organize by: Legal, Product, Business, Research, Decks, etc."),
    text_block("Add a 'How to Use' note for your team.")
]

# Create all top-level pages
print("Creating Notion workspace structure...")
roadmap = create_page("🗺️ Roadmap", PARENT_PAGE_ID, roadmap_blocks)
product = create_page("🚀 Product & Tech", PARENT_PAGE_ID, product_blocks)
legal = create_page("⚖️ Legal & Compliance", PARENT_PAGE_ID, legal_blocks)
business = create_page("💼 Business & GTM", PARENT_PAGE_ID, business_blocks)
research = create_page("📚 Research & Feedback", PARENT_PAGE_ID, research_blocks)
decks = create_page("🎤 Decks & Presentations", PARENT_PAGE_ID, decks_blocks)
reference = create_page("📂 Reference Files", PARENT_PAGE_ID, reference_blocks)

print("Workspace structure created! You can now customize each section in Notion.") 