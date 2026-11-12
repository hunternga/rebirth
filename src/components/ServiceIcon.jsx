export default function ServiceIcon({ path, size = 28 }) {
  return (
    <div className="program__icon">
      <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
        <path d={path} />
      </svg>
    </div>
  );
}
