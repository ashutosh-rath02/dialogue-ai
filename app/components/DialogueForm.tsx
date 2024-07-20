"use client";

import { useState } from "react";

interface DialogueFormProps {
  onSubmit: (movieName: string) => void;
  loading: boolean;
}

export default function DialogueForm({ onSubmit, loading }: DialogueFormProps) {
  const [movieName, setMovieName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(movieName);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 text-black">
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Dialogues"}
        </button>
      </div>
    </form>
  );
}
