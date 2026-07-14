import { type ReactElement } from "react";

interface ButtonProps {
	variant: "primary" | "secondary",
	startIcon ?: ReactElement,
	endIcon ?: ReactElement,
	size: "sm" | "lg" | "md",
	text : string
	onClick: () => void
}

const variantStyles = {
	"primary" : "bg-purple-600 text-white hover:bg-purple-700",
	"secondary" : "bg-purple-300 text-purple-600 hover:bg-purple-400"
}

const variantSize ={ 
	"sm" : "text-sm py-1 px-2",
	"md" : "text-md py-2 px-4",
	"lg" : "text-lg py-4 px-6"
}

const defaultStyles = "flex items-center justify-center gap-2 text-lg rounded-lg"

export const Button = (props: ButtonProps) => {
	return <button  onClick={props.onClick}
		className={`${variantStyles[props.variant]}  ${variantSize[props.size]} ${defaultStyles} `}
	> {props.startIcon ? props.startIcon : null} {props.text} {props.endIcon ? props.endIcon : null} 
	</button>
}