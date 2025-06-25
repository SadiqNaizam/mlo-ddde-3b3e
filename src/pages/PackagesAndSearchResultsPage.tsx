import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Assuming these are custom components that exist in the project
// As per instructions, their code is not provided but they are assumed to exist.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PackageCard from '@/components/PackageCard';

// Shadcn UI Components
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Card } from '@/components/ui/card';

// Sample data for packages, inspired by the user journey
const samplePackages = [
  {
    id: 'pkg1',
    title: 'Magical Kerala Backwaters',
    imageUrl: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop',
    duration: '7 Days / 6 Nights',
    price: 25000,
    highlights: ['Houseboat Cruise', 'Tea Plantation Visit', 'Kathakali Show'],
  },
  {
    id: 'pkg2',
    title: 'Wonders of Munnar & Thekkady',
    imageUrl: 'https://images.unsplash.com/photo-1583042129807-683b7f1cf40f?q=80&w=1770&auto=format&fit=crop',
    duration: '5 Days / 4 Nights',
    price: 18000,
    highlights: ['Eravikulam National Park', 'Periyar Wildlife Sanctuary', 'Spice Gardens'],
  },
  {
    id: 'pkg3',
    title: 'Coastal Charms of Varkala',
    imageUrl: 'https://images.unsplash.com/photo-1626815349522-87875b37d457?q=80&w=1887&auto=format&fit=crop',
    duration: '4 Days / 3 Nights',
    price: 15000,
    highlights: ['Varkala Cliff Beach', 'Jatayu Earth\'s Center', 'Lighthouse Visit'],
  },
  {
    id: 'pkg4',
    title: 'Alleppey Houseboat Experience',
    imageUrl: 'https://images.unsplash.com/photo-1593655850935-3c1314953e5b?q=80&w=1770&auto=format&fit=crop',
    duration: '3 Days / 2 Nights',
    price: 12000,
    highlights: ['Overnight Stay on Houseboat', 'Village Tour', 'Canoe Ride'],
  },
  {
    id: 'pkg5',
    title: 'Fort Kochi Heritage Trail',
    imageUrl: 'https://images.unsplash.com/photo-1593655850935-3c1314953e5b?q=80&w=1770&auto=format&fit=crop',
    duration: '3 Days / 2 Nights',
    price: 9500,
    highlights: ['Chinese Fishing Nets', 'Mattancherry Palace', 'St. Francis Church'],
  },
  {
    id: 'pkg6',
    title: 'Romantic Wayanad Getaway',
    imageUrl: 'https://images.unsplash.com/photo-1616252998330-3c7062963152?q=80&w=1932&auto=format&fit=crop',
    duration: '4 Days / 3 Nights',
    price: 16500,
    highlights: ['Edakkal Caves', 'Banasura Sagar Dam', 'Chembra Peak'],
  }
];


const PackagesAndSearchResultsPage = () => {
  console.log('PackagesAndSearchResultsPage loaded');
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('destination') || 'Kerala';


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Search Results</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        <section className="mb-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  Results for "{searchQuery}"
                </h1>
                <div className="flex items-center gap-4">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="popularity">Popularity</SelectItem>
                            <SelectItem value="price-asc">Price: Low to High</SelectItem>
                            <SelectItem value="price-desc">Price: High to Low</SelectItem>
                            <SelectItem value="duration">Duration</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button asChild variant="secondary">
                        <Link to="/trip-cost-estimator">Create Your Own Trip</Link>
                    </Button>
                </div>
            </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 mb-8">
            {samplePackages.map(pkg => (
                <Link to="/booking" state={{ package: pkg }} key={pkg.id}>
                    {/* Assuming PackageCard is a custom component that handles display and hover effects */}
                    <PackageCard
                        id={pkg.id}
                        title={pkg.title}
                        imageUrl={pkg.imageUrl}
                        duration={pkg.duration}
                        price={pkg.price}
                        highlights={pkg.highlights}
                    />
                </Link>
            ))}
        </section>
        
        <section className="flex justify-center">
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" isActive>1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PackagesAndSearchResultsPage;