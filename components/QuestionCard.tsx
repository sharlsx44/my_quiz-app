import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnswerOption } from "./AnswerOption";
import type { AnswerState, Question } from "./quiz-types";

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  total: number;
  selectedOption: number | null;
  answered: boolean;
  onSelect: (index: number) => void;
  onNext: () => void;
};

export function QuestionCard({
  question,
  questionNumber,
  total,
  selectedOption,
  answered,
  onSelect,
  onNext,
}: QuestionCardProps) {
  return (
    <section className="rounded-2xl border bg-card p-5 shadow-sm sm:p-8">
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="mb-3 text-sm font-semibold text-primary">Question {questionNumber}</p>
          <h2 className="max-w-2xl text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
            {question.question}
          </h2>
        </div>
        <span className="shrink-0 rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
          {questionNumber} / {total}
        </span>
      </div>

      <div className="grid gap-3" role="group" aria-label="Answer choices">
        {question.options.map((option, index) => {
          let state: AnswerState = "idle";
          if (answered && index === question.correctAnswer) state = "correct";
          if (answered && index === selectedOption && index !== question.correctAnswer) state = "incorrect";

          return (
            <AnswerOption
              key={option}
              option={option}
              index={index}
              selected={selectedOption === index}
              state={state}
              disabled={answered}
              onSelect={onSelect}
            />
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t pt-5">
        <p className="text-sm text-muted-foreground">
          {answered ? (selectedOption === question.correctAnswer ? "Correct answer" : "Review the correct answer above") : "Select one answer to continue"}
        </p>
        <Button onClick={onNext} disabled={!answered} size="lg">
          {questionNumber === total ? "See Results" : "Next Question"}
          <ArrowRight aria-hidden="true" />
        </Button>
      </div>
    </section>
  );
}
