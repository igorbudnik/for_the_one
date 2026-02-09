import { useState, useEffect } from "react";
import buttonStyle from "./Button.module.css";

let globalState = 0;
const subscribers = new Set();

const Button = ({ onClick, children, content }) => {
  const [state, setLocalState] = useState(globalState);

  useEffect(() => {
    const update = () => setLocalState(globalState);
    subscribers.add(update);
    return () => subscribers.delete(update);
  }, []);

  const updateGlobalState = (newState) => {
    globalState = newState;
    subscribers.forEach((fn) => fn());
  };

  const getSizes = () => {
    switch (state) {
      case 0:
        return {
          no: { height: 45, width: 100 },
          yes: { height: 45, width: 224 },
        };
      case 1:
        return {
          no: { height: 45, width: 50 },
          yes: { height: 56, width: 300 },
        };
      case 2:
        return {
          no: { height: 45, width: 35 },
          yes: { height: 65, width: 450 },
        };
      case 3:
        return {
          no: { height: 0, width: 0 },
          yes: { height: 75, width: 600 },
        };
      default:
        return {
          no: { height: 45, width: 100 },
          yes: { height: 45, width: 224 },
        };
    }
  };

  const sizes = getSizes();
  const isYes = content === "Да";
  const buttonSize = isYes ? sizes.yes : sizes.no;

  const handleClick = () => {
    if (!isYes) {
      const newState = Math.min(state + 1, 3);
      updateGlobalState(newState);
    }
    onClick?.();
  };

  if (!isYes && state === 3) {
    return null;
  }

  return (
    <button
      style={{
        height: `${buttonSize.height}px`,
        width: `${buttonSize.width}px`,
        transition: "all 0.5s ease",
      }}
      className={isYes ? buttonStyle.button_yes : buttonStyle.button_no}
      onClick={handleClick}
    >
      <div className={buttonStyle.content}>
        {content === "Да" && state === 3 ? "Конечно!!!" : content}
      </div>
      {children}
    </button>
  );
};

export default Button;
