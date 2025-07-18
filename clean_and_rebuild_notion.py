#!/usr/bin/env python3
"""
Clean and Rebuild Trusto Notion Workspace

This script will:
1. Remove all existing child pages from your workspace
2. Create the new comprehensive Trusto workspace structure
"""

# TRUSTO NOTION CREDENTIALS:
NOTION_TOKEN = "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"
PARENT_PAGE_ID = "234af195cf3a80208a62ff608b4ad8a5"

import os
import sys

print("🧹 Cleaning and rebuilding Trusto Notion workspace...")

try:
    from notion_client import Client

    notion = Client(auth=NOTION_TOKEN)

    # Test connection
    print("✅ Testing Notion connection...")
    notion.users.me()
    print("✅ Connection successful")

    # Step 1: Get all child pages and delete them
    print("\n🗑️ Removing old workspace content...")
    
    try:
        # Get all children of the parent page
        children = notion.blocks.children.list(block_id=PARENT_PAGE_ID)
        
        deleted_count = 0
        for child in children['results']:
            if child['type'] in ['child_page', 'page']:
                try:
                    # Delete the child page/block
                    notion.blocks.delete(block_id=child['id'])
                    deleted_count += 1
                    print(f"   ✅ Deleted: {child.get('child_page', {}).get('title', 'Untitled')}")
                except Exception as e:
                    print(f"   ⚠️ Could not delete {child['id']}: {e}")
        
        print(f"🗑️ Removed {deleted_count} old pages/blocks")
        
    except Exception as e:
        print(f"⚠️ Could not clean old content: {e}")
        print("Proceeding with new content creation...")

    # Step 2: Create new comprehensive workspace
    print("\n🚀 Creating new Trusto workspace structure...")

    # Content block helpers
    def text_block(text):
        return {"object": "block", "type": "paragraph", "paragraph": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

    def heading_block(text, level=2):
        heading_type = f"heading_{level}"
        return {"object": "block", "type": heading_type, heading_type: {"rich_text": [{"type": "text", "text": {"content": text}}]}}

    def bulleted_list(items):
        return [{"object": "block", "type": "bulleted_list_item", "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": item}}]}} for item in items]

    def callout_block(text, emoji="💡"):
        return {
            "object": "block", 
            "type": "callout", 
            "callout": {
                "rich_text": [{"type": "text", "text": {"content": text}}],
                "icon": {"type": "emoji", "emoji": emoji}
            }
        }

    def quote_block(text):
        return {"object": "block", "type": "quote", "quote": {"rich_text": [{"type": "text", "text": {"content": text}}]}}

    def create_page(title, parent_id, children=None):
        return notion.pages.create(
            parent={"type": "page_id", "page_id": parent_id},
            properties={
                "title": [{"type": "text", "text": {"content": title}}]
            },
            children=children or []
        )

    # 1. Executive Dashboard
    dashboard_blocks = [
        heading_block("Trusto Executive Dashboard", 1),
        callout_block("Mission: Build the trust infrastructure for the digital age - making trust transactions as simple as a credit card payment. (Trusto.inc)", "🎯"),
        text_block(""),
        heading_block("Current Status", 2),
        *bulleted_list([
            "✅ MVP Website Deployed at Trusto.inc (Enhanced AI Document Processor)",
            "✅ AI Extraction Accuracy Improved (Multi-pattern, confidence scoring)",
            "✅ Legal Framework Research Complete (50 states)",
            "✅ Neil Partnership Discussion Underway",
            "🟡 First FI Partnership Target: Q4 2024",
            "🟡 ABS Setup & Legal Services Integration: Q1 2025"
        ]),
        text_block(""),
        heading_block("Key Metrics to Track", 2),
        *bulleted_list([
            "Website Traffic & Conversion Rate",
            "AI Extraction Accuracy (Currently >80% for most fields)",
            "Time Saved per Trust Certification",
            "Customer Acquisition Cost (CAC)",
            "Monthly Recurring Revenue (MRR)",
            "Net Promoter Score (NPS)"
        ]),
        text_block(""),
        heading_block("Next 30 Days Priority Actions", 2),
        *bulleted_list([
            "Complete investor pitch deck with Neil's feedback",
            "Create comprehensive business plan",
            "Identify 3 target FI prospects for pilot program",
            "Set up ABS legal structure in Arizona",
            "Develop pricing strategy & sales materials",
            "Create demo environment for FI prospects"
        ])
    ]

    # 2. Product Roadmap
    roadmap_blocks = [
        heading_block("Trusto Product Roadmap", 1),
        callout_block("Vision: Phase 1 = Trust Certification Transformer (TCT) → Phase 2 = Plaid for Trusts Infrastructure", "🗺️"),
        text_block(""),
        heading_block("Phase 1: Trust Certification Transformer (Q3-Q4 2024)", 2),
        text_block("Status: MVP Complete with Enhanced AI - Now Optimizing for FI Integration"),
        *bulleted_list([
            "✅ AI Document Processing (Multi-pattern extraction, confidence scoring)",
            "✅ Web Interface (Trusto.inc)",
            "✅ Form Validation & Security",
            "✅ Basic Certification Generation",
            "🟡 E-signature Integration (DocuSign/OneNotary)",
            "🟡 Bank-specific Form Templates (Top 10 FIs)",
            "🟡 SOC2 Compliance & Security Audit",
            "🟡 First FI Partnership & Pilot"
        ]),
        text_block(""),
        heading_block("Phase 1.5: Transfer Risk Analyzer (Q4 2024-Q1 2025)", 2),
        text_block("Garn-St-Germain Act compliance analysis - Neil's suggestion for FI stickiness"),
        *bulleted_list([
            "🔲 GSGA Rules Engine Development",
            "🔲 Risk Scoring Algorithm", 
            "🔲 Insurance Product Integration",
            "🔲 FI Dashboard & Reporting Tools",
            "🔲 Legal Opinion Letter Generation"
        ]),
        text_block(""),
        heading_block("Phase 2: Plaid for Trusts (Q1-Q2 2025)", 2),
        text_block("Full trust infrastructure platform - The ultimate vision"),
        *bulleted_list([
            "🔲 Trust Creation Workflows (Consumer-facing)",
            "🔲 Multi-FI Integration API",
            "🔲 Trust Change Detection & Notifications",
            "🔲 Portable Trust Certificates",
            "🔲 Trustee Administration Tools",
            "🔲 Legal Services Marketplace (ABS Integration)",
            "🔲 Wealth Advisor Channel Integration"
        ]),
        text_block(""),
        heading_block("Success Metrics by Phase", 2),
        text_block("Phase 1 Success: 3 FI partnerships, $100K ARR"),
        text_block("Phase 1.5 Success: Insurance product live, risk analysis operational"),
        text_block("Phase 2 Success: 50+ FI integrations, $1M+ ARR, national presence")
    ]

    # 3. Business Model & GTM
    business_blocks = [
        heading_block("Business Model & Go-to-Market Strategy", 1),
        quote_block("The wedge is obvious: enterprise SaaS or per-use licensing to FIs. The flywheel is two-sided: more trust owners attract more FIs, and vice versa. - Neil's insight"),
        text_block(""),
        heading_block("Revenue Model", 2),
        text_block("🏦 Enterprise SaaS (Financial Institutions)"),
        *bulleted_list([
            "Enterprise Banks: $50K-500K annually",
            "Mid-market Banks: $10K-50K annually", 
            "Small Banks/Credit Unions: $2K-10K annually",
            "Volume-based pricing tiers"
        ]),
        text_block(""),
        text_block("💳 Per-Transaction Fees"),
        *bulleted_list([
            "Consumer Direct: $50-200 per certification",
            "FI White-label: $25-100 per certification",
            "Bulk processing discounts",
            "Premium same-day service: +50% fee"
        ]),
        text_block(""),
        text_block("⚖️ Legal Services (ABS Integration with Neil)"),
        *bulleted_list([
            "Document Review & Validation: $500-2000",
            "Transfer Deed Drafting & Recording: $300-800",
            "Trust Amendment Preparation: $1000-3000",
            "Multi-state Legal Compliance: $200-500 per state",
            "Ongoing Trust Administration: $100-300/month"
        ]),
        text_block(""),
        heading_block("Target Market Strategy", 2),
        text_block("🎯 Primary: Financial Institutions (B2B Focus)"),
        *bulleted_list([
            "Regional Banks (First Citizens, Regions, PNC)",
            "Credit Unions (Navy Federal, PenFed, BECU)",
            "Private Banks (JPM Private, Citizens Private)",
            "Wealth Management Firms (RIAs with >$1B AUM)",
            "Mortgage Lenders (Quicken, Better, non-bank lenders)"
        ]),
        text_block(""),
        text_block("🤝 Secondary: Professional Services"),
        *bulleted_list([
            "Estate Planning Attorney Firms",
            "Wealth Advisors & RIAs",
            "Trust & Estate Administrators",
            "Real Estate Attorney Practices",
            "Family Office Service Providers"
        ]),
        text_block(""),
        heading_block("Go-to-Market Phases", 2),
        text_block("🌵 Phase 1: Arizona Launch (Regulatory Advantage)"),
        *bulleted_list([
            "Leverage Arizona regulatory sandbox",
            "Target AZ banks and credit unions first",
            "Partner with local wealth advisors",
            "Content marketing & thought leadership",
            "Prove concept with 2-3 design partner FIs"
        ]),
        text_block(""),
        text_block("🚀 Phase 2: Multi-State Expansion"),
        *bulleted_list([
            "CA, TX, FL, NY rollout (36.7% of US population)",
            "Enterprise sales team hiring",
            "Channel partnership program",
            "API marketplace presence",
            "Industry conference circuit"
        ]),
        text_block(""),
        heading_block("Competitive Positioning", 2),
        callout_block("We're not competing with existing players - we're creating a new category: Trust Transaction Infrastructure", "💡"),
        text_block("vs. DocuSign: We handle the entire trust workflow, not just signatures"),
        text_block("vs. LegalZoom: We focus on transactions, not document creation"),
        text_block("vs. Plaid: We're Plaid specifically for the $50T trust market")
    ]

    # 4. Research & Market Intelligence
    research_blocks = [
        heading_block("Research & Market Intelligence", 1),
        callout_block("Key Insight: VCs will understand this problem personally - most have trusts and deal with this exact pain point. This is our unfair advantage in fundraising.", "💡"),
        text_block(""),
        heading_block("Market Size & Opportunity", 2),
        text_block("📊 Total Addressable Market Analysis:"),
        *bulleted_list([
            "~10% of US adults have trusts (32M+ people)",
            "These 10% control ~60% of American wealth ($50T+)",
            "Average trust owner has 3-5 financial accounts",
            "Each account change requires new certification",
            "Estimated 15M+ trust certifications needed annually"
        ]),
        text_block(""),
        text_block("💰 Current Cost Structure (Pain Points):"),
        *bulleted_list([
            "JPMorgan spends $50-100M annually on trust processing",
            "Average trust certification takes 2-4 weeks end-to-end",
            "80% of clients require attorney involvement",
            "Form errors require 2-3 iterations typically",
            "Each bank uses different, idiosyncratic forms",
            "No standardization = massive inefficiency"
        ]),
        text_block(""),
        heading_block("Neil's Strategic Feedback Integration", 2),
        text_block("🎯 Product Strategy Insights:"),
        *bulleted_list([
            "Focus on user experience stories, not technical features",
            "Show actual dashboard mockups and workflows",
            "Emphasize network effects and flywheel dynamics",
            "Start with legal services pricing, not just SaaS",
            "Build 'janky demo' with humans behind scenes initially",
            "Target investors who personally own trusts"
        ]),
        text_block(""),
        text_block("💼 Business Model Refinements:"),
        *bulleted_list([
            "ABS structure enables premium pricing vs. pure SaaS",
            "50-state legal coverage easier than most perceive",
            "Private banking channel better than general banking",
            "Insurance product (TRA) creates customer stickiness",
            "Two-sided market effects are real and powerful"
        ]),
        text_block(""),
        heading_block("Customer Development Insights", 2),
        text_block("🏦 Financial Institution Pain Points:"),
        *bulleted_list([
            "Regulatory compliance burden increasing",
            "Customer satisfaction scores hurt by slow processes",
            "Legal review costs escalating yearly",
            "Risk management increasingly complex",
            "Technology integration challenges"
        ]),
        text_block(""),
        text_block("👥 Trust Owner Pain Points:"),
        *bulleted_list([
            "Process is expensive and slow",
            "Every bank has different requirements",
            "Always need lawyer involvement",
            "Frequent errors and rework",
            "No transparency into timeline"
        ]),
        text_block(""),
        heading_block("Competitive Landscape", 2),
        text_block("🎯 Direct Competitors: None identified (Blue Ocean)"),
        text_block(""),
        text_block("🔄 Adjacent Players:"),
        *bulleted_list([
            "DocuSign: E-signature platform (horizontal)",
            "LegalZoom: DIY legal documents (upstream)",
            "Plaid: Financial data connectivity (parallel)",
            "Contract Wrangler: Document processing (technology)",
            "Trust & Will: Trust creation (upstream)"
        ]),
        text_block(""),
        text_block("🛡️ Our Competitive Advantages:"),
        *bulleted_list([
            "First-mover in trust transaction infrastructure",
            "Legal + technology hybrid model (ABS)",
            "Deep state-specific compliance expertise",
            "Bank-grade security from day one",
            "Network effects create natural moats",
            "Regulatory sandbox advantage in Arizona"
        ])
    ]

    # 5. Legal & Compliance Framework
    legal_blocks = [
        heading_block("Legal & Compliance Framework", 1),
        callout_block("ABS Strategy: Partner with Neil's Arizona ABS firm to provide legal services nationwide while maintaining technology focus.", "⚖️"),
        text_block(""),
        heading_block("Current Legal Foundation", 2),
        text_block("✅ Established Infrastructure:"),
        *bulleted_list([
            "Company: Trusto (operating entity)",
            "Website: Trusto.inc (live and operational)",
            "Privacy Policy & Terms of Service (Bonterms-based)",
            "State requirements research completed (50 states)",
            "Neil's ABS firm partnership in development",
            "Professional liability insurance (in progress)"
        ]),
        text_block(""),
        heading_block("State-by-State Legal Strategy", 2),
        text_block("🎯 Phase 1 Target States (36.7% of US population):"),
        *bulleted_list([
            "Arizona: Regulatory sandbox + ABS advantages",
            "California: Largest market, Probate Code 18100.5 expertise",
            "Texas: Second largest state, business-friendly", 
            "Florida: High retiree/trust density",
            "New York: Financial services hub",
            "Pennsylvania: Large population, established trust law"
        ]),
        text_block(""),
        text_block("📋 State-Specific Requirements Database:"),
        text_block("(Convert to Notion database with columns: State | Key Requirements | Notary Rules | Forms | Last Updated)"),
        *bulleted_list([
            "Notarization requirements by state",
            "Trust law variations and precedents",
            "Financial institution regulations",
            "E-signature compliance (ESIGN Act)",
            "Privacy and data protection laws"
        ]),
        text_block(""),
        heading_block("Compliance & Security Framework", 2),
        text_block("🔒 Security & Compliance Requirements:"),
        *bulleted_list([
            "SOC2 Type II Certification (in progress)",
            "Bank-grade security standards implementation",
            "GDPR/CCPA privacy compliance framework",
            "Multi-state bar exam requirements tracking",
            "Professional liability insurance coverage",
            "Data retention and destruction policies"
        ]),
        text_block(""),
        heading_block("Legal Services Integration (ABS Model)", 2),
        text_block("⚖️ Services Portfolio through Neil's ABS:"),
        *bulleted_list([
            "Trust Document Review & Legal Validation",
            "Transfer Deed Drafting & Recording Services",
            "Multi-state Legal Compliance Analysis",
            "Trust Amendment and Modification Prep",
            "Beneficiary Communication & Dispute Resolution",
            "Estate Planning Consultation Services",
            "Regulatory Compliance Monitoring"
        ]),
        text_block(""),
        text_block("🌐 50-State Expansion Strategy:"),
        *bulleted_list([
            "Bar-licensed attorneys in each target state",
            "Local counsel network for complex matters",
            "Standardized service delivery protocols",
            "Technology-enabled service delivery",
            "Quality control and oversight systems"
        ])
    ]

    # 6. Technology & Product Development
    tech_blocks = [
        heading_block("Technology & Product Development", 1),
        quote_block("We're not just digitizing forms - we're building trust infrastructure that didn't exist before. Every trust should work like a credit card - accepted everywhere, instantly."),
        text_block(""),
        heading_block("Current Technology Stack", 2),
        text_block("🛠️ Production Infrastructure:"),
        *bulleted_list([
            "Frontend: Next.js, React, TailwindCSS",
            "Backend: Node.js with Vercel deployment",
            "AI/ML: Custom multi-pattern extraction + future LLM",
            "Document Processing: PDF.js, Mammoth (DOCX)",
            "Security: Input sanitization, validation framework",
            "Hosting: Vercel with global CDN"
        ]),
        text_block(""),
        heading_block("AI Enhancement Achievements", 2),
        text_block("🤖 Recent Improvements Completed:"),
        *bulleted_list([
            "Multi-pattern regex extraction for each field type",
            "Real confidence scoring per extracted field",
            "State abbreviation normalization (AL → ALABAMA)",
            "Enhanced error handling with specific messages",
            "Comprehensive input sanitization for security",
            "Support for multiple document formats",
            "Field-specific confidence indicators in UI"
        ]),
        text_block(""),
        heading_block("Enhanced User Experience Flow", 2),
        text_block("🔄 Current Production Workflow:"),
        *bulleted_list([
            "1. Secure document upload (PDF/DOCX/TXT support)",
            "2. AI extraction with confidence scoring per field",
            "3. User review of auto-populated certification form",
            "4. Real-time validation & security sanitization",
            "5. State-specific form generation",
            "6. Download completed certification",
            "7. Future: Direct FI submission & tracking"
        ]),
        text_block(""),
        heading_block("Technical Architecture Roadmap", 2),
        text_block("🏗️ API-First Design for Scale:"),
        *bulleted_list([
            "Trust Ingestion API (document → structured data)",
            "Certification Generation API (data → bank forms)", 
            "FI Integration API (webhooks, real-time status)",
            "Legal Services API (ABS workflow integration)",
            "Notification System (trust changes, updates)",
            "Analytics & Reporting API (usage, performance)"
        ]),
        text_block(""),
        heading_block("Security & Compliance Technology", 2),
        text_block("🔐 Enterprise-Grade Security:"),
        *bulleted_list([
            "End-to-end encryption for all document handling",
            "Zero-knowledge architecture for sensitive data",
            "Audit logging for all system interactions",
            "Role-based access control (RBAC)",
            "Automated security scanning and monitoring",
            "GDPR-compliant data handling and deletion"
        ]),
        text_block(""),
        heading_block("Development Priorities", 2),
        text_block("🎯 Next 90 Days Technical Focus:"),
        *bulleted_list([
            "E-signature integration (DocuSign API)",
            "Bank-specific form template engine",
            "SOC2 compliance automation tools",
            "FI demo environment and sandbox",
            "Performance optimization and monitoring",
            "Mobile-responsive design improvements"
        ])
    ]

    # 7. Pitch Deck & Presentations
    deck_blocks = [
        heading_block("Pitch Decks & Presentations", 1),
        callout_block("Core Thesis: VCs understand this problem personally. Most have trusts and have experienced this exact pain. This is our fundraising superpower.", "🎤"),
        text_block(""),
        heading_block("Investor Pitch Deck Structure", 2),
        text_block("📊 Based on Neil's Detailed Feedback:"),
        *bulleted_list([
            "1. Problem: Trust owner & bank pain (personal stories, speech bubbles)",
            "2. Market Size: $50T+ trust market with micro-examples",
            "3. Solution: Trust infrastructure platform (flowchart diagram)",
            "4. Product Demo: Actual screenshots and user workflows",
            "5. Business Model: SaaS + Legal Services hybrid",
            "6. Flywheel: Network effects visualization",
            "7. Go-to-Market: Arizona sandbox → National expansion",
            "8. Team: Ben's bank experience + Neil's ABS expertise",
            "9. Financials: CAC/LTV analysis, revenue projections",
            "10. Ask: Funding amount for 18-month runway"
        ]),
        text_block(""),
        heading_block("Key Messaging Framework", 2),
        text_block("🎯 For Investors:"),
        quote_block("We're building the Plaid for trusts - the infrastructure layer that makes $50 trillion in trust assets as liquid as a checking account."),
        text_block(""),
        text_block("🏦 For Financial Institutions:"),
        quote_block("Reduce trust processing costs by 80% while improving client satisfaction and eliminating compliance risk."),
        text_block(""),
        text_block("👥 For Consumers:"),
        quote_block("Your trust should work like your credit card - accepted everywhere, instantly, without paperwork hassles."),
        text_block(""),
        heading_block("Demo Environment Strategy", 2),
        text_block("🖥️ Live Demo Flow (Neil's 'Janky Demo' Concept):"),
        *bulleted_list([
            "Upload sample trust document (pre-selected)",
            "Show AI extraction with confidence scores",
            "Review auto-populated certification form",
            "Generate bank-specific certification",
            "Highlight time/cost savings with metrics",
            "Show FI dashboard mockup for banks"
        ]),
        text_block(""),
        heading_block("Sales Deck for FIs", 2),
        text_block("💼 Financial Institution Sales Presentation:"),
        *bulleted_list([
            "1. Current Trust Processing Costs Analysis",
            "2. Client Satisfaction Impact Assessment", 
            "3. 'Trust API' Solution Overview",
            "4. ROI Calculator with Custom Scenarios",
            "5. Implementation Timeline & Support",
            "6. Security & Compliance Framework",
            "7. Pilot Program Proposal & Terms"
        ]),
        text_block(""),
        heading_block("Content Marketing Strategy", 2),
        text_block("📝 Thought Leadership Content:"),
        *bulleted_list([
            "Trust Industry Pain Point Articles",
            "State-by-State Compliance Guides", 
            "FI Efficiency Case Studies",
            "Regulatory Update Commentary",
            "Technology Innovation in Legal Services",
            "Future of Trust Administration"
        ])
    ]

    # 8. Reference Files & Resources
    reference_blocks = [
        heading_block("Reference Files & Resources", 1),
        text_block("📁 Centralized repository for all Trusto business intelligence, research, and strategic assets."),
        text_block(""),
        heading_block("Strategic Email Conversations", 2),
        text_block("💬 Key Business Development Discussions:"),
        *bulleted_list([
            "Ben ↔ Neil: Initial product idea pitch ('Trust Certification Transformer → Plaid for Trusts')",
            "Ben ↔ Neil: Trusto strategy refinement and feedback",
            "Ben ↔ Neil: Business model evolution and ABS integration",
            "Partnership discussions and next steps"
        ]),
        text_block(""),
        heading_block("Business Documentation Archive", 2),
        text_block("📋 Critical Business Documents:"),
        *bulleted_list([
            "Original Tartan concept deck and materials",
            "Trusto pitch deck iterations (v1, v2, etc.)",
            "Business plan drafts and revisions",
            "Financial projections and models",
            "Legal structure documentation",
            "Partnership agreements and LOIs"
        ]),
        text_block(""),
        heading_block("Legal & Regulatory Research", 2),
        text_block("⚖️ Compliance Intelligence:"),
        *bulleted_list([
            "50-state trust certification requirements database",
            "Bank trust form collection (major FIs)",
            "Regulatory compliance research by state",
            "ABS regulations and requirements",
            "Professional liability insurance options",
            "Bar admission requirements by state"
        ]),
        text_block(""),
        heading_block("Technical Development Assets", 2),
        text_block("💻 Technology Resources:"),
        *bulleted_list([
            "Production website: Trusto.inc",
            "GitHub repository and codebase",
            "AI processing improvements documentation",
            "Form validation and security systems",
            "API documentation and specifications",
            "Security audit and compliance reports"
        ]),
        text_block(""),
        heading_block("Market Research & Intelligence", 2),
        text_block("📊 Industry Analysis:"),
        *bulleted_list([
            "Financial institution target analysis",
            "Trust market sizing and segmentation data",
            "Competitive landscape assessment",
            "Customer pain point research and surveys",
            "Pricing analysis and benchmarking",
            "Industry trend monitoring and reports"
        ]),
        text_block(""),
        heading_block("Partnership & Business Development", 2),
        text_block("🤝 Relationship Management:"),
        *bulleted_list([
            "Neil Peretz: ABS legal services partner",
            "Doug Reed: Technical development resources",
            "FI prospect pipeline and contact info",
            "Investor contact list and interaction history",
            "Advisory board candidate profiles",
            "Channel partner opportunities"
        ]),
        text_block(""),
        heading_block("Financial Projections & Modeling", 2),
        text_block("💰 Business Metrics:"),
        *bulleted_list([
            "Revenue projections by customer segment",
            "CAC/LTV analysis by acquisition channel",
            "Unit economics and pricing models",
            "Funding requirements and use of funds",
            "Milestone-based success metrics",
            "Exit strategy and valuation models"
        ])
    ]

    # Create all pages
    print("📊 Creating Executive Dashboard...")
    dashboard = create_page("📊 Executive Dashboard", PARENT_PAGE_ID, dashboard_blocks)
    
    print("🗺️ Creating Product Roadmap...")
    roadmap = create_page("🗺️ Product Roadmap", PARENT_PAGE_ID, roadmap_blocks)
    
    print("💼 Creating Business Model & GTM...")
    business = create_page("💼 Business Model & GTM", PARENT_PAGE_ID, business_blocks)
    
    print("📚 Creating Research & Market Intelligence...")
    research = create_page("📚 Research & Market Intelligence", PARENT_PAGE_ID, research_blocks)
    
    print("⚖️ Creating Legal & Compliance...")
    legal = create_page("⚖️ Legal & Compliance", PARENT_PAGE_ID, legal_blocks)
    
    print("🚀 Creating Technology & Product...")
    tech = create_page("🚀 Technology & Product", PARENT_PAGE_ID, tech_blocks)
    
    print("🎤 Creating Pitch Decks & Presentations...")
    decks = create_page("🎤 Pitch Decks & Presentations", PARENT_PAGE_ID, deck_blocks)
    
    print("📂 Creating Reference Files & Resources...")
    reference = create_page("📂 Reference Files & Resources", PARENT_PAGE_ID, reference_blocks)

    print("\n🎉 Trusto workspace completely rebuilt!")
    print(f"\n🔗 Access your clean, comprehensive workspace:")
    print(f"   https://www.notion.so/Trusto-{PARENT_PAGE_ID}")
    print(f"   Website: Trusto.inc")
    print("\n✨ Everything is now organized and ready for:")
    print("   • Investor pitch deck creation")
    print("   • Business plan development") 
    print("   • FI partnership outreach")
    print("   • Team collaboration")

except ImportError:
    print("❌ notion-client package not found")
    print("Install it with: pip install notion-client")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error rebuilding workspace: {e}")
    print("Please check your credentials and try again")
    sys.exit(1)