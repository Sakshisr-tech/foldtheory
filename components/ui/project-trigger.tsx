"use client";

export function ProjectTrigger({
  projectId,
  className = "",
  children,
  ariaLabel,
}: {
  projectId: string;
  className?: string;
  children: React.ReactNode;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      aria-haspopup="dialog"
      onClick={(event) => {
        document.documentElement.dataset.foldTheoryPendingProject = projectId;
        window.dispatchEvent(
          new CustomEvent("fold-theory:open-project", {
            detail: { projectId, trigger: event.currentTarget },
          }),
        );
      }}
    >
      {children}
    </button>
  );
}
