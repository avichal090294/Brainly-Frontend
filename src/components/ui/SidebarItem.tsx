import type { ReactElement } from "react";

export const SideBarItem = ({
  text,
  icon,
}: {
  text: string;
  icon: ReactElement;
}) => {
  return (
    <div className="flex justify-start items-center p-4 gap-4 hover:bg-slate-100 cursor-pointer max-w-48 pl-4 transition-all duration-200">
      {icon} {text}
    </div>
  );
};
