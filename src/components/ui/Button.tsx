import { type ReactElement } from "react";

interface ButtonProps {
	variant: "primary" | "secondary" | "ghost" | "danger",
	startIcon?: ReactElement,
	endIcon?: ReactElement,
	size: "sm" | "lg" | "md",
	text: string
	onClick?: () => void
}

const variantStyles = {
	"primary": "bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 hover:from-brand-500 hover:to-brand-400 active:scale-[0.98]",
	"secondary": "bg-surface-800 text-brand-300 border border-surface-600 hover:bg-surface-700 hover:border-brand-500/30 active:scale-[0.98]",
	"ghost": "text-surface-400 hover:text-surface-200 hover:bg-surface-800/50 active:scale-[0.98]",
	"danger": "bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/40 active:scale-[0.98]"
}

const variantSize = {
	"sm": "text-sm py-1.5 px-3",
	"md": "text-sm py-2 px-4",
	"lg": "text-sm py-2.5 px-5"
}

const defaultStyles = "flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 cursor-pointer select-none"

export const Button = (props: ButtonProps) => {
	return <button onClick={props.onClick}
		className={`${variantStyles[props.variant]}  ${variantSize[props.size]} ${defaultStyles} `}
	> {props.startIcon ? props.startIcon : null} {props.text} {props.endIcon ? props.endIcon : null}
	</button>
}