import { geminiModel } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { movieName } = await request.json();

  try {
    const prompt = `Generate 10 most famous dialogues from the movie "${movieName}". For each dialogue, provide the character name, the original dialogue, and an English translation if the original is not in English. Format the response as follows:

**Origin:** [Movie's country of origin]

**Dialogue 1:**
**Character:** [Character Name]
**Original:** [Original Dialogue]
English: [English Translation if needed]

**Dialogue 2:**
**Character:** [Character Name]
**Original:** [Original Dialogue]
English: [English Translation if needed]

**Dialogue 3:**
**Character:** [Character Name]
**Original:** [Original Dialogue]
English: [English Translation if needed]`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log("Generated dialogues:", text); // Debug log

    return NextResponse.json({ dialogues: text });
  } catch (error) {
    console.error("Error generating dialogues:", error);
    return NextResponse.json(
      { error: "Failed to generate dialogues" },
      { status: 500 }
    );
  }
}
