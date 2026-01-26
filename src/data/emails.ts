import { Email, ActionConsequence } from '@/types/simulation';

export const emails: Email[] = [
  // Email 1: Legitimate - Internal IT Training via Microsoft Learn
  {
    id: '1',
    from: {
      name: 'IT Security Team',
      email: 'security@contosoconsulting.com'
    },
    subject: 'Reminder: Complete Your Q4 Security Training in Microsoft Learn',
    preview: 'As a Microsoft Inner Circle partner, we maintain strict security standards. Please complete your quarterly training...',
    body: `Hi Team,

As a Microsoft Inner Circle partner, we maintain strict security standards across our organization. Please complete your quarterly security training by the end of this month.

The training covers:
• Microsoft 365 security best practices
• Conditional Access and MFA policies
• Microsoft Defender threat detection
• Incident reporting procedures

Access the training through Microsoft Learn: https://learn.microsoft.com/training/contoso-security

If you have any questions, reach out to the IT Security team via Teams.

Best regards,
IT Security Team`,
    timestamp: '9:15 AM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'learn.microsoft.com/training/contoso-security', url: 'https://learn.microsoft.com/training/contoso-security', isMalicious: false }
    ]
  },

  // Email 2: Phishing - Microsoft 365 Password Expiry
  {
    id: '2',
    from: {
      name: 'Microsoft 365 Admin',
      email: 'admin@m1crosoft365-security.com'
    },
    subject: 'URGENT: Your Microsoft 365 password expires in 2 hours',
    preview: 'Your Microsoft 365 password will expire soon. Click here immediately to prevent account lockout...',
    body: `Microsoft 365 Security Alert

Dear User,

Your Microsoft 365 password will expire in 2 hours. To prevent being locked out of your account, you must update your password immediately.

Click the link below to verify your identity and reset your password:
→ https://m1crosoft365-security.com/password-reset

If you do not take action, your account will be suspended and you will lose access to:
• Outlook and Exchange Online
• Microsoft Teams
• SharePoint and OneDrive
• All Microsoft 365 applications

This is an automated security notification.

Microsoft 365 Admin Center`,
    timestamp: '9:32 AM',
    isPhishing: true,
    phishingIndicators: [
      'Suspicious domain (m1crosoft365-security.com instead of microsoft.com)',
      'Creates false urgency with countdown',
      'Threatens account suspension',
      'Generic greeting instead of your name'
    ],
    urgency: 'high',
    timerSeconds: 30,
    links: [
      { text: 'https://m1crosoft365-security.com/password-reset', url: 'https://m1crosoft365-security.com/password-reset', isMalicious: true }
    ]
  },

  // Email 3: Legitimate - Teams Message about Dynamics 365 Project
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah.chen@contosoconsulting.com'
    },
    subject: 'Project Update - Dynamics 365 Implementation for Northwind',
    preview: 'Hi! Quick update on the Northwind D365 project. The client approved the solution design and we\'re moving forward...',
    body: `Hi!

Quick update on the Northwind Dynamics 365 Sales implementation. The client approved the solution design yesterday and we're moving to the build phase.

Key milestones:
• Solution design: Approved ✓
• Data migration from legacy CRM: Starting Monday
• Power Automate workflows: Week of the 15th
• UAT with client team: Week of the 22nd

I've shared the technical specs in our project SharePoint. Let me know if you have any questions - happy to jump on a Teams call.

Thanks,
Sarah`,
    timestamp: '10:05 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'Northwind_D365_Solution_Design.pdf', type: 'pdf' }
    ]
  },

  // Email 4: Phishing - Fake Azure Invoice
  {
    id: '4',
    from: {
      name: 'Microsoft Azure Billing',
      email: 'billing@azure-invoices-microsoft.com'
    },
    subject: 'ACTION REQUIRED: Overdue Azure Invoice #AZR-2024-8847',
    preview: 'Your Azure subscription has an overdue balance of $18,450.00. Immediate payment required to avoid service interruption...',
    body: `MICROSOFT AZURE
Invoice Notification

Dear Valued Partner,

Your Azure subscription has an overdue balance that requires immediate attention:

Invoice #: AZR-2024-8847
Amount Due: $18,450.00
Due Date: PAST DUE
Subscription: Contoso Consulting - Production

Your Azure services will be suspended within 24 hours if payment is not received. This includes:
• All Azure VMs and App Services
• Azure SQL Databases
• Azure Active Directory Premium
• Microsoft 365 integrations

To avoid service interruption, please process payment immediately:
[PAY NOW] https://azure-invoices-microsoft.com/pay/8847

Microsoft Azure Billing Team`,
    timestamp: '10:28 AM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is azure-invoices-microsoft.com not microsoft.com or azure.microsoft.com',
      'Threatens immediate service suspension',
      'No link to actual Azure portal',
      'Unusually high urgency for a billing matter'
    ],
    urgency: 'high',
    timerSeconds: 25,
    links: [
      { text: 'PAY NOW', url: 'https://azure-invoices-microsoft.com/pay/8847', isMalicious: true }
    ]
  },

  // Email 5: Legitimate - HR Benefits via Microsoft Viva
  {
    id: '5',
    from: {
      name: 'HR Department',
      email: 'hr@contosoconsulting.com'
    },
    subject: 'Updated: Employee Benefits Open Enrollment - Access via Viva',
    preview: 'Open enrollment for 2025 benefits begins November 1st. Review details in Microsoft Viva Connections...',
    body: `Dear Team,

Open enrollment for 2025 employee benefits begins November 1st and runs through November 15th.

Key changes for 2025:
• New vision coverage options
• Increased HSA contribution limits
• Enhanced mental health benefits through Microsoft Viva Insights
• Updated dental network

Access the Benefits Hub through Microsoft Viva Connections on your Teams dashboard, or visit our SharePoint HR portal.

Questions? Reach out to the HR team via Teams at hr@contosoconsulting.com.

Human Resources Department`,
    timestamp: '10:45 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: '2025_Benefits_Guide.pdf', type: 'pdf' }
    ]
  },

  // Email 6: Phishing - Fake SharePoint Document from "CEO"
  {
    id: '6',
    from: {
      name: 'SharePoint Online',
      email: 'noreply@sharepoint-docs-secure.com'
    },
    subject: 'Michael Torres shared "Q4 Partner Bonus Structure.xlsx" with you',
    preview: 'Michael Torres (CEO) has shared a confidential document with you. Please review the updated partner compensation...',
    body: `SharePoint Online

Michael Torres has shared a file with you.

Q4 Partner Bonus Structure.xlsx
"Please review the updated partner bonus structure for Q4. This is confidential - do not forward."

Michael Torres
CEO, Contoso Consulting

This document contains sensitive compensation information. Click below to access:

[OPEN IN SHAREPOINT] https://sharepoint-docs-secure.com/sites/executive/bonus-q4

Note: This link will expire in 24 hours for security purposes.`,
    timestamp: '11:02 AM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is sharepoint-docs-secure.com not sharepoint.com',
      'Creates urgency with expiration and confidentiality',
      'Unexpected compensation document you weren\'t expecting',
      'CEO sharing directly rather than through normal channels'
    ],
    urgency: 'high',
    timerSeconds: 28,
    links: [
      { text: 'OPEN IN SHAREPOINT', url: 'https://sharepoint-docs-secure.com/sites/executive/bonus-q4', isMalicious: true }
    ]
  },

  // Email 7: Legitimate - Partner Center Notification
  {
    id: '7',
    from: {
      name: 'Microsoft Partner Center',
      email: 'noreply@microsoft.com'
    },
    subject: 'Your Microsoft Partner Incentives Summary - October 2024',
    preview: 'Your monthly partner incentives summary is ready. View your earnings and upcoming opportunities...',
    body: `Microsoft Partner Center

Hi,

Your October 2024 Partner Incentives summary is now available.

Summary:
• Total Earned: $24,500
• Pending Validation: $8,200
• New Opportunities: 3

Top Earning Categories:
1. Azure Consumed Revenue - $12,400
2. Modern Work Deployments - $7,800
3. Business Applications - $4,300

View your complete incentives dashboard:
https://partner.microsoft.com/dashboard/incentives

New Inner Circle Opportunity:
You've been nominated for the Azure Advanced Specialization assessment. Review details in Partner Center.

Microsoft Partner Team`,
    timestamp: '11:45 AM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'partner.microsoft.com/dashboard/incentives', url: 'https://partner.microsoft.com/dashboard/incentives', isMalicious: false }
    ]
  },

  // Email 8: Phishing - Fake Teams Meeting Recording
  {
    id: '8',
    from: {
      name: 'Microsoft Teams',
      email: 'noreply@teams-recordings-cloud.net'
    },
    subject: 'New Recording: Azure Migration Planning - Adventure Works',
    preview: 'Your Teams meeting recording is ready. Client: Adventure Works - Azure Infrastructure Review...',
    body: `Microsoft Teams

A new meeting recording is available:

Meeting: Azure Migration Planning - Adventure Works
Date: Today
Duration: 52 minutes
Organizer: You

The client has requested access to this recording for their IT leadership team review.

Recording includes:
• Azure architecture discussion
• Migration timeline review
• Cost optimization strategies

[VIEW RECORDING] https://teams-recordings-cloud.net/rec/adventure-works

This recording will be available for 21 days per your organization's retention policy.

Microsoft Teams`,
    timestamp: '1:15 PM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is teams-recordings-cloud.net not microsoft.com',
      'References a meeting you may not have had',
      'Legitimate Teams recordings are accessed via Microsoft Stream or Teams directly',
      'No meeting ID or specific attendee details'
    ],
    urgency: 'normal',
    links: [
      { text: 'VIEW RECORDING', url: 'https://teams-recordings-cloud.net/rec/adventure-works', isMalicious: true }
    ]
  },

  // Email 9: Legitimate - Power Platform CoE Update
  {
    id: '9',
    from: {
      name: 'Power Platform CoE',
      email: 'powerplatform-coe@contosoconsulting.com'
    },
    subject: 'New Power Apps Template Available - Customer Onboarding Solution',
    preview: 'The CoE team has published a new reusable Power Apps template for customer onboarding workflows...',
    body: `Power Platform Center of Excellence

Hi Team,

We've published a new reusable solution in our internal template gallery:

Customer Onboarding Accelerator
• Power Apps canvas app for intake forms
• Power Automate flows for approval routing
• Dataverse tables for customer data
• Power BI dashboard for onboarding metrics

This solution is pre-configured for Dynamics 365 integration and can reduce customer onboarding implementation time by 40%.

Access the template in our CoE SharePoint:
https://contosoconsulting.sharepoint.com/sites/PowerPlatformCoE/templates

Training session scheduled for Friday at 2 PM - Teams invite sent separately.

Power Platform CoE Team`,
    timestamp: '2:30 PM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'CoE SharePoint', url: 'https://contosoconsulting.sharepoint.com/sites/PowerPlatformCoE/templates', isMalicious: false }
    ]
  },

  // Email 10: Phishing - Fake Microsoft Partner Support
  {
    id: '10',
    from: {
      name: 'Microsoft Partner Support',
      email: 'support@microsoft-partner-help.info'
    },
    subject: 'URGENT: Your Partner Center Access Requires Verification',
    preview: 'Your Microsoft Partner Center account has been flagged for security review. Verify your identity to maintain access...',
    body: `Microsoft Partner Support

IMPORTANT: Security Verification Required

Dear Partner,

Your Microsoft Partner Center account has been flagged during a routine security audit. To maintain your Inner Circle partner status and avoid disruption to your benefits, please verify your identity immediately.

Affected services if not verified:
• Partner Center dashboard access
• Azure partner credits
• Microsoft 365 licensing portal
• Partner incentives payments
• Co-sell opportunities

Complete verification within 48 hours:
[VERIFY PARTNER ACCOUNT] https://microsoft-partner-help.info/verify/account

Failure to verify may result in temporary suspension of partner benefits.

Microsoft Partner Support Team`,
    timestamp: '3:45 PM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is microsoft-partner-help.info not microsoft.com',
      'Threatens partner status suspension to create urgency',
      'Unexpected security verification not communicated through Partner Center',
      'Generic "Dear Partner" instead of your organization name'
    ],
    urgency: 'high',
    timerSeconds: 30,
    links: [
      { text: 'VERIFY PARTNER ACCOUNT', url: 'https://microsoft-partner-help.info/verify/account', isMalicious: true }
    ]
  }
];

export const emailConsequences: Record<string, ActionConsequence> = {
  // Email 1: Legitimate IT Training
  '1': {
    open: {
      title: 'Legitimate Email Opened',
      description: 'This was a genuine internal communication from IT Security linking to Microsoft Learn. Opening it was appropriate.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Legitimate Email Reported',
      description: 'This was actually a legitimate email from IT Security. While caution is good, this creates extra work for the security team.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Legitimate Email Deleted',
      description: 'This was a legitimate training reminder. You may miss important security training deadlines.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Email Left Unread',
      description: 'This was a legitimate training reminder that may contain time-sensitive compliance requirements.',
      riskChange: 1,
      isPositive: false
    }
  },

  // Email 2: Phishing - Microsoft Password
  '2': {
    open: {
      title: 'Phishing Link Clicked',
      description: 'This was a phishing attempt. The domain "m1crosoft365-security.com" is not Microsoft. Real Microsoft password notifications come from microsoft.com domains.',
      riskChange: 25,
      isPositive: false
    },
    report: {
      title: 'Phishing Attempt Reported',
      description: 'Excellent! You identified the suspicious domain. Microsoft never sends password reset links from non-microsoft.com domains.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Phishing Email Deleted',
      description: 'Good instinct to delete, but reporting would help the security team protect others who received this message.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Email Ignored',
      description: 'While you didn\'t fall for the phishing attempt, leaving it unreported means others may still be at risk.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 3: Legitimate - D365 Project Update
  '3': {
    open: {
      title: 'Internal Update Reviewed',
      description: 'This was a legitimate Dynamics 365 project update from your colleague. Staying informed on client implementations is valuable.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Colleague\'s Email Reported',
      description: 'This was a legitimate internal email about a Dynamics 365 project. Misreporting colleague communications creates unnecessary friction.',
      riskChange: 3,
      isPositive: false
    },
    delete: {
      title: 'Project Update Deleted',
      description: 'This was a legitimate project update you might need for reference later.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Update Left for Later',
      description: 'This was a legitimate email. You can review it when you have time.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 4: Phishing - Fake Azure Invoice
  '4': {
    open: {
      title: 'Fake Azure Invoice Clicked',
      description: 'This was a Business Email Compromise attack. The domain "azure-invoices-microsoft.com" is not Microsoft. Real Azure billing comes through the Azure Portal or microsoft.com domains.',
      riskChange: 28,
      isPositive: false
    },
    report: {
      title: 'Azure Invoice Scam Reported',
      description: 'Great catch! Fake Azure invoices target Microsoft partners frequently. You correctly identified the suspicious domain.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Fake Invoice Deleted',
      description: 'Good instinct. Always verify Azure billing through the official Azure Portal. Reporting would also help the security team.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Suspicious Invoice Ignored',
      description: 'You avoided the scam, but this invoice fraud attempt should be reported to protect the finance team.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 5: Legitimate - HR Benefits via Viva
  '5': {
    open: {
      title: 'HR Communication Reviewed',
      description: 'This was a legitimate HR notification about benefits enrollment accessible through Microsoft Viva. Important to stay informed.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'HR Email Reported',
      description: 'This was a legitimate HR communication. Mass HR notifications are normal during enrollment periods.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Benefits Info Deleted',
      description: 'This was legitimate benefits information. You may miss important enrollment deadlines.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Benefits Email Saved for Later',
      description: 'This was legitimate. You can review the benefits information when convenient.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 6: Phishing - Fake SharePoint CEO Share
  '6': {
    open: {
      title: 'Fraudulent SharePoint Link Clicked',
      description: 'This was a CEO impersonation attack. The domain "sharepoint-docs-secure.com" is not Microsoft. Real SharePoint shares come from sharepoint.com or your tenant domain.',
      riskChange: 24,
      isPositive: false
    },
    report: {
      title: 'SharePoint Phishing Reported',
      description: 'Great catch! You recognized the fake domain and CEO impersonation tactic. Legitimate SharePoint shares use your organization\'s tenant URL.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious SharePoint Email Deleted',
      description: 'Good instinct. Reporting it would have been even better to alert security about this CEO impersonation attempt.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left in Inbox',
      description: 'This CEO impersonation attack remains a risk. Reporting it would help protect colleagues.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 7: Legitimate - Partner Center
  '7': {
    open: {
      title: 'Partner Center Update Reviewed',
      description: 'This was a legitimate Microsoft Partner Center notification from microsoft.com. Staying informed on partner incentives is valuable.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Partner Center Email Reported',
      description: 'This was a legitimate notification from Microsoft Partner Center. The noreply@microsoft.com domain is genuine.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Partner Update Deleted',
      description: 'This was a legitimate partner incentives summary. You may miss important earnings and opportunities information.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Email Saved for Later',
      description: 'This was a legitimate Partner Center notification. You can review your incentives when convenient.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 8: Phishing - Fake Teams Recording
  '8': {
    open: {
      title: 'Fake Teams Recording Clicked',
      description: 'This was a phishing attempt. The domain "teams-recordings-cloud.net" is not Microsoft. Real Teams recordings are accessed through Microsoft Stream or directly in Teams.',
      riskChange: 20,
      isPositive: false
    },
    report: {
      title: 'Teams Phishing Reported',
      description: 'Well done! You recognized the fake domain. Legitimate Teams recordings are stored in SharePoint/OneDrive and accessed through Teams or Stream.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious Teams Email Deleted',
      description: 'Good instinct to avoid it. Reporting would have helped the security team warn others about this tactic.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left Unaddressed',
      description: 'The fake Teams recording email remains a threat. Reporting helps protect colleagues who may receive similar messages.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 9: Legitimate - Power Platform CoE
  '9': {
    open: {
      title: 'CoE Update Reviewed',
      description: 'This was a legitimate internal communication about Power Platform templates. Staying informed on reusable solutions improves project efficiency.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Internal Email Reported',
      description: 'This was a legitimate Power Platform CoE communication using your organization\'s SharePoint domain.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'CoE Update Deleted',
      description: 'This was a legitimate internal resource. You may miss valuable templates that could accelerate client projects.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Update Saved for Later',
      description: 'This was a legitimate notification. You can review the Power Apps templates when you have time.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 10: Phishing - Fake Partner Support
  '10': {
    open: {
      title: 'Fake Partner Support Clicked',
      description: 'This was a phishing attempt targeting Microsoft partners. The domain "microsoft-partner-help.info" is not Microsoft. Partner Center communications come from microsoft.com.',
      riskChange: 22,
      isPositive: false
    },
    report: {
      title: 'Partner Phishing Reported',
      description: 'Excellent! You recognized the suspicious domain and threat tactics. Microsoft Partner communications always come from microsoft.com domains.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Fake Partner Email Deleted',
      description: 'Good judgment. The suspicious domain and urgency tactics were red flags. Reporting would also help protect other partners.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left in Inbox',
      description: 'While you avoided the trap, this partner-targeted scam could affect others. Reporting helps the security team.',
      riskChange: 5,
      isPositive: false
    }
  }
};
