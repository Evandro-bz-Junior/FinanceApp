// src/components/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 ">
      {children}
    </div>
  );
}
