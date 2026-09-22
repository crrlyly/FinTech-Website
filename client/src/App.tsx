import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/app/Dashboard";
function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
