import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface VotingCardProps {
  destination: "Thailand" | "Manali";
  image: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (destination: "Thailand" | "Manali") => void;
}

export const VotingCard = ({
  destination,
  image,
  title,
  description,
  isSelected,
  onSelect,
}: VotingCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 transform",
        "hover:shadow-hover hover:animate-card-hover",
        isSelected && "ring-4 ring-selected-glow shadow-selected animate-glow-pulse",
        destination === "Thailand" 
          ? "hover:shadow-lg hover:shadow-thailand/20" 
          : "hover:shadow-lg hover:shadow-manali/20"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(destination)}
    >
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={cn(
            "w-full h-full object-cover transition-transform duration-500",
            isHovered && "scale-110"
          )}
        />
        <div 
          className={cn(
            "absolute inset-0 transition-opacity duration-300",
            destination === "Thailand" 
              ? "bg-gradient-to-t from-thailand/80 via-thailand/20 to-transparent"
              : "bg-gradient-to-t from-manali/80 via-manali/20 to-transparent"
          )}
        />
        {isSelected && (
          <div className="absolute inset-0 bg-selected-glow/20 border-4 border-selected-glow rounded-lg" />
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl sm:text-3xl font-bold mb-2 drop-shadow-lg">
            {title}
          </h3>
          <p className="text-sm sm:text-base opacity-90 drop-shadow-md">
            {description}
          </p>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-4 right-4 bg-selected-glow text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
          Selected ✓
        </div>
      )}
    </Card>
  );
};