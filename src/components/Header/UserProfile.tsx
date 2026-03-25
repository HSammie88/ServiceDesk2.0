import { CircleUser, SunMoon, type LucideIcon } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import SettingsItem from "./SettingsItem";
import type { IUser } from "../../types";

interface IUserProfileProps {
  style: CSSModuleClasses;
  setButtonHovered: Dispatch<SetStateAction<boolean>>;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  isDark: boolean;
}

interface ISettingsItem {
  Icon: LucideIcon;
  action: () => void;
  text: string;
}

export default function UserProfile({
  style,
  setButtonHovered,
  setCurrentUser,
  setIsDark,
  isDark,
}: IUserProfileProps) {
  const [settingsVisibility, setSettingsVisibility] = useState(false);

  const handleClick = () => setSettingsVisibility(!settingsVisibility);

  const handleThemeClick = () => {
    setIsDark(!isDark);
  };

  const settingsItems: ISettingsItem[] = [
    {
      action: () => handleThemeClick(),
      Icon: SunMoon,
      text: "Change theme",
    },
  ];

  return (
    <>
      <CircleUser onClick={handleClick} />
      {settingsVisibility ? (
        <div className={style["settings-container"]}>
          <div className={style["settings-grid-container"]}>
            {settingsItems.map((item, id) => {
              return (
                <SettingsItem
                  key={id}
                  Icon={item.Icon}
                  style={style}
                  text={item.text}
                  action={item.action}
                />
              );
            })}
          </div>
          <button
            onClick={() => {
              setCurrentUser(undefined);
              setButtonHovered(false);
            }}
            onMouseLeave={() => setButtonHovered(false)}
            onMouseEnter={() => setButtonHovered(true)}
          >
            Exit
          </button>
        </div>
      ) : null}
    </>
  );
}
