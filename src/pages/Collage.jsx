import styles from "./Collage.module.css";
import { useState } from "react";

import firstPhoto from "../photos/first.png";
import secondPhoto from "../photos/second.png";
import thirdPhoto from "../photos/third.png";
import fourthPhoto from "../photos/forth.png";
import fifthPhoto from "../photos/fifth.png";

import paw from "../photos/paw.png";

const initialCards = [
  {
    id: 1,
    image: firstPhoto,
    text: "Рядом с тобой я вижу самые прекрасные сны 🤍",
  },
  {
    id: 2,
    image: secondPhoto,
    text: "Мамочка, ты у меня самая красивая ✨",
  },
  {
    id: 3,
    image: thirdPhoto,
    text: "Мяу, как я устаю после наших игр 💕",
  },
  {
    id: 4,
    image: fourthPhoto,
    text: "Смотри, как я люблю своего дедушку, мяу 🌸",
  },
  {
    id: 5,
    image: fifthPhoto,
    text: "А еще у нас с мамочкой одно лицо 💖",
  },
];

export default function Collage() {
  const [cards, setCards] = useState(initialCards);
  const [removedCards, setRemovedCards] = useState([]);

  const handleRemove = (card) => {
    if (removedCards.includes(card.id)) return;

    setRemovedCards((prev) => [...prev, card.id]);

    setTimeout(() => {
      setCards((prev) => prev.filter((c) => c.id !== card.id));
    }, 1200);
  };

  const restartCards = () => {
    setCards(initialCards);
    setRemovedCards([]);
  };

  return (
    <div className={styles.main}>
      <span className={styles.heart}>❤</span>
      <span className={styles.heart}>❤</span>
      <span className={styles.heart}>❤</span>
      <span className={styles.heart}>❤</span>

      <div className={styles.main_block}>
        <h1 className={styles.title}>Наши моменты 💖</h1>

        {cards.length > 0 ? (
          <div className={styles.deck}>
            {cards.map((card, index) => {
              const removed = removedCards.includes(card.id);

              return (
                <div
                  key={card.id}
                  className={`${styles.card} ${
                    removed ? styles.cardRemoved : ""
                  }`}
                  style={{
                    zIndex: removed ? 9999 : cards.length - index,
                  }}
                  onClick={() => handleRemove(card)}
                >
                  <img src={card.image} alt="memory" className={styles.image} />

                  <div className={styles.cardOverlay}>
                    <p className={styles.cardText}>{card.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className={styles.endBlock}>
            <div className={styles.endTitle}>Продолжение следует 💕</div>

            <button className={styles.restartButton} onClick={restartCards}>
              Смотреть заново ✨
            </button>
          </div>
        )}

        <img
          src={paw}
          alt="paw"
          width={60}
          className={styles.exit}
          onClick={() => window.history.back()}
        />
      </div>
    </div>
  );
}
