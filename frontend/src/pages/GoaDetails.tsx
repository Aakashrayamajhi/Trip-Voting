import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    CheckCircle,
    XCircle,
    MapPin,
    Camera,
    Waves,
    Sun,
    Umbrella,
    Music,
    Heart,
    Wifi,
    Cloud,
    Calendar,
    Plane,
    Wine,
} from 'lucide-react';

// Goa images
const goaImages = [
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // beach
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // sea waves
    'https://tse1.mm.bing.net/th/id/OIP.IPF-rOVsKSwK9Ne1noA0KAHaFj?rs=1&pid=ImgDetMain&o=7&rm=3', // party
    'https://th.bing.com/th/id/OIP.kCeWix7hJgMuNTtmqDSbmgHaE8?w=273&h=182&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3', // shack
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=800&q=80', // sunset
    'https://tse4.mm.bing.net/th/id/OIP.7DuqPHk52n38sXiI1Bt7NAHaD2?w=1920&h=1000&rs=1&pid=ImgDetMain&o=7&rm=3', // fort aguada
];

export default function GoaDetails() {
    const navigate = useNavigate();

    const highlights = [
        { icon: <Sun className="h-5 w-5" />, text: "Sunny Beaches", desc: "Golden sands and tropical vibes all year" },
        { icon: <Waves className="h-5 w-5" />, text: "Water Sports", desc: "Jet skiing, parasailing, surfing & more" },
        { icon: <Music className="h-5 w-5" />, text: "Nightlife & Music", desc: "Clubs, beach parties and EDM festivals" },
        { icon: <Wine className="h-5 w-5" />, text: "Beach Shacks", desc: "Seafood, drinks, and chilling by the sea" },
        { icon: <MapPin className="h-5 w-5" />, text: "Cultural Mix", desc: "Portuguese forts, churches, and markets" },
        { icon: <Camera className="h-5 w-5" />, text: "Instagram Spots", desc: "Sunsets, beaches, and heritage streets" },
    ];

    const considerations = [
        { icon: <Cloud className="h-5 w-5" />, text: "Monsoon Season", desc: "Heavy rains from June to September" },
        { icon: <Wifi className="h-5 w-5" />, text: "Peak Season Rush", desc: "Crowded beaches during Dec-Jan" },
        { icon: <XCircle className="h-5 w-5" />, text: "Party Noise", desc: "Some areas are noisy at night" },
        { icon: <Umbrella className="h-5 w-5" />, text: "Sunburn Risk", desc: "Need sunscreen for long beach days" },
    ];

    const itinerary = [
        { day: "Day 1", activity: "Arrival & Relax at Baga Beach" },
        { day: "Day 2", activity: "Water Sports & Candolim Beach" },
        { day: "Day 3", activity: "Old Goa Churches & Fontainhas Walk" },
        { day: "Day 4", activity: "Sunset at Chapora Fort & Beach Party" },
        { day: "Day 5", activity: "Shopping at Anjuna Flea Market & Departure" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50">
            {/* Hero Section */}
            <div className="relative h-96 overflow-hidden">
                <img
                    src={goaImages[0]}
                    alt="Goa Beach"
                    className="w-full h-full object-cover brightness-75"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8 text-white">
                    <Button
                        onClick={() => navigate('/landing')}
                        variant="outline"
                        className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 mb-6"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        All Destinations
                    </Button>
                    <h1 className="text-4xl md:text-6xl font-bold mb-2">Goa</h1>
                    <p className="text-xl md:text-2xl opacity-90">Beach, Sun & Party Paradise</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                {/* Highlights */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-12">
                        <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                            Why Goa?
                        </span>
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {highlights.map((item, index) => (
                            <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-orange-50">
                                <CardHeader className="pb-2">
                                    <div className="flex items-center">
                                        <div className="p-2 rounded-full bg-orange-100 text-orange-600">
                                            {item.icon}
                                        </div>
                                        <CardTitle className="text-lg ml-3">{item.text}</CardTitle>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{item.desc}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Image Gallery */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Visual Journey</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {goaImages.map((img, index) => (
                            <div key={index} className="relative h-48 md:h-64 overflow-hidden rounded-xl group">
                                <img
                                    src={img}
                                    alt={`Goa ${index + 1}`}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pros & Cons */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-white">
                        <CardHeader>
                            <CardTitle className="flex items-center text-green-600">
                                <CheckCircle className="h-6 w-6 mr-2" />
                                The Good
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {highlights.slice(0, 4).map((pro, index) => (
                                <div key={index} className="flex items-start space-x-4 p-3 hover:bg-green-50 rounded-lg transition-colors">
                                    <div className="p-1.5 bg-green-100 rounded-full text-green-600 mt-0.5">
                                        {pro.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{pro.text}</p>
                                        <p className="text-sm text-muted-foreground">{pro.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border-0 shadow-sm bg-gradient-to-br from-rose-50 to-white">
                        <CardHeader>
                            <CardTitle className="flex items-center text-rose-600">
                                <XCircle className="h-6 w-6 mr-2" />
                                The Challenges
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {considerations.map((con, index) => (
                                <div key={index} className="flex items-start space-x-4 p-3 hover:bg-rose-50 rounded-lg transition-colors">
                                    <div className="p-1.5 bg-rose-100 rounded-full text-rose-600 mt-0.5">
                                        {con.icon}
                                    </div>
                                    <div>
                                        <p className="font-medium">{con.text}</p>
                                        <p className="text-sm text-muted-foreground">{con.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Sample Itinerary */}
                <Card className="mb-16 border-0 bg-gradient-to-br from-yellow-50 to-white shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center text-orange-600">
                            <Calendar className="h-6 w-6 mr-2" />
                            5-Day Sample Itinerary
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {itinerary.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4 p-4 bg-white hover:bg-yellow-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    <div className="flex-shrink-0 bg-orange-100 text-orange-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-orange-700">Day {index + 1}</p>
                                        <p className="text-sm text-gray-600">{item.activity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* CTA */}
                <div className="text-center">
                    <Card className="max-w-2xl mx-auto p-8 border border-gray-200 bg-white shadow-md relative overflow-hidden">
                        <div className="absolute -right-20 -top-20 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-50" />
                        <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-orange-100 rounded-full blur-2xl opacity-50" />

                        <div className="relative z-10 space-y-6 text-gray-800">
                            <div className="inline-flex items-center justify-center p-4 bg-orange-50 rounded-full">
                                <Plane className="h-8 w-8 text-orange-600" />
                            </div>

                            <h3 className="text-3xl font-bold">Ready for Goa?</h3>
                            <p className="opacity-80 text-lg">
                                Vote now to make Goa our next beach destination!
                            </p>

                            <div className="flex justify-center gap-4 mt-4">
                                <Button
                                    onClick={() => navigate('/vote')}
                                    className="px-8 h-12 text-base font-semibold bg-orange-600 text-white hover:bg-orange-500 transition-colors shadow"
                                >
                                    Vote for Goa
                                </Button>

                                {/* <Button
                                    variant="outline"
                                    onClick={() => navigate('/compare')}
                                    className="px-8 h-12 text-base font-semibold border-2 border-orange-600 text-orange-600 hover:bg-orange-50 transition-colors"
                                >
                                    Compare Options
                                </Button> */}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
