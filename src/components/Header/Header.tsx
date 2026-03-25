import { useContext, useState } from "react";
import style from "./Header.module.css";
import { ContextProvider } from "../Context/Context";
import type { CSSType } from "../../types";
import UserProfile from "./UserProfile";
import { NavLink } from "react-router-dom";

interface INavigationLinks{
  text: string,
  destination: string,
}

export default function Header() {
  const { currentColors, currentUser, setCurrentUser, setIsDark, isDark } =
    useContext(ContextProvider)!;
  const [buttonHovered, setButtonHovered] = useState(false);

  const styleProvider: CSSType = {
    backgroundColor: currentColors.headFoot,
    "--text-color": currentColors.textColor,
    "--settings-bg": currentColors.headFoot,
    "--button-exit-bg": buttonHovered
      ? currentColors.exitButton.hoveredBackground
      : currentColors.exitButton.background,
    "--button-bg": currentColors.button.background,
    "--button-hovered-bg": currentColors.button.hoveredBackground
  };

  const navigationLinks: INavigationLinks[] = [
    {
      destination: "/myTickets",
      text: "My tickets"
    },
    {
      destination: "/newTicket",
      text: "Create ticket"
    }
  ]

  return (
    <div style={styleProvider} className={style.container}>
      <div className={style["logo-container"]}>
        <h1>ServiceDesk 2.0</h1>
        <h5>by HSammie88</h5>
      </div>
      <div className={style["navigation-container"]}>
        {currentUser ? (
          <>
            {navigationLinks.map((item, id) => <NavLink to={item.destination} key={id}>{item.text}</NavLink>)}
          </>
        ): null}
      </div>
      <div className={style["user-container"]}>
        {currentUser ? (
          <>
            <p>{`Greetings, ${currentUser.first_name}`}</p>
            <UserProfile
              isDark={isDark}
              setIsDark={setIsDark}
              setCurrentUser={setCurrentUser}
              setButtonHovered={setButtonHovered}
              style={style}
            />
          </>
        ) : null}
      </div>
    </div>
  );
}
