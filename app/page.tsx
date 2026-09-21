import Link from "next/link";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-6 py-10 sm:px-10 lg:px-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col justify-between">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BookOpen aria-hidden="true" className="size-5" />
            </span>
            QuizDesk
          </div>
          <span className="text-sm text-muted-foreground">System Fundamentals</span>
        </header>

        <section className="grid items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div>
      
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl">
              Test what you know. <span className="text-muted-foreground">Build what comes next.</span>
            </h1>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/quiz" className={buttonVariants({ size: "lg" })}>
                  Start Quiz
                  <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
            <p className="text-sm font-semibold text-muted-foreground">Inside this quiz</p>
            <div className="mt-6 divide-y">
              {[
                "10 carefully selected questions",
                "Immediate answer feedback",
                "Final score and percentage",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 py-4 first:pt-0 last:pb-0">
                  <CheckCircle2 aria-hidden="true" className="size-5 shrink-0 text-primary" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t pt-5 text-sm text-muted-foreground">Computer Communication Development Institute</footer>
      </div>
    </main>
  );
}