import { useState } from "react";
import { ArrowRight, RotateCcw, FileType } from "lucide-react";
import MoonLoader from "react-spinners/MoonLoader";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import heroGlobe from "@/assets/hero-globe.png";

import { getUserId } from "../lib/client.util";

export default function WikiRoll() {
  const [fetchedArticle, setFetchedArticle] = useState(null);
  const [fetchedArticleContent, setFetchedArticleContent] = useState(null);
  const [fetchedArticleThumbnail, setFetchedArticleThumbnail] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const userId = getUserId();

 const steps = [
  {
    id: 1,
    title: "Summon a Random Article",
    description: "June fetches a surprising article from the vast halls of Wikipedia—your journey begins here.",
    prime: true,
  },
  {
    id: 2,
    title: "Scan and Sift",
    description: "The content is scanned for insights, stripped of noise, and prepared for your curious mind.",
  },
  {
    id: 3,
    title: "Ask & Explore",
    description: "Now it's your turn—ask questions, reflect, and brainstorm with June as your thinking partner.",
  },
];


  const onMovingForthWithTheArticle = async () => {
    const file = new File ([fetchedArticleContent], `${fetchedArticle}.html`, {type: "text/plain"});
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload/thumbnail`, { thumbnailSrc: fetchedArticleThumbnail }, { headers: { 'user-id': userId }});
    setLoading(true);
    navigate("/processing", { state: { file: file, from: "wiki-roll", source: "wiki-roll" } });
    setLoading(false);
  };

  const onClickForWikiRoll = async () => {
    setLoading(true);
    try{
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/wiki/roll`, { headers: { 'user-id': userId }});
      setFetchedArticle(data.title);
      setFetchedArticleContent(data.content);
      setFetchedArticleThumbnail(data.thumbnailSrc)
    }
    catch(errr){
      console.error("Error rolling the wiki:", errr)
      toast.error("Error rolling the wiki. Try refershing the window.")
    } finally{
      setLoading(false);
    }
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
          src={heroGlobe}
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
            Roll the{" "}
            <span className="text-5xl font-bold text-[#8E80FC]">dice</span>{" "}
            of{" "}
            <span className="text-5xl font-bold text-[#8E80FC]">Wikipedia</span>!
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
                        <div className="w-fit mx-auto mt-3">
                          {loading && (
                            <MoonLoader color="#8E80FC" size={30} className="mb-5 mx-auto w-fit"/>
                          )}
                          {(fetchedArticle && !loading) && (
                            (
                            <motion.p
                              className="h-10 text-slate-600 mb-5 flex items-center justify-center border border-[#8E80FC] px-6 border-dotted py-1 rounded border-2 font-semibold"
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                            > <span className="font-extrabold">On</span>&nbsp;
                              { fetchedArticle.length < 15 ? fetchedArticle : fetchedArticle.substring(0,15) + "..." }
                            </motion.p>
                          )
                          )}
                        </div>
                        <motion.label
                              htmlFor="file-upload"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="flex justify-center items-center"
                            >
                              <Button
                                variant="outline"
                                size="lg"
                                className="w-fit h-12 rounded-full border-2 border-gray-300 hover:border-[#8E80FC] hover:bg-gray-50 cursor-pointer transition-colors"
                                onClick={onClickForWikiRoll}
                                asChild
                              >
                                <span>
                                  <RotateCcw className="w-5 h-5 text-gray-600" />
                                </span>
                              </Button>
                            </motion.label>
                        <motion.div
                          className="mt-4"
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.6, duration: 0.5 }}
                        >
                          <Button
                            disabled={!fetchedArticle}
                            onClick={onMovingForthWithTheArticle}
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
