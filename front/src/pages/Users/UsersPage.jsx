function UsersPage() {
  return (
    <section className="base-page">
      <div className="page-head">
        <span className="page-badge">Users</span>
        <h1 className="page-title">Список пользователей</h1>
        <p className="page-description">
          Здесь будет таблица пользователей, поиск, сортировка и действия над
          записями.
        </p>
      </div>

      <div className="placeholder-card">
        <div className="placeholder-card__header">
          <h2>Базовая заготовка страницы</h2>
          <p>
          </p>
        </div>

        <div className="placeholder-table">
          <div className="placeholder-table__row placeholder-table__row--head">
            <span>ФИО</span>
            <span>Email</span>
            <span>Группа</span>
            <span>Статус</span>
          </div>

          <div className="placeholder-table__row">
            <span>Иван Петров</span>
            <span>ivan.petrov@company.ru</span>
            <span>Разработка</span>
            <span>Active</span>
          </div>

          <div className="placeholder-table__row">
            <span>Анна Смирнова</span>
            <span>anna.smirnova@company.ru</span>
            <span>HR</span>
            <span>Active</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UsersPage;