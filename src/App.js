import "./App.css";
import AdminLogin from "./Pages/Admin/AdminLogin";
import UserForm from "./Pages/Client/UserForm";
import Dashboard from "./Pages/Admin/Dashboard";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage";
import Finish from "./Pages/Client/Finish";

function App() {
    return (
        <Routes>
            <Route path="/" element={<UserForm />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/finish" element={<Finish />} />
        </Routes>
    );
}

export default App;
