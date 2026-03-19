import { useContext } from "react";
import style from "./Footer.module.css";
import { ContextProvider } from "../Context/Context";
import type { CSSType } from "../../types";

export default function Footer() {
  const { currentColors } = useContext(ContextProvider)!;

  const styleProvider: CSSType = {
    backgroundColor: currentColors.headFoot,
    color: currentColors.textColor,
  };

  return (
    <div style={styleProvider} className={style.container}>
      <p>Created by HSammie88</p>
      <a target="_blank" href="https://github.com/HSammie88/ServiceDesk2.0">
        My Repo
      </a>
    </div>
  );
}
