import { Shuffle, GitCompare, Sparkles, Brain } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getStoredUsername } from "../lib/client.util"
import logo from "@/assets/logo.png";
import { Link, useLocation } from "react-router-dom"


export default function LandingPage() {
  const username = getStoredUsername();

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05, y: -5 },
  }

  const features = [
    {
      title: "Brainstorm Document",
      icon: <Brain className="w-6 h-6 text-[#8E80FC]" />,
      description: "Generate research ideas and explore academic topics with AI guidance",
      action: "Start Brainstorming",
      featureKey: "brainstorm",
      link: "/brainstorm-document"
    },
    {
      title: "Random Wikipedia Roll",
      icon: <Shuffle className="w-6 h-6 text-[#8E80FC]" />,
      description: "Discover fascinating topics and dive deep into unexpected knowledge",
      action: "Roll the Dice",
      featureKey: "wikipedia",
      link: "/roll-wiki"
    },
    {
      title: "Compare Two Documents",
      icon: <GitCompare className="w-6 h-6 text-[#8E80FC]" />,
      description: "Analyze similarities, differences, and insights between any two texts",
      action: "Start Comparing",
      featureKey: "compare",
      link: "compare-documents"
    },
  ]

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        className="text-center mb-12"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      >
        <motion.img
          src={logo}
          alt="Logo"
          className="h-48 mx-auto mb-3"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.2 }}
        />

        <motion.h1
          className="text-5xl font-semibold text-slate-700 mb-2"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          hi <span className="text-[#8E80FC] font-bold">{username}</span>!
        </motion.h1>
        <p className="text-4xl text-slate-700">
          <span className="text-[#8E80FC] font-bold">curious</span> about something?
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
      >
        {features.map((feature) => (
          <motion.div
            key={feature.featureKey}
            whileHover="hover"
            variants={cardVariants}
            transition={{ delay: 0, duration: 0.5 }}
          >
            <Card className="border-2 border-gray-200 hover:border-[#8E80FC] transition-colors shadow-lg">
              <CardContent className="p-3 text-center">
                <div className="w-18 h-18 bg-[#8E80FC]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
                <Link to={feature.link}>
                <Button
                  className="cursor-pointer mt-4 bg-[#8E80FC] hover:bg-[#7B6EF0] text-white"
                >
                  {feature.action}
                </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}
