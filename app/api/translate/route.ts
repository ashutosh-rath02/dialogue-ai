import { geminiModel } from "@/app/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { dialogues, targetLanguage } = await request.json();

  try {
    const prompt = `Translate the following movie dialogues to ${targetLanguage}. Maintain the original meaning and tone, but ensure the translation is family-friendly and appropriate for all audiences:

${dialogues.join("\n")}

Provide only the translations, one per line.`;

    const result = await geminiModel.generateContent(prompt);
    const response = await result.response;

    if (response.text) {
      const translations = response.text().split("\n");
      return NextResponse.json({ translations });
    } else {
      throw new Error("No text in response");
    }
  } catch (error) {
    console.error("Error translating dialogues:", error);
    let errorMessage = "Failed to translate dialogues. Please try again later.";

    if (error instanceof Error && error.message.includes("SAFETY")) {
      errorMessage =
        "The translation request was blocked due to content safety concerns. Please try again with different content.";
    }

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
