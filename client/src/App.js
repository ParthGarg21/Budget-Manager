// styles
import "./styles/App.css";

// components
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
import DashBoard from "./components/DashBoard";
import BudgetDetails from "./components/BudgetDetails";

// contexts
import { FormProvider } from "./contexts/FormContext";

// react
import { Route, Routes } from "react-router-dom";

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
        <Route path="/:id" element={<BudgetDetails />} />
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
