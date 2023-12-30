import { createContext, useState } from "react";

const formContext = createContext();

const FormProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <formContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </formContext.Provider>
  );
};

export { FormProvider, formContext };
