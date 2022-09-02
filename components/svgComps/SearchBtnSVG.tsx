function SearchBtnSVG({ heightWidth }: { heightWidth: string }) {
  return (
    <svg
      className="cursor-pointer"
      aria-label="Search"
      color="#8e8e8e"
      height={heightWidth}
      role="img"
      viewBox="0 0 24 24"
      width={heightWidth}
    >
      <path
        d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="16.511"
        x2="22"
        y1="16.511"
        y2="22"
      />
    </svg>
  );
}

export default SearchBtnSVG;
