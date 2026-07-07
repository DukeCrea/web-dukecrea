type LogoProps = {
  className?: string;
};

/** DukeCrea isotype: black "D" monogram on the brand lime (#a3e635) rounded square. */
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
      <path
        fill="#050505"
        fillRule="evenodd"
        d="M19 15h11a17 17 0 0 1 0 34H19a2 2 0 0 1-2-2V17a2 2 0 0 1 2-2Zm7.5 8.5v17h3.5a8.5 8.5 0 0 0 0-17h-3.5Z"
      />
    </svg>
  );
}
