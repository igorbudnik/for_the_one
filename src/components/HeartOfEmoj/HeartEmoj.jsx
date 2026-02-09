import { useState, forwardRef, useImperativeHandle, useRef } from "react";
import styles from "./HeartEmoj.module.css";

const HEART_MAP = [
  [
    0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0,
  ],
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0,
  ],
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0,
  ],

  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0,
  ],
  [
    0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 0,
  ],

  [
    0,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    "М",
    "Я",
    "У",
    "У",
    "У",
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    0,
  ],
  [
    0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 0, 0,
  ],
  [
    0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0,
  ],

  [
    0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
    0, 0, 0, 0,
  ],

  [
    0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],

  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0,
  ],
];

const CLUSTER_SIZE = 25;
const DELAY = 400;

const EmojiHeart = forwardRef((_, ref) => {
  const [visible, setVisible] = useState(new Set());
  const timeoutsRef = useRef([]);

  const start = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    setVisible(new Set());

    const cells = [];
    const centerX = HEART_MAP[0].length / 2;
    const centerY = HEART_MAP.length / 2;

    HEART_MAP.forEach((row, y) =>
      row.forEach((cell, x) => {
        if (!cell) return;

        const distance = Math.hypot(x - centerX, y - centerY);
        cells.push({ key: `${x}-${y}`, distance });
      }),
    );

    // сортировка от центра наружу
    cells.sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < cells.length; i += CLUSTER_SIZE) {
      const cluster = cells.slice(i, i + CLUSTER_SIZE);

      const timeout = setTimeout(
        () => {
          setVisible((prev) => {
            const next = new Set(prev);
            cluster.forEach((c) => next.add(c.key));
            return next;
          });
        },
        (i / CLUSTER_SIZE) * DELAY,
      );

      timeoutsRef.current.push(timeout);
    }
  };

  useImperativeHandle(ref, () => ({ start }));

  return (
    <div
      className={styles.heartGrid}
      style={{
        gridTemplateColumns: `repeat(${HEART_MAP[0].length}, 1.6rem)`,
        gridTemplateRows: `repeat(${HEART_MAP.length}, 1.6rem)`,
      }}
    >
      {HEART_MAP.map((row, y) =>
        row.map((cell, x) => {
          const key = `${x}-${y}`;
          return (
            <span
              key={key}
              className={`${styles.heartCell} ${
                visible.has(key) ? styles.visible : ""
              }`}
            >
              {cell === 1 ? "❤️" : cell}
            </span>
          );
        }),
      )}
    </div>
  );
});

export default EmojiHeart;
