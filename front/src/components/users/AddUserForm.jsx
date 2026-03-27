import { useEffect, useState } from 'react';

const initialFormState = {
  fullName: '',
  email: '',
  position: '',
  city: '',
  groupId: '',
  status: 'active'
};

function AddUserForm({ isOpen, groups, onSubmit, onClose }) {
  const [formValues, setFormValues] = useState(initialFormState);

  useEffect(() => {
    if (!isOpen) {
      setFormValues(initialFormState);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const preparedValues = {
      fullName: formValues.fullName.trim(),
      email: formValues.email.trim().toLowerCase(),
      position: formValues.position.trim(),
      city: formValues.city.trim(),
      groupId: formValues.groupId,
      status: formValues.status
    };

    if (!preparedValues.fullName || !preparedValues.email || !preparedValues.position) {
      return;
    }

    onSubmit(preparedValues);
    setFormValues(initialFormState);
  }

  return (
    <section className="users-form-card">
      <div className="users-form-card__head">
        <h3 className="users-form-card__title">Добавить пользователя</h3>
        <p className="users-form-card__text">
          Простая форма добавления нового пользователя в локальный список.
        </p>
      </div>

      <form className="users-form" onSubmit={handleSubmit}>
        <label className="users-form__field">
          <span>ФИО</span>
          <input
            className="users-input"
            type="text"
            name="fullName"
            placeholder="Например, Алексей Иванов"
            value={formValues.fullName}
            onChange={handleChange}
            required
          />
        </label>

        <label className="users-form__field">
          <span>Email</span>
          <input
            className="users-input"
            type="email"
            name="email"
            placeholder="name@company.ru"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </label>

        <label className="users-form__field">
          <span>Должность</span>
          <input
            className="users-input"
            type="text"
            name="position"
            placeholder="Frontend Developer"
            value={formValues.position}
            onChange={handleChange}
            required
          />
        </label>

        <label className="users-form__field">
          <span>Город</span>
          <input
            className="users-input"
            type="text"
            name="city"
            placeholder="Москва"
            value={formValues.city}
            onChange={handleChange}
          />
        </label>

        <label className="users-form__field">
          <span>Группа</span>
          <select
            className="users-select"
            name="groupId"
            value={formValues.groupId}
            onChange={handleChange}
          >
            <option value="">Без группы</option>

            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>

        <label className="users-form__field">
          <span>Статус</span>
          <select
            className="users-select"
            name="status"
            value={formValues.status}
            onChange={handleChange}
          >
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </label>

        <div className="users-form__actions">
          <button type="submit" className="users-submit-button">
            Сохранить
          </button>

          <button
            type="button"
            className="users-cancel-button"
            onClick={onClose}
          >
            Отмена
          </button>
        </div>
      </form>
    </section>
  );
}

export default AddUserForm;