import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OfferBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

const OfferBanner: React.FC<OfferBannerProps> = ({ title, description, ctaText, ctaLink }) => {
  console.log('OfferBanner loaded');

  return (
    <div className="relative w-full rounded-lg overflow-hidden p-8 bg-gradient-to-r from-teal-500 via-cyan-600 to-sky-700 text-white transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
      {/* Subtle background pattern */}
      <div 
        className="absolute inset-0 bg-repeat bg-center opacity-5"
        style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\"52\" height=\"26\" viewBox=\"0 0 52 26\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.4\"%3E%3Cpath d=\"M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM26 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM52 26c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6zM39 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')" }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="md:w-2/3 text-center md:text-left">
          <h2 className="text-3xl font-extrabold tracking-tight mb-2 text-shadow">
            {title}
          </h2>
          <p className="text-lg text-gray-100 text-shadow-sm">
            {description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <Button
            size="lg"
            className="bg-white text-teal-600 font-bold hover:bg-gray-100 transition-transform duration-200 ease-in-out hover:scale-105"
            asChild
          >
            <Link to={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OfferBanner;