import { useEffect, useState } from 'react';
import { getUsers, saveUsers, USER_GROUPS } from '../../services/usersService';
import Loader from '../../components/common/Loader';
import UsersToolbar from '../../components/users/UsersToolbar';
import AddUserForm from '../../components/users/AddUserForm';
import UsersTable from '../../components/users/UsersTable';
import './UsersPage.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

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
          setError(err.message || 'Произошла ошибка при загрузке');
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

  function handleToggleForm() {
    setIsFormOpen((prevState) => !prevState);
  }

  function handleCloseForm() {
    setIsFormOpen(false);
  }

  function handleAddUser(formValues) {
    const selectedGroup = USER_GROUPS.find(
      (group) => group.id === formValues.groupId
    );

    const nextUser = {
      id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      fullName: formValues.fullName,
      email: formValues.email,
      position: formValues.position,
      department: selectedGroup ? selectedGroup.name : 'Без группы',
      groupId: selectedGroup ? selectedGroup.id : null,
      groupName: selectedGroup ? selectedGroup.name : null,
      status: formValues.status,
      city: formValues.city || 'Москва',
      createdAt: new Date().toISOString().slice(0, 10)
    };

    const nextUsers = [nextUser, ...users];

    setUsers(nextUsers);
    saveUsers(nextUsers);
    setIsFormOpen(false);
  }

  function handleDeleteUser(userId) {
    const nextUsers = users.filter((user) => user.id !== userId);

    setUsers(nextUsers);
    saveUsers(nextUsers);
  }

  return (
    <section className="base-page">
      <div className="page-head">
        <span className="page-badge">Users</span>
        <h1 className="page-title">Список пользователей</h1>
        <p className="page-description">
          Список загружается через fetch из JSON. Добавление и удаление работают
          локально с сохранением в localStorage.
        </p>
      </div>

      <div className="users-page-content">
        <UsersToolbar
          count={users.length}
          isFormOpen={isFormOpen}
          onToggleForm={handleToggleForm}
        />

        <AddUserForm
          isOpen={isFormOpen}
          groups={USER_GROUPS}
          onSubmit={handleAddUser}
          onClose={handleCloseForm}
        />

        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="users-state users-state--error">{error}</div>
        )}

        {!isLoading && !error && (
          <UsersTable users={users} onDeleteUser={handleDeleteUser} />
        )}
      </div>
    </section>
  );
}

export default UsersPage;