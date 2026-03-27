import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';

function AppLayout() {
  return (
    <div className="app-shell">
      <AppHeader />
      <main className="page-container">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;