import { useContext } from "react";
import style from "./Message.module.css";
import { useSpring, animated } from "react-spring";
import { ContextProvider } from "../../Context/Context";

interface IMessageProps {
  text: string;
  notificationType: "error" | "success" | "warning";
}

export default function Message({ text, notificationType }: IMessageProps) {
  const { currentColors } = useContext(ContextProvider)!;
  const notificationColor = currentColors.statusColors[notificationType];

  const spring = useSpring({
    from: {opacity: 0},
    to: {opacity: 1},
  });

  return (
    <animated.div
      style={{
        ...spring,
        color: notificationColor.text,
        backgroundColor: notificationColor.background,
      }}
      className={style.container}
    >
      <p>{text}</p>
    </animated.div>
  );
}
