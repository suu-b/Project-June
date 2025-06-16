import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger, SidebarInset} from "@/components/ui/sidebar"
import AppSideBar from "./components/sections/AppSideBar";

import RollUsername from "./pages/RollUsername";
import LandingPage from "./pages/LandingPage";
import Transitions from "./pages/Transition";
import Chat from "./pages/Chat"
import { getStoredUsername } from "./lib/client.util";

function AppLayout() {
  const username = getStoredUsername();
  const location = useLocation();
  
  const hideSidebarRoutes = ["/", "/processing"];
  const shouldHideSidebarRoutes = hideSidebarRoutes.includes(location.pathname) || (!username && location.pathname === "/");


  return(
      <SidebarProvider style={{ "--sidebar-width": "fit" }}>
      <div className="flex h-screen w-screen"> 
        {!shouldHideSidebarRoutes && <AppSideBar variant="sidebar" />}
        <AppSideBar variant="sidebar" />
        <SidebarInset className="w-full">
          <Routes>
            <Route
              path="/"
              element={username ? <LandingPage /> : <RollUsername />}
            />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/processing" element={<Transitions />} />
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Toaster richColors />
        </SidebarInset>
      </div>      
      </SidebarProvider>
  )
}
export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>    
  );
}