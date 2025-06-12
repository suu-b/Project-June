import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/sections/Sidebar";

import LandingPage from "./pages/LandingPage";
import Transitions from "./pages/Transition";
import Chat from "./pages/Chat"

export default function App() {
  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/processing" element={<Transitions />} />
            <Route path="/chat" element={<Chat/>} />
          </Routes>
        </div>
        <Toaster richColors />
      </div>
    </Router>
  );
}