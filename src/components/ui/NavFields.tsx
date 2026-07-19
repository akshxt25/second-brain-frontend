import type { ReactElement } from "react";

interface NavFieldProps {
  text: String;
  startIcon?: ReactElement;
  active?: boolean;
}

const NavFields = (props: NavFieldProps) => {
  return (
    <div className={`flex gap-3 items-center h-11 pl-5 mx-2 rounded-xl cursor-pointer transition-all duration-200 group
      ${props.active
        ? "bg-brand-600/15 text-brand-400 border border-brand-500/20"
        : "text-surface-400 hover:text-surface-200 hover:bg-surface-800/60 border border-transparent"
      }`}
    >
      <span className={`transition-colors duration-200 ${props.active ? "text-brand-400" : "text-surface-500 group-hover:text-surface-300"}`}>
        {props.startIcon}
      </span>
      <span className={`text-sm font-medium transition-colors duration-200 ${props.active ? "text-brand-300" : ""}`}>
        {props.text}
      </span>
    </div>
  );
};

export default NavFields;
