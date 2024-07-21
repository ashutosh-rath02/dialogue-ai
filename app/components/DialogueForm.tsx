"use client";

import { JSX, SVGProps, useState } from "react";
import { Input } from "./ui/input";

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
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
          className="w-full rounded-md border border-input bg-background px-12 py-3 text-foreground shadow-sm transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors duration-300 disabled:bg-primary/70"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Dialogues"}
      </button>
    </form>
  );
}

function SearchIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
