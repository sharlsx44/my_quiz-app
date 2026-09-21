"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { QuestionCard } from "./QuestionCard";
import { QuizHeader } from "./QuizHeader";
import type { Question } from "./quiz-types";

export default function Quiz() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    fetch("/api/questions")
      .then(async (res) => {
        if (!res.ok) throw new Error("Unable to load quiz questions.");
        return res.json() as Promise<Question[]>;
      })
      .then((data) => {
        setQuizData(data);
      })
      .catch(() => {
        setError("The quiz questions could not be loaded. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const currentQuestion = quizData[currentIndex];
  const handleSelect = (optionIndex: number) => {
    if (answered || !currentQuestion) return;
    setSelectedOption(optionIndex);
    setAnswered(true);
    if (optionIndex === currentQuestion.correctAnswer) setScore((prev) => prev + 1);
  };

  const handleNext = () => {
    if (!answered) return;
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      router.push(`/result?score=${score}&total=${quizData.length}`);
    }
  };

  if (loading) {
    return <p className="py-16 text-center text-muted-foreground">Loading quiz...</p>;
  }

  if (error || quizData.length === 0 || !currentQuestion) {
    return <p className="py-16 text-center text-muted-foreground">{error ?? "No questions found."}</p>;
  }

  return (
    <div className="space-y-8">
      <QuizHeader current={currentIndex + 1} total={quizData.length} score={score} />
      <QuestionCard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        total={quizData.length}
        selectedOption={selectedOption}
        answered={answered}
        onSelect={handleSelect}
        onNext={handleNext}
      />
    </div>
  );
}