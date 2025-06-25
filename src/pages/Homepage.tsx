import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Search, MapPin, User, LogIn, Plane, Hotel, Car, Train } from 'lucide-react';

// Helper components defined within the page for structure
const Header = () => (
  <header className="absolute top-0 left-0 right-0 z-20 p-4 bg-black bg-opacity-20 text-white">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold tracking-wider">
        IndiaVoyage
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link to="/packages-and-search-results" className="hover:text-gray-300 transition-colors">Packages</Link>
        <Link to="/trip-cost-estimator" className="hover:text-gray-300 transition-colors">Trip Estimator</Link>
        <Link to="/booking" className="hover:text-gray-300 transition-colors">Book Now</Link>
      </nav>
      <div className="flex items-center space-x-4">
        <Link to="/user-dashboard">
          <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
            <User className="h-5 w-5" />
          </Button>
        </Link>
        <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-black">
          <LogIn className="mr-2 h-4 w-4" /> Sign In
        </Button>
      </div>
    </div>
  </header>
);

const OfferBanner = ({ title, description, imageUrl, link }: { title: string, description: string, imageUrl: string, link: string }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative rounded-lg overflow-hidden shadow-lg"
  >
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
      <h3 className="text-white text-2xl font-bold">{title}</h3>
      <p className="text-white text-sm mt-1">{description}</p>
      <Link to={link}>
        <Button variant="secondary" className="mt-4">Explore Deals</Button>
      </Link>
    </div>
  </motion.div>
);

const PackageCard = ({ name, description, imageUrl, link }: { name: string, description: string, imageUrl: string, link: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -5 }}
  >
    <Card className="overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        <Link to={link}>
          <Button className="w-full mt-4">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  </motion.div>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto text-center">
      <p className="font-bold text-xl mb-2">IndiaVoyage</p>
      <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} IndiaVoyage. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-4">
        <Link to="#" className="text-gray-400 hover:text-white">Facebook</Link>
        <Link to="#" className="text-gray-400 hover:text-white">Instagram</Link>
        <Link to="#" className="text-gray-400 hover:text-white">Twitter</Link>
      </div>
    </div>
  </footer>
);


const Homepage = () => {
  console.log('Homepage loaded');
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/packages-and-search-results?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/packages-and-search-results');
    }
  };

  return (
    <div className="bg-gray-50">
      <Header />

      {/* Hero Section */}
      <main>
        <section className="relative h-[60vh] md:h-[80vh] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop')" }}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative z-10 container mx-auto px-4"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">Discover the Heart of India</h1>
            <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto drop-shadow-md">Your journey to incredible destinations starts here. Search for your next adventure.</p>
            
            <div className="mt-8 max-w-2xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-2xl flex flex-col sm:flex-row items-center gap-2">
                <div className="relative w-full">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <Input 
                    type="text" 
                    placeholder="Search for destinations (e.g., Kerala, Goa, Rajasthan)..." 
                    className="pl-10 h-12 text-md text-gray-800"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <Button size="lg" className="w-full sm:w-auto h-12" onClick={handleSearch}>
                  <Search className="mr-2 h-5 w-5" /> Search
                </Button>
              </div>
               <div className="mt-4 flex justify-center gap-x-6 text-sm font-medium">
                  <span className="flex items-center gap-2 cursor-pointer hover:text-gray-200"><Plane size={16}/> Flights</span>
                  <span className="flex items-center gap-2 cursor-pointer hover:text-gray-200"><Hotel size={16}/> Hotels</span>
                  <span className="flex items-center gap-2 cursor-pointer hover:text-gray-200"><Car size={16}/> Cabs</span>
                  <span className="flex items-center gap-2 cursor-pointer hover:text-gray-200"><Train size={16}/> Trains</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Special Deals Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <OfferBanner 
                title="Monsoon Getaway" 
                description="20% off on Kerala backwater packages" 
                imageUrl="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1932&auto=format&fit=crop"
                link="/packages-and-search-results?deal=kerala"
              />
              <OfferBanner 
                title="Himalayan Adventure" 
                description="Special rates for trekking in Himachal" 
                imageUrl="https://images.unsplash.com/photo-1617347644343-3e758e5e1e1c?q=80&w=2070&auto=format&fit=crop"
                link="/packages-and-search-results?deal=himachal"
              />
            </div>
          </div>
        </section>

        {/* Popular Packages Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">Popular Destinations</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <PackageCard 
                name="The Golden Triangle"
                description="Explore the iconic cities of Delhi, Agra, and Jaipur."
                imageUrl="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2071&auto=format&fit=crop"
                link="/packages-and-search-results?q=Golden+Triangle"
              />
              <PackageCard 
                name="Beaches of Goa"
                description="Relax and unwind on the sunny shores of Goa."
                imageUrl="https://images.unsplash.com/photo-1570222891334-93e110c73204?q=80&w=2070&auto=format&fit=crop"
                link="/packages-and-search-results?q=Goa"
              />
              <PackageCard 
                name="Royal Rajasthan"
                description="Experience the grandeur of forts and palaces."
                imageUrl="https://images.unsplash.com/photo-1603290983404-a8a47148a042?q=80&w=2071&auto=format&fit=crop"
                link="/packages-and-search-results?q=Rajasthan"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;