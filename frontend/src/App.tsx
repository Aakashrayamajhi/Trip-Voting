import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Splash from "./pages/Splash";
import Landing from "./pages/Landing";
import ThailandDetails from "./pages/ThailandDetails";
import ManaliDetails from "./pages/ManaliDetails";
import GoaDetails from "./pages/GoaDetails";
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import ProtectedVoteRoute from "./components/ProtectedVoteRoute";

const queryClient = new QueryClient();

const router = createBrowserRouter(
  [
    { path: "/", element: <Splash /> },
    { path: "/landing", element: <Landing /> },
    { path: "/thailand", element: <ThailandDetails /> },
    { path: "/manali", element: <ManaliDetails /> },
    { path: "/goa", element: <GoaDetails /> },
    {
      path: "/vote",
      element: (
        <ProtectedVoteRoute>
          <Vote />
        </ProtectedVoteRoute>
      )
    },
    { path: "/results", element: <Results /> },
    { path: "/old", element: <Index /> },
    { path: "*", element: <NotFound /> },
  ],
  {
    future: {
      v7_relativeSplatPath: true, // Enables new behavior & removes warning
    },
  }
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <RouterProvider router={router} />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
