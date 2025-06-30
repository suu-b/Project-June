import { useEffect, useState } from "react";
import { Dice5 } from "lucide-react";
import { BarLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from 'uuid'

import { storeUserId, storeUsername } from "../lib/client.util"

export default function RollUsername() {
  const [showUsername, setShowUsername] = useState(false);
  const [usernameIdx, setUsernameIdx] = useState(-1)

  const navigate = useNavigate();

  const usernames = [
  {
    name: "Nervous Hedgehog",
    description: "Wants to be brave, but double-checks everything first. Keeps jokes in their pockets and a backup plan in their shoes. Never in a rush, always sincere."
  },
  {
    name: "Polite Jackal",
    description: "Sharp mind, smoother words. Knows when to speak, and when to offer you the last slice. Can solve a problem while tying their shoes."
  },
  {
    name: "Sleepy Weasel",
    description: "Always five minutes late and somehow still right. Their ideas are mumbled, half-laughed, and weirdly brilliant. They do their best thinking with their eyes closed."
  },
  {
    name: "Cautious Crow",
    description: "Not the loudest in the room, but definitely the one watching. Notices what others skip. Knows where the truth is hiding, but won’t blurt it out unless it matters."
  },
  {
    name: "Curious Sloth",
    description: "Moves slowly, asks deeply. Doesn’t need to rush — they’ll understand you eventually. Loves old books, strange facts, and staring into space for long periods."
  },
  {
    name: "Blunt Otter",
    description: "Says what they mean, sometimes before thinking. Can’t lie convincingly even if they tried. Laughs too loud, cares too much, always shows up."
  },
  {
    name: "Hopeful Badger",
    description: "Keeps trying, even when it's all falling apart. Has a playlist for everything and probably cried over a comic book once. Relentlessly kind."
  },
  {
    name: "Jumpy Koala",
    description: "Looks calm until startled. Then apologizes for being startled. Loves snacks, hates confrontation, and gives surprisingly good advice at 2 AM."
  },
  {
    name: "Shy Ferret",
    description: "Lurks near the edge of the group chat. Observant, funny, and kind—but only if they trust you. Keeps secrets like treasures."
  },
  {
    name: "Forgetful Lark",
    description: "Forgets where they put things, but never forgets how you made them feel. Hums while thinking. Brings lightness to heavy days, often without realizing."
  }
];


  useEffect(() => {
    const usernameIdx = Math.floor(Math.random() * usernames.length);
    storeUsername(usernames[usernameIdx].name)
    storeUserId(uuid())
    
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
      className="min-h-screen min-w-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4"
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
