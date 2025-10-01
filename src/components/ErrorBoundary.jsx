import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы показать запасной UI
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Можно логировать ошибку на сервер или в консоль
    console.error("Caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Запасной UI при ошибке
      return (
        <div className="text-center mt-5">
          <h2>Щось пішло не так 😢</h2>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }

    // Если ошибок нет — рендерим детей
    return this.props.children;
  }
}