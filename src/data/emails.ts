import { Email, ActionConsequence } from '@/types/simulation';

export const emails: Email[] = [
  // Email 1: Legitimate - Internal IT Training
  {
    id: '1',
    from: {
      name: 'IT Security Team',
      email: 'security@acmeconsulting.com'
    },
    subject: 'Reminder: Complete Your Q4 Security Training',
    preview: 'As part of our ongoing security awareness program, please complete your quarterly training...',
    body: `Hi Team,

As part of our ongoing security awareness program, please complete your quarterly security training by the end of this month.

The training covers:
• Updated password policies
• New phishing detection techniques  
• Incident reporting procedures

Access the training portal here: https://training.acmeconsulting.com/security

If you have any questions, reach out to the IT Security team.

Best regards,
IT Security Team`,
    timestamp: '9:15 AM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'training.acmeconsulting.com/security', url: 'https://training.acmeconsulting.com/security', isMalicious: false }
    ]
  },

  // Email 2: Phishing - Microsoft 365 Password Expiry
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

  // Email 3: Legitimate - Project Update from Colleague
  {
    id: '3',
    from: {
      name: 'Sarah Chen',
      email: 'sarah.chen@acmeconsulting.com'
    },
    subject: 'Project Update - Enterprise Dashboard for TechCorp',
    preview: 'Hi! Quick update on the TechCorp dashboard project. The client approved the mockups and we\'re moving forward...',
    body: `Hi!

Quick update on the TechCorp dashboard project. The client approved the mockups yesterday and we're moving forward with development.

Key milestones:
• Design handoff: Completed ✓
• Frontend development: Starting Monday
• QA testing: Week of the 15th
• Client demo: Week of the 22nd

I've attached the final design specs for your reference. Let me know if you have any questions or concerns.

Thanks,
Sarah`,
    timestamp: '10:05 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'TechCorp_Dashboard_Specs.pdf', type: 'pdf' }
    ]
  },

  // Email 4: Phishing - Fake Vendor Invoice (BEC Attack)
  {
    id: '4',
    from: {
      name: 'AWS Billing',
      email: 'billing@aws-invoices-payments.com'
    },
    subject: 'ACTION REQUIRED: Overdue Invoice #INV-2024-8847',
    preview: 'Your AWS account has an overdue balance of $12,847.00. Immediate payment required to avoid service interruption...',
    body: `AMAZON WEB SERVICES
Invoice Notification

Dear Valued Customer,

Your AWS account has an overdue balance that requires immediate attention:

Invoice #: INV-2024-8847
Amount Due: $12,847.00
Due Date: PAST DUE

Your services will be suspended within 24 hours if payment is not received.

To avoid service interruption, please process payment immediately:
[PAY NOW] https://aws-invoices-payments.com/pay/8847

If you believe this is an error, contact our billing department.

AWS Billing Team`,
    timestamp: '10:28 AM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is aws-invoices-payments.com not amazon.com or aws.amazon.com',
      'Threatens immediate service suspension',
      'No specific account details or reference to your actual AWS account',
      'Unusually high urgency for a billing matter'
    ],
    urgency: 'high',
    timerSeconds: 25,
    links: [
      { text: 'PAY NOW', url: 'https://aws-invoices-payments.com/pay/8847', isMalicious: true }
    ]
  },

  // Email 5: Legitimate - HR Benefits Enrollment
  {
    id: '5',
    from: {
      name: 'HR Department',
      email: 'hr-notifications@acmeconsulting.com'
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

Please review the attached Benefits Guide for complete details. You can make changes through the HR portal at hr.acmeconsulting.com.

Questions? Contact the HR team at hr@acmeconsulting.com or extension 4500.

Human Resources Department`,
    timestamp: '10:45 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: '2025_Benefits_Guide.pdf', type: 'pdf' }
    ]
  },

  // Email 6: Phishing - Fake DocuSign from "CEO"
  {
    id: '6',
    from: {
      name: 'DocuSign',
      email: 'notification@docusign-secure.com'
    },
    subject: 'Complete required: Consulting Agreement - Urgent',
    preview: 'David Mitchell (CEO) has requested your signature on a consulting agreement. Please review immediately...',
    body: `DOCUSIGN

You have received a document for electronic signature from: 
David Mitchell, CEO - ACME Consulting

Document: Consulting_Services_Agreement_Confidential.pdf

This document requires your immediate signature. The CEO has marked this as time-sensitive for a new client engagement.

REVIEW DOCUMENT: https://docusign-secure.com/sign/9k3m2x

This message was sent by DocuSign. Please do not reply directly.`,
    timestamp: '11:02 AM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is docusign-secure.com not docusign.com',
      'Creates urgency by referencing CEO authority',
      'Unexpected document you weren\'t expecting',
      'Vague "confidential" document details'
    ],
    urgency: 'high',
    timerSeconds: 28,
    links: [
      { text: 'REVIEW DOCUMENT', url: 'https://docusign-secure.com/sign/9k3m2x', isMalicious: true }
    ]
  },

  // Email 7: Legitimate - Client Follow-up
  {
    id: '7',
    from: {
      name: 'Marcus Johnson',
      email: 'mjohnson@innovatech-solutions.com'
    },
    subject: 'Re: Software Integration Proposal Follow-up',
    preview: 'Thanks for the detailed proposal. Our technical team reviewed it and has a few questions about the API integration...',
    body: `Hi,

Thanks for the detailed proposal for our CRM integration project. Our technical team reviewed it and has some follow-up questions:

1. API rate limits - Can we get clarification on the expected call volumes?
2. Data migration - What's the estimated timeline for the legacy data transfer?
3. Training - Do you offer on-site training sessions for our team?

I've attached our technical requirements document for reference. Can we schedule a call for Thursday afternoon to discuss?

Best regards,
Marcus Johnson
VP of Technology
InnovaTech Solutions`,
    timestamp: '11:45 AM',
    isPhishing: false,
    urgency: 'normal',
    attachments: [
      { name: 'InnovaTech_Technical_Requirements.pdf', type: 'pdf' }
    ]
  },

  // Email 8: Phishing - Fake Zoom Recording (Client Impersonation)
  {
    id: '8',
    from: {
      name: 'Zoom Recordings',
      email: 'noreply@zoom-cloud-recordings.net'
    },
    subject: 'New Recording: Sales Demo - GlobalTech Enterprise',
    preview: 'Your meeting recording is ready. Client: GlobalTech Enterprise - Q4 Sales Presentation...',
    body: `Zoom Cloud Recordings

A new cloud recording is available from your recent meeting:

Meeting: Sales Demo - GlobalTech Enterprise
Date: Today
Duration: 47 minutes
Host: You

The client has requested access to this recording for their procurement team review.

DOWNLOAD RECORDING: https://zoom-cloud-recordings.net/rec/globaltech-demo

This recording will expire in 7 days.

- Zoom Team`,
    timestamp: '1:15 PM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is zoom-cloud-recordings.net not zoom.us',
      'References a meeting you may not have had',
      'Creates urgency with expiration',
      'No meeting ID or specific details'
    ],
    urgency: 'normal',
    links: [
      { text: 'DOWNLOAD RECORDING', url: 'https://zoom-cloud-recordings.net/rec/globaltech-demo', isMalicious: true }
    ]
  },

  // Email 9: Legitimate - Salesforce Notification
  {
    id: '9',
    from: {
      name: 'Salesforce',
      email: 'noreply@salesforce.com'
    },
    subject: 'Opportunity Update: TechStart Inc - Enterprise License',
    preview: 'An opportunity you\'re tracking has been updated. TechStart Inc has moved to Proposal stage...',
    body: `Salesforce Notification

An opportunity you're following has been updated:

Opportunity: TechStart Inc - Enterprise License Deal
Stage Changed: Negotiation → Proposal
Amount: $185,000
Close Date: December 15, 2024

Recent Activity:
• Proposal sent to procurement team
• Technical review completed
• Next step: Contract negotiation call scheduled

View full details in Salesforce:
https://acmeconsulting.my.salesforce.com/opportunities/techstart-enterprise

This is an automated notification based on your follow settings.`,
    timestamp: '2:30 PM',
    isPhishing: false,
    urgency: 'normal',
    links: [
      { text: 'View in Salesforce', url: 'https://acmeconsulting.my.salesforce.com/opportunities/techstart-enterprise', isMalicious: false }
    ]
  },

  // Email 10: Phishing - Fake LinkedIn Recruiter Message
  {
    id: '10',
    from: {
      name: 'LinkedIn',
      email: 'messages@linkedin-notifications.info'
    },
    subject: 'A recruiter at Google is interested in your profile',
    preview: 'Hi, I came across your profile and was impressed by your experience. We have an exciting Senior Consultant role...',
    body: `LinkedIn

You have a new message from Sarah Williams
Senior Technical Recruiter at Google

"Hi,

I came across your profile and was very impressed by your consulting experience. We have an exciting opportunity for a Senior Solutions Consultant role at Google Cloud.

The role offers:
• Competitive salary ($180K - $240K)
• Remote flexibility
• Excellent benefits package

I'd love to schedule a quick call to discuss. Please click below to view the full job description and schedule a time that works for you."

VIEW OPPORTUNITY: https://linkedin-notifications.info/jobs/google-consultant

Reply to this message on LinkedIn.`,
    timestamp: '3:45 PM',
    isPhishing: true,
    phishingIndicators: [
      'Domain is linkedin-notifications.info not linkedin.com',
      'Too-good-to-be-true salary offer',
      'Unsolicited job opportunity from unknown recruiter',
      'Generic praise without specific details about your background'
    ],
    urgency: 'normal',
    links: [
      { text: 'VIEW OPPORTUNITY', url: 'https://linkedin-notifications.info/jobs/google-consultant', isMalicious: true }
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
      description: 'This was a legitimate training reminder that may contain time-sensitive information.',
      riskChange: 1,
      isPositive: false
    }
  },

  // Email 2: Phishing - Microsoft Password
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

  // Email 3: Legitimate - Project Update
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

  // Email 4: Phishing - Fake AWS Invoice
  '4': {
    open: {
      title: 'Fake Invoice Link Clicked',
      description: 'This was a Business Email Compromise (BEC) attack. The domain "aws-invoices-payments.com" is not affiliated with AWS. Always verify unexpected invoices through official channels.',
      riskChange: 28,
      isPositive: false
    },
    report: {
      title: 'Invoice Scam Reported',
      description: 'Great catch! Fake vendor invoices are a common attack vector. You correctly identified the suspicious domain and urgency tactics.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Fake Invoice Deleted',
      description: 'Good instinct to avoid it. Reporting would have been even better to alert the security team about this invoice fraud attempt.',
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

  // Email 5: Legitimate - HR Benefits
  '5': {
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

  // Email 6: Phishing - Fake DocuSign CEO
  '6': {
    open: {
      title: 'Fraudulent DocuSign Clicked',
      description: 'This was a CEO impersonation phishing attack. The real DocuSign domain is docusign.com, not docusign-secure.com. Attackers often use executive authority to pressure quick action.',
      riskChange: 22,
      isPositive: false
    },
    report: {
      title: 'DocuSign Phishing Reported',
      description: 'Great catch! You recognized the suspicious domain and the CEO impersonation tactic. This helps protect the entire organization.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious DocuSign Deleted',
      description: 'Good instinct. Reporting it would have been even better to alert security about this CEO impersonation attempt.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left in Inbox',
      description: 'This phishing attempt using CEO impersonation remains a risk. Reporting it would help protect colleagues.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 7: Legitimate - Client Follow-up
  '7': {
    open: {
      title: 'Client Email Reviewed',
      description: 'This was a legitimate client communication about an active proposal. Responding promptly to client questions is good practice.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Client Email Reported',
      description: 'This was a legitimate external client communication. While external emails warrant scrutiny, this one was genuine.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Client Communication Deleted',
      description: 'This was a legitimate client email with important project questions that require follow-up.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Email Saved for Later',
      description: 'This was a legitimate client communication. You can review and respond when you have time.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 8: Phishing - Fake Zoom Recording
  '8': {
    open: {
      title: 'Fake Zoom Link Clicked',
      description: 'This was a phishing attempt impersonating Zoom. The domain "zoom-cloud-recordings.net" is not affiliated with Zoom. Attackers often use fake meeting recordings to steal credentials.',
      riskChange: 20,
      isPositive: false
    },
    report: {
      title: 'Zoom Phishing Reported',
      description: 'Well done! You recognized the fake domain. Fake meeting/recording notifications are common phishing tactics targeting sales teams.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Suspicious Zoom Email Deleted',
      description: 'Good instinct to avoid it. Reporting would have helped the security team warn others about this tactic.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left Unaddressed',
      description: 'The fake Zoom recording email remains a threat. Reporting helps protect colleagues who may receive similar messages.',
      riskChange: 5,
      isPositive: false
    }
  },

  // Email 9: Legitimate - Salesforce Notification
  '9': {
    open: {
      title: 'Salesforce Update Reviewed',
      description: 'This was a legitimate Salesforce notification about an opportunity update. Staying informed on deal progress is valuable.',
      riskChange: 0,
      isPositive: true
    },
    report: {
      title: 'Salesforce Email Reported',
      description: 'This was a legitimate automated notification from Salesforce. The domain salesforce.com is genuine.',
      riskChange: 2,
      isPositive: false
    },
    delete: {
      title: 'Opportunity Update Deleted',
      description: 'This was a legitimate sales update. You may miss important deal status changes.',
      riskChange: 1,
      isPositive: false
    },
    ignore: {
      title: 'Update Saved for Later',
      description: 'This was a legitimate notification. You can review the opportunity details when convenient.',
      riskChange: 0,
      isPositive: true
    }
  },

  // Email 10: Phishing - Fake LinkedIn Recruiter
  '10': {
    open: {
      title: 'Fake LinkedIn Link Clicked',
      description: 'This was a phishing attempt. The domain "linkedin-notifications.info" is not LinkedIn. Fake job offers with attractive salaries are common social engineering tactics.',
      riskChange: 18,
      isPositive: false
    },
    report: {
      title: 'LinkedIn Phishing Reported',
      description: 'Excellent! You recognized the suspicious domain and too-good-to-be-true job offer. Reporting protects colleagues from similar scams.',
      riskChange: -5,
      isPositive: true
    },
    delete: {
      title: 'Fake Job Offer Deleted',
      description: 'Good judgment. The suspicious domain and unsolicited high-paying offer were red flags. Reporting would also help others.',
      riskChange: 0,
      isPositive: true
    },
    ignore: {
      title: 'Phishing Left in Inbox',
      description: 'While you avoided the trap, this fake recruiter scam could target others. Reporting helps the security team.',
      riskChange: 5,
      isPositive: false
    }
  }
};
