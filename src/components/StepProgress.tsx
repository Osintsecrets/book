interface StepProgressProps {
  current: number;
  total: number;
  label: string;
  ofLabel: string;
}

export const StepProgress = ({ current, total, label, ofLabel }: StepProgressProps) => {
  const percentage = Math.round(((current + 1) / total) * 100);
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>
          {label} {current + 1} {ofLabel} {total}
        </span>
        <span>{percentage}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-violet via-cyan-400 to-cyan-200 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
