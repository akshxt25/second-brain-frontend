interface TagsProps {
  tagTypes: "Productivity" | "Tech & Tools" | "Mindset" | "Learning & Skills" | "Workflows" | "Inspiration"
}

const tagColors: Record<string, string> = {
  "Productivity": "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
  "Tech & Tools": "bg-blue-500/15 text-blue-400 border-blue-500/20",
  "Mindset": "bg-amber-500/15 text-amber-400 border-amber-500/20",
  "Learning & Skills": "bg-violet-500/15 text-violet-400 border-violet-500/20",
  "Workflows": "bg-cyan-500/15 text-cyan-400 border-cyan-500/20",
  "Inspiration": "bg-rose-500/15 text-rose-400 border-rose-500/20",
}

const Tags = (props: TagsProps) => {
  const colorClasses = tagColors[props.tagTypes] || "bg-surface-700 text-surface-300 border-surface-600";

  return <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border ${colorClasses} transition-colors duration-200`}>
    {props.tagTypes}
  </span>
}

export default Tags;