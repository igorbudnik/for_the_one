import styles from "./Heart.module.css";

export default function Heart({
  src,
  angle = 0,
  size = 450,
  onClick,
  zoom = 1.25,
}) {
  const imageSize = 100 + 100 * (1 - zoom);
  const imageOffset = (imageSize - 100) / 2;

  return (
    <div
      className={styles.wrapper}
      style={{
        width: size,
        height: size,
        transform: `rotate(${angle}deg)`,
      }}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 100 100"
        className={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="heartClip">
            <path
              d="M50 88
              C20 65, 5 45, 18 28
              C28 15, 45 20, 50 30
              C55 20, 72 15, 82 28
              C95 45, 80 65, 50 88 Z"
            />
          </clipPath>
        </defs>

        <image
          href={src}
          x={-imageOffset}
          y={-imageOffset}
          width={imageSize}
          height={imageSize}
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#heartClip)"
        />

        <path
          d="M50 88
            C20 65, 5 45, 18 28
            C28 15, 45 20, 50 30
            C55 20, 72 15, 82 28
            C95 45, 80 65, 50 88 Z"
          className={styles.border}
        />
      </svg>
    </div>
  );
}
