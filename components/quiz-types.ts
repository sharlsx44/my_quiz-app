export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type AnswerState = "idle" | "correct" | "incorrect";
