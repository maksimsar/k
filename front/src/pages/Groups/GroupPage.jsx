import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Loader from '../../components/common/Loader';
import { getUsers, USER_GROUPS } from '../../services/usersService';
import './GroupPage.css';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35
    }
  }
};

function getInitials(fullName) {
  return fullName
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function getCitiesPreview(users) {
  return [...new Set(users.map((user) => user.city).filter(Boolean))].slice(0, 3);
}

function GroupPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadUsers() {
      try {
        setIsLoading(true);
        setError('');

        const data = await getUsers();

        if (isMounted) {
          setUsers(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Не удалось загрузить группы');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  const summary = useMemo(() => {
    const activeUsers = users.filter((user) => user.status === 'active').length;
    const inactiveUsers = users.length - activeUsers;
    const ungroupedUsers = users.filter((user) => !user.groupId).length;

    return {
      totalUsers: users.length,
      activeUsers,
      inactiveUsers,
      totalGroups: USER_GROUPS.length,
      ungroupedUsers
    };
  }, [users]);

  const groupsData = useMemo(() => {
    const sourceGroups = [...USER_GROUPS, { id: 'no-group', name: 'Без группы' }];

    return sourceGroups
      .map((group) => {
        const groupUsers =
          group.id === 'no-group'
            ? users.filter((user) => !user.groupId)
            : users.filter((user) => user.groupId === group.id);

        const activeCount = groupUsers.filter(
          (user) => user.status === 'active'
        ).length;

        const inactiveCount = groupUsers.length - activeCount;
        const citiesPreview = getCitiesPreview(groupUsers);
        const previewUsers = groupUsers.slice(0, 4);
        const occupancyPercent = users.length
          ? Math.round((groupUsers.length / users.length) * 100)
          : 0;

        return {
          ...group,
          totalCount: groupUsers.length,
          activeCount,
          inactiveCount,
          citiesPreview,
          previewUsers,
          occupancyPercent
        };
      })
      .sort((a, b) => b.totalCount - a.totalCount);
  }, [users]);

  return (
    <section className="groups-page">
      <div className="page-head">
        <span className="page-badge">Groups</span>
        <h1 className="page-title">Группы пользователей</h1>
        <p className="page-description">
          Здесь структура команд собирается автоматически из текущего списка
          пользователей.
        </p>
      </div>

      {isLoading && <Loader text="Формируем группы..." />}

      {!isLoading && error && (
        <div className="groups-state groups-state--error">{error}</div>
      )}

      {!isLoading && !error && (
        <>
          <motion.section
            className="groups-overview"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="groups-overview__main" variants={itemVariants}>
              <div className="groups-overview__glow" />

              <p className="groups-overview__eyebrow">Structure overview</p>
              <h2 className="groups-overview__title">
                Команды и состав пользователей в одном месте
              </h2>
              <p className="groups-overview__text">
                Эта страница динамически использует те же данные, что и список
                пользователей. Если добавить или удалить пользователя, состав
                групп изменится автоматически.
              </p>
            </motion.div>

            <motion.div
              className="groups-overview__stats"
              variants={containerVariants}
            >
              <motion.article className="groups-stat-card" variants={itemVariants}>
                <span className="groups-stat-card__value">{summary.totalUsers}</span>
                <span className="groups-stat-card__label">Пользователей</span>
              </motion.article>

              <motion.article className="groups-stat-card" variants={itemVariants}>
                <span className="groups-stat-card__value">{summary.totalGroups}</span>
                <span className="groups-stat-card__label">Групп</span>
              </motion.article>

              <motion.article className="groups-stat-card" variants={itemVariants}>
                <span className="groups-stat-card__value">{summary.activeUsers}</span>
                <span className="groups-stat-card__label">Active</span>
              </motion.article>

              <motion.article className="groups-stat-card" variants={itemVariants}>
                <span className="groups-stat-card__value">{summary.ungroupedUsers}</span>
                <span className="groups-stat-card__label">Без группы</span>
              </motion.article>
            </motion.div>
          </motion.section>

          <motion.section
            className="groups-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {groupsData.map((group) => (
              <motion.article
                key={group.id}
                className="group-card-advanced"
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="group-card-advanced__top">
                  <div>
                    <p className="group-card-advanced__caption">Group</p>
                    <h3 className="group-card-advanced__title">{group.name}</h3>
                  </div>

                  <div className="group-card-advanced__count">
                    {group.totalCount}
                  </div>
                </div>

                <div className="group-card-advanced__progress">
                  <div
                    className="group-card-advanced__progress-bar"
                    style={{ width: `${group.occupancyPercent}%` }}
                  />
                </div>

                <div className="group-card-advanced__meta">
                  <span>active: {group.activeCount}</span>
                  <span>inactive: {group.inactiveCount}</span>
                  <span>share: {group.occupancyPercent}%</span>
                </div>

                <div className="group-card-advanced__cities">
                  {group.citiesPreview.length ? (
                    group.citiesPreview.map((city) => (
                      <span key={city} className="group-city-chip">
                        {city}
                      </span>
                    ))
                  ) : (
                    <span className="group-city-chip group-city-chip--empty">
                      Нет городов
                    </span>
                  )}
                </div>

                <div className="group-card-advanced__users">
                  {group.previewUsers.length ? (
                    group.previewUsers.map((user) => (
                      <div key={user.id} className="group-user-row">
                        <div className="group-user-row__avatar">
                          {getInitials(user.fullName)}
                        </div>

                        <div className="group-user-row__info">
                          <span className="group-user-row__name">
                            {user.fullName}
                          </span>
                          <span className="group-user-row__position">
                            {user.position}
                          </span>
                        </div>

                        <span
                          className={
                            user.status === 'active'
                              ? 'group-user-row__status group-user-row__status--active'
                              : 'group-user-row__status group-user-row__status--inactive'
                          }
                        >
                          {user.status}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="group-empty-state">
                      В этой группе пока нет пользователей
                    </div>
                  )}
                </div>
              </motion.article>
            ))}
          </motion.section>
        </>
      )}
    </section>
  );
}

export default GroupPage;