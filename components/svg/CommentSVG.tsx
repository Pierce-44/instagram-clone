function CommentSVG({
  outline,
  height,
  width,
  fill,
}: {
  outline: string;
  height: string;
  width: string;
  fill: string;
}) {
  return (
    <svg
      aria-label="Comment"
      color={outline}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
        fill={fill}
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export default CommentSVG;
