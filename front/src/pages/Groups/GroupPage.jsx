function GroupPage() {
  return (
    <section className="base-page">
      <div className="page-head">
        <span className="page-badge">Groups</span>
        <h1 className="page-title">Группы пользователей</h1>
        <p className="page-description">
            Вы можете просмотреть инормацию о нужной группе и перейти к списку пользователей внутри неё.
        </p>
      </div>

      <div className="groups-grid">
        <article className="group-card">
          <h2>Разработка</h2>
          <p>12 пользователей</p>
        </article>

        <article className="group-card">
          <h2>HR</h2>
          <p>5 пользователей</p>
        </article>

        <article className="group-card">
          <h2>Без группы</h2>
          <p>3 пользователя</p>
        </article>
      </div>
    </section>
  );
}

export default GroupPage;