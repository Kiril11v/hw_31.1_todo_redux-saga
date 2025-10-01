import React from "react";
import { useTheme } from "../contexts/ThemeContext";

export default function Contacts() {
  const { theme } = useTheme();

  const containerClass =
    theme === "light"
      ? "container py-5 text-dark"
      : "container py-5 text-light";

  const cardClass =
    theme === "light"
      ? "card mb-3 shadow-sm"
      : "card mb-3 shadow-sm bg-secondary text-light";

  return (
    <div className={containerClass}>
      <h2 className="mb-4 text-center">Контакти</h2>

      {/* Контактная информация */}
      <div className={cardClass}>
        <div className="card-body">
          <h5 className="card-title">Email</h5>
          <p className="card-text">your.email@example.com</p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="card-body">
          <h5 className="card-title">Телефон</h5>
          <p className="card-text">+38 012 345 6789</p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="card-body">
          <h5 className="card-title">Адрес</h5>
          <p className="card-text">Місто, Вулиця, Будинок</p>
        </div>
      </div>

      <div className={cardClass}>
        <div className="card-body">
          <h5 className="card-title">Соцмережі</h5>
          <p className="card-text">
            LinkedIn: <a href="#">your-linkedin</a> <br />
            GitHub: <a href="#">your-github</a> <br />
            Instagram: <a href="#">your-instagram</a>
          </p>
        </div>
      </div>
    </div>
  );
}
