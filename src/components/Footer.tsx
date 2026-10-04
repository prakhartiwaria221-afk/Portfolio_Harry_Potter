import { Printer } from "lucide-react";
import dobbyImage from "@/assets/dobby.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { href: "https://github.com/prakhartiwaria221-afk", label: "GH" },
    { href: "https://linkedin.com/in/prakhar-tiwari-8b04a7296", label: "IN" },
    { href: "https://instagram.com/prakhar6038", label: "IG" },
  ];

  return (
    <footer className="relative border-t border-border/50 overflow-hidden">
      <div className="glow-orb w-[300px] h-[300px] -bottom-32 left-1/3" style={{ background: "hsl(var(--accent) / 0.08)" }} />
      {/* Dobby character */}
      <img
        src={dobbyImage}
        alt="Dobby"
        loading="lazy"
        width={512}
        height={512}
        className="absolute -left-4 sm:left-4 bottom-0 w-16 h-16 sm:w-24 sm:h-24 opacity-60 hover:opacity-100 transition-opacity duration-300 animate-float-gentle pointer-events-none sm:pointer-events-auto"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 pl-14 sm:pl-28">
            <span className="text-primary text-lg">⚡</span>
            <p className="text-sm text-muted-foreground">
              © {currentYear} Prakhar Tiwari. Mischief Managed.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 mr-3 px-4 py-2 rounded-full border border-border text-xs font-semibold text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
              aria-label="Print or save resume"
            >
              <Printer className="w-3.5 h-3.5" /> Résumé
            </button>
            <span className="text-sm text-muted-foreground mr-2">Follow</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all text-xs font-bold"
                aria-label={social.label}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
