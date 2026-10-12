import type { ReactNode } from "react";

export default function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label">
      <span className="tiny-square" />
      <span>{children}</span>
      <span className="label-number" dir="ltr">
        / {number}
      </span>
    </div>
  );
}
