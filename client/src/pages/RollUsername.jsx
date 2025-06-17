import { useEffect, useState } from "react";
import { Dice5 } from "lucide-react";
import { BarLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { storeUsername } from "../lib/client.util"

export default function RollUsername() {
  const [showUsername, setShowUsername] = useState(false);
  const [usernameIdx, setUsernameIdx] = useState(-1)

  const navigate = useNavigate();

  const usernames = [
  {
    name: "Lame Fox",
    description: "Clever but never boastful, this one wanders quietly through the underbrush of thoughts. Their ideas come softly, never rushed. They linger where others sprint."
  },
  {
    name: "Silent Owl",
    description: "Eyes like lanterns in a midnight library, it watches, understands, remembers. Silent, but never absent. Each gaze is a chapter, each blink a verse."
  },
  {
    name: "Frail Wolf",
    description: "A lone soul with cracked armor and an unshaken howl. Their strength lies not in teeth but in resilience. Even fragility can be a form of defiance."
  },
  {
    name: "Lucid Lynx",
    description: "Sharp in thought, serene in manner. This creature sees through facades and forests alike. They walk between ideas as if born to bridge them."
  },
  {
    name: "Meek Panther",
    description: "Dark as ink, soft as moss, fierce in silence. Power is worn like perfume, never shouted. They only strike when the meaning is pure."
  },
  {
    name: "Witty Toad",
    description: "Odd and unapologetically clever. Leaps of logic are their playground. Their jokes bloom like fungi after rain—unexpected and wise."
  },
  {
    name: "Kind Serpent",
    description: "With movements as smooth as forgiveness, they wind through tense moments offering calm. A healer’s tongue behind a feared silhouette. They rewrite the tale of venom with virtue."
  },
  {
    name: "Anxious Falcon",
    description: "Speed and uncertainty are their twin wings. They fly fast not to escape, but to understand. Every tremor makes them more aware, more alive."
  },
  {
    name: "Grim Rabbit",
    description: "Don’t let the twitch fool you—this one has seen what lies beneath the meadow. Darkness clings gently to their fur. Their laughter hides in graveyards and grows from it."
  },
  {
    name: "Gentle Moth",
    description: "Drawn to soft glows and softer souls. Fragile yet determined, they dance with uncertainty. Their touch leaves light behind in every place they land."
  }
];

  useEffect(() => {
    const usernameIdx = Math.floor(Math.random() * usernames.length);
    storeUsername(usernames[usernameIdx].name)
    setUsernameIdx(usernameIdx)
    const timer = setTimeout(() => setShowUsername(true), 2000);
    
    let timer2;
    if(showUsername){
      timer2 = setTimeout(() => navigate("/home"), 4000)
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    }
  }, [showUsername]);

  return (
    <section
      id="roll-username"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4"
    >
      <div className="text-center">
        <Dice5 className="animate-spin mx-auto" size={100} color="#8E80FC" />

        <AnimatePresence mode="wait">
          {!showUsername ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="my-5"
            >
              <h1 className="text-2xl font-semibold text-slate-800">
                <span className="font-bold">June </span>is wondering what to call you...
              </h1>
              <p className="text-slate-600 max-w-md mx-auto mt-5">
                Hang tight while we roll the dice for your unique username. We will call you with it throughout the session!
              </p>

              <div className="w-64 mx-auto mt-6">
                <BarLoader color={"#8E80FC"} width={200} className="mx-auto" />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="username"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6 }}
              className="my-5"
            >
              <h1 className="text-3xl font-bold text-slate-800">June will call you... <span className="text-[#8E80FC]">{usernames[usernameIdx].name}</span></h1>
              <p className="text-slate-600 max-w-md mx-auto mt-5 italic">
                {usernames[usernameIdx].description}
              </p>
              <p className="text-slate-600 max-w-md mx-auto mt-5">
                [Let's get started. Redirecting you...]
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
