import { cn } from '@/lib/utils';
import { Email } from '@/types/simulation';
import { Paperclip, Clock } from 'lucide-react';

interface EmailItemProps {
  email: Email;
  isSelected: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function EmailItem({ email, isSelected, isCompleted, onClick }: EmailItemProps) {
  return (
    <button
      onClick={onClick}
      disabled={isCompleted}
      className={cn(
        "w-full text-left p-4 border-b border-email-border transition-all",
        "hover:bg-email-hover focus:outline-none focus:bg-email-hover",
        isSelected && "bg-email-selected border-l-2 border-l-primary",
        isCompleted && "opacity-50 cursor-not-allowed",
        !isCompleted && !isSelected && "cursor-pointer"
      )}
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
          isCompleted ? "bg-muted" : "bg-email-unread"
        )} />
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <p className={cn(
              "font-medium text-sm truncate",
              isCompleted ? "text-muted-foreground" : "text-foreground"
            )}>
              {email.from.name}
            </p>
            <div className="flex items-center gap-2 flex-shrink-0 ml-2">
              {email.timerSeconds && !isCompleted && (
                <Clock className="w-4 h-4 text-risk-elevated" />
              )}
              <span className="text-xs text-muted-foreground">{email.timestamp}</span>
            </div>
          </div>
          
          <p className={cn(
            "text-sm mb-1 truncate",
            isCompleted ? "text-muted-foreground" : "font-medium text-foreground"
          )}>
            {email.subject}
          </p>
          
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground truncate flex-1">
              {email.preview}
            </p>
            {email.attachments && email.attachments.length > 0 && (
              <Paperclip className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
