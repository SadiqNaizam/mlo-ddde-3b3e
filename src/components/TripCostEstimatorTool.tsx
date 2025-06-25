import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input';
import { Slider } from "@/components/ui/slider';
import { Label } from "@/components/ui/label';
import { Plane, Hotel, Car, Users, CalendarDays, Mountain, ArrowRight } from 'lucide-react';

// Assuming AnimatedCounter component exists and accepts a 'value' prop.
import AnimatedCounter from '@/components/AnimatedCounter';

const TripCostEstimatorTool: React.FC = () => {
    console.log('TripCostEstimatorTool loaded');

    // State for user selections
    const [includeFlights, setIncludeFlights] = useState<boolean>(true);
    const [flightClass, setFlightClass] = useState<string>('economy');
    const [includeHotel, setIncludeHotel] = useState<boolean>(true);
    const [hotelStars, setHotelStars] = useState<string>('3');
    const [includeCab, setIncludeCab] = useState<boolean>(false);
    const [numberOfDays, setNumberOfDays] = useState<number>(7);
    const [numberOfTravelers, setNumberOfTravelers] = useState<number>(2);
    const [activitiesBudget, setActivitiesBudget] = useState<number[]>([5000]);

    // State for the calculated cost
    const [totalCost, setTotalCost] = useState<number>(0);

    // Effect to recalculate cost whenever a dependency changes
    useEffect(() => {
        let cost = 0;

        // Base costs (for demonstration purposes)
        const flightBaseCost = { economy: 15000, business: 40000, first: 80000 };
        const hotelBaseCostPerStar = 1200;
        const cabBaseCostPerDay = 800;

        if (includeFlights) {
            cost += (flightBaseCost[flightClass as keyof typeof flightBaseCost] || 0) * numberOfTravelers;
        }

        if (includeHotel) {
            cost += (hotelBaseCostPerStar * parseInt(hotelStars)) * numberOfDays;
        }

        if (includeCab) {
            cost += cabBaseCostPerDay * numberOfDays;
        }
        
        cost += activitiesBudget[0];

        cost = cost * numberOfTravelers;

        setTotalCost(cost);

    }, [includeFlights, flightClass, includeHotel, hotelStars, includeCab, numberOfDays, numberOfTravelers, activitiesBudget]);

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl">
            <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold">Create Your Custom Trip</CardTitle>
                <CardDescription className="text-lg">Adjust the options below to estimate your travel costs in real-time.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                    {/* Column 1 */}
                    <div className="space-y-8">
                        {/* Trip Duration */}
                        <div className="space-y-2">
                            <Label htmlFor="days" className="flex items-center text-md font-semibold"><CalendarDays className="mr-2 h-5 w-5 text-blue-500" />Trip Duration (in days)</Label>
                            <Input id="days" type="number" value={numberOfDays} onChange={(e) => setNumberOfDays(Math.max(1, parseInt(e.target.value) || 1))} className="text-lg" />
                        </div>

                        {/* Number of Travelers */}
                        <div className="space-y-2">
                            <Label htmlFor="travelers" className="flex items-center text-md font-semibold"><Users className="mr-2 h-5 w-5 text-blue-500" />Number of Travelers</Label>
                            <Input id="travelers" type="number" value={numberOfTravelers} onChange={(e) => setNumberOfTravelers(Math.max(1, parseInt(e.target.value) || 1))} className="text-lg" />
                        </div>
                        
                        {/* Activities Budget */}
                        <div className="space-y-2">
                            <Label htmlFor="activities" className="flex items-center text-md font-semibold"><Mountain className="mr-2 h-5 w-5 text-blue-500" />Activities & Tours Budget</Label>
                             <Slider id="activities" min={0} max={50000} step={1000} value={activitiesBudget} onValueChange={setActivitiesBudget} />
                             <p className="text-right text-lg font-medium">₹{activitiesBudget[0].toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-6">
                        {/* Flights */}
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <Label htmlFor="flights-switch" className="flex items-center text-md font-semibold"><Plane className="mr-2 h-5 w-5 text-purple-500" />Include Flights</Label>
                            <Switch id="flights-switch" checked={includeFlights} onCheckedChange={setIncludeFlights} />
                        </div>
                        {includeFlights && (
                             <Select value={flightClass} onValueChange={setFlightClass}>
                                <SelectTrigger className="w-full text-md">
                                    <SelectValue placeholder="Select flight class" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="economy">Economy</SelectItem>
                                    <SelectItem value="business">Business</SelectItem>
                                    <SelectItem value="first">First Class</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                        
                        {/* Hotel */}
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <Label htmlFor="hotel-switch" className="flex items-center text-md font-semibold"><Hotel className="mr-2 h-5 w-5 text-green-500" />Include Hotel</Label>
                            <Switch id="hotel-switch" checked={includeHotel} onCheckedChange={setIncludeHotel} />
                        </div>
                         {includeHotel && (
                             <Select value={hotelStars} onValueChange={setHotelStars}>
                                <SelectTrigger className="w-full text-md">
                                    <SelectValue placeholder="Select hotel rating" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="2">2 Stars</SelectItem>
                                    <SelectItem value="3">3 Stars</SelectItem>
                                    <SelectItem value="4">4 Stars</SelectItem>
                                    <SelectItem value="5">5 Stars</SelectItem>
                                </SelectContent>
                            </Select>
                        )}

                        {/* Cab */}
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                            <Label htmlFor="cab-switch" className="flex items-center text-md font-semibold"><Car className="mr-2 h-5 w-5 text-orange-500" />Include Local Cabs</Label>
                            <Switch id="cab-switch" checked={includeCab} onCheckedChange={setIncludeCab} />
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row items-center justify-between bg-gray-50 p-6">
                <div className="text-center sm:text-left mb-4 sm:mb-0">
                    <p className="text-lg text-gray-600">Estimated Total Cost:</p>
                    <div className="text-4xl font-extrabold text-black">
                        <span className="mr-1">₹</span>
                        <AnimatedCounter value={totalCost} />
                    </div>
                </div>
                <Button size="lg" asChild className="text-lg">
                    <Link to="/booking">
                        Proceed to Book
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TripCostEstimatorTool;