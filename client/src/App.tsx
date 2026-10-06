import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./pages/app/Dashboard";
import Transaction from "./pages/app/Transaction";
import Budgets from "./pages/app/Budgets";
import Savings from "./pages/app/Savings";
import Settings from "./pages/app/Settings";
import Login from "./pages/home/Login";
import Signup from "./pages/home/Signup";

import AppLayout from "./components/app/AppLayout";
import Analytics from "./pages/app/Analytics";

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />

            {/* Logged in pages */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transaction />} />
              <Route path="/budgets" element={<Budgets />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/analytics" element={<Analytics />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
