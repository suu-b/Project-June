import { useState } from "react";
import { Upload, Plus } from "lucide-react";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

export default function LandingPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadFileName(file.name);
  };

  const onFileUpload = () => {
    setLoading(true);
    navigate('/processing', {state: {file: selectedFile}})
    setLoading(false);
  };

  return (
    <div className="h-screen flex-1 flex flex-col">
      <div className="flex justify-end p-4">
        <Button className="bg-[#8E80FC] hover:bg-[#7B6EF0] text-white">
          <Plus className="w-10 h-10 mx-auto" />
          New Conversation
        </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <img src={logo} alt="Logo" className="h-42 mb-3" />
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
        ) : uploadedFileName ? (
          <p className="h-16 text-slate-600 flex items-center justify-center lowercase border border-[#8E80FC] px-10 border-dotted py-1 rounded border-2 font-semibold">
            {uploadedFileName}
          </p>
        ) : (
          <label htmlFor="file-upload">
            <input type="file" className="hidden" id="file-upload" onChange={onFileChange} />
            <Button
              variant="outline"
              size="lg"
              className="w-16 h-16 rounded-full border-2 border-gray-300 hover:border-[#8E80FC] hover:bg-gray-50 cursor-pointer transition-colors"
              asChild
            >
              <span>
                <Upload className="w-6 h-6 text-gray-600" />
              </span>
            </Button>
          </label>
        )}
        <Button
          disabled={!uploadedFileName}
          onClick={onFileUpload}
          size="lg"
          className="relative bg-[#8E80FC] text-white cursor-pointer hover:bg-[#7B6EF0] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Let's think together?
        </Button>
      </div>
    </div>
  );
}