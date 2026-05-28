export function Logo({ className = "w-8 h-8", light = false }: { className?: string; light?: boolean }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      {/* Lowercase 'd' body */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.5 15C59.5 15 59.5 35.8 59.5 44.2C54.8 37.1 46.5 32.5 37 32.5C20.4 32.5 7 45.9 7 62.5C7 79.1 20.4 92.5 37 92.5C46.5 92.5 54.8 87.9 59.5 80.8V85H59.6C59.6 85 59.5 85 59.5 85H79.5V15H59.5ZM37 77.5C28.7 77.5 22 70.8 22 62.5C22 54.2 28.7 47.5 37 47.5C45.3 47.5 52 54.2 52 62.5C52 70.8 45.3 77.5 37 77.5Z"
        fill={light ? "#ffffff" : "#0d1b2a"}
      />
      {/* Orange dot inside 'd' */}
      <circle cx="32" cy="65" r="7.5" fill="#f26522" />

      {/* Uppercase 'B' body */}
      <path
        d="M59.5 15H77C88.3 15 96.5 22.8 96.5 33.5C96.5 41.5 90.8 47.8 82.5 49.8C91.5 51.8 97.5 59 97.5 67.5C97.5 78.5 89 85 77.5 85H59.5V15ZM77 43.5C82.8 43.5 86.5 39.8 86.5 34C86.5 28.2 82.8 24.5 77 24.5H69.5V43.5H77ZM77.5 75.5C83.3 75.5 87.5 71.8 87.5 66C87.5 60.2 83.3 56.5 77.5 56.5H69.5V75.5H77.5Z"
        fill="#f26522"
      />
    </svg>
  );
}
