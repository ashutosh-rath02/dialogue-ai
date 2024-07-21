import React, { useState } from "react";

interface Dialogue {
  character: string;
  original: string;
  english: string;
}

interface DialogueDisplayProps {
  dialogues: string;
  movieName: string;
}

export default function DialogueDisplay({
  dialogues,
  movieName,
}: DialogueDisplayProps) {
  const [targetLanguage, setTargetLanguage] = useState("English");
  const [translations, setTranslations] = useState<string[]>([]);
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allDialogues, setAllDialogues] = useState(dialogues);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    setError(null);
    try {
      const response = await fetch("/api/load-more-dialogues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieName, count: 3 }),
      });
      const data = await response.json();
      if (response.ok) {
        setAllDialogues(
          (prevDialogues) => prevDialogues + "\n\n" + data.dialogues
        );
      } else {
        setError(
          data.error || "An error occurred while loading more dialogues."
        );
      }
    } catch (error) {
      console.error("Error loading more dialogues:", error);
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoadingMore(false);
    }
  };

  const { origin, dialogues: parsedDialogues } = parseDialogues(dialogues);

  if (!parsedDialogues.length) {
    return <div>No dialogues to display. Raw data: {dialogues}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">
        Famous Dialogues from &apos;{movieName}&apos;
      </h2>
      <div className="space-y-4">
        {parsedDialogues.map((dialogue, index) => (
          <div key={index} className="bg-muted rounded-md p-4">
            <p className="text-lg font-bold mb-2">{dialogue.original}</p>
            <p className="text-muted-foreground">{dialogue.character}</p>
            <p className="text-muted-foreground">{dialogue.english}</p>
            {isTranslating && (
              <div className="flex items-center space-x-2 text-muted-foreground">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            )}
            {!isTranslating && translations[index] && (
              <p className="text-muted-foreground text-sm italic mt-2">
                {targetLanguage}: {translations[index]}
              </p>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-center items-center space-x-4">
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="bg-secondary text-secondary-foreground px-6 py-2 rounded hover:bg-secondary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-secondary disabled:bg-secondary/70 disabled:cursor-not-allowed"
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </button>
        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="bg-background text-foreground px-4 py-2 rounded border border-input focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="English">English</option>
          <option value="Hinglish">Hinglish</option>
        </select>
        <button
          onClick={handleTranslate}
          disabled={isTranslating}
          className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-primary/70 disabled:cursor-not-allowed"
        >
          {isTranslating ? "Translating..." : "Translate"}
        </button>
      </div>
      {error && (
        <div className="mt-6 p-4 bg-destructive text-destructive-foreground rounded">
          {error}
        </div>
      )}
    </div>
  );
}
