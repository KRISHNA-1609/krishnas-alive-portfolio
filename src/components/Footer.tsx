import { Github, Linkedin, ExternalLink as ExternalLinkIcon, Heart } from "lucide-react";
import ExternalLink from "@/components/ExternalLink";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Brand */}
          <div>
            <p className="text-2xl font-heading font-bold text-gradient mb-2">KS.</p>
            <p className="text-xs text-muted-foreground">
              Building the web, one commit at a time.
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-6">
            {["Home", "Skills", "Projects", "About", "Blogs", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div className="flex justify-end gap-3">
            <ExternalLink href="https://github.com/KRISHNA-1609" className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
              <Github size={16} />
            </ExternalLink>
            <ExternalLink href="https://www.linkedin.com/in/krishna-shonka-903a67358/?skipRedirect=true" className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
              <Linkedin size={16} />
            </ExternalLink>
            <ExternalLink href="https://codolio.com/profile/Krishna_1609" className="p-2.5 rounded-lg bg-secondary hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all">
              <ExternalLinkIcon size={16} />
            </ExternalLink>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Krishna Shonka. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Made with <Heart size={12} className="text-red-400 fill-red-400" /> and lots of coffee
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
