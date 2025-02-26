"use client";
import React, {
  ChangeEvent,
  SVGProps,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Switch,
  Input,
} from "@heroui/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getRequestHandler } from "@/utils/apiRequestHandler";
import Image from "next/image";

interface Meme {
  id: string;
  name: string;
  lines: number;
  overlays: number;
  styles: [];
  blank: string;
  example?: {
    text: string[];
    url: string;
  };
  source: string;
  keywords: string[];
  _self: string;
}

export const MyLogo = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      width="33"
      height="50"
      fillRule="evenodd"
      clipRule="evenodd"
      imageRendering="optimizeQuality"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      viewBox="0 0 1931.65 2923.88"
      className="me-4"
    >
      <g id="Layer_x0020_1">
        <path
          id="logo"
          fill="#fefefe"
          stroke="#2b2a29"
          strokeMiterlimit="22.9256"
          strokeWidth="57.21"
          d="M865.71 1132.97V932.72h200.24v200.25h772.36s-100.12 0-100.12-100.12 100.12-100.12 100.12-100.12L1065.95 74.55v286.06s-.01 100.12-100.12 100.12c-100.12 0-100.12-86.93-100.12-86.93V217.57L93.34 932.72s100.12 0 100.12 100.12-100.12 100.12-100.12 100.12l972.61 657.94v200.25H865.71V1790.9H93.34s100.12 0 100.12 100.12-100.12 100.12-100.12 100.12l772.37 858.18v-286.06s-.01-100.12 100.12-100.12c100.12 0 100.12 100.12 100.12 100.12v143.03l772.36-715.15s-100.12 0-100.12-100.12 100.12-100.12 100.12-100.12l-972.6-657.94z"
        ></path>
      </g>
    </svg>
  );
};

export const MoonIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SunIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchFocus, setSearchFocus] = useState(false);
  const { theme, setTheme } = useTheme();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [formData, setFormData] = useState({ search: "" });
  const [displayMemeTemplates, setDisplayMemeTemplates] = useState<Meme[]>([]);
  const menuItems = ["Home", "Explore Templates"];

  useEffect(() => {
    setMounted(true);
    getMemeTemplates();
  }, []);

  const handleSetTheme = () => {
    const newTheme =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
        ? "light"
        : "dark";
    setTheme(newTheme);
  };

  const toggleSearchFocus = (e: boolean) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setSearchFocus(e);
    }, 200);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const getMemeTemplates = async (filter?: string) => {
    const templates = await getRequestHandler(
      `https://api.memegen.link/templates${filter ? `?filter=${filter}` : ""}`
    );
    if (!filter) setDisplayMemeTemplates(templates);
    else return templates;
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(async () => {
      if (formData.search) {
        const templates = await getMemeTemplates(formData.search);
        setDisplayMemeTemplates(templates);
      } else {
        getMemeTemplates();
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [formData.search]);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand as={Link} href="/">
          <MyLogo />
          <p className="font-bold text-inherit">Memeverse</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem className="relative">
          <Input
            type="text"
            className="w-96"
            placeholder="Search memes"
            radius="full"
            endContent={<button className="fas fa-search" title="Search" />}
            onFocusChange={(e) => toggleSearchFocus(e)}
            name="search"
            onChange={handleInputChange}
            value={formData.search}
          />
          <AnimatePresence>
            {searchFocus && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                  x: "-50%",
                }}
                animate={{ opacity: 1, y: 0 }}
                exit={{
                  opacity: 0,
                  y: -20,
                  x: "-50%",
                }}
                className="absolute top-full left-1/2 -translate-x-1/2 pt-5"
              >
                <div className=" w-96 h-fit max-h-[80vh] backdrop-blur-lg bg-gray-500/50 dark:bg-gray-700/50 rounded-md grid grid-cols-1 gap-4 p-3 scrollbar-[thin] overflow-y-auto">
                  <div className="w-full flex justify-end">
                    <Link href={"/explore"}>View all templates</Link>
                  </div>
                  {displayMemeTemplates.length > 0 ? (
                    displayMemeTemplates?.map((meme, index) => (
                      <Link
                        href={`/create-meme/${meme.id}`}
                        key={index}
                        className="flex items-center gap-2"
                      >
                        <Image
                          src={meme.blank}
                          height={50}
                          width={50}
                          alt={meme.name}
                          className="object-cover h-fit"
                        />
                        <p className="truncate" title={meme.name}>
                          {meme.name}
                        </p>
                      </Link>
                    ))
                  ) : (
                    <div className="flex h-40 w-full p-4 justify-center items-center">
                      <p className="text-lg">No templates with given search</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {mounted && (
            <Switch
              color="default"
              onValueChange={handleSetTheme}
              isSelected={
                theme === "dark" ||
                (theme === "system" &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              }
              aria-label="Toggle theme"
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <SunIcon className={className} />
                ) : (
                  <MoonIcon className={className} />
                )
              }
            />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="w-full" href={item === "home" ? "/" : "/explore"}>
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
