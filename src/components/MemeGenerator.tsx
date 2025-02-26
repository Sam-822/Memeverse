"use client";
import { postRequestHandler } from "@/utils/apiRequestHandler";
import { Button } from "@heroui/react";
import Image from "next/image";
import React, {
  ChangeEvent,
  FormEvent,
  useState,
} from "react";
interface Meme {
  id: string;
  name: string;
  lines: number;
  overlays: number;
  styles: string[];
  blank: string;
  example: {
    text: string[];
    url: string;
  };
  source: string;
  keywords: string[];
  _self: string;
}
const MemeGenerator = ({ meme }: { meme: Meme }) => {
  const [formData, setFormData] = useState(
    Object.fromEntries(
      Array.from({ length: meme.lines }, (_, index) => [
        `input-${index + 1}`,
        "",
      ])
    )
  );
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState("");


  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formAction = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await postRequestHandler("https://api.memegen.link/images", {
        headers: { "Content-Type": "application/json" },
        body: {
          template_id: meme.id,
          text: Object.values(formData),
        },
      });
      setResultImage(res.url);
      await fetch(res.url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

	const handleDownload = async () => {
		const url = resultImage || meme.blank;
		const response = await fetch(url);
		const blob = await response.blob();
		const link = document.createElement("a");
		link.href = URL.createObjectURL(blob);
		link.download = meme.name || "meme.png";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};
	

  return (
    <>
      <div className="grid grid-cols-2 gap-8">
        <div className="relative h-fit">
          <Image
            src={resultImage || meme.blank}
            alt={meme.name}
            height={400}
            width={400}
            className="object-contain w-full"
          />
          <Button
            isIconOnly
            className="absolute bottom-4 right-4"
            color="default"
						onPress={handleDownload}
          >
            <i className="fas fa-download"></i>
          </Button>
        </div>
        <form
          onSubmit={formAction}
          className="grid grid-cols-1 gap-4 p-4 h-fit"
        >
          {Array(meme.lines)
            .fill(0)
            .map((_, index) => (
              <div key={index}>
                <label htmlFor={`input-${index + 1}`}>Text field {index + 1}</label>
                <input
                  type="text"
                  className="form-input"
                  name={`input-${index + 1}`}
                  id={`input-${index + 1}`}
                  value={formData[`input-${index + 1}`]}
                  onChange={handleInputChange}
                />
              </div>
            ))}
          <div>
            <div className="ms-auto block w-fit">
              <Button color="primary" type="submit" isLoading={loading}>
                Generate
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className="mt-4 w-full flex justify-center flex-col items-center">
        <p className="text-lg">Example:</p>
        <div className="grid grid-cols-1 gap-4">
          <Image
            src={meme.example.url}
            height={400}
            width={400}
            alt={meme.name}
          />
        </div>
      </div>
    </>
  );
};

export default MemeGenerator;
