import { Home, Upload, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MoonLoader from "react-spinners/MoonLoader"

import logo from "@/assets/logo.png"
import { useState } from "react"

export default function App() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setLoading(true);
  }  
  
  const onFileUpload = () => {}

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4">
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-10 bg-[#8E80FC] rounded-r-sm"></div>
            <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg ml-1">
              <Home className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-end p-4">
          <Button className="bg-[#8E80FC] hover:bg-[#7B6EF0] text-white">
            <Plus className="w-10 h-10 mx-auto" />
            New Conversation
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
            <img src={logo} alt="Logo" className="w-48 h-48 mb-0" />
          <div className="text-center">
            <h1 className="text-5xl text-slate-800 mb-2">
              hi <span className="text-5xl font-bold text-[#8E80FC]">shubham</span>!
            </h1>
            <p className="text-5xl text-slate-800">
              <span className="text-[#8E80FC] font-bold">curious</span> about something?
            </p>
          </div>
        
          {loading ? (
            <MoonLoader color="#8E80FC" size={40} />
          ) : (
            <label htmlFor="file-upload">
              <input type="file" className="hidden" id="file-upload" onChange={onFileChange}/>
              <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-[#8E80FC] hover:bg-gray-50 cursor-pointer transition-colors"
              asChild
              >
                <span><Upload className="w-6 h-6 text-gray-600"/></span>
          </Button>
          </label> 
          )}
          <Button disabled size="lg" className="bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200">
            Let's think together?
          </Button>
        </div>
      </div>
    </div>
  )
}
