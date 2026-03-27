import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function WelcomePage() {
  return (
    <section className="welcome-page">
      <div className="welcome-page__content">
        <span className="page-badge">Test Assignment</span>

        <h1 className="page-title">Users Management Demo</h1>

        <p className="page-description">
          Простое React-приложение для просмотра пользователей, работы со
          списком и навигации по группам.
        </p>

        <div className="welcome-page__actions">
          <Link to="/users" className="primary-button">
            Открыть пользователей
          </Link>

          <Link to="/groups" className="secondary-button">
            Открыть группы
          </Link>
        </div>
      </div>

      <div className="welcome-page__visual">
        <motion.div
          className="welcome-card"
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="welcome-card__glow"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
          <div className="welcome-card__content">
            <div className="welcome-card__row" />
            <div className="welcome-card__row welcome-card__row--short" />
            <div className="welcome-card__grid">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default WelcomePage;