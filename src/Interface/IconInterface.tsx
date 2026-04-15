
type Size = "sm" | "md" | "lg";

interface IconProps {
  size: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "w-4 h-4",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};
export { sizeClasses };
export type { IconProps };
