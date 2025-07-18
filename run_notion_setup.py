#!/usr/bin/env python3
"""
Enhanced Notion Workspace Setup for Veristruct

This script creates a comprehensive Notion workspace with all the business intelligence
from your reference files, email conversations, and strategic planning.

Before running:
1. Create a Notion integration at https://www.notion.so/my-integrations
2. Get your integration token
3. Create a parent page in Notion and get its ID
4. Share the parent page with your integration

Usage:
    python run_notion_setup.py
"""

import os
import sys

def check_requirements():
    """Check if required packages are installed"""
    try:
        import notion_client
        print("✅ notion-client package found")
        return True
    except ImportError:
        print("❌ notion-client package not found")
        print("Please install it with: pip install notion-client")
        return False

def get_credentials():
    """Get Notion credentials from user"""
    print("\n📋 Notion Setup Required")
    print("=" * 50)
    print("Before we start, you need:")
    print("1. A Notion integration token")
    print("2. A parent page ID where the workspace will be created")
    print("\nIf you don't have these:")
    print("• Create integration: https://www.notion.so/my-integrations")
    print("• Create a page in Notion for your workspace")
    print("• Share that page with your integration")
    print("• Copy the page ID from the URL")
    print("=" * 50)
    
    token = os.environ.get('NOTION_TOKEN')
    if not token:
        token = input('\n🔑 Enter your Notion integration token: ').strip()
        if not token:
            print("❌ Token is required")
            return None, None
    
    page_id = os.environ.get('NOTION_PARENT_PAGE_ID')  
    if not page_id:
        page_id = input('📄 Enter the parent page ID: ').strip()
        if not page_id:
            print("❌ Page ID is required")
            return None, None
    
    return token, page_id

def main():
    print("🚀 Veristruct Notion Workspace Setup")
    print("Creating comprehensive business intelligence workspace...")
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Get credentials
    token, page_id = get_credentials()
    if not token or not page_id:
        sys.exit(1)
    
    # Set environment variables
    os.environ['NOTION_TOKEN'] = token
    os.environ['NOTION_PARENT_PAGE_ID'] = page_id
    
    print("\n🔧 Setting up workspace structure...")
    
    # Import and run the workspace builder
    try:
        import enhanced_notion_workspace
        print("\n✨ Workspace setup complete!")
        print(f"\n🔗 Access your workspace in Notion:")
        print(f"   Page ID: {page_id}")
        print("\n📋 Next Steps:")
        print("1. Review all created sections")
        print("2. Convert tables to Notion databases")
        print("3. Upload your reference files")
        print("4. Connect Google Drive integration")
        print("5. Share with team members")
        
    except Exception as e:
        print(f"❌ Error setting up workspace: {e}")
        print("Please check your credentials and try again")
        sys.exit(1)

if __name__ == "__main__":
    main()