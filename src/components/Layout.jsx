import { Routes, Route } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useEffect } from "react";
import Navbar from "./Navbar";
import TodoPage from "./TodoPage";
import AboutMe from "./AboutMe";
import Contacts from "./Contacts";
import "../App.css";

export default function Layout() {
  const { theme } = useTheme();

    useEffect(() => {
        document.body.className = theme === "light" ? "bg-light text-dark" : "bg-dark text-light"
    }, [theme]);

  // Классы для light/dark режима
  const layoutClass =
    theme === "light"
      ? "bg-light text-dark min-vh-100"   // фон светлый, текст тёмный
      : "bg-dark text-light min-vh-100";  // фон тёмный, текст светлый

  return (
    <div className={layoutClass}>
      <Navbar />
      <div className="container mt-4">
        {/* Routes */}
        <Routes>
          <Route index element={<TodoPage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contacts" element={<Contacts />} />
        </Routes>
      </div>
    </div>
  );
}