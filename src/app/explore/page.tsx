import TemplateMasonry from "@/components/TemplateMasonry";
import { getRequestHandler } from "@/utils/apiRequestHandler";

interface Meme {
  url: string;
  template: string;
}

export default async function Explore() {
  const memes: Meme[] = await getRequestHandler(
    "https://api.memegen.link/images"
  );
  if (!memes) {
    return <div></div>;
  }

  return <TemplateMasonry memes={memes} />;
}
