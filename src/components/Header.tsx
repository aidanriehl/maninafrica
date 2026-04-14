import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container grid grid-cols-3 items-center py-4">
        {/* Left */}
        <div className="flex items-center">
          <button
            className="sm:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <a href="#contact" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </div>

        {/* Center */}
        <h1 className="text-xl md:text-3xl font-serif font-bold tracking-tight text-foreground text-center">
          1ManInAfrica
        </h1>

        {/* Right */}
        <div className="flex justify-end">
          <Link
            to="/manage"
            className="px-3 py-1.5 sm:px-5 sm:py-2.5 bg-primary text-primary-foreground rounded-full text-xs sm:text-sm font-bold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            <span className="sm:hidden">Manage</span>
            <span className="hidden sm:inline">Manage Subscription</span>
          </Link>
        </div>
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
