import { NextResponse } from "next/server";
import quizData from "@/quiz-data.json";

export async function GET() {
  const questions = quizData.map((question, index) => ({
    id: index + 1,
    ...question,
  }));

  return NextResponse.json(questions);
}