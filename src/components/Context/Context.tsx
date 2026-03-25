import {
  type Dispatch,
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  useEffect,
} from "react";
import colors from "../../statics/colors.json";
import {InitDB} from "../../statics/DBQueries";
import Message from "../FunctionalComponents/Message/Message";
import type { IUser } from "../../types";

type TCurrentColors = typeof colors.light;
interface IContextProps {
  children: ReactNode;
}

interface IContextValues {
  currentUser: IUser | undefined;
  setCurrentUser: Dispatch<SetStateAction<IUser | undefined>>;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  currentColors: TCurrentColors;
  showMessage: (text: string, type?: "error" | "success" | "warning") => void
}

const ContextProvider = createContext<IContextValues | undefined>(undefined);

function Context({ children }: IContextProps) {
  const [currentUser, setCurrentUser] = useState<IUser>();
  const [isDark, setIsDark] = useState(false);
  const [message, setMessage] = useState<{text: string, type: 'error' | 'success' | 'warning'} | null>(null)
  const currentColors: TCurrentColors = isDark ? colors.dark : colors.light;

  const showMessage = (text: string, type: 'error' | 'success' | 'warning' = 'error') =>{
    setMessage({text, type})
    setTimeout(()=>setMessage(null), 5000)
  }
  
  const contextValues: IContextValues = {
    currentUser,
    setCurrentUser,
    isDark,
    setIsDark,
    currentColors,
    showMessage,
  };

  useEffect(()=>{
    document.body.style.backgroundColor = currentColors.main
  }, [currentColors.main])

  useEffect(()=>InitDB(), [])

  return (
    <ContextProvider.Provider value={contextValues}>
      {children}
      {message && <Message key={message.text} text={message.text} notificationType={message.type}/>}
    </ContextProvider.Provider>
  );
}

export { ContextProvider, Context };
