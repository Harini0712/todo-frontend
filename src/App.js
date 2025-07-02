import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import TodoDashboard from "./pages/TodoDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<TodoDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
