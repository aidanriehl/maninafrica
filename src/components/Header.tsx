import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container flex items-center justify-between py-4">
        <button
          className="sm:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className="hidden sm:flex items-center">
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>
        <h1 className="text-xl font-serif font-bold tracking-tight text-foreground">
          1ManWithCam
        </h1>
        <a
          href="#manage"
          className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          Manage
        </a>
      </div>
      {menuOpen && (
        <div className="sm:hidden border-t border-border px-6 py-4 flex flex-col gap-3 bg-background">
          <a href="#contact" className="text-sm font-medium py-2" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
