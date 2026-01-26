import { useState } from 'react';
import { Email, ActionType, ActionFeedback, RiskLevel } from '@/types/simulation';
import { RiskMeter } from './RiskMeter';
import { EmailItem } from './EmailItem';
import { EmailDetail } from './EmailDetail';
import { FeedbackModal } from './FeedbackModal';
import { Mail, Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InboxScreenProps {
  emails: Email[];
  currentEmailIndex: number;
  completedEmails: string[];
  riskScore: number;
  riskLevel: RiskLevel;
  onAction: (emailId: string, action: ActionType) => ActionFeedback | null;
  onTimerExpire: (emailId: string) => ActionFeedback | null;
  onNext: () => void;
}

export function InboxScreen({
  emails,
  currentEmailIndex,
  completedEmails,
  riskScore,
  riskLevel,
  onAction,
  onTimerExpire,
  onNext
}: InboxScreenProps) {
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(emails[currentEmailIndex]);
  const [feedback, setFeedback] = useState<ActionFeedback | null>(null);
  const [showMobileList, setShowMobileList] = useState(false);

  const handleSelectEmail = (email: Email) => {
    if (!completedEmails.includes(email.id)) {
      setSelectedEmail(email);
      setShowMobileList(false);
    }
  };

  const handleAction = (action: ActionType) => {
    if (!selectedEmail) return;
    const result = onAction(selectedEmail.id, action);
    if (result) {
      setFeedback(result);
    }
  };

  const handleTimerExpire = () => {
    if (!selectedEmail) return;
    const result = onTimerExpire(selectedEmail.id);
    if (result) {
      setFeedback(result);
    }
  };

  const handleContinue = () => {
    setFeedback(null);
    
    // Find next incomplete email
    const nextIncomplete = emails.findIndex(
      email => !completedEmails.includes(email.id) && email.id !== selectedEmail?.id
    );
    
    if (nextIncomplete === -1) {
      // All emails completed
      onNext();
    } else {
      setSelectedEmail(emails[nextIncomplete]);
    }
  };

  const remainingCount = emails.filter(e => !completedEmails.includes(e.id)).length;

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="font-semibold text-foreground">Inbox</h1>
            <p className="text-xs text-muted-foreground">
              {remainingCount} message{remainingCount !== 1 ? 's' : ''} remaining
            </p>
          </div>
        </div>
        
        {/* Mobile toggle */}
        <button
          onClick={() => setShowMobileList(!showMobileList)}
          className="md:hidden p-2 hover:bg-muted rounded-lg"
        >
          <Inbox className="w-5 h-5 text-muted-foreground" />
        </button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Email List - Sidebar */}
        <div className={cn(
          "w-full md:w-80 lg:w-96 border-r border-border bg-card flex-shrink-0 flex flex-col",
          "absolute md:relative inset-0 z-30 md:z-auto transition-transform duration-200",
          showMobileList ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}>
          <div className="p-4 border-b border-border">
            <RiskMeter score={riskScore} level={riskLevel} />
          </div>
          
          <div className="flex-1 overflow-auto">
            {emails.map(email => (
              <EmailItem
                key={email.id}
                email={email}
                isSelected={selectedEmail?.id === email.id}
                isCompleted={completedEmails.includes(email.id)}
                onClick={() => handleSelectEmail(email)}
              />
            ))}
          </div>
        </div>

        {/* Email Detail */}
        <div className="flex-1 overflow-hidden">
          {selectedEmail ? (
            <EmailDetail
              email={selectedEmail}
              onAction={handleAction}
              onTimerExpire={handleTimerExpire}
              isActioned={completedEmails.includes(selectedEmail.id)}
            />
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <Mail className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select an email to review</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile list overlay */}
      {showMobileList && (
        <div 
          className="fixed inset-0 bg-foreground/20 z-20 md:hidden"
          onClick={() => setShowMobileList(false)}
        />
      )}

      {/* Feedback Modal */}
      {feedback && (
        <FeedbackModal 
          feedback={feedback} 
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}
