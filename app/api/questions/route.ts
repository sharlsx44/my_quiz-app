import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

interface QuestionRow extends RowDataPacket {
  id: number;
  question: string;
  options: string; // JSON stored as string, we'll parse it
  correctAnswer: number;
}

export async function GET() {
  try {
    const [rows] = await pool.query<QuestionRow[]>(
      "SELECT id, question, options, correctAnswer FROM questions ORDER BY id"
    );

    const questions = rows.map((row) => ({
      id: row.id,
      question: row.question,
      options: typeof row.options === "string" ? JSON.parse(row.options) : row.options,
      correctAnswer: row.correctAnswer,
    }));

    return NextResponse.json(questions);
  } catch (err) {
    console.error("Failed to fetch questions:", err);
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}