import "./styles/App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import { FormProvider } from "./contexts/FormContext";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <FormProvider>
              <Home />
            </FormProvider>
          }
        />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
