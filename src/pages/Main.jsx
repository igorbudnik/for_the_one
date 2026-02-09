import Button from "../components/Button/Button";
import mainStyle from "./Main.module.css";
import heart from "../photos/heart.png";
import { useEffect, useRef, useState } from "react";
import Heart from "../components/Heart/Heart";
import HeartEmoj from "../components/HeartOfEmoj/HeartEmoj";
import { useNavigate } from "react-router-dom";
import murzik from "../photos/murzik.jpg";
import luna from "../photos/luna.jpg";
import mimi from "../photos/mimi.jpg";
import dino from "../photos/dino.jpg";

const coords = [
  { x: 400, y: 50 },
  { x: 410, y: -420 },
  { x: -480, y: -490 },
  { x: -320, y: 70 },
];

const urls = [murzik, luna, mimi, dino];
const numOfEmoj = [1, 2, 3, 4, 5, 6, 7];
const initialAngles = [15, 10, -11, -25];

function Main() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);
  const heartRef = useRef(null);
  const [angles, setAngles] = useState(initialAngles);
  const animationRef = useRef(null);
  const startTimeRef = useRef(0);
  const textTimeoutRef = useRef(null);
  const [underText, setUnderText] = useState(false);

  const oscillationSettings = [
    { amplitude: 0.15, speed: 1.5, offset: 0 },
    { amplitude: 0.15, speed: 1.3, offset: 0 },
    { amplitude: 0.15, speed: 1.4, offset: 0 },
    { amplitude: 0.15, speed: 1.2, offset: 0 },
  ];

  useEffect(() => {
    startTimeRef.current = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;

      setAngles((prevAngles) =>
        prevAngles.map((baseAngle, index) => {
          const settings = oscillationSettings[index];
          const oscillation =
            Math.sin(elapsed * 0.001 * settings.speed + settings.offset) *
            settings.amplitude;

          return baseAngle + oscillation;
        }),
      );

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (textTimeoutRef.current) {
        clearTimeout(textTimeoutRef.current);
      }
    };
  }, []);

  const handleHeartClick = () => {
    if (textTimeoutRef.current) {
      clearTimeout(textTimeoutRef.current);
    }

    setShowText(true);

    textTimeoutRef.current = setTimeout(() => {
      setShowText(false);
      textTimeoutRef.current = null;
    }, 1400);
  };

  const handleYesClick = () => {
    if (heartRef.current) {
      heartRef.current.start();
    }

    setTimeout(() => {
      setUnderText(true);
    }, 6000);

    setTimeout(() => {
      navigate("/valentine");
    }, 8000);
  };

  return (
    <div className={mainStyle.main}>
      {showText && <div className={mainStyle.floatingText}>murrrrr &lt;3</div>}
      <div className={mainStyle.hearts}>
        {coords.map((coord, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${coord.x}px`,
              bottom: `${coord.y}px`,
            }}
          >
            <Heart angle={angles[i]} src={urls[i]} onClick={handleHeartClick} />
          </div>
        ))}
      </div>
      <HeartEmoj ref={heartRef} />
      {underText ? <span class={mainStyle.span}>Улетаем :)</span> : null}
      <span className={mainStyle.main_text_title}>
        Самой прекрасной девушке на планете💟
      </span>
      <section className={mainStyle.main_block}>
        <div className={mainStyle.area}>
          <span className={mainStyle.main_text}>
            {" "}
            ˖𓍢ִ໋🎀͙֒✧.🌷͙༘⋆ Будешь моей Валентинкой? ˖𓍢ִ໋🌷͙֒✧.🎀༘⋆
          </span>
          <section className={mainStyle.inner_block}>
            <div className={mainStyle.main_yes}>
              <Button content={"Да"} onClick={handleYesClick}>
                <div className={mainStyle.hidden}>
                  {numOfEmoj.map((x) => (
                    <img
                      key={x}
                      src={heart}
                      height={24}
                      className={mainStyle.icon}
                      alt="murrr :*"
                    />
                  ))}
                </div>
              </Button>
            </div>
            <div className={mainStyle.main_no}>
              <Button content={"Нет"} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Main;
