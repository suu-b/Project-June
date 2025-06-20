import { useState } from "react";
import { Upload, ArrowRight } from "lucide-react";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroCompareDocs from "@/assets/hero-compare-docs.png";
import { getStoredUsername } from "../lib/client.util";

export default function CompareDoc() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFileName, setUploadFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const username = getStoredUsername();
  const navigate = useNavigate();

  const steps = [
  {
    id: 1,
    title: "Upload Both Documents",
    description: "Select the two files you wish to compare—June will take it from there.",
    prime: true,
  },
  {
    id: 2,
    title: "Analyzing Differences",
    description: "June highlights key contrasts, overlaps, and structural shifts between the documents.",
  },
  {
    id: 3,
    title: "Insightful Comparison",
    description: "Engage with June to reflect on how the documents diverge, align, or evolve in thought.",
  },
];

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
      className="min-h-screen flex-1 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <motion.img
          src={heroCompareDocs}
          alt="hero-microscope"
          className="h-56 mb-3"
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
            Bridge the{" "}
            <span className="text-5xl font-bold text-[#8E80FC]">gap</span>{" "}
            between two{" "}
            <span className="text-5xl font-bold text-[#8E80FC]">documents</span>
            !
          </h1>
        </motion.div>

        <div className="w-full max-w-6xl mx-auto pt-12">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <Card
                  className={`w-full w-72 transition-all duration-300 ${
                    step.prime
                      ? "min-h-68 w-78 border-[#8E80FC] shadow-lg shadow-[#8E80FC]/20 bg-[#8E80FC]/5"
                      : "min-h-60 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          step.prime
                            ? "bg-[#8E80FC] text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <span className="text-sm font-semibold">{step.id}</span>
                      </div>
                      <CardTitle
                        className={`text-lg ${
                          step.prime ? "text-[#8E80FC]" : "text-gray-700"
                        }`}
                      >
                        {step.title}
                      </CardTitle>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p className={`text-sm ${step.prime ? "text-gray-700" : "text-gray-500"}`}>
                      {step.description}
                    </p>

                    {step.prime && (
                      <>
                        <div className="mt-4 w-fit mx-auto">
                          {loading ? (
                            <MoonLoader color="#8E80FC" size={30} />
                          ) : uploadedFileName ? (
                            <motion.p
                              className="h-10 text-slate-600 flex items-center justify-center lowercase border border-[#8E80FC] px-6 border-dotted py-1 rounded border-2 font-semibold"
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
                                className="w-12 mx-auto h-12 rounded-full border-2 border-gray-300 hover:border-[#8E80FC] hover:bg-gray-50 cursor-pointer transition-colors"
                                asChild
                              >
                                <span>
                                  <Upload className="w-5 h-5 text-gray-600" />
                                </span>
                              </Button>
                            </motion.label>
                          )}
                        </div>

                        <motion.div
                          className="mt-4"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <Button
                            disabled={!uploadedFileName}
                            onClick={onFileUpload}
                            size="sm"
                            className="w-full bg-[#8E80FC] text-white hover:bg-[#7B6EF0] disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Let's think together?
                          </Button>
                        </motion.div>
                      </>
                    )}
                  </CardContent>
                </Card>

                {index < steps.length - 1 && (
                  <div className="hidden lg:flex items-center justify-center mx-2">
                    <ArrowRight className="w-6 h-6 text-gray-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
