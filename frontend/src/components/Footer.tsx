const Footer = () => {
  return (
    <footer className="border-t bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 text-sm text-muted-foreground grid gap-8 md:grid-cols-3">
        <div className="space-y-2">
          <div className="font-medium text-foreground">ZapGenie</div>
          <p>One number. Four assistants. Consent-first.</p>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-foreground">Legal</div>
          <div className="space-y-1">
            <a className="hover:underline" href="#">
              Privacy
            </a>
            <br />
            <a className="hover:underline" href="#">
              Terms
            </a>
          </div>
        </div>
        <div className="space-y-2">
          <div className="font-medium text-foreground">Contact</div>
          <div className="space-y-1">
            <a className="hover:underline" href="mailto:support@zapgenie.com">
              support@zapgenie.com
            </a>
            <br />
            <a className="hover:underline" href="mailto:dpo@zapgenie.com">
              dpo@zapgenie.com
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">
        © {new Date().getFullYear()} ZapGenie. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
