import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../contexts/AuthContext';
import { MoonIcon, SunIcon, MenuIcon } from 'lucide-react';
import { useTheme } from './theme-provider';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="bat-header sticky top-0 z-50 py-3">
      <div className="bat-container flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center animate-bat-pulse">
            <svg 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6 text-accent-foreground"
            >
              <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
              <path d="M12 4c-1.636 0-3.088.764-4 2 .5-1 3-2 4-2 1 0 3.5 1 4 2-.912-1.236-2.364-2-4-2z" />
              <path d="M12 6c-2 0-4 1.5-4 3h8c0-1.5-2-3-4-3z" />
              <path d="M15.5 11h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z" />
              <path d="M12 14c-3 0-5 2-5 3h10c0-1-2-3-5-3z" />
            </svg>
          </div>
          <span className="font-orbitron text-xl font-bold tracking-wider text-foreground animate-bat-flicker">
            BAT BOOKS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="bat-nav-link">Home</Link>
          <Link to="/books" className="bat-nav-link">Books</Link>
          <Link to="/about" className="bat-nav-link">About</Link>
          <Link to="/contact" className="bat-nav-link">Contact</Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5 text-accent" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <Button variant="outline" className="bat-button">
                  Profile
                </Button>
              </Link>
              <Button 
                variant="default" 
                className="bat-button" 
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/auth/login">
                <Button variant="outline" className="bat-button">
                  Login
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="default" className="bat-button">
                  Sign Up
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <MenuIcon className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border py-4 animate-fade-in">
          <nav className="flex flex-col items-center gap-4">
            <Link to="/" className="bat-nav-link" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/books" className="bat-nav-link" onClick={() => setMobileMenuOpen(false)}>Books</Link>
            <Link to="/about" className="bat-nav-link" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="bat-nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            
            <div className="flex items-center gap-3 mt-2">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? (
                  <SunIcon className="h-5 w-5 text-accent" />
                ) : (
                  <MoonIcon className="h-5 w-5" />
                )}
              </Button>

              {user ? (
                <div className="flex items-center gap-3">
                  <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="bat-button">
                      Profile
                    </Button>
                  </Link>
                  <Button 
                    variant="default" 
                    className="bat-button" 
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="bat-button">
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" className="bat-button">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;