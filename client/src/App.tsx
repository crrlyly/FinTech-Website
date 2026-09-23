import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
import Transaction from "./pages/app/Transaction";
import Budgets from "./pages/app/Budgets";
import Settings from "./pages/app/Settings";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
