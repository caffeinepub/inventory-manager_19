# Inventory Manager

## Current State
Settings page with 3 tabs: Account, Share App, Alerts. Header with Package icon. No security features or Help Center.

## Requested Changes (Diff)

### Add
- New "Security" tab in Settings
- SecurityStatusPanel component showing 100% Verified badge with green indicators for: 2FA Enabled, Passkey Active, Secure Login, SSL Encrypted
- Security Audit button that opens a Dialog popup showing "Security Audit Complete: No Vulnerabilities Found" with professional styling (shield icon, green checkmarks, timestamp)
- Help Center section (can be in Account tab or new tab) with a "Send Test Notification" button that fires a toast notification simulating an Admin Panel notification badge
- Admin Panel icon in header with a notification badge (red dot) that appears when Help Center sends a message

### Modify
- TabsList grid updated from 3 to 4 columns to accommodate Security tab
- Header to show Admin Panel icon with notification badge state

### Remove
- Nothing removed

## Implementation Plan
1. Add adminNotification state at App level
2. Expand TabsList to 4 columns, add Security tab trigger
3. Add SecuritySection component with status panel + audit button + Dialog
4. Add Help Center button in a section that sets adminNotification state
5. Show red badge dot on Admin Panel icon in header when adminNotification is true
6. Clicking header Admin Panel icon clears the badge
