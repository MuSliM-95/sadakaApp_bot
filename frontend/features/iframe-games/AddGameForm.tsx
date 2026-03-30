import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup } from "@/shared/components/ui/field";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAddGameMutation } from "./hooks/useAddGameMutation";

export function AddGameForm() {
  const { data, addGame } = useAddGameMutation();
  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    category: "",
    img: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      addGame(form)
      setForm({ title: "", url: "", description: "", category: "", img: "" });
    } catch (err: any) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog>
      {/* <div className=" flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800"> */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full  cursor-pointer  backdrop-blur-xl bg-white/5  border-white/10 rounded-3xl shadow-2xl"
      >
        <form className="space-y-4 text-black">
          <DialogTrigger className="w-full p-0" asChild>
            {/* <Button className="" variant="outline"></Button> */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              className="w-full text-white  cursor-pointer border-0 font-medium rounded-xl p-6 hover:opacity-90 transition"
            >
              🎮 Добавить игру
            </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader className="text-2xl font-semibold mb-6 text-center">
              <DialogTitle>🎮 Добавить игру</DialogTitle>
            </DialogHeader>
            <FieldGroup>
              <Field>
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
                    className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                    required
                  />
                ))}

                <textarea
                  name="description"
                  placeholder="Описание"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                  required
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="default" className=" cursor-pointer">
                  Закрыть
                </Button>
              </DialogClose>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={handleSubmit}
                type="submit"
                disabled={loading}
                className="w-full bg-white  cursor-pointer text-black font-medium rounded-xl py-2 mt-2 hover:opacity-90 transition"
              >
                {loading ? "Добавление..." : "Добавить игру"}
              </motion.button>
            </DialogFooter>
          </DialogContent>
        </form>
      </motion.div>
      {/* </div> */}
    </Dialog>
  );
}
