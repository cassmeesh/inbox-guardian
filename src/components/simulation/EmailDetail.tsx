import { Email, ActionType } from '@/types/simulation';
import { Button } from '@/components/ui/button';
import { Timer } from './Timer';
import { Paperclip, ExternalLink, Flag, Trash2, Mail, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailDetailProps {
  email: Email;
  onAction: (action: ActionType) => void;
  onTimerExpire: () => void;
  isActioned: boolean;
}

export function EmailDetail({ email, onAction, onTimerExpire, isActioned }: EmailDetailProps) {
  return (
    <div className="h-full flex flex-col bg-email-bg">
      {/* Header */}
      <div className="border-b border-email-border p-4 md:p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
              {email.subject}
            </h2>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-foreground">{email.from.name}</span>
              <span className="text-muted-foreground">&lt;{email.from.email}&gt;</span>
            </div>
          </div>
          
          {email.timerSeconds && !isActioned && (
            <Timer 
              seconds={email.timerSeconds} 
              onExpire={onTimerExpire}
            />
          )}
        </div>

        {/* Action Buttons */}
        {!isActioned && (
          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              onClick={() => onAction('open')}
              variant="default"
              size="sm"
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Open
            </Button>
            <Button
              onClick={() => onAction('report')}
              variant="outline"
              size="sm"
              className="gap-2 text-warning hover:text-warning hover:bg-warning/10 border-warning/30"
            >
              <Flag className="w-4 h-4" />
              Report
            </Button>
            <Button
              onClick={() => onAction('delete')}
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10 border-destructive/30"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </Button>
            <Button
              onClick={() => onAction('ignore')}
              variant="ghost"
              size="sm"
              className="gap-2"
            >
              <Mail className="w-4 h-4" />
              Ignore
            </Button>
          </div>
        )}
      </div>

      {/* Email Body */}
      <div className="flex-1 overflow-auto p-4 md:p-6">
        <div className="prose prose-sm max-w-none">
          <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed bg-transparent border-none p-0">
            {email.body}
          </pre>
        </div>

        {/* Attachments */}
        {email.attachments && email.attachments.length > 0 && (
          <div className="mt-6 pt-4 border-t border-email-border">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Attachments
            </p>
            <div className="flex flex-wrap gap-2">
              {email.attachments.map((attachment, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 bg-muted rounded-md text-sm"
                >
                  <Paperclip className="w-4 h-4 text-muted-foreground" />
                  <span>{attachment.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {email.links && email.links.length > 0 && (
          <div className="mt-4">
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
              Links in this email
            </p>
            <div className="space-y-1">
              {email.links.map((link, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-sm text-primary"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="truncate">{link.url}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
