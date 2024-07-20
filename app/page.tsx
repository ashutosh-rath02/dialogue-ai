"use client";

import { useState } from "react";
import DialogueForm from "./components/DialogueForm";
import DialogueDisplay from "./components/DialogueDisplay";

export default function Home() {
  const [dialogues, setDialogues] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (movieName: string) => {
    setLoading(true);
    setError("");
    setDialogues("");
    try {
      const response = await fetch("/api/generate-dialogues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieName }),
      });
      const data = await response.json();
      if (response.ok) {
        console.log("Received dialogues:", data.dialogues); // Debug log
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
    <div className="max-w-2xl mx-auto">
      <p className="text-lg mb-6 text-gray-300">
        Enter the name of any movie to generate famous dialogues in their
        original language using AI.
      </p>
      <DialogueForm onSubmit={handleSubmit} loading={loading} />
      {error && (
        <div
          className="bg-red-900 border border-red-600 text-red-100 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      {dialogues ? (
        <DialogueDisplay dialogues={dialogues} />
      ) : loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}
