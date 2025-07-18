#!/usr/bin/env python3
"""
Direct Notion Workspace Creation for Trusto

Replace YOUR_TOKEN and YOUR_PAGE_ID with your actual values and run this script.
"""

# TRUSTO NOTION CREDENTIALS:
NOTION_TOKEN = "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"
PARENT_PAGE_ID = "234af195cf3a80208a62ff608b4ad8a5"  # Extracted from your workspace URL

import os
import sys

# Check if credentials are set
if NOTION_TOKEN == "YOUR_TOKEN_HERE" or PARENT_PAGE_ID == "YOUR_PAGE_ID_HERE":
    print("❌ Please edit this file and add your Notion credentials first!")
    print("\n📋 To get your credentials:")
    print("1. Create integration: https://www.notion.so/my-integrations")
    print("2. Create a page in Notion for your workspace")
    print("3. Share that page with your integration")
    print("4. Copy the page ID from the URL")
    print("5. Edit this file and replace YOUR_TOKEN_HERE and YOUR_PAGE_ID_HERE")
    sys.exit(1)

# Set environment variables
os.environ['NOTION_TOKEN'] = NOTION_TOKEN
os.environ['NOTION_PARENT_PAGE_ID'] = PARENT_PAGE_ID

print("🚀 Creating Trusto Notion Workspace...")

try:
    from notion_client import Client

    notion = Client(auth=NOTION_TOKEN)

    # Test connection
    print("✅ Testing Notion connection...")
    try:
        notion.users.me()
        print("✅ Notion connection successful")
    except Exception as e:
        print(f"❌ Notion connection failed: {e}")
        sys.exit(1)

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

    def create_page(title, parent_id, children=None):
        return notion.pages.create(
            parent={"type": "page_id", "page_id": parent_id},
            properties={
                "title": [{"type": "text", "text": {"content": title}}]
            },
            children=children or []
        )

    # Create Executive Dashboard
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

    # Create Business Model page
    business_blocks = [
        heading_block("Business Model & Go-to-Market Strategy", 1),
        callout_block("The wedge is obvious: enterprise SaaS or per-use licensing to FIs. The flywheel is two-sided: more trust owners attract more FIs, and vice versa.", "💼"),
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
        ])
    ]

    # Create Research & Insights page
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
        ])
    ]

    print("📊 Creating Executive Dashboard...")
    dashboard = create_page("📊 Executive Dashboard", PARENT_PAGE_ID, dashboard_blocks)
    
    print("💼 Creating Business Model...")
    business = create_page("💼 Business & GTM", PARENT_PAGE_ID, business_blocks)
    
    print("📚 Creating Research & Insights...")
    research = create_page("📚 Research & Insights", PARENT_PAGE_ID, research_blocks)
    
    # Create additional pages with basic structure
    print("🗺️ Creating Product Roadmap...")
    roadmap = create_page("🗺️ Product Roadmap", PARENT_PAGE_ID, [
        heading_block("Trusto Product Roadmap", 1),
        callout_block("Vision: Phase 1 = Trust Certification Transformer (TCT) → Phase 2 = Plaid for Trusts", "🗺️"),
        text_block("Phase 1: Trust Certification Transformer (Q3-Q4 2024)"),
        text_block("Phase 2: Plaid for Trusts (Q1-Q2 2025)")
    ])
    
    print("🚀 Creating Product & Technology...")
    product = create_page("🚀 Product & Technology", PARENT_PAGE_ID, [
        heading_block("Product & Technology Strategy", 1),
        text_block("Product Vision: To become the Stripe/Plaid for trust transactions"),
        text_block("Current Tech Stack: Next.js, React, Enhanced AI Processing")
    ])
    
    print("⚖️ Creating Legal & Compliance...")
    legal = create_page("⚖️ Legal & Compliance", PARENT_PAGE_ID, [
        heading_block("Legal & Compliance Framework", 1),
        callout_block("ABS Strategy: Use Neil's Arizona ABS firm to provide legal services nationwide", "⚖️"),
        text_block("State-by-State Strategy: Starting with AZ, CA, TX, FL, NY, PA")
    ])
    
    print("🎤 Creating Decks & Presentations...")
    decks = create_page("🎤 Decks & Presentations", PARENT_PAGE_ID, [
        heading_block("Pitch Decks & Presentations", 1),
        text_block("Investor Pitch Deck: Focus on problem VCs understand personally"),
        text_block("FI Sales Deck: ROI-focused for banks and credit unions")
    ])
    
    print("📂 Creating Reference & Resources...")
    reference = create_page("📂 Reference & Resources", PARENT_PAGE_ID, [
        heading_block("Reference Files & Resources", 1),
        text_block("Email conversations, business documents, legal research, technical assets")
    ])

    print("\n🎉 Trusto workspace created successfully!")
    print(f"\n🔗 Access your workspace in Notion:")
    print(f"   https://www.notion.so/Trusto-{PARENT_PAGE_ID}")
    print(f"   Website: Trusto.inc")
    print("\n📋 Next Steps:")
    print("1. Review all created sections in Notion")
    print("2. Convert roadmap items to Notion databases")
    print("3. Upload your reference files to appropriate sections")
    print("4. Connect Google Drive integration")
    print("5. Share with team members")
    print("\n✨ Ready to create your pitch deck!")

except ImportError:
    print("❌ notion-client package not found")
    print("Install it with: pip install notion-client")
    sys.exit(1)
except Exception as e:
    print(f"❌ Error creating workspace: {e}")
    print("Please check your credentials and try again")
    sys.exit(1)