import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}