interface CalloutProps {
  type: "tip" | "warning" | "info" | "comfort";
  title?: string;
  children: React.ReactNode;
}

const styles = {
  tip: {
    wrapper: "bg-emerald-50 border-emerald-200",
    icon: "text-emerald-600",
    title: "text-emerald-800",
  },
  warning: {
    wrapper: "bg-amber-50 border-amber-200",
    icon: "text-amber-600",
    title: "text-amber-800",
  },
  info: {
    wrapper: "bg-blue-50 border-blue-200",
    icon: "text-blue-600",
    title: "text-blue-800",
  },
  comfort: {
    wrapper: "bg-violet-50 border-violet-200",
    icon: "text-violet-600",
    title: "text-violet-800",
  },
};

const icons = {
  tip: "Tip",
  warning: "Note",
  info: "Info",
  comfort: "OK",
};

export default function Callout({ type, title, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`mt-6 rounded-lg border p-4 ${s.wrapper}`}>
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 shrink-0 rounded px-1.5 py-0.5 text-xs font-bold ${s.icon} bg-white/60`}
        >
          {icons[type]}
        </span>
        <div className="min-w-0">
          {title && (
            <p className={`text-sm font-semibold ${s.title}`}>{title}</p>
          )}
          <div className="mt-1 text-sm text-stone-700">{children}</div>
        </div>
      </div>
    </div>
  );
}
