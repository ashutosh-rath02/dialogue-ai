import { geminiModel } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { movieName, count = 5 } = await request.json();

  try {
    const prompt = `Generate ${count} family-friendly, iconic quotes from the movie "${movieName}". For each quote, provide the character name and the quote in English. If the original quote is not in English, provide a respectful English translation. You can generate dialogues from Indian movies without any concern of language. Format the response as follows:


**Origin:** [Movie's country of origin]

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
