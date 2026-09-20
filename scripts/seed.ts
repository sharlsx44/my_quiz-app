import { pool } from "../lib/db";
import quizData from "../data/quiz-data.json";

async function seed() {
  try {
    await pool.query("DELETE FROM questions");

    for (const q of quizData) {
      await pool.query(
        "INSERT INTO questions (question, options, correctAnswer) VALUES (?, ?, ?)",
        [q.question, JSON.stringify(q.options), q.correctAnswer]
      );
    }

    console.log(`Seeded ${quizData.length} questions successfully.`);
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    await pool.end();
  }
}

seed();