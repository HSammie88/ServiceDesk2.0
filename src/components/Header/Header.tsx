import { useContext, useState } from "react";
import style from "./Header.module.css";
import { ContextProvider } from "../Context/Context";
import type { CSSType } from "../../types";
import UserProfile from "./UserProfile";

export default function Header() {
  const { currentColors, currentUser } = useContext(ContextProvider)!;
  const [buttonHovered, setButtonHovered] = useState(false)

  const styleProvider: CSSType = {
    backgroundColor: currentColors.headFoot,
    "--text-color": currentColors.textColor,
    "--settings-bg": currentColors.headFoot,
    "--button-bg": buttonHovered ? currentColors.button.hoveredBackground : currentColors.button.background
  };

  return (
    <div style={styleProvider} className={style.container}>
      <div className={style["logo-container"]}>
        <h1>ServiceDesk 2.0</h1>
        <h5>by HSammie88</h5>
      </div>
      <div></div>
      <div className={style["user-container"]}>
        {!currentUser ? <UserProfile setButtonHovered={setButtonHovered} style={style}/> : null}
      </div>
    </div>
  );
}
