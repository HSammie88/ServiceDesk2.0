import {
  type Dispatch,
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";
import colors from "../../statics/colors.json";

type TCurrentColors = typeof colors.light;
interface IContextProps {
  children: ReactNode;
}

interface IContextValues {
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
  currentColors: TCurrentColors;
}

const ContextProvider = createContext<IContextValues | undefined>(undefined);

function Context({ children }: IContextProps) {
  const [currentUser, setCurrentUser] = useState("");
  const [isDark, setIsDark] = useState(false);
  const currentColors: TCurrentColors = isDark ? colors.dark : colors.light;

  const contextValues: IContextValues = {
    currentUser,
    setCurrentUser,
    isDark,
    setIsDark,
    currentColors,
  };

  return (
    <ContextProvider.Provider value={contextValues}>
      {children}
    </ContextProvider.Provider>
  );
}

export { ContextProvider, Context };
