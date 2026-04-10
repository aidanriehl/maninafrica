import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <a
          href="#donate"
          className="px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
        >
          Join — $10/mo
        </a>
        <h1 className="text-xl font-serif font-bold tracking-tight text-foreground">
          1Man<span className="text-primary font-bold">)</span>WithCam
        </h1>
        <button
          className="sm:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="hidden sm:flex items-center gap-3">
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
          <a
            href="#manage"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Manage Subscription
          </a>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden border-t border-border px-6 py-4 flex flex-col gap-3 bg-background">
          <a href="#contact" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Contact</a>
          <a href="#manage" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Manage Subscription</a>
        </div>
      )}
    </header>
  );
};

export default Header;
