import type { ReactNode } from "react";

interface PageHeadingProps {
  eyebrow: string;
  title: string;
  description: ReactNode;
  /** Elemento exibido à direita do título (pill, select etc.). */
  aside?: ReactNode;
}

export function PageHeading({ eyebrow, title, description, aside }: PageHeadingProps) {
  return (
    <div className="page-heading">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>
          {title}
          <span className="purple-text">.</span>
        </h1>
        <p>{description}</p>
      </div>
      {aside}
    </div>
  );
}
