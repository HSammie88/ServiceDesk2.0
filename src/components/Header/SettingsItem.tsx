import type { LucideIcon } from "lucide-react";

interface ISettingsItemProps {
  style: CSSModuleClasses;
  action?: () => void;
  Icon: LucideIcon;
  text: string;
}

export default function SettingsItem({
  style,
  action,
  Icon,
  text,
}: ISettingsItemProps) {
  return (
    <div onClick={action} className={style["settings-item-container"]}>
      <Icon />
      <p>{text}</p>
    </div>
  );
}
