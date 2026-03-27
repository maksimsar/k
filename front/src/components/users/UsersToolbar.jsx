function UsersToolbar({
  totalCount,
  visibleCount,
  isFormOpen,
  onToggleForm
}) {
  return (
    <div className="users-toolbar">
      <div className="users-toolbar__text">
        <h2 className="users-toolbar__title">Управление пользователями</h2>
        <p className="users-toolbar__subtitle">
          Показано: <strong>{visibleCount}</strong> из{' '}
          <strong>{totalCount}</strong>
        </p>
      </div>

      <button
        type="button"
        className="users-add-button"
        onClick={onToggleForm}
      >
        {isFormOpen ? 'Скрыть форму' : 'Добавить пользователя'}
      </button>
    </div>
  );
}

export default UsersToolbar;