type LogoProps = {
  className?: string;
};

/** DukeCrea isotype: solid lime (#a3e635) rounded square. */
export function Logo({ className }: LogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="DukeCrea"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="16" fill="#a3e635" />
    </svg>
  );
}
