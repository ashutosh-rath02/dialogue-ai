"use client";

import { useState } from "react";
import DialogueForm from "./components/DialogueForm";
import DialogueDisplay from "./components/DialogueDisplay";

export default function Home() {
  const [dialogues, setDialogues] = useState("");
  const [movieName, setMovieName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (submittedMovieName: string) => {
    setLoading(true);
    setError("");
    setDialogues("");
    setMovieName(submittedMovieName);
    try {
      const response = await fetch("/api/generate-dialogues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieName: submittedMovieName }),
      });
      const data = await response.json();
      if (response.ok) {
        setDialogues(data.dialogues);
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (error) {
      console.error("Error fetching dialogues:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="container mx-auto max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">
        Search for Famous Movie Dialogues
      </h1>
      <DialogueForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div
          className="bg-destructive text-destructive-foreground px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {dialogues ? (
        <DialogueDisplay dialogues={dialogues} movieName={movieName} />
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}
