import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Download,
  Users,
  Trophy,
  Calendar,
  Send,
  MessageSquare,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function Results() {
  // Vote type based on your backend response structure
  type Vote = {
    _id?: string;
    id?: string;
    fullName: string;
    destination: string;
    tripPeriod: string;
    reason?: string;
    createdAt: string;
  };

  const [votes, setVotes] = useState<Vote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    thailand: 0,
    manali: 0,
    goa: 0,
    total: 0,
  });
  const [chatMessages, setChatMessages] = useState<
    { user: string; message: string }[]
  >([{ user: "TravelBot", message: "Welcome to the trip discussion! 🌍✈️" }]);
  const [chatInput, setChatInput] = useState("");
  const [showChat, setShowChat] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const { toast } = useToast();

  // Replace this with your actual backend API base URL
  const API_BASE = "/api/vote";

  useEffect(() => {
    fetchStats();
    fetchAllVotes();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Fetch stats from backend /stats endpoint
  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error("Failed to fetch stats");
      const data = await res.json();
      setStats({
        thailand: data.thailand || 0,
        manali: data.manali || 0,
        goa: data.goa || 0,
        total: data.total || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Error loading stats",
        description: "Could not fetch voting stats",
        variant: "destructive",
      });
    }
  };

  // Fetch all votes from backend /all endpoint
  const fetchAllVotes = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${API_BASE}/all`);
      if (!res.ok) throw new Error("Failed to fetch votes");
      const data = await res.json();
      // Map backend fields to frontend state fields if needed:
      const formattedVotes = data.map((vote: any) => ({
        id: vote._id || vote.id,
        fullName: vote.fullName || vote.full_name,
        destination: vote.destination,
        tripPeriod: vote.tripPeriod || vote.trip_period,
        reason: vote.reason,
        createdAt: vote.createdAt || vote.created_at,
      }));
      setVotes(formattedVotes);
    } catch (error) {
      console.error("Error fetching votes:", error);
      toast({
        title: "Error loading votes",
        description: "Could not fetch voting results",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Trip Voting Results", 20, 20);
    doc.setFontSize(12);
    doc.text(`Total Votes: ${stats.total}`, 20, 40);
    doc.text(`Thailand: ${stats.thailand} votes`, 20, 50);
    doc.text(`Manali: ${stats.manali} votes`, 20, 60);
    doc.text(`Goa: ${stats.goa} votes`, 20, 70);

    const tableData = votes.map((vote) => [
      vote.fullName,
      vote.destination,
      vote.tripPeriod,
      vote.reason || "No reason provided",
      new Date(vote.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [["Name", "Destination", "Trip Period", "Reason", "Date"]],
      body: tableData,
      startY: 90,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [79, 70, 229] },
    });

    doc.save("trip-voting-results.pdf");
    toast({
      title: "PDF Downloaded",
      description: "Voting results downloaded successfully",
    });
  };

  const winner = () => {
    const { thailand, manali, goa } = stats;
    if (thailand > manali && thailand > goa) return "Thailand";
    if (manali > thailand && manali > goa) return "Manali";
    if (goa > thailand && goa > manali) return "Goa";
    return "Tie";
  };

  const handleChatSend = () => {
    if (!chatInput.trim()) return;

    const userMessage = chatInput.trim().toLowerCase();
    setChatMessages((prev) => [...prev, { user: "You", message: chatInput }]);
    setChatInput("");

    setTimeout(() => {
      // Responses object with arrays of possible replies per category
      const responses: { [key: string]: string[] } = {
        thailand: [
          "Thailand ek popular South East Asian country ho jasle beaches, temples, ra nightlife ko lagi chinieko xa. Bangkok, Phuket, Pattaya jasta thau haru dherai famous chan.",
          "Thailand ma dherai ramailo beaches ra temple haru chan. Ghumna janey haru lai manparcha.",
          "Thailand ekdam famous cha party ra tourism ko lagi, tapaslai pani ramailo huncha.",
          "ea pagal ja jani ho ja malai na sodh",
          "tw pagal ho",
          "ghar ja",
          "tero passport nai bandaina heyram la kasari janxas"
        ],

        goa: [
          "Goa India ko ekdam popular tourist destination ho jaha beaches, parties, casinos, ani shanti environment ko maja lina sakincha.",
          "Goa ko beach party sabai lai manparcha, shanti pani cha tyo thau ma.",
          "Goa ma majaa garna sakinchha, beaches ra nightlife dherai ramro cha.",
          "ea pagal ja jani ho ja malai na sodh",
          "tw pagal ho",
          "ghar ja"
        ],
        manali: [
          "Manali ek hill station ho India ma, mostly couples, friends, ani adventure lovers haru ko lagi. Snow, trekking, paragliding, rafting sabai manparcha vane ghumna ja manparcha.",
          "Manali ko thau haru dherai ramro chan, snow pani pugdacha winter ma.",
          "Manali trekking ra adventure sports ko lagi ek ramro thau ho.",
          "theek xa dost yai thau ma ja ramro xa "
        ],
        bestPlace: [
          "Timi ghumna jaane sochda chau vane: Thailand for beaches, Goa for party vibes, Manali for hills & snow. Budget anusar suggestion dinu parcha vane sodh na.",
          "Ka janey plan cha bhane clear bhaye ma ramro suggestion dinchu. Timi lai kati din ko plan cha?",
          "Ramro ghumne thau chahiyo bhane tyo destination anusar kura garna sakincha.",
          "ea pagal ja jani ho ja malai na sodh",
          "tw pagal ho",

        ],
        greetings: [
          "Namaste! Kasto xa? Ghumna jane plan xa?",
          "Hello! K garira chau? Travel ko plan cha?",
          "Hi! TravelBot ma tapailai swagat cha.",
          "lala yrr",
          "tw pagal ho",

        ],
        thanks: [
          "You're welcome! Aru kura sodhna free chau.",
          "Dhanyabad! Kati ramro kura bhayo kura garera.",
          "Sadaiva khusi hunu hola! Aru sodhnus.",
          "ok boss",
          "tw pagal ho",

        ],
        chatbotInfo: [
          "Yes, ma ek travel assistant chatbot hu. Ghumna sambandhi jankari dinchu.",
          "Ma chatbot hu, travel related questions ko help garna sakchu.",
          "TravelBot ho, jasle travel ko bare ma madat garna chahe.",
          "bye nindro layo malai",
          "tw pagal ho",

        ],
        fallback: [
          "Maile bujhina. Please aru clearly sodhna sakxau?",
          "Sorry, malai thaha chhaina tesko barema.",
          "Tesko barema malai janakari chhaina, aru sodhnus na.",
          "tw pagal ho",
          "ja jana manxa ja malai sutna de",
          "malai thailand , manali , goa ko bare ma matrai sodh",
          "baire kura sodhni vaye chatgpt lai sodh malai na chat"

        ],
      };

      // Function to select random response from array
      const randomReply = (arr: string[]) =>
        arr[Math.floor(Math.random() * arr.length)];

      let botResponse = randomReply(responses.fallback);

      if (
        userMessage.includes("thailand") ||
        userMessage.includes("tailand") ||
        userMessage.includes("थाईल्यान्ड")
      ) {
        botResponse = randomReply(responses.thailand);
      } else if (
        userMessage.includes("goa") ||
        userMessage.includes("गोवा")
      ) {
        botResponse = randomReply(responses.goa);
      } else if (
        userMessage.includes("manali") ||
        userMessage.includes("मनाली")
      ) {
        botResponse = randomReply(responses.manali);
      } else if (
        userMessage.includes("kaha ghumna") ||
        userMessage.includes("where to go") ||
        userMessage.includes("best place") ||
        userMessage.includes("kun ramro hunxa") ||
        userMessage.includes("suggest")
      ) {
        botResponse = randomReply(responses.bestPlace);
      } else if (
        userMessage.includes("hello") ||
        userMessage.includes("hi") ||
        userMessage.includes("namaste")
      ) {
        botResponse = randomReply(responses.greetings);
      } else if (
        userMessage.includes("thank") ||
        userMessage.includes("dhanyabad")
      ) {
        botResponse = randomReply(responses.thanks);
      } else if (
        userMessage.includes("chatgpt") ||
        userMessage.includes("chat bot")
      ) {
        botResponse = randomReply(responses.chatbotInfo);
      }

      setChatMessages((prev) => [
        ...prev,
        { user: "TravelBot", message: botResponse },
      ]);
    }, 800);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-4 md:p-6">
      {/* Floating Chat Button */}
      <Button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-6 right-6 z-50 md:hidden rounded-full w-14 h-14 shadow-xl"
        size="icon"
      >
        <MessageSquare className="h-6 w-6" />
      </Button>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        {/* Main Results Section */}
        <div className="flex-1">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-accent rounded-xl text-white p-6 mb-6 shadow-lg">
            <Button
              onClick={() => navigate("/landing")}
              variant="outline"
              className="mb-4 text-blue-500 border-white hover:bg-white hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
            <h1 className="text-3xl font-bold mb-1">Voting Results</h1>
            <p className="opacity-80">See what the group has decided</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
            {[
              {
                label: "Total Votes",
                value: stats.total,
                icon: <Users className="h-5 w-5 mx-auto text-primary" />,
              },
              { label: "Thailand", value: stats.thailand },
              { label: "Manali", value: stats.manali },
              { label: "Goa", value: stats.goa },
              {
                label: "Leading",
                value: winner(),
                icon: <Trophy className="h-5 w-5 mx-auto text-yellow-400" />,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="rounded-xl p-3 text-center bg-white shadow hover:shadow-md transition"
              >
                {card.icon && <div className="mb-1">{card.icon}</div>}
                <div className="text-xl font-bold">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </div>
            ))}
          </div>

          {/* Results Table */}
          <Card className="bg-white shadow-lg border-0 overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between bg-primary/5">
              <CardTitle className="text-xl">All Votes</CardTitle>
              <Button onClick={downloadPDF} size="sm" className="h-8">
                <Download className="h-3.5 w-3.5 mr-1.5" /> Export
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {votes.length === 0 ? (
                <div className="text-center py-12">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground text-lg">No votes yet</p>
                  <Button onClick={() => navigate("/vote")} className="mt-4">
                    Be the first to vote!
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-primary text-white">
                      <tr>
                        {["Name", "Destination", "Period", "Reason", "Date"].map(
                          (h, i) => (
                            <th key={i} className="text-left p-3">
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-muted/20">
                      {votes.map((vote) => (
                        <tr
                          key={vote.id}
                          className="hover:bg-muted/10 transition"
                        >
                          <td className="p-3 font-medium">{vote.fullName}</td>
                          <td className="p-3">
                            <Badge
                              className={
                                vote.destination === "Thailand"
                                  ? "bg-thailand text-white"
                                  : vote.destination === "Manali"
                                    ? "bg-manali text-white"
                                    : "bg-goa text-white"
                              }
                            >
                              {vote.destination}
                            </Badge>
                          </td>
                          <td className="p-3 flex items-center gap-1 text-muted-foreground">
                            <Calendar className="h-3.5 w-3.5" />
                            {vote.tripPeriod}
                          </td>
                          <td
                            className="p-3 max-w-[150px] truncate"
                            title={vote.reason || "No reason"}
                          >
                            {vote.reason || (
                              <span className="text-muted-foreground italic">
                                -
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-muted-foreground text-xs">
                            {new Date(vote.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat Sidebar (Desktop) */}
        <div className="hidden lg:flex flex-col w-73 justify-center bg-white rounded-xl shadow-lg border border-muted/20">
          <div className="p-5 border-b font-semibold text-primary flex items-center gap-2">
            <MessageSquare className="h-4 w-4" /> Chat Bot
          </div>
          <div
            className="flex-1 overflow-y-auto p-3 space-y-2"
            style={{ maxHeight: 410 }}
          >
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2 ${msg.user === "You" ? "justify-end" : ""
                  }`}
              >
                {msg.user !== "You" && msg.user !== "TravelBot" && (
                  <Avatar className="h-6 w-6 mt-1">
                    <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`p-2 rounded-lg max-w-[75%] ${msg.user === "You" ? "bg-primary text-white" : "bg-muted/30"
                    }`}
                >
                  {msg.user === "TravelBot" && (
                    <span className="block text-xs mb-1 text-muted-foreground">
                      TravelBot
                    </span>
                  )}
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={chatEndRef}></div>
          </div>
          <div className="p-2 border-t  flex mt-9 gap-2">
            <Input
              placeholder="Message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleChatSend()}
              className="flex-1 h-29 text-sm"
            />
            <Button onClick={handleChatSend} size="icon" className="h-8 w-8">
              <Send className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
