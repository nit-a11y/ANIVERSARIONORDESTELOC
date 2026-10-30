export function GradientFrame({ bottom = false }: { bottom?: boolean }) {
  return (
    <div className={`gradient-frame ${bottom ? 'gradient-frame-bottom' : 'gradient-frame-top'}`} aria-hidden="true">
      <div className="gradient-frame-ribbon" />
      <svg viewBox="0 0 1600 90" preserveAspectRatio="none">
        <path d="M70 -10 103 67 Q107 79 120 79 H184 Q204 79 197 61 L167 -10 M269 -10 V64 Q269 79 286 79 H475 Q492 79 492 62 V-10 M503 -10 Q906 177 1261 -10 M1317 -10 1285 61 Q1277 79 1295 79 H1355 Q1370 79 1376 65 L1413 -10" />
      </svg>
    </div>
  );
}
