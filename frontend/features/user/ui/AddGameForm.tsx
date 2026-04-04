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
import { useAddGameMutation } from "../../iframe-games/hooks/useAddGameMutation";
import { toast } from "sonner";

// категории (потом можешь тянуть с API)
const CATEGORIES = [
  { id: 2, name: "Action" },
  { id: 3, name: "Puzzle" },
  { id: 5, name: "Strategy" },
  { id: 6, name: "Multiplayer" },
];

export function AddGameForm() {
  const { addGame } = useAddGameMutation();

  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    categories: [] as number[],
    img: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (id: number) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(id)
        ? prev.categories.filter((c) => c !== id)
        : [...prev.categories, id],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    toast.message("submit");
    e.preventDefault();
    setLoading(true);

    try {
      addGame(form);

      // setForm({
      //   title: "",
      //   url: "",
      //   description: "",
      //   categories: [],
      //   img: "",
      // });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      {/* Кнопка для открытия диалога */}
      <DialogTrigger asChild>
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full text-white border-0 font-medium rounded-xl p-6 hover:opacity-90 transition"
        >
          🎮 Добавить игру
        </motion.button>
      </DialogTrigger>

      {/* Содержимое диалога с формой */}
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="text-2xl font-semibold mb-6 text-center">
          <DialogTitle>🎮 Добавить игру</DialogTitle>
        </DialogHeader>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <input
                name="title"
                placeholder="Название"
                value={form.title}
                onChange={handleChange}
                className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2"
                required
              />
              <input
                name="url"
                placeholder="URL игры"
                value={form.url}
                onChange={handleChange}
                className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2"
                required
              />
              <input
                name="img"
                placeholder="Ссылка на изображение"
                value={form.img}
                onChange={handleChange}
                className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2"
                required
              />
              <textarea
                name="description"
                placeholder="Описание"
                value={form.description}
                onChange={handleChange}
                className="w-full bg-white/10 placeholder-gray-400 border border-white/10 rounded-xl px-3 py-2"
                required
              />

              <div className="space-y-2 mt-4">
                <p className="text-sm text-gray-400">Категории</p>
                {CATEGORIES.map((cat) => (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={form.categories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    {cat.name}
                  </label>
                ))}
              </div>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer" variant="default">Закрыть</Button>
            </DialogClose>

            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-white cursor-pointer text-black font-medium rounded-xl py-2 mt-2"
            >
              {loading ? "Добавление..." : "Добавить игру"}
            </motion.button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
