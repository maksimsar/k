function UsersFilters({
  groups,
  searchValue,
  selectedGroup,
  selectedStatus,
  sortValue,
  onSearchChange,
  onGroupChange,
  onStatusChange,
  onSortChange
}) {
  return (
    <section className="users-filters">
      <div className="users-filters__grid">
        <label className="users-filters__field users-filters__field--search">
          <span>Поиск</span>
          <input
            className="users-input"
            type="text"
            placeholder="Поиск по имени, email, должности"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
          />
        </label>

        <label className="users-filters__field">
          <span>Группа</span>
          <select
            className="users-select"
            value={selectedGroup}
            onChange={(event) => onGroupChange(event.target.value)}
          >
            <option value="all">Все группы</option>
            <option value="no-group">Без группы</option>

            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label className="users-filters__field">
          <span>Статус</span>
          <select
            className="users-select"
            value={selectedStatus}
            onChange={(event) => onStatusChange(event.target.value)}
          >
            <option value="all">Все статусы</option>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </label>

        <label className="users-filters__field">
          <span>Сортировка</span>
          <select
            className="users-select"
            value={sortValue}
            onChange={(event) => onSortChange(event.target.value)}
          >
            <option value="name-asc">Имя: А → Я</option>
            <option value="name-desc">Имя: Я → А</option>
            <option value="date-newest">Сначала новые</option>
            <option value="date-oldest">Сначала старые</option>
          </select>
        </label>
      </div>
    </section>
  );
}

export default UsersFilters;