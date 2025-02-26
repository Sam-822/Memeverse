"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import Masonry from "react-layout-masonry";
import dynamic from "next/dynamic";
const Masonry = dynamic(() => import("react-layout-masonry"), { ssr: false });

interface Meme {
  url: string;
  template: string;
}
const TemplateMasonry = ({ memes }: { memes: Meme[] }) => {
  return (
    <Masonry columns={4} gap={16}>
      {memes?.map((meme, index) => (
        <Link
          href={'/create-meme/' +(meme.template.replace("https://", "").split("/").at(-1))}
          key={index}
        >
          <Image src={meme.url} height={400} width={400} alt="MEME" />
        </Link>
      ))}
    </Masonry>
  );
};

export default TemplateMasonry;
