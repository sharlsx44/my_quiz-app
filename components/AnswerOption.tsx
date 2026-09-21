import { Check, X } from "lucide-react";
import type { AnswerState } from "./quiz-types";

type AnswerOptionProps = {
  option: string;
  index: number;
  selected: boolean;
  state: AnswerState;
  disabled: boolean;
  onSelect: (index: number) => void;
};

export function AnswerOption({
  option,
  index,
  selected,
  state,
  disabled,
  onSelect,
}: AnswerOptionProps) {
  const isCorrect = state === "correct";
  const isIncorrect = state === "incorrect";

  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={() => onSelect(index)}
      className={`flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-accent disabled:cursor-default ${
        isCorrect
          ? "border-emerald-500 bg-emerald-500/10 text-emerald-700"
          : isIncorrect
            ? "border-rose-500 bg-rose-500/10 text-rose-700"
            : selected
              ? "border-primary bg-primary/10 ring-2 ring-primary/20"
              : "border-border bg-background"
      }`}
    >
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="flex-1 font-medium">{option}</span>
      {isCorrect && <Check aria-hidden="true" className="size-5" />}
      {isIncorrect && <X aria-hidden="true" className="size-5" />}
    </button>
  );
}
