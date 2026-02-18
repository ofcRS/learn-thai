interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const pct = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
      <span className="progress-text">
        {current} / {total}
      </span>
    </div>
  );
}
