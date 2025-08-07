import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MapPin,
  Camera,
  Utensils,
  Waves,
  Sun,
  Plane
} from 'lucide-react';
import thailandImage from '@/assets/thailand-beach.jpg';

export default function ThailandDetails() {
  const navigate = useNavigate();

  const pros = [
    { icon: <Sun className="h-5 w-5" />, text: "Year-round tropical weather" },
    { icon: <Waves className="h-5 w-5" />, text: "Beautiful beaches and crystal clear water" },
    { icon: <Utensils className="h-5 w-5" />, text: "Amazing street food and cuisine" },
    { icon: <Camera className="h-5 w-5" />, text: "Instagram-worthy locations everywhere" },
    { icon: <MapPin className="h-5 w-5" />, text: "Rich culture and friendly locals" },
  ];

  const cons = [
    { icon: <XCircle className="h-5 w-5" />, text: "Higher budget requirement" },
    { icon: <XCircle className="h-5 w-5" />, text: "Longer travel time and jet lag" },
    { icon: <XCircle className="h-5 w-5" />, text: "Crowded tourist destinations" },
    { icon: <XCircle className="h-5 w-5" />, text: "Language barrier in remote areas" },
  ];

  // ✅ Different Thailand images from Unsplash
  const images = [

    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80", // beach + longtail boat
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80", // turquoise water
    "https://th.bing.com/th/id/OIF.eJYdwcMzw9eXxhld04B0Ow?w=236&h=183&c=7&r=0&o=5&dpr=1.5&pid=1.7", // Phi Phi islands
    "https://th.bing.com/th/id/OIP.wfP8VqAccvJ2yt88I75OogHaFI?w=236&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3", // street food market
    "https://ts2.mm.bing.net/th?id=OIP.gHFxNi8e3UvJx_d7hz1FdwHaEK&pid=15.1", // Bangkok temple
    "https://th.bing.com/th/id/OIP.CAY1v78mDqLo_Ae-yPVcBAHaE7?w=247&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7"  // floating village
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Header */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={thailandImage}
          alt="Thailand Beach"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        <div className="absolute bottom-0 left-0 p-8 text-white">
          <Button
            onClick={() => navigate('/landing')}
            variant="outline"
            className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>
          <h1 className="text-4xl md:text-6xl font-bold mb-2">Thailand</h1>
          <p className="text-xl md:text-2xl opacity-90">Tropical Paradise Adventure</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Image Gallery */}
        <Card className="mb-12 border border-gray-200 bg-white shadow-md">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">Beautiful Thailand</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative h-32 md:h-48 overflow-hidden rounded-lg group"
                >
                  <img
                    src={img}
                    alt={`Thailand ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Pros */}
          <Card className="border border-gray-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-6 w-6 mr-2" />
                Why Choose Thailand
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {pros.map((pro, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition"
                >
                  <div className="text-green-600">{pro.icon}</div>
                  <span className="text-gray-800">{pro.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cons */}
          <Card className="border border-gray-200 bg-white shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <XCircle className="h-6 w-6 mr-2" />
                Consider These Points
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cons.map((con, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg hover:bg-red-100 transition"
                >
                  <div className="text-red-600">{con.icon}</div>
                  <span className="text-gray-800">{con.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Call to Action Vote Card */}
        <div className="text-center">
          <Card className="max-w-2xl mx-auto p-8 border border-gray-200 bg-white shadow-md relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50" />
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-blue-100 rounded-full blur-2xl opacity-50" />

            <div className="relative z-10 space-y-6 text-gray-800">
              <div className="inline-flex items-center justify-center p-4 bg-blue-50 rounded-full">
                <Plane className="h-8 w-8 text-blue-600" />
              </div>

              <h3 className="text-3xl font-bold">Ready to Vote for Thailand?</h3>
              <p className="opacity-80 text-lg">
                If Thailand sounds perfect for our group trip, cast your vote now!
              </p>

              <div className="flex justify-center gap-4 mt-4">
                <Button
                  onClick={() => navigate('/vote')}
                  className="px-8 h-12 text-base font-semibold bg-blue-600 text-white hover:bg-blue-500 transition-colors shadow"
                >
                  Vote for Thailand
                </Button>

                {/* <Button
                  variant="outline"
                  onClick={() => navigate('/compare')}
                  className="px-8 h-12 text-base font-semibold border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-400 transition-colors"
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
