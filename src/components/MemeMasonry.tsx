'use client'
import Image from "next/image";
import React from "react";
import dynamic from "next/dynamic";
const Masonry = dynamic(() => import("react-layout-masonry"), { ssr: false });interface Meme {

  url: string;
  template: string;
}
const MemeMasonry = ({ memes }: { memes: Meme[] }) => {
  return (
    <Masonry columns={4} gap={16}>
      {memes?.map((meme, index) => (
        <div key={index}>
          <Image src={meme.url} height={400} width={400} alt="MEME" />
        </div>
      ))}
    </Masonry>
  );
};

export default MemeMasonry;
