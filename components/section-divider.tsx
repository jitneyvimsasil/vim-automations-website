export function SectionDivider() {
  return (
    <div className="max-w-5xl mx-auto px-6">
      <div className="h-px bg-gradient-to-r from-transparent via-[#e0ff4f]/20 to-transparent" />
    </div>
  );
}

export function AngledDivider() {
  return (
    <div className="relative h-20 -mb-px">
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path d="M0 80L1440 0V80H0Z" fill="var(--card)" />
      </svg>
    </div>
  );
}
