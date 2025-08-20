import { AlertCircle } from 'lucide-react';

const InlineError = ({
  title = 'Service Unavailable',
  message,
}: {
  title?: string;
  message?: string;
}) => (
  <div className="rounded-md border border-destructive/40 bg-destructive/10 px-4 py-3 text-destructive flex items-start gap-3">
    <AlertCircle className="w-4 h-4 mt-0.5" />
    <div>
      <div className="font-medium text-destructive">{title}</div>
      {message ? <div className="text-sm opacity-90">{message}</div> : null}
    </div>
  </div>
);

export default InlineError;
