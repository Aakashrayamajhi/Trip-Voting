import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { VotingCard } from "./VotingCard";
import { useToast } from "@/hooks/use-toast";
import { Plane, Heart, CheckCircle } from "lucide-react";
import thailandImage from "@/assets/thailand-beach.jpg";
import manaliImage from "@/assets/manali-mountains.jpg";

type Destination = "Thailand" | "Manali";

export const VotingForm = () => {
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [reason, setReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!selectedDestination) {
      toast({
        title: "Please select a destination",
        description: "Choose either Thailand or Manali to continue",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual Supabase call later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setHasVoted(true);
      toast({
        title: "Vote submitted successfully! 🎉",
        description: `Your vote for ${selectedDestination} has been recorded.`,
      });
    } catch (error) {
      toast({
        title: "Error submitting vote",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVoteAgain = () => {
    setHasVoted(false);
    setSelectedDestination(null);
    setReason("");
  };

  if (hasVoted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10 flex items-center justify-center p-4">
        <Card className="max-w-md w-full p-8 text-center bg-gradient-card border-0 shadow-card">
          <div className="mb-6">
            <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Thank You for Voting! 🌟
            </h2>
            <p className="text-muted-foreground">
              Your vote for <span className="font-semibold text-primary">{selectedDestination}</span> has been recorded successfully.
            </p>
          </div>
          
          {reason && (
            <div className="mb-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Your reason:</p>
              <p className="text-foreground italic">"{reason}"</p>
            </div>
          )}
          
          <Button 
            onClick={handleVoteAgain}
            variant="outline"
            className="w-full"
          >
            Vote Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/10">
      {/* Header */}
      <div className="bg-gradient-hero text-white">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <Plane className="h-8 w-8 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">Trip Tally Tussle</h1>
          </div>
          <p className="text-xl md:text-2xl opacity-90 mb-2">
            Where should our friend group go?
          </p>
          <p className="text-lg opacity-75">
            Cast your vote and help us decide between Thailand and Manali!
          </p>
        </div>
      </div>

      {/* Voting Cards */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
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
        </div>

        {/* Reason and Submit */}
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-card border-0 shadow-card">
          <div className="space-y-6">
            <div>
              <label htmlFor="reason" className="flex items-center text-lg font-semibold text-foreground mb-3">
                <Heart className="h-5 w-5 mr-2 text-primary" />
                Why do you prefer this destination? (Optional)
              </label>
              <Textarea
                id="reason"
                placeholder="Share your thoughts about why this destination would be perfect for our trip..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="min-h-[120px] resize-none border-2 focus:border-primary"
                rows={4}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!selectedDestination || isSubmitting}
              className="w-full h-12 text-lg font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                  Submitting Vote...
                </div>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5 mr-2" />
                  Submit My Vote
                </>
              )}
            </Button>

            {selectedDestination && (
              <p className="text-center text-sm text-muted-foreground">
                You're voting for <span className="font-semibold text-primary">{selectedDestination}</span>
              </p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};