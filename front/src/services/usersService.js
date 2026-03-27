const USERS_STORAGE_KEY = 'kaspersky-users';
const USERS_API_URL = '/api/users.json';
const LOADING_DELAY = 1200;

export const USER_GROUPS = [
  { id: 'management', name: 'Руководство' },
  { id: 'accounting', name: 'Бухгалтерия' },
  { id: 'hr', name: 'Отдел кадров' },
  { id: 'development', name: 'Разработка' },
  { id: 'analytics', name: 'Аналитика' },
  { id: 'support', name: 'Поддержка' },
  { id: 'design', name: 'Дизайн' }
];

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function readUsersFromStorage() {
  try {
    const rawUsers = localStorage.getItem(USERS_STORAGE_KEY);

    if (!rawUsers) {
      return null;
    }

    const parsedUsers = JSON.parse(rawUsers);

    return Array.isArray(parsedUsers) ? parsedUsers : null;
  } catch (error) {
    console.error('readUsersFromStorage error:', error);
    localStorage.removeItem(USERS_STORAGE_KEY);
    return null;
  }
}

export function saveUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

export async function getUsers() {
  try {
    const storedUsers = readUsersFromStorage();

    if (storedUsers) {
      await delay(LOADING_DELAY);
      return storedUsers;
    }

    const response = await fetch(USERS_API_URL);

    if (!response.ok) {
      throw new Error('Не удалось загрузить список пользователей');
    }

    const users = await response.json();

    await delay(LOADING_DELAY);
    saveUsers(users);

    return users;
  } catch (error) {
    console.error('getUsers error:', error);
    throw new Error('Не удалось загрузить список пользователей');
  }
}