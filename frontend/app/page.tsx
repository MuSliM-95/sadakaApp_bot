import { redirect } from "next/navigation";

export const dynamic = "force-static"; // Явно включаем SSG

export default function Home() {
  return redirect("/advertising");
}
