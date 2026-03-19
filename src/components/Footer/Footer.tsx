import { useContext } from "react";
import style from "./Footer.module.css";
import { ContextProvider } from "../Context/Context";
import type { CSSType } from "../../types";

export default function Footer() {
  const {currentColors} = useContext(ContextProvider)!

  const styleProvider: CSSType= {
    "--bg-color": currentColors.headFoot,
  }

  return (
    <div style={styleProvider} className={style.container}></div>
  )
}
