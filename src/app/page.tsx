import MemeMasonry from "@/components/MemeMasonry";
import { getRequestHandler } from "@/utils/apiRequestHandler";
import { Metadata } from "next";

interface Meme {
  url: string;
  template: string;
}

export const metadata: Metadata = {
  title: "Abdul Samad's Memeverse | Home",
  description: "Abdul Samad Ansari's Memeverse.",
  authors: { name: "Abdul Samad Ansari" },
  creator: "Abdul Samad Ansari",
  publisher: "Abdul Samad Ansari",
  robots: "noindex, nofollow",
};

export default async function Home() {
  const memes: Meme[] = await getRequestHandler(
    "https://api.memegen.link/images"
  );
  return (
   <MemeMasonry memes={memes} />
  );
}
