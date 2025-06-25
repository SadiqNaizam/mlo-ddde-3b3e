import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Hotel, User, LogOut } from 'lucide-react';

// Mock data for the dashboard
const user = {
  name: 'Ananya Sharma',
  email: 'ananya.sharma@example.com',
  phone: '+91 98765 43210',
  memberSince: 'January 2022',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
};

const bookings = [
  {
    id: 'IV-837KDG',
    details: 'Kerala Backwaters Escape (Package)',
    date: '2024-09-15',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
  {
    id: 'IV-924FHE',
    details: 'Flight to Jaipur (Round Trip)',
    date: '2024-08-20',
    status: 'Upcoming' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
  {
    id: 'IV-109ADS',
    details: 'Hotel in Goa (3 Nights)',
    date: '2024-05-10',
    status: 'Completed' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
  {
    id: 'IV-583JDI',
    details: 'Bus from Delhi to Manali',
    date: '2024-01-22',
    status: 'Completed' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
  {
    id: 'IV-345OPE',
    details: 'Train to Varanasi',
    date: '2023-11-18',
    status: 'Cancelled' as 'Upcoming' | 'Completed' | 'Cancelled',
  },
];

const getStatusVariant = (status: 'Upcoming' | 'Completed' | 'Cancelled') => {
    switch (status) {
        case 'Upcoming':
            return 'default'; // Blue/Primary
        case 'Completed':
            return 'secondary'; // Gray/Greenish
        case 'Cancelled':
            return 'destructive'; // Red
        default:
            return 'outline';
    }
};

const UserDashboardPage = () => {
    console.log('UserDashboardPage loaded');

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-40">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <Link to="/" className="text-2xl font-bold text-blue-600">
                            IndiaVoyage
                        </Link>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600 hidden sm:inline">Welcome, {user.name.split(' ')[0]}</span>
                            <Avatar>
                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <Button variant="ghost" size="icon" asChild>
                                <Link to="/"> {/* Assuming logout redirects to homepage */}
                                    <LogOut className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4 sm:p-6 lg:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">My Dashboard</h1>

                <Tabs defaultValue="bookings" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 md:w-[400px]">
                        <TabsTrigger value="bookings">My Bookings</TabsTrigger>
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="travelers">Saved Travelers</TabsTrigger>
                    </TabsList>
                    
                    {/* My Bookings Tab */}
                    <TabsContent value="bookings">
                        <Card>
                            <CardHeader>
                                <CardTitle>Booking History</CardTitle>
                                <CardDescription>View and manage your past and upcoming trips.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[120px]">Booking ID</TableHead>
                                            <TableHead>Details</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {bookings.map((booking) => (
                                            <TableRow key={booking.id}>
                                                <TableCell className="font-medium">{booking.id}</TableCell>
                                                <TableCell>{booking.details}</TableCell>
                                                <TableCell>{booking.date}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getStatusVariant(booking.status)}>{booking.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button variant="outline" size="sm">View Details</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Profile Tab */}
                    <TabsContent value="profile">
                        <Card>
                            <CardHeader>
                                <CardTitle>Profile Settings</CardTitle>
                                <CardDescription>Manage your personal information.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input id="name" defaultValue={user.name} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" defaultValue={user.email} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input id="phone" type="tel" defaultValue={user.phone} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button>Save Changes</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>

                    {/* Saved Travelers Tab */}
                     <TabsContent value="travelers">
                        <Card>
                            <CardHeader>
                                <CardTitle>Saved Travelers</CardTitle>
                                <CardDescription>Manage saved traveler information for faster bookings.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg p-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <User className="h-5 w-5 text-gray-500" />
                                        <p className="font-medium">{user.name}</p>
                                    </div>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                </div>
                                <div className="mt-4 text-center">
                                    <Button variant="secondary">Add New Traveler</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white mt-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-2">IndiaVoyage</h3>
                            <p className="text-gray-400 text-sm">Your journey, simplified.</p>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Quick Links</h3>
                            <ul className="space-y-2 text-sm">
                                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                                <li><Link to="/packages-and-search-results" className="text-gray-300 hover:text-white">Packages</Link></li>
                                <li><Link to="/trip-cost-estimator" className="text-gray-300 hover:text-white">Trip Estimator</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-2">Support</h3>
                             <ul className="space-y-2 text-sm">
                                <li><a href="#" className="text-gray-300 hover:text-white">Contact Us</a></li>
                                <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
                            </ul>
                        </div>
                        <div>
                             <h3 className="font-bold mb-2">Connect</h3>
                            <div className="flex space-x-4">
                               <a href="#" className="text-gray-300 hover:text-white">FB</a>
                               <a href="#" className="text-gray-300 hover:text-white">TW</a>
                               <a href="#" className="text-gray-300 hover:text-white">IG</a>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} IndiaVoyage. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default UserDashboardPage;