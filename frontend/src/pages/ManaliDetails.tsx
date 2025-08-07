import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MapPin,
  Camera,
  Mountain,
  Snowflake,
  Wind,
  Plane,
  Footprints,   // ✅ replaced Hiking with Footprints
  Cloud,
  Wifi,
  Heart,
  Sun,
  Moon,
  Calendar      // ✅ added missing import
} from 'lucide-react';

// Replace these with your actual image imports
const manaliImages = [
  'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&auto=format', // Mountains
  'https://th.bing.com/th/id/OIP.eibXiAkgEGFMVZQIHrjegwHaFj?w=235&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3', // Town
  'https://th.bing.com/th/id/OIP.VjLe6EDPZ7wc1fOFq2ewrAHaE5?w=283&h=187&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3', // River
  'https://th.bing.com/th/id/OIP.vzZd_ox8NHmhyGqiIINAcgHaEH?w=327&h=182&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3', // Snow
  'https://th.bing.com/th/id/OIP.5n2CE_YP5Yar8W5me3JTHQHaDr?w=284&h=173&c=7&r=0&o=5&dpr=1.5&pid=1.7', // Valley
  'https://th.bing.com/th/id/OIP.fW1fMbDD8ZA3TXuMEwN1PAHaFj?w=251&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3t', // Sunset
];

export default function ManaliDetails() {
  const navigate = useNavigate();

  const highlights = [
    { icon: <Mountain className="h-5 w-5" />, text: "Himalayan Peaks", desc: "Stunning views of 6,000m+ mountains" },
    { icon: <Footprints className="h-5 w-5" />, text: "Trekking Paradise", desc: "Routes to Hampta Pass, Beas Kund & more" },
    { icon: <Snowflake className="h-5 w-5" />, text: "Snow Activities", desc: "Skiing, snowboarding Dec-Feb" },
    { icon: <Wind className="h-5 w-5" />, text: "Adventure Sports", desc: "Paragliding, rafting, ziplining" },
    { icon: <Camera className="h-5 w-5" />, text: "Instagrammable", desc: "Most scenic spots in North India" },
    { icon: <Heart className="h-5 w-5" />, text: "Honeymoon Favorite", desc: "Romantic mountain getaway" },
  ];

  const considerations = [
    { icon: <Cloud className="h-5 w-5" />, text: "Weather Dependent", desc: "Activities may cancel due to weather" },
    { icon: <Wifi className="h-5 w-5" />, text: "Spotty Connectivity", desc: "Limited network in remote areas" },
    { icon: <XCircle className="h-5 w-5" />, text: "Altitude Sickness", desc: "3,000m elevation affects some" },
    { icon: <Moon className="h-5 w-5" />, text: "Limited Nightlife", desc: "Quiet after 10pm in most areas" },
  ];

  const itinerary = [
    { day: "Day 1", activity: "Arrival & Old Manali Exploration" },
    { day: "Day 2", activity: "Solang Valley Adventure Sports" },
    { day: "Day 3", activity: "Rohtang Pass Excursion" },
    { day: "Day 4", activity: "Trek to Jogini Waterfall" },
    { day: "Day 5", activity: "Visit Hidimba Temple & Departure" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-rose-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={manaliImages[0]}
          alt="Manali Hero"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Button
            onClick={() => navigate('/landing')}
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            All Destinations
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Manali</h1>
          <p className="text-xl md:text-2xl opacity-90">Gateway to the Himalayas</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Highlights Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 relative">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Why Manali?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-gray-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">
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
            {manaliImages.map((img, index) => (
              <div key={index} className="relative h-48 md:h-64 overflow-hidden rounded-xl group">
                <img
                  src={img}
                  alt={`Manali ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Pros */}
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

          {/* Cons */}
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
        <Card className="mb-16 border-0 bg-gradient-to-br from-blue-50 to-white shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-600">
              <Calendar className="h-6 w-6 mr-2" />
              5-Day Sample Itinerary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {itinerary.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 bg-white hover:bg-blue-50 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  {/* Circle Number */}
                  <div className="flex-shrink-0 bg-blue-100 text-blue-600 rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg">
                    {index + 1}
                  </div>

                  {/* Day and Activity */}
                  <div>
                    <p className="font-semibold text-blue-700">Day {index + 1}</p>
                    <p className="text-sm text-gray-600">{item.activity}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* CTA Section */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 border border-gray-200 bg-white shadow-md relative overflow-hidden">
            {/* Decorative subtle circles */}
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50" />
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50" />

            <div className="relative z-10 space-y-6 text-gray-800">
              {/* Heart icon */}
              <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>

              {/* Title & subtitle */}
              <h3 className="text-3xl font-bold">Ready for the Mountains?</h3>
              <p className="opacity-80 text-lg">
                Vote now to make Manali our next group destination
              </p>

              {/* Buttons */}
              <div className="flex justify-center gap-4 mt-4">
                {/* Primary Button */}
                <Button
                  onClick={() => navigate('/vote')}
                  className="px-8 h-12 text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow"
                >
                  Vote for Manali
                </Button>

                {/* Secondary Button */}
                {/* <Button
                  variant="outline"
                  onClick={() => navigate('/compare')}
                  className="px-8 h-12 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors"
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
