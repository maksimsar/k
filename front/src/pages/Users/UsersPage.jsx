import { useEffect, useMemo, useState } from 'react';
import { getUsers, saveUsers, USER_GROUPS } from '../../services/usersService';
import Loader from '../../components/common/Loader';
import UsersToolbar from '../../components/users/UsersToolbar';
import UsersFilters from '../../components/users/UsersFilters';
import AddUserForm from '../../components/users/AddUserForm';
import UsersTable from '../../components/users/UsersTable';
import useDebounce from '../../hooks/useDebounce';
import './UsersPage.css';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [searchValue, setSearchValue] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortValue, setSortValue] = useState('name-asc');

  const debouncedSearch = useDebounce(searchValue, 350);

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
    const selectedGroupData = USER_GROUPS.find(
      (group) => group.id === formValues.groupId
    );

    const nextUser = {
      id: users.length ? Math.max(...users.map((user) => user.id)) + 1 : 1,
      fullName: formValues.fullName,
      email: formValues.email,
      position: formValues.position,
      department: selectedGroupData ? selectedGroupData.name : 'Без группы',
      groupId: selectedGroupData ? selectedGroupData.id : null,
      groupName: selectedGroupData ? selectedGroupData.name : null,
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

  const preparedUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    let nextUsers = [...users];

    if (normalizedSearch) {
      nextUsers = nextUsers.filter((user) => {
        const searchableText = [
          user.fullName,
          user.email,
          user.position,
          user.city,
          user.groupName || 'без группы'
        ]
          .join(' ')
          .toLowerCase();

        return searchableText.includes(normalizedSearch);
      });
    }

    if (selectedGroup === 'no-group') {
      nextUsers = nextUsers.filter((user) => !user.groupId);
    } else if (selectedGroup !== 'all') {
      nextUsers = nextUsers.filter((user) => user.groupId === selectedGroup);
    }

    if (selectedStatus !== 'all') {
      nextUsers = nextUsers.filter((user) => user.status === selectedStatus);
    }

    switch (sortValue) {
      case 'name-desc':
        nextUsers.sort((a, b) => b.fullName.localeCompare(a.fullName, 'ru'));
        break;

      case 'date-newest':
        nextUsers.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;

      case 'date-oldest':
        nextUsers.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;

      case 'name-asc':
      default:
        nextUsers.sort((a, b) => a.fullName.localeCompare(b.fullName, 'ru'));
        break;
    }

    return nextUsers;
  }, [users, debouncedSearch, selectedGroup, selectedStatus, sortValue]);

  return (
    <section className="base-page">
      <div className="page-head">
        <span className="page-badge">Users</span>
        <h1 className="page-title">Список пользователей</h1>
        <p className="page-description">
          Поиск работает через debounce, список мемоизирован через useMemo.
        </p>
      </div>

      <div className="users-page-content">
        <UsersToolbar
          totalCount={users.length}
          visibleCount={preparedUsers.length}
          isFormOpen={isFormOpen}
          onToggleForm={handleToggleForm}
        />

        <UsersFilters
          groups={USER_GROUPS}
          searchValue={searchValue}
          selectedGroup={selectedGroup}
          selectedStatus={selectedStatus}
          sortValue={sortValue}
          onSearchChange={setSearchValue}
          onGroupChange={setSelectedGroup}
          onStatusChange={setSelectedStatus}
          onSortChange={setSortValue}
        />

        <AddUserForm
          isOpen={isFormOpen}
          groups={USER_GROUPS}
          onSubmit={handleAddUser}
          onClose={handleCloseForm}
        />

        {isLoading && <Loader text="Загрузка пользователей..." />}

        {!isLoading && error && (
          <div className="users-state users-state--error">{error}</div>
        )}

        {!isLoading && !error && (
          <UsersTable users={preparedUsers} onDeleteUser={handleDeleteUser} />
        )}
      </div>
    </section>
  );
}

export default UsersPage;