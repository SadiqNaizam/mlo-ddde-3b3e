import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Mountain, CreditCard, User, CheckCircle, Plane, Hotel, Car } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"

// Schema for traveler details
const travelerFormSchema = z.object({
    fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
    adults: z.string().nonempty({ message: "Please select number of adults." }),
    children: z.string().optional(),
});

// Schema for payment details
const paymentFormSchema = z.object({
    cardName: z.string().min(2, { message: "Name on card is required." }),
    cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits." }),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Invalid format. Use MM/YY." }),
    cvc: z.string().regex(/^\d{3}$/, { message: "CVC must be 3 digits." }),
    agreeTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms and conditions." }),
});

const BookingPage = () => {
    console.log('BookingPage loaded');
    const navigate = useNavigate();
    const { toast } = useToast();
    const [activeTab, setActiveTab] = useState('traveler-details');

    const travelerForm = useForm<z.infer<typeof travelerFormSchema>>({
        resolver: zodResolver(travelerFormSchema),
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            adults: "1",
            children: "0",
        },
    });

    const paymentForm = useForm<z.infer<typeof paymentFormSchema>>({
        resolver: zodResolver(paymentFormSchema),
        defaultValues: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
            agreeTerms: false,
        },
    });

    function onTravelerSubmit(values: z.infer<typeof travelerFormSchema>) {
        console.log("Traveler Details:", values);
        setActiveTab('payment');
    }

    function onPaymentSubmit(values: z.infer<typeof paymentFormSchema>) {
        console.log("Payment Details:", values);
        toast({
            title: "Booking Confirmed!",
            description: "Your trip to Kerala has been booked. Redirecting to your dashboard.",
            className: "bg-green-100 text-green-800"
        });
        setTimeout(() => {
            navigate('/user-dashboard'); // Navigate to user dashboard after success
        }, 2000);
    }
    
    // Header Component
    const BookingHeader = () => (
        <header className="bg-white shadow-sm">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold text-gray-800">
                    <Mountain className="h-6 w-6 text-blue-600" />
                    <span>IndiaVoyage</span>
                </Link>
                <nav className="flex items-center gap-4">
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-blue-600">Home</Link>
                    <Link to="/user-dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">My Dashboard</Link>
                    <Button variant="outline">Sign Out</Button>
                </nav>
            </div>
        </header>
    );

    // Footer Component
    const BookingFooter = () => (
        <footer className="bg-gray-100 border-t mt-auto">
            <div className="container mx-auto py-6 px-4 text-center text-sm text-gray-500">
                <p>&copy; {new Date().getFullYear()} IndiaVoyage. All rights reserved.</p>
                <p className="mt-2">
                    <Link to="/about" className="hover:underline mx-2">About Us</Link> |
                    <Link to="/contact" className="hover:underline mx-2">Contact</Link> |
                    <Link to="/privacy" className="hover:underline mx-2">Privacy Policy</Link>
                </p>
            </div>
        </footer>
    );


    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            <BookingHeader />
            <main className="flex-1 py-8 md:py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="traveler-details" disabled={activeTab !== 'traveler-details'}>
                                        <User className="mr-2 h-4 w-4" /> Traveler Details
                                    </TabsTrigger>
                                    <TabsTrigger value="payment" disabled={activeTab !== 'payment'}>
                                        <CreditCard className="mr-2 h-4 w-4" /> Payment
                                    </TabsTrigger>
                                </TabsList>

                                {/* Traveler Details Tab */}
                                <TabsContent value="traveler-details">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Enter Traveler Information</CardTitle>
                                            <CardDescription>Please provide details for the primary traveler.</CardDescription>
                                        </CardHeader>
                                        <Form {...travelerForm}>
                                            <form onSubmit={travelerForm.handleSubmit(onTravelerSubmit)}>
                                                <CardContent className="space-y-4">
                                                    <FormField control={travelerForm.control} name="fullName" render={({ field }) => ( <FormItem> <FormLabel>Full Name</FormLabel> <FormControl> <Input placeholder="John Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    <FormField control={travelerForm.control} name="email" render={({ field }) => ( <FormItem> <FormLabel>Email Address</FormLabel> <FormControl> <Input type="email" placeholder="john.doe@example.com" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    <FormField control={travelerForm.control} name="phone" render={({ field }) => ( <FormItem> <FormLabel>Phone Number</FormLabel> <FormControl> <Input type="tel" placeholder="123-456-7890" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField control={travelerForm.control} name="adults" render={({ field }) => ( <FormItem> <FormLabel>Adults</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="1">1</SelectItem> <SelectItem value="2">2</SelectItem> <SelectItem value="3">3</SelectItem> <SelectItem value="4">4+</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                                                        <FormField control={travelerForm.control} name="children" render={({ field }) => ( <FormItem> <FormLabel>Children</FormLabel> <Select onValueChange={field.onChange} defaultValue={field.value}> <FormControl> <SelectTrigger> <SelectValue placeholder="Select" /> </SelectTrigger> </FormControl> <SelectContent> <SelectItem value="0">0</SelectItem> <SelectItem value="1">1</SelectItem> <SelectItem value="2">2</SelectItem> <SelectItem value="3">3+</SelectItem> </SelectContent> </Select> <FormMessage /> </FormItem> )} />
                                                    </div>
                                                </CardContent>
                                                <CardFooter className="justify-end">
                                                    <Button type="submit">Proceed to Payment</Button>
                                                </CardFooter>
                                            </form>
                                        </Form>
                                    </Card>
                                </TabsContent>

                                {/* Payment Tab */}
                                <TabsContent value="payment">
                                     <Card>
                                        <CardHeader>
                                            <CardTitle>Payment Details</CardTitle>
                                            <CardDescription>Enter your payment information to complete the booking.</CardDescription>
                                        </CardHeader>
                                        <Form {...paymentForm}>
                                            <form onSubmit={paymentForm.handleSubmit(onPaymentSubmit)}>
                                                <CardContent className="space-y-4">
                                                    <FormField control={paymentForm.control} name="cardName" render={({ field }) => ( <FormItem> <FormLabel>Name on Card</FormLabel> <FormControl> <Input placeholder="John Doe" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    <FormField control={paymentForm.control} name="cardNumber" render={({ field }) => ( <FormItem> <FormLabel>Card Number</FormLabel> <FormControl> <Input placeholder="•••• •••• •••• ••••" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <FormField control={paymentForm.control} name="expiryDate" render={({ field }) => ( <FormItem> <FormLabel>Expiry Date</FormLabel> <FormControl> <Input placeholder="MM/YY" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                        <FormField control={paymentForm.control} name="cvc" render={({ field }) => ( <FormItem> <FormLabel>CVC</FormLabel> <FormControl> <Input placeholder="•••" {...field} /> </FormControl> <FormMessage /> </FormItem> )} />
                                                    </div>
                                                    <FormField control={paymentForm.control} name="agreeTerms" render={({ field }) => ( <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"> <FormControl> <Checkbox checked={field.value} onCheckedChange={field.onChange} /> </FormControl> <div className="space-y-1 leading-none"> <FormLabel> I agree to the terms and conditions </FormLabel> </div> <FormMessage /> </FormItem> )} />
                                                </CardContent>
                                                <CardFooter className="flex justify-between">
                                                    <Button variant="outline" onClick={() => setActiveTab('traveler-details')}>Back</Button>
                                                    <Button type="submit">Confirm & Pay: ₹85,000</Button>
                                                </CardFooter>
                                            </form>
                                        </Form>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                        <aside>
                             <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle>Booking Summary</CardTitle>
                                    <CardDescription>Your Custom Kerala Getaway</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Dates</span>
                                        <span>Oct 15, 2024 - Oct 22, 2024</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Travelers</span>
                                        <span>2 Adults, 1 Child</span>
                                    </div>
                                    <hr />
                                    <h4 className="font-semibold">Included Services</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground">
                                        <li className="flex items-center"><Plane className="h-4 w-4 mr-2 text-blue-500" /> Round-trip Flights</li>
                                        <li className="flex items-center"><Hotel className="h-4 w-4 mr-2 text-blue-500" /> 5-Star Hotel (7 nights)</li>
                                        <li className="flex items-center"><Car className="h-4 w-4 mr-2 text-blue-500" /> Airport Transfers & Cab</li>
                                    </ul>
                                    <hr />
                                    <div className="flex justify-between font-bold text-lg">
                                        <span>Total Price</span>
                                        <span>₹85,000</span>
                                    </div>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
            <BookingFooter />
        </div>
    );
};

export default BookingPage;