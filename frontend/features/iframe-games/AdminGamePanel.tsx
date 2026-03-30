"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminGamePanel() {
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
    img: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/games", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Ошибка");
      }

      setMessage("Игра успешно добавлена");
      setForm({ title: "", url: "", description: "", category: "", img: "" });
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-6"
      >
        <h1 className="text-2xl font-semibold text-white mb-6 text-center">
          🎮 Добавить игру
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { name: "title", placeholder: "Название" },
            { name: "url", placeholder: "URL игры" },
            { name: "category", placeholder: "Категория" },
            { name: "img", placeholder: "Ссылка на изображение" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              placeholder={field.placeholder}
              value={(form as any)[field.name]}
              onChange={handleChange}
              className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
              required
            />
          ))}

          <textarea
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={handleChange}
            className="w-full bg-white/10 text-white placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
            required
          />

          {form.img && (
            <div className="rounded-xl overflow-hidden border border-white/10">
              <img
                src={form.img}
                alt="preview"
                className="w-full h-40 object-cover"
              />
            </div>
          )}

          <motion.button
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-medium rounded-xl py-2 mt-2 hover:opacity-90 transition"
          >
            {loading ? "Добавление..." : "Добавить игру"}
          </motion.button>
        </form>

        {message && (
          <div className="mt-4 text-center text-sm text-white/80">
            {message}
          </div>
        )}
      </motion.div>
    </div>
  );
}
