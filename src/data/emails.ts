import { Email, ActionConsequence } from '@/types/simulation';

export const emails: Email[] = [
  // Email 1: Legitimate - IT Security Training
  {
    id: '1',
    from: {
      name: 'IT Security Team',
      email: 'security@yourcompany.com'
    },
    subject: 'Reminder: Complete Your Quarterly Security Training',
    preview: 'Please complete your quarterly security awareness training by the end of this month...',
    body: `Hi Team,

Please complete your quarterly security awareness training by the end of this month.

The training covers:
• Recognizing phishing attempts
• Password best practices
• Secure file sharing
• Incident reporting procedures

Access the training through our learning portal: https://learn.yourcompany.com/security-training

If you have any questions, reach out to the IT Security team.

Best regards,
IT Security Team`,
    timestamp: '9:15 AM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'learn.yourcompany.com/security-training', url: 'https://learn.yourcompany.com/security-training', isMalicious: false }
    ]
  },

  // Email 2: Phishing - Password Expiry
  {
    id: '2',
    from: {
      name: 'IT Helpdesk',
      email: 'support@1t-helpdesk-secure.com'
    },
    subject: 'URGENT: Your password expires in 2 hours',
    preview: 'Your account password will expire soon. Click here immediately to prevent account lockout...',
    body: `IT Security Alert

Dear User,

Your account password will expire in 2 hours. To prevent being locked out of your account, you must update your password immediately.

Click the link below to verify your identity and reset your password:
→ https://1t-helpdesk-secure.com/password-reset

If you do not take action, your account will be suspended and you will lose access to:
• Email and calendar
• Company applications
• Shared files and folders
• All internal systems

This is an automated security notification.

IT Helpdesk`,
    timestamp: '9:32 AM',
    isPhishing: true,
    phishingIndicators: [
      'Suspicious domain (1t-helpdesk-secure.com - uses "1" instead of "i")',
      'Creates false urgency with countdown',
      'Threatens account suspension',
      'Generic greeting instead of your name'
    ],
    urgency: 'high',
    timerSeconds: 30,
    links: [
      { text: 'https://1t-helpdesk-secure.com/password-reset', url: 'https://1t-helpdesk-secure.com/password-reset', isMalicious: true }
    ]
  },

  // Email 3: Legitimate - Project Update from Colleague
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah.chen@yourcompany.com'
    },
    subject: 'Project Update - Client Implementation',
    preview: 'Hi! Quick update on the Northwind project. The client approved the design and we\'re moving forward...',
    body: `Hi!

Quick update on the Northwind project. The client approved the solution design yesterday and we're moving to the implementation phase.

Key milestones:
• Solution design: Approved ✓
• Data migration: Starting Monday
• Integration testing: Week of the 15th
• User acceptance testing: Week of the 22nd

I've shared the technical specs in our shared drive. Let me know if you have any questions - happy to jump on a call.

Thanks,
Sarah`,
    timestamp: '10:05 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'Northwind_Solution_Design.pdf', type: 'pdf' }
    ]
  },

  // Email 4: Phishing - Fake Invoice
  {
    id: '4',
    from: {
      name: 'Accounts Payable',
      email: 'billing@secure-invoices-portal.com'
    },
    subject: 'ACTION REQUIRED: Overdue Invoice #INV-2024-8847',
    preview: 'Your account has an overdue balance of $4,850.00. Immediate payment required to avoid service interruption...',
    body: `INVOICE NOTIFICATION

Dear Valued Customer,

Your account has an overdue balance that requires immediate attention:

Invoice #: INV-2024-8847
Amount Due: $4,850.00
Due Date: PAST DUE
Account: Your Company - Services

Your services will be suspended within 24 hours if payment is not received. This includes:
• All active subscriptions
• Cloud storage access
• Support services
• API integrations

To avoid service interruption, please process payment immediately:
[PAY NOW] https://secure-invoices-portal.com/pay/8847

Accounts Payable Team`,
    timestamp: '10:28 AM',
    isPhishing: true,
    phishingIndicators: [
      'Unknown sender domain (secure-invoices-portal.com)',
      'Threatens immediate service suspension',
      'No reference to specific services you actually use',
      'Unusually high urgency for a billing matter'
    ],
    urgency: 'high',
    timerSeconds: 25,
    links: [
      { text: 'PAY NOW', url: 'https://secure-invoices-portal.com/pay/8847', isMalicious: true }
    ]
  },

  // Email 5: Phishing - Fake Shared Document
  {
    id: '5',
    from: {
      name: 'Document Share',
      email: 'noreply@docs-share-secure.net'
    },
    subject: 'James Wilson shared "Q4 Bonus Structure.xlsx" with you',
    preview: 'James Wilson (CEO) has shared a confidential document with you. Please review the updated compensation...',
    body: `Document Sharing Service

James Wilson has shared a file with you.

Q4 Bonus Structure.xlsx
"Please review the updated bonus structure for Q4. This is confidential - do not forward."

James Wilson
CEO, Your Company

This document contains sensitive compensation information. Click below to access:

[OPEN DOCUMENT] https://docs-share-secure.net/files/bonus-q4

Note: This link will expire in 24 hours for security purposes.`,
    timestamp: '11:02 AM',
    isPhishing: true,
    phishingIndicators: [
      'Unknown sharing service domain (docs-share-secure.net)',
      'Creates urgency with expiration and confidentiality',
      'Unexpected compensation document you weren\'t expecting',
      'CEO sharing directly rather than through normal channels'
    ],
    urgency: 'high',
    timerSeconds: 28,
    links: [
      { text: 'OPEN DOCUMENT', url: 'https://docs-share-secure.net/files/bonus-q4', isMalicious: true }
    ]
  }
];

export const emailConsequences: Record<string, ActionConsequence> = {
  // Email 1: Legitimate IT Training
  '1': {
    open: {
      title: 'Legitimate Email Opened',
      description: 'This was a genuine internal communication from IT Security. Opening it was appropriate.',
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

  // Email 2: Phishing - Password Expiry
  '2': {
    open: {
      title: 'Phishing Link Clicked',
      description: 'This was a phishing attempt. The domain "1t-helpdesk-secure.com" uses "1" instead of "i". Real IT notifications come from your company domain.',
      riskChange: 25,
      isPositive: false
    },
    report: {
      title: 'Phishing Attempt Reported',
      description: 'Excellent! You identified the suspicious domain and character substitution. Legitimate password notifications come from your company\'s domain.',
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

  // Email 3: Legitimate - Project Update
  '3': {
    open: {
      title: 'Internal Update Reviewed',
      description: 'This was a legitimate project update from your colleague. Staying informed on client implementations is valuable.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Colleague\'s Email Reported',
      description: 'This was a legitimate internal email about a project. Misreporting colleague communications creates unnecessary friction.',
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

  // Email 4: Phishing - Fake Invoice
  '4': {
    open: {
      title: 'Fake Invoice Clicked',
      description: 'This was a Business Email Compromise attack. The domain "secure-invoices-portal.com" is not from any known vendor. Always verify billing through official channels.',
      riskChange: 28,
      isPositive: false
    },
    report: {
      title: 'Invoice Scam Reported',
      description: 'Great catch! Fake invoices are a common attack vector. You correctly identified the suspicious domain and urgency tactics.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Fake Invoice Deleted',
      description: 'Good instinct. Always verify billing through official channels. Reporting would also help the security team.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Suspicious Invoice Ignored',
      description: 'While you avoided clicking, not reporting this phishing attempt leaves colleagues vulnerable.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 5: Phishing - Fake Document Share
  '5': {
    open: {
      title: 'Phishing Link Clicked',
      description: 'This was a credential harvesting attack. The domain "docs-share-secure.net" is not a legitimate document sharing service. Real shared documents come from your company\'s platforms.',
      riskChange: 25,
      isPositive: false
    },
    report: {
      title: 'Phishing Attempt Reported',
      description: 'Excellent work! You identified the fake document sharing service. "CEO bonus" emails are a classic social engineering tactic.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious Email Deleted',
      description: 'Smart move. Unexpected "confidential" documents from executives are a major red flag. Reporting would help protect colleagues.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Email Ignored',
      description: 'While you didn\'t click, leaving this unreported means others might fall for the "CEO bonus" trick.',
      riskChange: 5,
      isPositive: false
    }
  }
};
