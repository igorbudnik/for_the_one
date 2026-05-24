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
import ears from "../photos/ears.png";
import paw from "../photos/paw.png";
import rom from "../photos/rom.png";
import rose from "../photos/rose.png";

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
  const [showHeart, setShowHeart] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    setShowHeart(true);
    setShowModal(false);

    setTimeout(() => {
      setUnderText(true);
    }, 6000);

    setTimeout(() => {
      navigate("/valentine");
    }, 8000);
  };

  const handleEarsClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className={mainStyle.main}>
      {showText && <div className={mainStyle.floatingText}>murrrrr &lt;3</div>}
      {showModal && (
        <>
          <div className={mainStyle.floatingBlock}>
            <span className={mainStyle.title}>Ежедневное напоминание</span>
            <section className={mainStyle.secP}>
              <p>Ты НЕПРИЛИЧНО ДОРОГОЙ подарок в моей жизни😘</p>
              <p>У тебя очень красивая улыбка!!! Улыбнись, мяу:)</p>
            </section>
            <img src={rom} height={20} className={mainStyle.rom1} />
            <img src={rom} height={20} className={mainStyle.rom2} />
            <img src={rose} height={20} className={mainStyle.rose1} />
            <img src={rose} height={20} className={mainStyle.rose2} />

            <div></div>
          </div>
          <img
            src={paw}
            height={75}
            onClick={handleEarsClick}
            className={mainStyle.exit}
          />
        </>
      )}
      {!showModal && (
        <img
          src={ears}
          height={100}
          className={showHeart ? mainStyle.iconEarsDis : mainStyle.iconEars}
          alt="murrr :*"
          onClick={handleEarsClick}
        />
      )}
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
            {i === 1 ? (
              <>
                <div className={mainStyle.lunaBlock}>
                  <span className={mainStyle.titleLuna}>
                    Мяу, <b>Мамочка</b>, иди сюда!!!
                  </span>
                </div>
                <div className={mainStyle.circle1}></div>
                <div className={mainStyle.circle2}></div>
                <div className={mainStyle.circle3}></div>
              </>
            ) : null}
            <Heart
              angle={angles[i]}
              src={urls[i]}
              onClick={i === 1 ? () => navigate("/collage") : handleHeartClick}
            />
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
              <Button
                content={"Да"}
                onClick={handleYesClick}
                disabled={showHeart}
              >
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
              <Button content={"Нет"} disabled={showHeart} />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Main;
