import React from 'react';
import { Link } from 'react-router-dom';
import { MountainSnow } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Privacy Policy', href: '/privacy' },
  ];

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex flex-col items-center md:items-start">
                 <Link to="/" className="flex items-center gap-2 mb-2">
                    <MountainSnow className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">IndiaVoyage</span>
                </Link>
                <p className="text-sm text-muted-foreground">Your journey to India starts here.</p>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                {footerLinks.map((link) => (
                    <Link key={link.name} to={link.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} IndiaVoyage. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;