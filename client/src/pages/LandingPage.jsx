import { useState } from "react";
import { Upload } from "lucide-react";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { getStoredUsername } from "../lib/client.util";

export default function LandingPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const username = getStoredUsername();
  const navigate = useNavigate();

  const onFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadFileName(file.name);
  };

  const onFileUpload = () => {
    setLoading(true);
    navigate("/processing", { state: { file: selectedFile } });
    setLoading(false);
  };

  return (
    <motion.div
      className="h-screen flex-1 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <motion.img
          src={logo}
          alt="Logo"
          className="h-42 mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
        />

        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        >
          <h1 className="text-5xl text-slate-800 mb-2">
            hi{" "}
            <span className="text-5xl font-bold text-[#8E80FC]">{username}</span>!
          </h1>
          <p className="text-5xl text-slate-800">
            <span className="text-[#8E80FC] font-bold">curious</span> about something?
          </p>
        </motion.div>

        {loading ? (
          <MoonLoader color="#8E80FC" size={40} />
        ) : uploadedFileName ? (
          <motion.p
            className="h-16 text-slate-600 flex items-center justify-center lowercase border border-[#8E80FC] px-10 border-dotted py-1 rounded border-2 font-semibold"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            {uploadedFileName}
          </motion.p>
        ) : (
          <motion.label
            htmlFor="file-upload"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <input
              type="file"
              className="hidden"
              id="file-upload"
              onChange={onFileChange}
            />
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
          </motion.label>
        )}

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Button
            disabled={!uploadedFileName}
            onClick={onFileUpload}
            size="lg"
            className="relative bg-[#8E80FC] text-white cursor-pointer hover:bg-[#7B6EF0] disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's think together?
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
