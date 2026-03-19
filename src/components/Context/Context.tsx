import {
  type Dispatch,
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
} from "react";

interface IContextProps {
  children: ReactNode;
}

interface IContextValues {
  currentUser: string;
  setCurrentUser: Dispatch<SetStateAction<string>>;
}

const ContextProvider = createContext<IContextValues | undefined>(undefined);

function Context({ children }: IContextProps) {
  const [currentUser, setCurrentUser] = useState("");

  const contextValues: IContextValues = {
    currentUser,
    setCurrentUser,
  };

  return (
    <ContextProvider.Provider value={contextValues}>
      {children}
    </ContextProvider.Provider>
  );
}

export { ContextProvider, Context };
