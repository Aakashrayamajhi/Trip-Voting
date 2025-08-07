import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VotingCard } from "@/components/VotingCard";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Calendar,
  Heart,
  CheckCircle,
} from "lucide-react";
import thailandImage from "@/assets/thailand-beach.jpg";
import manaliImage from "@/assets/manali-mountains.jpg";
import goaImage from "@/assets/goa.webp";

type Destination = "Thailand" | "Manali" | "Goa";

export default function Vote() {
  const [fullName, setFullName] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [reason, setReason] = useState("");
  const [tripPeriod, setTripPeriod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [deviceId, setDeviceId] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const candidates = [
    "Aakash Rayamajhi", "Ayam Regmi", "Ayush Aacharya", "Abin Gahatraj", "Amrit Bhattarai",
    "Arun Bhandari", "Atit Bhattarai", "Apsana Neupane", "Ayush Aryal", "Bimal Ghimire",
    "Bepasa Karki Chettri", "Bindu Basnet", "Bishal Neupane", "Durga Thapa", "Heseela Bhusal",
    "Madhav Poudel", "Prajwal Basnet", "Prajwal GC", "Pritika Gurung", "Richa Rana",
    "Rubina Saru Magar", "Rohan Bishowkarma", "Sabin Gaha Magar", "Sagun Bhandari",
    "Saroj Pangeni", "Shruti Pun", "Sneha Bhandari", "Sujal Pandey", "Sujita Rijal",
    "Sumit Kawar Magar", "Thakur Kunwar"
  ];

  useEffect(() => {
    let storedDeviceId = localStorage.getItem("trip-voting-device-id");
    if (!storedDeviceId) {
      storedDeviceId = Math.random().toString(36).substring(2, 11);
      localStorage.setItem("trip-voting-device-id", storedDeviceId);
    }
    setDeviceId(storedDeviceId);

    if (localStorage.getItem("trip-voting-completed")) {
      setHasVoted(true);
    }
  }, []);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async () => {
    const trimmedName = fullName.trim();

    if (!trimmedName) {
      toast({
        title: "Full name required",
        description: "Please enter your full name to continue",
        variant: "destructive",
      });
      return;
    }

    const isCandidate = candidates.some(
      (candidate) => candidate.toLowerCase() === trimmedName.toLowerCase()
    );

    if (!isCandidate) {
      toast({
        title: "Invalid Name",
        description: "Please enter your full name exactly as per the candidate list.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedDestination) {
      toast({
        title: "Select destination",
        description: "Please select a destination to vote",
        variant: "destructive",
      });
      return;
    }
    if (!tripPeriod) {
      toast({
        title: "Select trip period",
        description: "Please choose your preferred trip month",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE}/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: trimmedName,
          destination: selectedDestination,
          reason,
          tripPeriod,
          deviceId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit vote");
      }

      localStorage.setItem("trip-voting-completed", "true");
      setHasVoted(true);

      toast({
        title: "Vote submitted successfully! 🎉",
        description: `Your vote for ${selectedDestination} has been recorded.`,
      });
    } catch (error: any) {
      toast({
        title: "Submission Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoteAgain = () => {
    localStorage.removeItem("trip-voting-completed");
    setHasVoted(false);
    setFullName("");
    setSelectedDestination(null);
    setReason("");
    setTripPeriod("");
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg">
          <div className="mb-6">
            <div className="mx-auto mb-4 flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Thank You for Voting! 🌟
            </h2>
            <p className="text-gray-600">
              Your vote has been recorded successfully.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleVoteAgain}
              variant="outline"
              className="w-full border-gray-300 hover:bg-gray-400"
            >
              Vote Again
            </Button>
            <Button
              onClick={() => navigate("/results")}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600"
            >
              View Results
            </Button>
            <Button
              onClick={() => navigate("/landing")}
              variant="ghost"
              className="w-full text-gray-600 hover:bg-gray-400"
            >
              Back to Home
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md">
        <div className="container mx-auto px-4 py-12">
          <Button
            onClick={() => navigate("/landing")}
            variant="outline"
            className="mb-6 text-blue-600 border-white/50 hover:bg-white/10 hover:border-white"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Destinations
          </Button>

          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-3">Cast Your Vote</h1>
            <p className="text-lg opacity-90">
              Help us decide our next group adventure destination
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 -mt-8 flex flex-col lg:flex-row gap-8">
        {/* Main Voting Form */}
        <div className="flex-1">
          <Card className="max-w-2xl mx-auto mb-12 p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <User className="h-5 w-5 mr-2 text-blue-600" />
                Registration Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-base font-medium">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fullName"
                  placeholder="eg: Aakash Rayamajhi"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 h-11 text-base border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter your full name according to the candidate list →
                </p>
              </div>

              {/* Trip Period */}
              <div>
                <Label htmlFor="tripPeriod" className="text-base font-medium flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Preferred Trip Period <span className="text-red-500">*</span>
                </Label>
                <Select value={tripPeriod} onValueChange={setTripPeriod}>
                  <SelectTrigger className="mt-2 h-11 text-base border-gray-300 focus:ring-blue-500 focus:border-blue-500">
                    <SelectValue placeholder="Select your preferred month" />
                  </SelectTrigger>
                  <SelectContent className="border-gray-200 shadow-lg rounded-md max-h-60 overflow-auto">
                    {[
                      "January", "February", "March", "April", "May", "June",
                      "July", "August", "September", "October", "November", "December"
                    ].map((month) => (
                      <SelectItem key={month} value={month} className="hover:bg-gray-50">
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Destination Selection */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Choose Your Preferred Destination
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <VotingCard
                destination="Thailand"
                image={thailandImage}
                title="Thailand"
                description="Tropical paradise with pristine beaches, vibrant culture, and delicious cuisine"
                isSelected={selectedDestination === "Thailand"}
                onSelect={setSelectedDestination}
              />
              <VotingCard
                destination="Manali"
                image={manaliImage}
                title="Manali"
                description="Himalayan adventure with snow-capped peaks, valleys, and mountain serenity"
                isSelected={selectedDestination === "Manali"}
                onSelect={setSelectedDestination}
              />
              <VotingCard
                destination="Goa"
                image={goaImage}
                title="Goa"
                description="Beach, sun, and party paradise with vibrant nightlife and culture"
                isSelected={selectedDestination === "Goa"}
                onSelect={setSelectedDestination}
              />
            </div>
          </div>

          {/* Reason & Submit */}
          <Card className="max-w-2xl mx-auto p-6 bg-white border border-gray-200 rounded-xl shadow-sm">
            <div className="space-y-5">
              <label
                htmlFor="reason"
                className="flex items-center text-base font-medium text-gray-800 mb-2"
              >
                <Heart className="h-5 w-5 mr-2 text-blue-600" />
                Why do you prefer this destination? (Optional)
              </label>
              <Textarea
                id="reason"
                placeholder="Share your thoughts about why this destination would be perfect for our trip..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[120px] resize-none border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                rows={4}
              />

              <Button
                onClick={handleSubmit}
                disabled={
                  !selectedDestination || !fullName.trim() || !tripPeriod || isSubmitting
                }
                className="w-full h-12 text-base font-medium bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                    Submitting...
                  </div>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Submit My Vote
                  </>
                )}
              </Button>

              {selectedDestination && (
                <p className="text-center text-sm text-gray-600 mt-3">
                  You're voting for{" "}
                  <span className="font-medium text-blue-600">{selectedDestination}</span>
                  {tripPeriod && <> in <span className="font-medium text-blue-600">{tripPeriod}</span></>}
                </p>
              )}
            </div>
          </Card>
        </div>

        {/* Candidate List Sidebar */}
        <Card className="w-full lg:w-64 h-fit bg-white border border-gray-200 rounded-xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base text-center text-blue-600">
              Voting Candidates
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-y-auto space-y-2 text-sm">
            {candidates.map((name) => (
              <div
                key={name}
                className="p-2 bg-gray-50 rounded-md border border-gray-100 hover:bg-gray-100 transition text-gray-700"
              >
                {name}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
