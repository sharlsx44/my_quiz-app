"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

type AnswerStatus = "unanswered" | "correct" | "wrong";

export default function Quiz() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [answerStatuses, setAnswerStatuses] = useState<AnswerStatus[]>([]);

  useEffect(() => {
    fetch("/api/questions")
      .then((res) => res.json())
      .then((data: Question[]) => {
        setQuizData(data);
        setAnswerStatuses(Array(data.length).fill("unanswered"));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load questions:", err);
        setLoading(false);
      });
  }, []);

  const currentQuestion = quizData[currentIndex];
  if (!currentQuestion) {
  return <p className="text-center mt-10">No question available.</p>;
}

  const handleOptionClick = (optionIndex: number) => {
    if (showResult) return;

    setSelectedOption(optionIndex);
    setShowResult(true);

    const isCorrect = optionIndex === currentQuestion.correctAnswer;

    setAnswerStatuses((prev) => {
      const updated = [...prev];
      updated[currentIndex] = isCorrect ? "correct" : "wrong";
      return updated;
    });

    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quizData.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowResult(false);
    setQuizFinished(false);
    setAnswerStatuses(Array(quizData.length).fill("unanswered"));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading quiz...</p>;
  }

  if (quizData.length === 0) {
    return <p className="text-center mt-10">No questions found.</p>;
  }

  if (quizFinished) {
    return (
      <Card className="w-full max-w-md mx-auto mt-10">
        <CardHeader>
          <CardTitle className="text-center">Quiz Finished!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-xl">
            Your score: <span className="font-bold">{score}</span> / {quizData.length}
          </p>
          <Button onClick={handleRestart}>Restart Quiz</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1">
          {answerStatuses.map((status, index) => (
            <div
              key={index}
              className={`h-3 flex-1 rounded-full transition-colors duration-300 ${
                status === "correct"
                  ? "bg-green-500"
                  : status === "wrong"
                  ? "bg-red-500"
                  : "bg-muted"
              }`}
            />
          ))}
        </div>
        <Badge variant="secondary">
          {score} / {quizData.length}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Question {currentIndex + 1} of {quizData.length}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-lg">{currentQuestion.question}</p>

         <RadioGroup
  value={selectedOption !== null ? String(selectedOption) : ""}
  onValueChange={(value) => handleOptionClick(Number(value))}
  disabled={showResult}
  className="flex flex-col gap-2"
>
  {currentQuestion.options.map((option, index) => {
    let stateClass = "border-input";

    if (showResult) {
      if (index === currentQuestion.correctAnswer) {
        stateClass = "border-green-500 bg-green-500/10";
      } else if (index === selectedOption) {
        stateClass = "border-red-500 bg-red-500/10";
      }
    }

    return (
      <Label
        key={index}
        htmlFor={`option-${index}`}
        className={`flex items-center gap-3 rounded-md border p-3 cursor-pointer transition-colors ${stateClass}`}
      >
        <RadioGroupItem value={String(index)} id={`option-${index}`} />
        <span>{option}</span>
      </Label>
    );
  })}
</RadioGroup>

          {showResult && (
            <div className="flex justify-end">
              <Button onClick={handleNext}>
                {currentIndex + 1 < quizData.length ? "Next Question" : "See Results"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}