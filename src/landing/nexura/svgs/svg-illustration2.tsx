export default function Illustration2() {
  return (
    <svg className="w-auto h-[11.1875rem] block overflow-hidden" data-component="image" viewBox="0 0 1 200" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M0 0v200" stroke="var(--brand-cyan, #74c4d7)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="transparent" />
      {/* Nexura SVG Path Shimmer: dash travels down the flow line */}
      <path
        className="nexura-path-shimmer"
        strokeDasharray="40 60"
        d="M0 0v200"
        stroke="var(--brand-blue, #3b8ac1)"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="transparent"
        pathLength="100"
        strokeDashoffset="150"
        opacity="1"
      />
    </svg>
  );
}
