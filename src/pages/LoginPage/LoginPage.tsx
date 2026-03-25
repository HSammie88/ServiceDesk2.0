import { useContext, useRef, useState } from "react";
import style from "./LoginPage.module.css";
import { ContextProvider } from "../../components/Context/Context";
import type { CSSType } from "../../types";
import { LogIn } from "lucide-react";
import { UserQueries } from "../../statics/DBQueries";

export default function LoginPage() {
  const { currentColors, showMessage, setCurrentUser } = useContext(ContextProvider)!;
  const [isHovered, setIsHovered] = useState(false);
  const loginInput = useRef<HTMLInputElement>(null)
  const pwdInput = useRef<HTMLInputElement>(null)

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

  const handleClick = async() => {
    try{
      if(!(loginInput || pwdInput) || !(loginInput.current?.value && pwdInput.current?.value)) throw new Error("Заполните все поля")
      const user = await UserQueries.login(loginInput.current.value, pwdInput.current.value)
      if(user){
        showMessage("Успешная авторизация", 'success')
        setCurrentUser(user)
      }
      
    }catch(err){
      if(err instanceof Error)
      showMessage(err.message, "error")
    }
  };

  return (
    <div style={styleProvider} className={style.container}>
      <h1>Authorisation</h1>
      <div className={style["auth-container"]}>
        <input
          ref={loginInput}
          onKeyDown={(e) => (e.key === "Enter" ? handleClick() : null)}
          placeholder="Login"
          maxLength={20}
          type="text"
        />
        <input
          ref={pwdInput}
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
