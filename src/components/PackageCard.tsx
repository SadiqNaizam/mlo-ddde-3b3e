import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { IndianRupee } from 'lucide-react';

interface PackageCardProps {
  slug: string;
  imageUrl: string;
  destination: string;
  price: number;
  details: string;
  inclusions: string[];
  duration: string; // e.g., "5 Days / 4 Nights"
}

const PackageCard: React.FC<PackageCardProps> = ({
  slug,
  imageUrl,
  destination,
  price,
  details,
  inclusions,
  duration
}) => {
  console.log('PackageCard loaded for:', destination);

  return (
    <Card className="overflow-hidden relative group w-full transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2">
      <div className="relative h-60">
        <img
          src={imageUrl}
          alt={`A scenic view of ${destination}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex flex-col justify-center items-center p-4 opacity-0 group-hover:opacity-100 text-center">
          <h3 className="text-white text-lg font-semibold mb-2">Key Inclusions</h3>
          <ul className="text-white text-sm list-disc list-inside mb-4">
            {inclusions.slice(0, 3).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link to="/booking">View Details</Link>
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-2 bg-white">
        <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-gray-900 truncate pr-2">{destination}</h3>
            <span className="text-xs font-medium text-gray-600 bg-gray-100 px-2 py-1 rounded-full whitespace-nowrap">{duration}</span>
        </div>
        <p className="text-sm text-gray-600 h-10 line-clamp-2">{details}</p>
        <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <p className="text-gray-500 text-sm">Starts from</p>
            <div className="flex items-center text-xl font-bold text-green-700">
              <IndianRupee className="h-5 w-5 mr-1" />
              <span>{price.toLocaleString('en-IN')}</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PackageCard;