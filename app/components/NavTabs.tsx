/** @format */

"use client";
import { useState } from "react";
import { motion } from "framer-motion";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function NavTabs({ tabs }: { tabs: string[] }) {
  const [selected, setSelected] = useState<string>(tabs[0]);

  return (
    <div className="fixed w-full flex justify-center gap-4">
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full w-fit px-2 py-1 bg-[#252527] h-12 mt-4">
        {tabs.map((tab) => (
          <Tab text={tab} selected={selected === tab} setSelected={setSelected} key={tab} />
        ))}
      </div>
    </div>
  );
}

const Tab = ({ text, selected, setSelected }: TabProps) => {
  return (
    <button
      onClick={() => setSelected(text)}
      className={`
        relative rounded-md p-2 text-sm 
      `}
    >
      <p className={`relative z-50 px-2 transition-all ${selected ? "text-white" : "text-gray-400 hover:text-white"}`}>
        {text}
      </p>
      {selected && (
        <motion.span
          layoutId="tabs"
          transition={{ type: "spring", duration: 0.5 }}
          className="absolute inset-0 rounded-sm bg-[#353538] rounded-full"
        />
      )}
    </button>
  );
};
