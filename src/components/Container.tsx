// src/components/Container.tsx
import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 max-w-fit-md  ">
      {children}
    </div>
  );
}
