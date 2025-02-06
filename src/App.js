import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FinancialAdvice from "./pages/FinancialAdvice";
import InvestmentOptions from "./pages/InvestmentOption";
import InvestmentDetail from "./pages/InvestmentDetail";
import ExpenditureAnalysis from "./pages/ExpenditureAnalysis";
import Login from "./pages/Login";
import StockDetailPage from "./pages/stock";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/stock" element={<StockDetailPage />} />
      <Route
        path="/"
        element={<Login onLogin={() => alert("Logged in successfully!")} />}
      />
      ;
      <Route path="/home" element={<Home />} />
      <Route path="/financial-advice" element={<FinancialAdvice />} />
      <Route path="/investment-options" element={<InvestmentOptions />} />
      <Route
        path="/investment-options/:optionId"
        element={<InvestmentDetail />}
      />
      <Route path="/expenditure-analysis" element={<ExpenditureAnalysis />} />;
    </Routes>
  </Router>
);

export default App;
