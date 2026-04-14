"use client";

import Link from "next/link";

type ErrorStateProps = {
  title: string;
  description: string;
  detail?: string;
  onRetry?: () => void;
};

export function ErrorState({
  title,
  description,
  detail,
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="state-card state-card-error">
      <p className="eyebrow">Error state</p>
      <h2>{title}</h2>
      <p className="form-note">{description}</p>
      {detail ? <p className="form-note">{detail}</p> : null}
      <div className="state-actions">
        {onRetry ? (
          <button
            className="button button-primary"
            type="button"
            onClick={onRetry}
          >
            Try again
          </button>
        ) : null}
        <Link className="button button-secondary" href="/">
          Return home
        </Link>
      </div>
    </div>
  );
}
