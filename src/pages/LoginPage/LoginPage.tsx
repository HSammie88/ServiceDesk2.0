import { useContext, useState } from "react";
import style from "./LoginPage.module.css";
import { ContextProvider } from "../../components/Context/Context";
import type { CSSType } from "../../types";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const { currentColors } = useContext(ContextProvider)!;
  const [isHovered, setIsHovered] = useState(false);

  const styleProvider: CSSType = {
    "--page-color": currentColors.window,
    color: currentColors.textColor,
    "--button-bg": isHovered
      ? currentColors.buttonGreen.hoveredBackground
      : currentColors.buttonGreen.background,
    "--input-bg": currentColors.input.background,
    "--input-text": currentColors.input.text,
    "--input-border": currentColors.input.border,
    "--input-placeholder": currentColors.input.placeholder,
  };

  const handleClick = () => {};

  return (
    <div style={styleProvider} className={style.container}>
      <h1>Authorisation</h1>
      <div className={style["auth-container"]}>
        <input
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
          placeholder="Login"
          maxLength={20}
          type="text"
        />
        <input
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
          placeholder="Password"
          maxLength={40}
          type="password"
        />
        <button
          onClick={() => handleClick()}
          onMouseLeave={() => setIsHovered(false)}
          onMouseEnter={() => setIsHovered(true)}
        >
          <LogIn />
        </button>
      </div>
    </div>
  );
}
