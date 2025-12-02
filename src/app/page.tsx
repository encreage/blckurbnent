"use client";

import { Lenis } from "lenis/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

type Franchise = "records" | "abx" | "qxr" | "empire";

export default function Home() {
  const [franchise, setFranchise] = useState<Franchise>("records");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      if (franchise === "empire") {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("published", true)
          .order("year", { ascending: false });
        setProjects(data || []);
      } else {
        const { data } = await supabase
          .from("projects")
          .select("*")
          .eq("franchise", franchise)
          .eq("published", true)
          .order("year", { ascending: false });
        setProjects(data || []);
      }
      setLoading(false);
    }
    load();
  }, [franchise]);

  // Empire Mode trigger
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "e" && e.altKey) setFranchise("empire");
      if (e.key === "Escape" && franchise === "empire") setFranchise("records");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [franchise]);

  const brandColors = {
    records: "border-red-600",
    abx: "border-yellow-400",
    qxr: "border-purple-600",
  };

  return (
    <Lenis root>
      <main className={`min-h-screen bg-black text-white ${franchise === "empire" ? "grid grid-cols-3" : ""}`}>
        {/* HEADER */}
        <header className="fixed top-0 left-0 right-0 z-50 border-b-20 border-white bg-black">
          <div className="flex items-center justify-between p-12">
            <h1 
              className="text-8xl md:text-9xl font-black tracking-widest cursor-pointer hover:text-red-600 transition"
              onClick={() => franchise === "empire" ? setFranchise("records") : setFranchise("empire")}
            >
              BLACK URBAN {franchise === "empire" && "EMPIRE"}
            </h1>
            {franchise !== "empire" && (
              <div className="flex gap-8">
                {(["records", "abx", "qxr"] as Franchise[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFranchise(f)}
                    className={`px-10 py-5 border-12 text-2xl font-black uppercase transition-all ${
                      franchise === f ? "bg-white text-black" : "border-white hover:border-red-600"
                    }`}
                  >
                    {f === "records" ? "RECORDS" : f === "abx" ? "FOUNDATION" : "MEDIA"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className={`pt-64 px-8 md:px-20 ${franchise === "empire" ? "col-span-3 grid grid-cols-3 gap-4" : ""}`}>
          {loading ? (
            <p className="text-6xl text-center">LOADING...</p>
          ) : (
            <motion.div
              key={franchise}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={franchise === "empire" ? "grid grid-cols-3 gap-8" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16"}
            >
              {projects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  className={`border-20 aspect-[3/4] overflow-hidden cursor-crosshair group ${
                    franchise === "empire" ? brandColors[p.franchise] : brandColors[p.franchise]
                  }`}
                  whileHover={{ scale: franchise === "empire" ? 1.02 : 1.04 }}
                >
                  {p.thumbnail ? (
                    <Image
                      src={`https://res.cloudinary.com/dzbgfh4ng/image/upload/q_auto,f_auto/${p.thumbnail}`}
                      alt={p.title}
                      width={800}
                      height={1066}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-900" />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-black/90">
                    <h2 className="text-4xl md:text-5xl font-black uppercase">{p.title}</h2>
                    <p className="text-xl opacity-70">{p.year} — {p.franchise.toUpperCase()}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Empire hint */}
        {franchise !== "empire" && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-center">
            <p className="text-sm opacity-30 tracking-widest">ALT + E → EMPIRE MODE</p>
          </div>
        )}
      </main>
    </Lenis>
  );
}