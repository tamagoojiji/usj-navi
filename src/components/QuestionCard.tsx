import './QuestionCard.css';

interface Option {
  label: string;
  value: string;
  icon?: string;
}

interface Props {
  step: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  options: Option[];
  selected: string[];
  multiple?: boolean;
  onSelect: (value: string) => void;
  onNext: () => void;
  nextDisabled?: boolean;
}

export default function QuestionCard({
  step,
  totalSteps,
  title,
  subtitle,
  options,
  selected,
  multiple = false,
  onSelect,
  onNext,
  nextDisabled = false,
}: Props) {
  return (
    <div className="question-card">
      <div className="question-progress">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
        <span className="progress-text">
          {step} / {totalSteps}
        </span>
      </div>

      <h2 className="question-title">{title}</h2>
      {subtitle && <p className="question-subtitle">{subtitle}</p>}

      <div className="question-options">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              className={`option-btn ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(opt.value)}
            >
              {opt.icon && <span className="option-icon">{opt.icon}</span>}
              <span className="option-label">{opt.label}</span>
              {multiple && (
                <span className="option-check">
                  {isSelected ? '✓' : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <button
        className="next-btn"
        onClick={onNext}
        disabled={nextDisabled}
      >
        次へ
      </button>
    </div>
  );
}
