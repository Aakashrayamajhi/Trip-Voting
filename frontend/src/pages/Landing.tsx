import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Plane, Utensils, Mountain, Sun, Waves, Landmark, Star } from 'lucide-react';
import thailandImage from '@/assets/thailan.avif';
import manaliImage from '@/assets/manali-mountains.jpg';
import goaImage from '@/assets/goa.jpg';

export default function Landing() {
  const navigate = useNavigate();

  const destinations = [
    {
      id: 'thailand',
      title: 'Thailand',
      subtitle: 'Tropical Paradise',
      image: thailandImage,
      gradient: 'from-amber-500/80 to-orange-400/20',
      totalBudget: 'NPR 1,20,000',
      duration: '7-10 days',
      activities: [
        { name: 'Scuba Diving', cost: 'NPR 13,300-22,800', icon: <Waves className="h-4 w-4" /> },
        { name: 'Muay Thai Fight', cost: 'NPR 5,700-13,300', icon: <Star className="h-4 w-4" /> },
        { name: 'Island Hopping', cost: 'NPR 5,700-11,400', icon: <Sun className="h-4 w-4" /> },
        { name: 'Street Food (per meal)', cost: 'NPR 190-760', icon: <Utensils className="h-4 w-4" /> },
        { name: 'Luxury Resort (per night)', cost: 'NPR 7,600+', icon: <Landmark className="h-4 w-4" /> },
      ],
      foods: [
        { name: 'Pad Thai', cost: 'NPR 190-380' },
        { name: 'Tom Yum Soup', cost: 'NPR 380-760' },
        { name: 'Mango Sticky Rice', cost: 'NPR 228-456' },
      ]
    },
    {
      id: 'manali',
      title: 'Manali',
      subtitle: 'Mountain Escape',
      image: manaliImage,
      gradient: 'from-blue-500/80 to-emerald-400/20',
      totalBudget: 'NPR 80,000',
      duration: '5-7 days',
      activities: [
        { name: 'River Rafting', cost: 'NPR 4,000-6,000', icon: <Waves className="h-4 w-4" /> },
        { name: 'Skiing', cost: 'NPR 6,000-10,000', icon: <Mountain className="h-4 w-4" /> },
        { name: 'Himalayan Trek', cost: 'NPR 3,000-8,000', icon: <Mountain className="h-4 w-4" /> },
        { name: 'Local Cuisine (per meal)', cost: 'NPR 160-320', icon: <Utensils className="h-4 w-4" /> },
        { name: 'Mountain Resort (per night)', cost: 'NPR 3,200+', icon: <Landmark className="h-4 w-4" /> },
      ],
      foods: [
        { name: 'Thukpa', cost: 'NPR 192-320' },
        { name: 'Himachali Dham', cost: 'NPR 480-800' },
        { name: 'Trout Fish', cost: 'NPR 400-640' },
      ]
    },
    {
      id: 'goa',
      title: 'Goa',
      subtitle: 'Beach Party',
      image: goaImage,
      gradient: 'from-rose-500/80 to-pink-400/20',
      totalBudget: 'NPR 90,000',
      duration: '5-8 days',
      activities: [
        { name: 'Water Sports', cost: 'NPR 3,200-6,400', icon: <Waves className="h-4 w-4" /> },
        { name: 'Dolphin Cruise', cost: 'NPR 2,400-4,800', icon: <Sun className="h-4 w-4" /> },
        { name: 'Nightlife Experience', cost: 'NPR 4,800-9,600', icon: <Star className="h-4 w-4" /> },
        { name: 'Seafood Feast (per meal)', cost: 'NPR 320-640', icon: <Utensils className="h-4 w-4" /> },
        { name: 'Beach Villa (per night)', cost: 'NPR 4,800+', icon: <Landmark className="h-4 w-4" /> },
      ],
      foods: [
        { name: 'Fish Curry Rice', cost: 'NPR 240-480' },
        { name: 'Pork Vindaloo', cost: 'NPR 320-560' },
        { name: 'Bebinca Dessert', cost: 'NPR 160-320' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-rose-50">
      {/* Animated Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-20">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center mb-6 animate-fade-in">
            <Plane className="h-10 w-10 mr-3 animate-float" />
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-amber-100">
              Travel Compare
            </h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-2xl mx-auto">
            Discover, compare, and choose your perfect getaway with real pricing
          </p>

          {/* Responsive Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 w-full sm:w-auto"
              onClick={() => navigate('/vote')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Quick Vote
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 w-full sm:w-auto"
              onClick={() => window.scrollBy({ top: 800, behavior: 'smooth' })}
            >
              <MapPin className="h-5 w-5 mr-2" />
              Explore Destinations
            </Button>
            <Button
              variant="outline"
              className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 w-full sm:w-auto"
              onClick={() => navigate('/results')}
            >
              <Calendar className="h-5 w-5 mr-2" />
              Results
            </Button>
          </div>
        </div>
      </div>

      {/* Destination Cards Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card
              key={destination.id}
              className="group relative overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image with Gradient Overlay */}
              <div className="relative h-60 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${destination.gradient} via-transparent`} />
                <div className="absolute bottom-0 left-0 p-6">
                  <h2 className="text-3xl font-bold text-white drop-shadow-xl">{destination.title}</h2>
                  <p className="text-white/90">{destination.subtitle}</p>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="font-medium text-sm text-gray-800">{destination.duration}</span>
                </div>
              </div>

              {/* Card Content */}
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">
                    <MapPin className="inline h-5 w-5 mr-2 text-primary" />
                    Total Budget
                  </CardTitle>
                  <span className="text-2xl font-bold text-primary">{destination.totalBudget}</span>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                {/* Activities Section */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Mountain className="h-5 w-5 mr-2 text-primary" />
                    Top Activities
                  </h3>
                  <div className="space-y-3">
                    {destination.activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          {activity.icon}
                          <span>{activity.name}</span>
                        </div>
                        <span className="font-medium text-primary">{activity.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Food Section */}
                <div>
                  <h3 className="font-semibold text-lg mb-3 flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-primary" />
                    Must-Try Foods
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {destination.foods.map((food, index) => (
                      <div
                        key={index}
                        className="bg-primary/10 rounded-md p-2 text-center hover:bg-primary/20 transition-colors"
                      >
                        <p className="font-medium text-sm">{food.name}</p>
                        <p className="text-xs text-primary">{food.cost}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="pt-0">
                <Button
                  onClick={() => navigate(`/${destination.id}`)}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                >
                  Explore {destination.title}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Comparison CTA */}
        <div className="mt-20 text-center">
          <Card className="max-w-2xl mx-auto p-8 border-0 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg relative overflow-hidden">
            <div className="absolute -right-20 -top-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-full">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900">Still Deciding?</h3>
              <p className="text-gray-600">
                Compare all destinations side-by-side or let our community help you choose
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => navigate('/results')}
                  className="px-8 h-12 text-base font-semibold border-primary text-primary hover:bg-blue-500"
                >
                  Community Vote
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
