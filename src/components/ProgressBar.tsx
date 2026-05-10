interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-3">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full transition-all duration-300 ${
            i < current
              ? 'bg-accent w-6'
              : i === current
              ? 'bg-accent/40 w-6'
              : 'bg-ios-border w-2'
          }`}
        />
      ))}
    </div>
  );
}
