import React, { useState } from "react";

interface Dialogue {
  character: string;
  original: string;
  english: string;
}

interface DialogueDisplayProps {
  dialogues: string;
}

export default function DialogueDisplay({ dialogues }: DialogueDisplayProps) {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translations, setTranslations] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parseDialogues = (
    rawDialogues: string
  ): { origin: string; dialogues: Dialogue[] } => {
    const lines = rawDialogues.split("\n");
    const origin = lines[0].replace("**Origin:** ", "");
    const parsedDialogues: Dialogue[] = [];

    let currentDialogue: Partial<Dialogue> = {};

    lines.slice(1).forEach((line) => {
      if (line.startsWith("**Dialogue")) {
        if (Object.keys(currentDialogue).length) {
          parsedDialogues.push(currentDialogue as Dialogue);
        }
        currentDialogue = {};
      } else if (line.includes("**Character:**")) {
        currentDialogue.character = line
          .replace(/\*+/g, "")
          .replace("Character:", "")
          .trim();
      } else if (line.includes("**Original:**")) {
        const [english, original] = line.split("**Original:**");
        currentDialogue.english = english.replace("English:", "").trim();
        currentDialogue.original = original.trim();
      }
    });

    if (Object.keys(currentDialogue).length) {
      parsedDialogues.push(currentDialogue as Dialogue);
    }

    return { origin, dialogues: parsedDialogues };
  };

  const handleTranslate = async () => {
    setIsTranslating(true);
    setError(null);
    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dialogues: parsedDialogues.map((d) => d.original),
          targetLanguage,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setTranslations(data.translations);
      } else {
        setError(data.error || "An error occurred during translation.");
      }
    } catch (error) {
      console.error("Error fetching translations:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsTranslating(false);
    }
  };

  const { origin, dialogues: parsedDialogues } = parseDialogues(dialogues);

  if (!parsedDialogues.length) {
    return <div>No dialogues to display. Raw data: {dialogues}</div>;
  }

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
        Generated Dialogues
      </h2>
      <p className="text-base mb-6 text-center text-gray-600">
        Origin: {origin}
      </p>
      <div className="mb-6 flex justify-center items-center">
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="bg-white text-gray-800 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="English">English</option>
          <option value="Hinglish">Hinglish</option>
        </select>
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="bg-blue-500 text-white px-6 py-2 rounded-r hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isTranslating ? "Translating..." : "Translate"}
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {parsedDialogues.map((dialogue, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <p className="font-semibold text-lg text-gray-800 mb-2">
              {dialogue.character}
            </p>
            <p className="text-gray-700 mb-3">{dialogue.original}</p>
            {isTranslating && (
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
            {!isTranslating && translations[index] && (
              <p className="text-gray-600 text-sm italic">
                {targetLanguage}: {translations[index]}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
