import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bat-footer py-8">
      <div className="bat-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-5 h-5 text-accent-foreground"
                >
                  <path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                  <path d="M12 4c-1.636 0-3.088.764-4 2 .5-1 3-2 4-2 1 0 3.5 1 4 2-.912-1.236-2.364-2-4-2z" />
                  <path d="M12 6c-2 0-4 1.5-4 3h8c0-1.5-2-3-4-3z" />
                  <path d="M15.5 11h-7c-.276 0-.5.224-.5.5s.224.5.5.5h7c.276 0 .5-.224.5-.5s-.224-.5-.5-.5z" />
                  <path d="M12 14c-3 0-5 2-5 3h10c0-1-2-3-5-3z" />
                </svg>
              </div>
              <span className="font-orbitron text-lg font-bold tracking-wider text-foreground">
                BAT BOOKS
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-4">
              Your source for knowledge in the darkness. Bringing light to your reading journey.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </a>
              <a href="#" className="text-foreground hover:text-accent transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.992 18.166c-.208.286-.41.582-.59.861a.893.893 0 01-.146.17c-1.716 1.95-4.176 3.185-6.914 3.185a9.063 9.063 0 01-6.605-2.807c-.3-.294-.572-.61-.818-.944a8.542 8.542 0 01-1.208-2.32 9.012 9.012 0 01-.705-3.519c0-1.601.416-3.106 1.144-4.416A9.067 9.067 0 0112 2.914c2.47 0 4.722.986 6.369 2.584a8.956 8.956 0 012.634 5.152 8.953 8.953 0 01-1.052 5.295 9.034 9.034 0 01-1.959 2.221z" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="font-orbitron text-lg font-semibold mb-4 text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-accent transition-colors">Home</Link></li>
              <li><Link to="/books" className="text-muted-foreground hover:text-accent transition-colors">Books</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-accent transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div className="col-span-1">
            <h3 className="font-orbitron text-lg font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-muted-foreground hover:text-accent transition-colors">FAQ</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-accent transition-colors">Help Center</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-accent transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div className="col-span-1">
            <h3 className="font-orbitron text-lg font-semibold mb-4 text-foreground">Contact Us</h3>
            <address className="not-italic">
              <p className="text-muted-foreground mb-2">1007 Mountain Drive</p>
              <p className="text-muted-foreground mb-2">Gotham City, NY 10001</p>
              <p className="text-muted-foreground mb-2">Email: info@batbooks.com</p>
              <p className="text-muted-foreground">Phone: (555) 123-4567</p>
            </address>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Bat Books. All rights reserved. Designed with <span className="text-accent">♥</span> in Gotham City.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;