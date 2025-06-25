import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Plane, Menu, MountainSnow, UserCircle } from 'lucide-react';

const Header: React.FC = () => {
  console.log('Header loaded');

  const navLinks = [
    { name: 'Hotels', href: '/#hotels' }, // Placeholder link
    { name: 'Flights', href: '/#flights' }, // Placeholder link
    { name: 'Packages', href: '/packages-and-search-results' },
    { name: 'Offers', href: '/#offers' }, // Placeholder link
  ];

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold mb-4">
            <MountainSnow className="h-6 w-6 text-primary" />
            <span>IndiaVoyage</span>
          </Link>
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              className={({ isActive }) => `hover:text-foreground ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <MountainSnow className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">IndiaVoyage</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <NavLink key={link.name} to={link.href} className={navLinkClasses}>
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm">Login</Button>
            <Button size="sm">Register</Button>
          </div>
          <Link to="/user-dashboard">
            <UserCircle className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
            <span className="sr-only">User Dashboard</span>
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;