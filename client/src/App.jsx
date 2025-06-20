import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import { Toaster } from "@/components/ui/sonner"
import {
  SidebarProvider,
  SidebarInset,
} from "@/components/ui/sidebar"
import AppSideBar from "./components/sections/AppSideBar"

import RollUsername from "./pages/RollUsername"
import LandingPage from "./pages/LandingPage"
import Transitions from "./pages/Transition"
import ResearchDocument from "./pages/ResearchDocument"
import WikiRoll from "./pages/WikiRoll"
import CompareDoc from "./pages/CompareDoc"

import Chat from "./pages/Chat"
import { getStoredUsername } from "./lib/client.util"

function AppLayout() {
  const username = getStoredUsername()
  const location = useLocation()

  const hideSidebarRoutes = ["/", "/processing"]
  const shouldHideSidebar =
    hideSidebarRoutes.includes(location.pathname) ||
    (!username && location.pathname === "/")

  return (
    <SidebarProvider style={{ "--sidebar-width": "16vw" }}>
      <div className="flex h-screen w-screen bg-black">
        {!shouldHideSidebar && <AppSideBar variant="sidebar" />}


        <SidebarInset
          className={`transition-all duration-300 ${
            shouldHideSidebar ? "w-screen flex items-center justify-center" : ""
          }`}
        >
          <Routes>
            <Route
              path="/"
              element={ username ? <LandingPage /> : <RollUsername />}
            />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/brainstorm-document" element={<ResearchDocument />} />
            <Route path="/processing" element={<Transitions />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/roll-wiki" element={<WikiRoll />} />
            <Route path="/compare-documents" element={<CompareDoc />} />
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
  )
}
