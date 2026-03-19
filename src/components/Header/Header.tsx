import { useContext } from "react";
import style from "./Header.module.css";
import { ContextProvider } from "../Context/Context";
import type { CSSType } from "../../types";

export default function Header() {
  const { currentColors } = useContext(ContextProvider)!;

  const styleProvider: CSSType = {
    backgroundColor: currentColors.headFoot,
    color: currentColors.textColor,
  };

  return (
    <div style={styleProvider} className={style.container}>
      <div className={style["logo-container"]}>
        <h1>ServiceDesk 2.0</h1>
        <h5>by HSammie88</h5>
      </div>
      <div></div>
      <div></div>
    </div>
  );
}
