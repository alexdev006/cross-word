"use client";
import { motion } from "framer-motion";

import { ModeToggle } from "@/components/toggle-theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChangeEvent, useState } from "react";

export default function Home() {
  const [lettersArray, setLettersArray] = useState<string[]>([]);
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [inputLetterValue, setInputLetterValue] = useState<string>("");
  const [inputWordValue, setInputWordValue] = useState<string>("");
  const [finalResult, setFinalResult] = useState<
    { word: string; isCorresponding: boolean }[]
  >([]);

  function handleInputLetterChange(e: ChangeEvent<HTMLInputElement>) {
    setInputLetterValue(e.target.value);
  }
  function handleInputWordChange(e: ChangeEvent<HTMLInputElement>) {
    setInputWordValue(e.target.value);
  }

  function addLetter() {
    if (inputLetterValue.trim() !== "") {
      setLettersArray((prevArray) => [...prevArray, inputLetterValue]);
      setInputLetterValue("");
    }
  }

  function addWord() {
    if (inputWordValue.trim() !== "") {
      setWordsArray((prevArray) => [...prevArray, inputWordValue]);
      setInputWordValue("");
    }
  }

  function resetLetterArray() {
    setLettersArray([]);
  }

  function resetWordsArray() {
    setWordsArray([]);
  }

  function getUnitLetter() {
    const unitLetter = lettersArray.join("").split("");
    return unitLetter;
  }
  function getUnitLetterInWords() {
    const unitLetterInWord = wordsArray.map((word) => word.split(""));
    return unitLetterInWord;
  }

  const lettersCorrespondToWords = () => {
    const unitLetter = getUnitLetter();
    const unitLetterInWord = getUnitLetterInWords();

    const results = unitLetterInWord.map((word) => {
      const isCorresponding = word.every((letter) =>
        unitLetter.includes(letter)
      );
      return { word: word.join(""), isCorresponding };
    });

    // Set the result in the state
    setFinalResult(results);
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variantsLi = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <main>
      <div className=" w-4/5 mx-auto">
        <div className="flex gap-2 mt-2">
          <ModeToggle />
          <p className="text-3xl text-red-500 font-bold tracking-tight font-sans mb-4">
            Cross words
          </p>
        </div>

        <Separator className="mb-4" />

        {/* letter */}
        <h3 className="scroll-m-20 font-sans text-2xl font-semibold tracking-tight mb-2">
          Letters
        </h3>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="text"
            placeholder="Enter letters here"
            value={inputLetterValue}
            onChange={handleInputLetterChange}
          />
          <Button type="button" onClick={addLetter}>
            Add
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={resetLetterArray}
          >
            Reset
          </Button>
        </div>

        <div className="flex flex-col mt-4">
          {lettersArray.length > 0 ? (
            <>
              <Label>Selected letters:</Label>
              <p className="uppercase text-xl">{lettersArray.join(" - ")}</p>
            </>
          ) : (
            <></>
          )}
        </div>

        {/* words */}
        <div className="mt-4">
          <p className="font-sans tracking-tight text-2xl font-semibold mb-2">
            Words
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="Enter words here"
              value={inputWordValue}
              onChange={handleInputWordChange}
            />
            <Button type="button" onClick={addWord}>
              Add
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={resetWordsArray}
            >
              Reset
            </Button>
          </div>
        </div>

        <div className="flex flex-col mt-4">
          {wordsArray.length > 0 ? (
            <>
              <Label>Words list:</Label>
              <p className="uppercase text-xl">{wordsArray.join("- ")}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        {/* Display result */}

        <Button
          type="button"
          variant="destructive"
          onClick={lettersCorrespondToWords}
          disabled={wordsArray.length === 0 || lettersArray.length === 0}
          className="mt-2 w-full max-w-sm"
        >
          Result
        </Button>

        <div className="flex flex-col mt-4">
          {finalResult.length > 0 ? (
            <>
              <label htmlFor="">Result:</label>
              {finalResult.map((res, index) => (
                <motion.ul variants={variants} key={index}>
                  <motion.li
                    variants={variantsLi}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.1 }}
                    className="cursor-pointer  w-full max-w-sm"
                  >
                    {res.word}: {res.isCorresponding ? "✔️" : "❌"}
                  </motion.li>
                </motion.ul>
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </main>
  );
}
