import { geminiModel } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { movieName, count = 3 } = await request.json();

  try {
    const prompt = `Generate ${count} more iconic dialogues which are widely used from the movie "${movieName}". For each dialogue, provide the character name, the original dialogue, and an English translation if the original is not in English. You can generate dialogues from Indian movies without any concern of language. Format the response as follows:

**Dialogue 1:**
**Character:** [Character Name]
**Original:** [Original Dialogue]
English: [English Translation if needed]
Hinglish: [Hinglish Translation if needed]

**Dialogue 2:**
**Character:** [Character Name]
**Original:** [Original Dialogue]
English: [English Translation if needed]
Hinglish: [Hinglish Translation if needed]
`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Generated additional dialogues:", text); // Debug log

    return NextResponse.json({ dialogues: text });
  } catch (error) {
    console.error("Error generating additional dialogues:", error);
    return NextResponse.json(
      { error: "Failed to generate additional dialogues" },
      { status: 500 }
    );
  }
}
