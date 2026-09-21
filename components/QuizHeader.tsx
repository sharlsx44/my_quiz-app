import Link from "next/link";
import { ArrowLeft, Brain } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ProgressBar } from "./ProgressBar";

type QuizHeaderProps = {
  current: number;
  total: number;
  score: number;
};

export function QuizHeader({ current, total, score }: QuizHeaderProps) {
  return (
    <header className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            <ArrowLeft aria-hidden="true" />
            Home
        </Link>
        <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          <Brain aria-hidden="true" className="size-4 text-primary" />
          Score: <span className="text-foreground">{score}</span>
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary">System Fundamentals</p>
        <h1 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Midterm Quiz</h1>
      </div>
      <ProgressBar current={current} total={total} />
    </header>
  );
}
