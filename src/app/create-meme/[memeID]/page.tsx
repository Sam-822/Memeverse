import MemeGenerator from "@/components/MemeGenerator";
import { getRequestHandler } from "@/utils/apiRequestHandler";
import React from "react";

const CreateMeme = async ({
  params,
}: {
  params: Promise<{ memeID: number }>;
}) => {
  const memeID = (await params).memeID;
  const meme = await getRequestHandler(
    `https://api.memegen.link/templates/${memeID}`
  );
  return (
    <div>
      <MemeGenerator meme={meme} />
    </div>
  );
};

export default CreateMeme;
