import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CountUp from 'react-countup';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Plane, Hotel, Car, Mountain, Ship, User } from 'lucide-react';

const FLIGHT_COST = 12500;
const CAB_COST_PER_DAY = 2800;
const INITIAL_NIGHTS = 5;

const initialActivities = [
  { id: 'city-tour', name: 'Guided City Tour', cost: 3000, selected: true },
  { id: 'trekking', name: 'Mountain Trekking', cost: 5500, selected: false },
  { id: 'boating', name: 'Houseboat Cruise', cost: 8000, selected: false },
];

const TripCostEstimatorPage = () => {
  console.log('TripCostEstimatorPage loaded');
  const navigate = useNavigate();

  const [includeFlights, setIncludeFlights] = useState(true);
  const [hotelBudget, setHotelBudget] = useState([4000]);
  const [numberOfNights, setNumberOfNights] = useState([INITIAL_NIGHTS]);
  const [activities, setActivities] = useState(initialActivities);
  const [includeCab, setIncludeCab] = useState(true);
  const [totalCost, setTotalCost] = useState(0);

  const handleActivityChange = (activityId: string) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === activityId ? { ...activity, selected: !activity.selected } : activity
      )
    );
  };

  const calculateTotalCost = useCallback(() => {
    let cost = 0;
    const nights = numberOfNights[0];

    // Flight cost
    if (includeFlights) {
      cost += FLIGHT_COST;
    }

    // Hotel cost
    cost += hotelBudget[0] * nights;

    // Activities cost
    activities.forEach(activity => {
      if (activity.selected) {
        cost += activity.cost;
      }
    });

    // Cab cost
    if (includeCab) {
      cost += CAB_COST_PER_DAY * nights;
    }

    setTotalCost(cost);
  }, [includeFlights, hotelBudget, numberOfNights, activities, includeCab]);

  useEffect(() => {
    calculateTotalCost();
  }, [calculateTotalCost]);

  const Header = () => (
    <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          IndiaVoyage
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/packages-and-search-results" className="text-sm font-medium text-gray-600 hover:text-blue-600">Packages</Link>
          <Link to="/trip-cost-estimator" className="text-sm font-medium text-blue-600 hover:text-blue-600">Cost Estimator</Link>
          <Link to="/user-dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">Dashboard</Link>
        </nav>
        <Button variant="outline" onClick={() => navigate('/user-dashboard')}>
          <User className="h-4 w-4 mr-2" />
          My Account
        </Button>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-100 border-t">
        <div className="container mx-auto py-8 px-4 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} IndiaVoyage. All rights reserved.</p>
            <p className="text-sm mt-2">Your journey, simplified.</p>
        </div>
    </footer>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <Card className="w-full max-w-5xl mx-auto shadow-lg overflow-hidden">
          <CardHeader className="bg-gray-50 p-6">
            <CardTitle className="text-3xl font-bold text-gray-800">Build Your Custom Trip</CardTitle>
            <CardDescription className="text-md text-gray-500 mt-1">Adjust the options below to see a real-time cost estimate for your dream vacation.</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* TripCostEstimatorTool Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="flights" className="flex items-center text-lg font-medium"><Plane className="mr-3 h-5 w-5 text-blue-500"/> Include Flights?</Label>
                  <Switch id="flights" checked={includeFlights} onCheckedChange={setIncludeFlights} />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <Label htmlFor="cab" className="flex items-center text-lg font-medium"><Car className="mr-3 h-5 w-5 text-green-500"/> Full-Trip Cab Service?</Label>
                  <Switch id="cab" checked={includeCab} onCheckedChange={setIncludeCab} />
                </div>
                
                <div className="p-4 border rounded-lg space-y-3">
                    <Label htmlFor="nights-slider" className="text-lg font-medium">Number of Nights: <span className="font-bold text-blue-600">{numberOfNights[0]}</span></Label>
                    <Slider id="nights-slider" defaultValue={numberOfNights} onValueChange={setNumberOfNights} max={21} min={1} step={1} />
                </div>

                <div className="p-4 border rounded-lg space-y-3">
                  <Label htmlFor="hotel-slider" className="text-lg font-medium flex items-center"><Hotel className="mr-3 h-5 w-5 text-purple-500"/> Hotel Budget Per Night: <span className="font-bold text-blue-600 ml-2">₹{hotelBudget[0].toLocaleString()}</span></Label>
                  <Slider id="hotel-slider" defaultValue={hotelBudget} onValueChange={setHotelBudget} max={15000} min={1500} step={500} />
                </div>

                <div className="p-4 border rounded-lg space-y-4">
                  <Label className="text-lg font-medium flex items-center"><Mountain className="mr-3 h-5 w-5 text-orange-500" /> Select Activities</Label>
                  {activities.map(activity => (
                    <div key={activity.id} className="flex items-center justify-between">
                      <Label htmlFor={activity.id} className="flex-grow font-normal text-gray-700">{activity.name}</Label>
                      <span className="text-sm text-gray-500 mr-4">₹{activity.cost.toLocaleString()}</span>
                      <Checkbox id={activity.id} checked={activity.selected} onCheckedChange={() => handleActivityChange(activity.id)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Summary Section */}
              <div className="sticky top-24">
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold text-blue-800">Your Estimated Total</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-5xl font-bold text-blue-600 my-4">
                      <span className="text-4xl">₹</span>
                      <CountUp start={0} end={totalCost} duration={1.5} separator="," preserveValue={true} />
                    </div>
                    <Separator className="my-4" />
                    <div className="text-left space-y-2 text-sm text-gray-600">
                        {includeFlights && <p className="flex justify-between"><span>✈️ Flights:</span> <span>₹{FLIGHT_COST.toLocaleString()}</span></p>}
                        <p className="flex justify-between"><span>🏨 Hotels ({numberOfNights[0]} nights):</span> <span>₹{(hotelBudget[0] * numberOfNights[0]).toLocaleString()}</span></p>
                        {includeCab && <p className="flex justify-between"><span>🚕 Cab ({numberOfNights[0]} days):</span> <span>₹{(CAB_COST_PER_DAY * numberOfNights[0]).toLocaleString()}</span></p>}
                        {activities.filter(a => a.selected).map(a => (
                           <p key={a.id} className="flex justify-between"><span>{a.name}:</span> <span>₹{a.cost.toLocaleString()}</span></p>
                        ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="lg" className="w-full" onClick={() => navigate('/booking')}>
                      Proceed to Book
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;