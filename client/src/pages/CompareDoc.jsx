import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroCompareDocs from "@/assets/hero-compare-docs.png";

export default function CompareDoc() {
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
