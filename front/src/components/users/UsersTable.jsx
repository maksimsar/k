function UsersTable({ users, onDeleteUser }) {
  if (!users.length) {
    return (
      <div className="users-empty-state">
        <h3>Список пуст</h3>
        <p>Добавь первого пользователя через кнопку справа сверху.</p>
      </div>
    );
  }

  return (
    <section className="users-table-wrapper">
      <div className="users-table">
        <div className="users-table__row users-table__row--head">
          <div className="users-table__cell">ФИО</div>
          <div className="users-table__cell">Email</div>
          <div className="users-table__cell">Должность</div>
          <div className="users-table__cell">Группа</div>
          <div className="users-table__cell">Статус</div>
          <div className="users-table__cell">Действия</div>
        </div>

        {users.map((user) => (
          <div className="users-table__row" key={user.id}>
            <div className="users-table__cell" data-label="ФИО">
              {user.fullName}
            </div>

            <div className="users-table__cell" data-label="Email">
              {user.email}
            </div>

            <div className="users-table__cell" data-label="Должность">
              {user.position}
            </div>

            <div className="users-table__cell" data-label="Группа">
              {user.groupName || 'Без группы'}
            </div>

            <div className="users-table__cell" data-label="Статус">
              <span
                className={
                  user.status === 'active'
                    ? 'status-badge status-badge--active'
                    : 'status-badge status-badge--inactive'
                }
              >
                {user.status}
              </span>
            </div>

            <div
              className="users-table__cell users-table__cell--actions"
              data-label="Действия"
            >
              <button
                type="button"
                className="users-delete-button"
                onClick={() => onDeleteUser(user.id)}
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsersTable;