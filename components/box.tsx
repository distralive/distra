import { twMerge } from "tailwind-merge";

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export const Box: React.FC<BoxProps> = ({ children, className }) => {
  return (
    <div className={twMerge(`h-fit w-full border-b`, className)}>
      {children}
    </div>
  );
};
