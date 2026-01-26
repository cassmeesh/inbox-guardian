import { Email, ActionConsequence } from '@/types/simulation';

export const emails: Email[] = [
  {
    id: '1',
    from: {
      name: 'IT Security Team',
      email: 'security@yourcompany.com'
    },
    subject: 'Reminder: Complete Your Q4 Security Training',
    preview: 'As part of our ongoing security awareness program, please complete your quarterly training...',
    body: `Hi Team,

As part of our ongoing security awareness program, please complete your quarterly security training by the end of this month.

The training covers:
• Updated password policies
• New phishing detection techniques
• Incident reporting procedures

Access the training portal here: https://training.yourcompany.com/security

If you have any questions, reach out to the IT Security team.

Best regards,
IT Security Team`,
    timestamp: '9:15 AM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'training.yourcompany.com/security', url: 'https://training.yourcompany.com/security', isMalicious: false }
    ]
  },
  {
    id: '2',
    from: {
      name: 'Microsoft 365',
      email: 'no-reply@m1crosoft-secure.net'
    },
    subject: 'URGENT: Your password expires in 2 hours',
    preview: 'Your Microsoft 365 password will expire soon. Click here immediately to prevent account lockout...',
    body: `Dear User,

Your Microsoft 365 password will expire in 2 hours. To prevent being locked out of your account, you must update your password immediately.

Click the link below to verify your identity and reset your password:
→ https://m1crosoft-secure.net/password-reset

If you do not take action, your account will be suspended and you will lose access to all Microsoft services including email, Teams, and OneDrive.

This is an automated security notification.

Microsoft 365 Security Team`,
    timestamp: '9:32 AM',
    isPhishing: true,
    phishingIndicators: [
      'Suspicious domain (m1crosoft-secure.net instead of microsoft.com)',
      'Creates false urgency with countdown',
      'Threatens account suspension',
      'Generic greeting instead of your name'
    ],
    urgency: 'high',
    timerSeconds: 30,
    links: [
      { text: 'https://m1crosoft-secure.net/password-reset', url: 'https://m1crosoft-secure.net/password-reset', isMalicious: true }
    ]
  },
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah.chen@yourcompany.com'
    },
    subject: 'Project Update - Q4 Dashboard',
    preview: 'Hi! Quick update on the dashboard project. The client approved the mockups and we\'re moving forward...',
    body: `Hi!

Quick update on the dashboard project. The client approved the mockups yesterday and we're moving forward with development.

Key milestones:
• Design handoff: Completed ✓
• Frontend development: Starting Monday
• QA testing: Week of the 15th
• Client review: Week of the 22nd

I've attached the final design specs for your reference. Let me know if you have any questions or concerns.

Thanks,
Sarah`,
    timestamp: '10:05 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'Q4_Dashboard_Specs.pdf', type: 'pdf' }
    ]
  },
  {
    id: '4',
    from: {
      name: 'HR Department',
      email: 'hr-notifications@yourcompany.com'
    },
    subject: 'Updated: Employee Benefits Open Enrollment',
    preview: 'Open enrollment for 2025 benefits begins November 1st. Review the attached guide for changes...',
    body: `Dear Team,

Open enrollment for 2025 employee benefits begins November 1st and runs through November 15th.

Key changes for 2025:
• New vision coverage options
• Increased HSA contribution limits
• Enhanced mental health benefits
• Updated dental network

Please review the attached Benefits Guide for complete details. You can make changes through the HR portal at hr.yourcompany.com.

Questions? Contact the HR team at hr@yourcompany.com or extension 4500.

Human Resources Department`,
    timestamp: '10:28 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: '2025_Benefits_Guide.pdf', type: 'pdf' }
    ]
  },
  {
    id: '5',
    from: {
      name: 'DocuSign',
      email: 'notification@docusign-secure.com'
    },
    subject: 'Complete required: Executive Bonus Agreement',
    preview: 'You have a document pending signature. The CFO has requested your immediate attention on this matter...',
    body: `DOCUSIGN

You have received a document for electronic signature from: 
James Morrison, CFO

Document: Executive_Bonus_Agreement_2024.pdf

This document requires your immediate signature. The CFO has marked this as urgent.

REVIEW DOCUMENT: https://docusign-secure.com/sign/8x7k2m

This message was sent by DocuSign. Please do not reply directly.`,
    timestamp: '11:02 AM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is docusign-secure.com not docusign.com',
      'Creates urgency by referencing executive authority',
      'Vague document details',
      'Unexpected bonus agreement you weren\'t expecting'
    ],
    urgency: 'high',
    timerSeconds: 25,
    links: [
      { text: 'REVIEW DOCUMENT', url: 'https://docusign-secure.com/sign/8x7k2m', isMalicious: true }
    ]
  },
  {
    id: '6',
    from: {
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@partner-corp.com'
    },
    subject: 'Re: Partnership Proposal Follow-up',
    preview: 'Thanks for sending over the proposal draft. Our legal team reviewed it and has a few minor suggestions...',
    body: `Hi,

Thanks for sending over the proposal draft. Our legal team reviewed it and has a few minor suggestions:

1. Section 3.2 - They'd like to clarify the delivery timeline language
2. Section 5.1 - Minor revision to the liability clause wording
3. Exhibit B - Updated pricing based on our latest discussion

I've attached the redlined version. Most changes are minor clarifications. Let me know if you'd like to schedule a call to discuss.

Best,
Alex Rodriguez
Partner Corp - Business Development`,
    timestamp: '11:45 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'Partnership_Proposal_Redlined.docx', type: 'docx' }
    ]
  },
  {
    id: '7',
    from: {
      name: 'Dropbox',
      email: 'no-reply@dropbox-share.info'
    },
    subject: 'Important: Shared folder access expiring',
    preview: 'A shared folder "Financial Reports 2024" requires verification. Click to maintain access...',
    body: `Dropbox Notification

Your access to shared folder "Financial Reports 2024" is about to expire.

The folder owner has requested that all viewers re-verify their access permissions due to a recent security audit.

To maintain access to your files, please verify your identity:

[VERIFY ACCESS NOW]
https://dropbox-share.info/verify/financial-reports

If you do not verify within 24 hours, your access will be revoked and files may be permanently deleted.

Dropbox Security Team`,
    timestamp: '1:15 PM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is dropbox-share.info not dropbox.com',
      'Threatens file deletion to create urgency',
      'Vague reference to "security audit"',
      'Unusual verification request'
    ],
    urgency: 'high',
    timerSeconds: 28,
    links: [
      { text: 'VERIFY ACCESS NOW', url: 'https://dropbox-share.info/verify/financial-reports', isMalicious: true }
    ]
  }
];

export const emailConsequences: Record<string, ActionConsequence> = {
  '1': {
    open: {
      title: 'Legitimate Email Opened',
      description: 'This was a genuine internal communication from IT Security. Opening it was appropriate.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Legitimate Email Reported',
      description: 'This was actually a legitimate email from IT Security. While erring on caution is good, this adds slight workload for the security team.',
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
      description: 'This was a legitimate training reminder that may contain time-sensitive information.',
      riskChange: 1,
      isPositive: false
    }
  },
  '2': {
    open: {
      title: 'Phishing Link Clicked',
      description: 'This was a phishing attempt. The domain "m1crosoft-secure.net" is not Microsoft. Clicking could have exposed your credentials to attackers.',
      riskChange: 25,
      isPositive: false
    },
    report: {
      title: 'Phishing Attempt Reported',
      description: 'Excellent! You identified the suspicious domain and urgency tactics. Reporting helps protect the entire organization.',
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
  '3': {
    open: {
      title: 'Internal Update Reviewed',
      description: 'This was a legitimate project update from your colleague. Staying informed on project status is valuable.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Colleague\'s Email Reported',
      description: 'This was a legitimate internal email. Misreporting colleague communications creates unnecessary friction.',
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
  '4': {
    open: {
      title: 'HR Communication Reviewed',
      description: 'This was a legitimate HR notification about benefits enrollment. Important to stay informed about these deadlines.',
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
  '5': {
    open: {
      title: 'Fraudulent DocuSign Clicked',
      description: 'This was a phishing attempt impersonating DocuSign. The real domain is docusign.com, not docusign-secure.com. Attackers often use executive authority to pressure quick action.',
      riskChange: 20,
      isPositive: false
    },
    report: {
      title: 'DocuSign Phishing Reported',
      description: 'Great catch! You recognized the suspicious domain and the manipulation tactic using executive authority. This helps protect others.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious DocuSign Deleted',
      description: 'Good instinct. Reporting it would have been even better to alert security, but you avoided the risk.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left in Inbox',
      description: 'This phishing attempt remains a risk. Reporting it would help protect the organization.',
      riskChange: 5,
      isPositive: false
    }
  },
  '6': {
    open: {
      title: 'Partner Email Reviewed',
      description: 'This was a legitimate business communication from an external partner regarding an ongoing project.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Partner Email Reported',
      description: 'This was a legitimate external communication. While external emails warrant scrutiny, this one was genuine.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Partner Communication Deleted',
      description: 'This was a legitimate email with important contract revisions you may need.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Email Saved for Later',
      description: 'This was a legitimate partner communication. You can review it when you have time.',
      riskChange: 0,
      isPositive: true
    }
  },
  '7': {
    open: {
      title: 'Fake Dropbox Link Clicked',
      description: 'This was a phishing attempt. The domain "dropbox-share.info" is not affiliated with Dropbox. The threat of file deletion was designed to create panic.',
      riskChange: 22,
      isPositive: false
    },
    report: {
      title: 'Dropbox Phishing Reported',
      description: 'Well done! You recognized the fake domain and the manipulation tactic. Reporting protects your colleagues.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious Dropbox Email Deleted',
      description: 'Good instinct to avoid it. Reporting would have been the ideal action to help the security team.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left Unaddressed',
      description: 'The phishing email wasn\'t acted upon, but reporting it would help protect the organization.',
      riskChange: 5,
      isPositive: false
    }
  }
};
