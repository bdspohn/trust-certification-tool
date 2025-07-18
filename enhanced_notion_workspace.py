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

# Content block helpers
def text_block(text):
    return {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

def heading_block(text, level=2):
    heading_type = f"heading_{level}"
    return {"object": "block", "type": heading_type, heading_type: {"rich_text": [{"type": "text", "text": {"content": text}}]}}

def bulleted_list(items):
    return [{"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}} for item in items]

def quote_block(text):
    return {"object": "block", "type": "quote", "quote": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

def callout_block(text, emoji="💡"):
    return {
        "object": "block", 
        "type": "callout", 
        "callout": {
            "rich_text": [{"type": "text", "text": {"content": text}}],
            "icon": {"type": "emoji", "emoji": emoji}
        }
    }

# 1. Executive Dashboard
dashboard_blocks = [
    heading_block("Veristruct Executive Dashboard", 1),
    callout_block("Mission: Build the trust infrastructure for the digital age - making trust transactions as simple as a credit card payment.", "🎯"),
    text_block(""),
    heading_block("Current Status", 2),
    *bulleted_list([
        "✅ MVP Website Deployed (Enhanced AI Document Processor)",
        "✅ AI Extraction Accuracy Improved (Multi-pattern, confidence scoring)",
        "✅ Legal Framework Research Complete (50 states)",
        "✅ Neil Partnership Discussion Underway",
        "🟡 First FI Partnership Target: Q4 2024",
        "🟡 ABS Setup & Legal Services Integration: Q1 2025"
    ]),
    text_block(""),
    heading_block("Key Metrics to Track", 2),
    text_block("• Website Traffic & Conversion"),
    text_block("• AI Extraction Accuracy (Currently >80% for most fields)"),
    text_block("• Time Saved per Trust Certification"),
    text_block("• Customer Acquisition Cost (CAC)"),
    text_block("• Monthly Recurring Revenue (MRR)"),
    text_block(""),
    heading_block("Next 30 Days", 2),
    *bulleted_list([
        "Complete pitch deck with Neil's feedback incorporated",
        "Create comprehensive business plan",
        "Identify 3 target FI prospects for pilot",
        "Set up ABS legal structure in Arizona",
        "Develop pricing strategy & sales materials"
    ])
]

# 2. Enhanced Roadmap
roadmap_blocks = [
    heading_block("Veristruct Product Roadmap", 1),
    callout_block("Vision: Phase 1 = Trust Certification Transformer (TCT) → Phase 2 = Plaid for Trusts", "🗺️"),
    text_block(""),
    heading_block("Phase 1: Trust Certification Transformer (Q3-Q4 2024)", 2),
    text_block("Current Status: MVP Complete with Enhanced AI"),
    *bulleted_list([
        "✅ AI Document Processing (Multi-pattern extraction, confidence scoring)",
        "✅ Web Interface (trusto.com)",
        "✅ Basic Form Generation",
        "🟡 E-signature Integration (DocuSign/OneNotary)",
        "🟡 Bank-specific Form Templates",
        "🟡 SOC2 Compliance & Security",
        "🟡 First FI Partnership"
    ]),
    text_block(""),
    heading_block("Phase 1.5: Transfer Risk Analyzer (Q4 2024-Q1 2025)", 2),
    text_block("Garn-St-Germain Act compliance analysis for lenders"),
    *bulleted_list([
        "🔲 GSGA Rules Engine",
        "🔲 Risk Scoring Algorithm", 
        "🔲 Insurance Integration",
        "🔲 FI Dashboard & Reporting"
    ]),
    text_block(""),
    heading_block("Phase 2: Plaid for Trusts (Q1-Q2 2025)", 2),
    text_block("Full trust infrastructure platform"),
    *bulleted_list([
        "🔲 Trust Creation Workflows",
        "🔲 Multi-FI Integration API",
        "🔲 Trust Change Detection & Notifications",
        "🔲 Portable Trust Certificates",
        "🔲 Trustee Administration Tools",
        "🔲 Legal Services Marketplace (ABS)"
    ]),
    text_block(""),
    heading_block("Roadmap Database", 2),
    text_block("Create a Notion database with these columns:"),
    text_block("Milestone | Owner | Target Date | Status | Dependencies | Priority | Notes")
]

# 3. Enhanced Product & Tech
product_blocks = [
    heading_block("Product & Technology Strategy", 1),
    quote_block("We're not just digitizing forms - we're building trust infrastructure that didn't exist before."),
    text_block(""),
    heading_block("Product Vision", 2),
    text_block("To become the Stripe/Plaid for trust transactions—making trust-based financial interactions frictionless, compliant, and legally sound."),
    text_block(""),
    heading_block("Current Tech Stack", 2),
    *bulleted_list([
        "Frontend: Next.js, React, TailwindCSS",
        "Backend: Node.js, Vercel deployment",
        "AI/ML: Custom regex + future LLM integration",
        "Document Processing: PDF.js, Mammoth (DOCX)",
        "Validation: Custom security & sanitization"
    ]),
    text_block(""),
    heading_block("Enhanced User Flow (Current)", 2),
    *bulleted_list([
        "1. User uploads trust document (PDF/DOCX/TXT)",
        "2. AI extracts key fields with confidence scoring",
        "3. User reviews auto-populated certification form",
        "4. Form validation & security sanitization",
        "5. E-signature/notarization (coming soon)",
        "6. Download completed certification",
        "7. Future: Direct FI submission"
    ]),
    text_block(""),
    heading_block("AI Improvements Completed", 2),
    *bulleted_list([
        "Multi-pattern regex for each field type",
        "Real confidence scoring per field",
        "State abbreviation normalization",
        "Enhanced error handling",
        "Input sanitization for security",
        "Support for multiple document formats"
    ]),
    text_block(""),
    heading_block("Technical Architecture (Future)", 2),
    text_block("API-First Design:"),
    *bulleted_list([
        "Trust Ingestion API",
        "Certification Generation API", 
        "FI Integration API",
        "Legal Services API (ABS)",
        "Webhook system for real-time updates"
    ])
]

# 4. Legal & Compliance Strategy
legal_blocks = [
    heading_block("Legal & Compliance Framework", 1),
    callout_block("ABS Strategy: Use Neil's Arizona ABS firm to provide legal services nationwide while maintaining tech focus.", "⚖️"),
    text_block(""),
    heading_block("Current Legal Foundation", 2),
    *bulleted_list([
        "✅ Company: Veristruct LLC (Delaware)",
        "✅ Domain: veristruct.com",
        "✅ Privacy Policy & Terms (Bonterms-based)",
        "✅ State requirements research (50 states)",
        "🟡 ABS integration with Neil's firm",
        "🟡 Professional liability insurance"
    ]),
    text_block(""),
    heading_block("State-by-State Strategy", 2),
    text_block("Phase 1 States (36.7% of US population):"),
    *bulleted_list([
        "Arizona (Regulatory sandbox + ABS)",
        "California (Largest market, Probate 18100.5)",
        "Texas (Second largest)", 
        "Florida (High trust density)",
        "New York (Financial center)",
        "Pennsylvania (Large population)"
    ]),
    text_block(""),
    heading_block("Compliance Requirements", 2),
    *bulleted_list([
        "SOC2 Type II Certification",
        "Bank-grade security standards",
        "GDPR/CCPA privacy compliance", 
        "E-signature law compliance (ESIGN Act)",
        "Notarization requirements by state",
        "Legal practice regulations (UPL)"
    ]),
    text_block(""),
    heading_block("Legal Services Integration (ABS)", 2),
    text_block("Services to offer through Neil's ABS firm:"),
    *bulleted_list([
        "Trust document review & validation",
        "Transfer deed drafting & recording",
        "Multi-state legal compliance",
        "Trust amendment preparation",
        "Beneficiary dispute resolution",
        "Estate planning consultation"
    ])
]

# 5. Business Model & GTM
business_blocks = [
    heading_block("Business Model & Go-to-Market Strategy", 1),
    quote_block("The wedge is obvious: enterprise SaaS or per-use licensing to FIs. The flywheel is two-sided: more trust owners attract more FIs, and vice versa."),
    text_block(""),
    heading_block("Revenue Streams", 2),
    text_block("1. SaaS Subscriptions (Financial Institutions)"),
    *bulleted_list([
        "Enterprise: $50K-500K annually",
        "Mid-market: $10K-50K annually", 
        "Small banks/CUs: $2K-10K annually"
    ]),
    text_block(""),
    text_block("2. Per-Transaction Fees"),
    *bulleted_list([
        "Consumer direct: $50-200 per certification",
        "FI white-label: $25-100 per certification",
        "Volume discounts for high-usage FIs"
    ]),
    text_block(""),
    text_block("3. Legal Services (ABS Integration)"),
    *bulleted_list([
        "Document review: $500-2000",
        "Transfer deeds: $300-800",
        "Trust amendments: $1000-3000"
    ]),
    text_block(""),
    heading_block("Target Market Analysis", 2),
    text_block("Primary: Financial Institutions"),
    *bulleted_list([
        "Regional banks (First Citizens, Regions)",
        "Credit unions (Navy Federal, PenFed)",
        "Private banks (JPM Private, Citizens Private)",
        "Wealth management firms",
        "Mortgage lenders (non-bank)"
    ]),
    text_block(""),
    text_block("Secondary: Professional Services"),
    *bulleted_list([
        "Estate planning attorneys",
        "Wealth advisors/RIAs",
        "Trust & estate administrators",
        "Real estate attorneys"
    ]),
    text_block(""),
    heading_block("Go-to-Market Strategy", 2),
    text_block("Phase 1: Arizona Launch"),
    *bulleted_list([
        "Leverage regulatory sandbox",
        "Target AZ banks and credit unions",
        "Partner with wealth advisors",
        "Content marketing (SEO, thought leadership)"
    ]),
    text_block(""),
    text_block("Phase 2: Expansion"),
    *bulleted_list([
        "CA, TX, FL, NY launch",
        "Enterprise sales team",
        "Channel partnerships",
        "API marketplace presence"
    ])
]

# 6. Research & Insights
research_blocks = [
    heading_block("Research & Market Insights", 1),
    callout_block("Key Insight: VCs will understand this problem personally - most have trusts and deal with this pain.", "💡"),
    text_block(""),
    heading_block("Market Size & Opportunity", 2),
    text_block("Total Addressable Market:"),
    *bulleted_list([
        "~10% of US adults have trusts",
        "These 10% hold ~60% of American wealth",
        "$84 trillion in total US wealth",
        "Trust market estimated at $50+ trillion"
    ]),
    text_block(""),
    text_block("Pain Point Analysis:"),
    *bulleted_list([
        "JPMorgan spends $50-100M annually on trust processing",
        "Average trust certification takes 2-4 weeks",
        "Client loops in lawyer 80% of the time",
        "Form errors require 2-3 iterations typically",
        "Banks use different, idiosyncratic forms"
    ]),
    text_block(""),
    heading_block("Neil's Key Feedback", 2),
    text_block("Product Strategy:"),
    *bulleted_list([
        "Focus on user experience vs. technical details",
        "Show actual dashboards and workflows",
        "Emphasize flywheel/network effects",
        "Start with legal services, not just SaaS",
        "Build 'janky demo' with humans behind scenes"
    ]),
    text_block(""),
    text_block("Business Strategy:"),
    *bulleted_list([
        "Target investors who have trusts personally",
        "ABS enables higher pricing than pure SaaS",
        "50-state coverage easier than perceived",
        "Private bank channel better than general banking",
        "Insurance product (TRA) creates stickiness"
    ]),
    text_block(""),
    heading_block("Competitive Analysis", 2),
    text_block("Direct Competitors: None identified"),
    text_block(""),
    text_block("Adjacent Players:"),
    *bulleted_list([
        "DocuSign (e-signature)",
        "LegalZoom (DIY legal)",
        "Plaid (financial data)",
        "Contract Wrangler (document processing)",
        "Trust & Will (trust creation)"
    ]),
    text_block(""),
    text_block("Competitive Advantages:"),
    *bulleted_list([
        "First-mover in trust transaction infrastructure",
        "Legal + tech hybrid model (ABS)",
        "State-specific compliance expertise",
        "Bank-grade security from day one",
        "Network effects (two-sided market)"
    ])
]

# 7. Enhanced Decks & Presentations
decks_blocks = [
    heading_block("Pitch Decks & Presentations", 1),
    callout_block("Focus: Problem that investors understand personally + massive TAM + clear go-to-market", "🎤"),
    text_block(""),
    heading_block("Investor Pitch Deck Outline", 2),
    text_block("Based on Neil's feedback:"),
    *bulleted_list([
        "1. Problem: Trust owner & bank pain (personal stories)",
        "2. Market Size: $50T+ trust market, micro-examples",
        "3. Solution: Trust infrastructure platform (flowchart)",
        "4. Product Demo: Screenshots and workflows",
        "5. Business Model: SaaS + Legal Services",
        "6. Flywheel: Network effects diagram",
        "7. Go-to-Market: Arizona → National",
        "8. Team: Ben's bank experience + Neil's ABS",
        "9. Financials: CAC/LTV, revenue projections",
        "10. Ask: $X for 18 months runway"
    ]),
    text_block(""),
    heading_block("FI Sales Deck Outline", 2),
    *bulleted_list([
        "1. Trust Processing Costs Today",
        "2. Client Satisfaction Issues", 
        "3. 'Trust API' Solution",
        "4. ROI Calculator",
        "5. Implementation Timeline",
        "6. Security & Compliance",
        "7. Pilot Program Proposal"
    ]),
    text_block(""),
    heading_block("Demo Script", 2),
    text_block("Live Demo Flow:"),
    *bulleted_list([
        "Upload sample trust document",
        "Show AI extraction with confidence scores",
        "Review auto-populated form",
        "Generate bank-specific certification",
        "Highlight time/cost savings"
    ]),
    text_block(""),
    heading_block("Key Messaging", 2),
    text_block("For Investors:"),
    text_block("'We're building the Plaid for trusts - the infrastructure layer that makes $50 trillion in trust assets as liquid as a checking account.'"),
    text_block(""),
    text_block("For FIs:"),
    text_block("'Reduce trust processing costs by 80% while improving client satisfaction and reducing compliance risk.'"),
    text_block(""),
    text_block("For Consumers:"),
    text_block("'Your trust should work like your credit card - accepted everywhere, instantly.'")
]

# 8. Enhanced Reference & Resources
reference_blocks = [
    heading_block("Reference Files & Resources", 1),
    text_block("Centralized repository for all business intelligence and resources."),
    text_block(""),
    heading_block("Email Conversations", 2),
    *bulleted_list([
        "Ben ↔ Neil: Product idea & partnership",
        "Ben ↔ Neil: Veristruct feedback & strategy",
        "Ben ↔ Neil: Business model refinement"
    ]),
    text_block(""),
    heading_block("Business Documents", 2),
    *bulleted_list([
        "Veristruct Pitch Deck v2.pptx",
        "Tartan.pptx (original concept)",
        "Tartan TO DO.xlsx",
        "Business plan drafts"
    ]),
    text_block(""),
    heading_block("Legal Research", 2),
    *bulleted_list([
        "State certification requirements (50 states)",
        "Bank trust forms collection", 
        "Regulatory compliance research",
        "ABS regulations by state"
    ]),
    text_block(""),
    heading_block("Technical Assets", 2),
    *bulleted_list([
        "Current website: trusto.com",
        "GitHub repository",
        "AI processing improvements",
        "Form validation system"
    ]),
    text_block(""),
    heading_block("Market Research", 2),
    *bulleted_list([
        "Financial institution analysis",
        "Trust market sizing data",
        "Competitive landscape",
        "Customer pain point research"
    ]),
    text_block(""),
    heading_block("Partnerships & Contacts", 2),
    *bulleted_list([
        "Neil Peretz (ABS partner)",
        "Doug Reed (technical development)",
        "Potential FI prospects",
        "Investor contacts"
    ])
]

# Create the main workspace page first
print("Creating enhanced Veristruct Notion workspace...")

try:
    # Create main sections
    dashboard = create_page("📊 Executive Dashboard", PARENT_PAGE_ID, dashboard_blocks)
    print("✅ Executive Dashboard created")
    
    roadmap = create_page("🗺️ Product Roadmap", PARENT_PAGE_ID, roadmap_blocks)
    print("✅ Product Roadmap created")
    
    product = create_page("🚀 Product & Technology", PARENT_PAGE_ID, product_blocks)
    print("✅ Product & Technology created")
    
    legal = create_page("⚖️ Legal & Compliance", PARENT_PAGE_ID, legal_blocks)
    print("✅ Legal & Compliance created")
    
    business = create_page("💼 Business & GTM", PARENT_PAGE_ID, business_blocks)
    print("✅ Business & GTM created")
    
    research = create_page("📚 Research & Insights", PARENT_PAGE_ID, research_blocks)
    print("✅ Research & Insights created")
    
    decks = create_page("🎤 Decks & Presentations", PARENT_PAGE_ID, decks_blocks)
    print("✅ Decks & Presentations created")
    
    reference = create_page("📂 Reference & Resources", PARENT_PAGE_ID, reference_blocks)
    print("✅ Reference & Resources created")
    
    print("\n🎉 Enhanced Veristruct workspace created successfully!")
    print("\nNext steps:")
    print("1. Convert roadmap and other tables to Notion databases")
    print("2. Upload reference files to appropriate sections")
    print("3. Connect Google Drive folders")
    print("4. Set up team access and permissions")
    
except Exception as e:
    print(f"❌ Error creating workspace: {e}")
    print("Please check your Notion token and parent page ID")