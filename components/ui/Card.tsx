import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export function Card({ children, hover = false, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl bg-card/80 backdrop-blur-md border border-border p-6",
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5",
        className
      )}
    >
      {children}
    </div>
  );
}
