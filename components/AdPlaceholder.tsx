import { MousePointerClick } from "lucide-react";

export function AdPlaceholder({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex min-h-[100px] items-center justify-center rounded-sm border border-dashed border-outline-variant bg-surface-container-lowest p-4 ${className}`}
    >
      <span className="flex items-center gap-2 font-body text-label-caps text-outline">
        <MousePointerClick size={16} />
        ADVERTISEMENT
      </span>
    </div>
  );
}
