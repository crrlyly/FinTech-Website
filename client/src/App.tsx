import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
import Transaction from "./pages/app/Transaction";
import Budgets from "./pages/app/Budgets";
import Savings from "./pages/app/Savings";
import Settings from "./pages/app/Settings";
import Login from "./pages/home/Login";
import Signup from "./pages/home/Signup";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budgets" element={<Budgets />} />\
          <Route path="/savings" element={<Savings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
