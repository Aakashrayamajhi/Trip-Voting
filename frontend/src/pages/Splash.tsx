import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plane } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/landing');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center text-white animate-fade-in">
        <div className="mb-8 animate-scale-in">
          <Plane className="h-24 w-24 mx-auto mb-4 animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in">
          Trip Tally Tussle
        </h1>
        <p className="text-xl opacity-90 animate-fade-in">
          Deciding the perfect destination for our adventure...
        </p>
        <div className="mt-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent mx-auto"></div>
        </div>
      </div>
    </div>
  );
}