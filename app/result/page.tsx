import { ResultCard } from "@/components/ResultCard";

type ResultPageProps = {
  searchParams: Promise<{
    score?: string;
    total?: string;
  }>;
};

export default async function ResultPage({ searchParams }: ResultPageProps) {
  const params = await searchParams;
  const total = parsePositiveNumber(params.total, 10);
  const score = Math.min(parsePositiveNumber(params.score, 0), total);

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-10 sm:px-8">
      <ResultCard score={score} total={total} />
    </main>
  );
}

function parsePositiveNumber(value: string | undefined, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? Math.floor(parsed) : fallback;
}
