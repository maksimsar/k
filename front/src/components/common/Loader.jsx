function Loader() {
  return (
    <div className="loader-block" aria-live="polite" aria-busy="true">
      <div className="spinner" />
      <p className="loader-text">Загрузка пользователей...</p>
    </div>
  );
}

export default Loader;