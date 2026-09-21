import Link from "next/link";
import { ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

type ResultCardProps = {
  score: number;
  total: number;
};

export function ResultCard({ score, total }: ResultCardProps) {
  const incorrect = total - score;
  const percentage = total === 0 ? 0 : Math.round((score / total) * 100);

  return (
    <section className="w-full max-w-2xl rounded-2xl border bg-card p-6 text-center shadow-sm sm:p-10">
      <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Trophy aria-hidden="true" className="size-8" />
      </div>
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Quiz complete</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">Your result</h1>
      <p className="mt-3 text-muted-foreground">Here is your score in the quiz.</p>

      <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total" value={total} />
        <Stat label="Correct" value={score} />
        <Stat label="Incorrect" value={incorrect} />
        <Stat label="Percentage" value={`${percentage}%`} />
      </div>

      <div className="rounded-xl bg-primary p-6 text-primary-foreground">
        <p className="text-sm font-medium opacity-80">Final score</p>
        <p className="mt-1 text-5xl font-bold">{score} / {total}</p>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
            <RotateCcw aria-hidden="true" />
            Retake Quiz
        </Link>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "lg" })}>
            <ArrowLeft aria-hidden="true" />
            Return Home
        </Link>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-background p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}
