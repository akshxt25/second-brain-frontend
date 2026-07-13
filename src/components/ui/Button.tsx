import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

interface ButtonProps {
    variant : Variants
    size : "sm" | "md" | "lg";
    text : string;
    startIcon ?: ReactElement;
    endIcon ?: ReactElement;
    onClick : () => void;

}

const variantStyles = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-300 text-purple-600"
}

const sizeStyles = {
    "sm" : "py-1 px-2 text-xl",
    "md" : "py-2 px-4 text-md",
    "lg" : "py-4 px-6 text-sm"
}

const defaultStyles = "rounded-md flex"

export const Button = (props: ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null} 
        <div className="pl-2 pr-2">
            {props.text}
        </div>
         {props.endIcon}
        </button>
}