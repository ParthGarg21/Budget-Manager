// react
import { createContext, useState } from "react";
const formContext = createContext();

/**
 * context used to toggle between login and signup form
 */
const FormProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <formContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </formContext.Provider>
  );
};

export { FormProvider, formContext };
