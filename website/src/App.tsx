import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Financials from './pages/Financials';
import Segments from './pages/Segments';
import Ratios from './pages/Ratios';
import Benchmarking from './pages/Benchmarking';
import Report from './pages/Report';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/financials" element={<Financials />} />
          <Route path="/segments" element={<Segments />} />
          <Route path="/ratios" element={<Ratios />} />
          <Route path="/benchmarking" element={<Benchmarking />} />
          <Route path="/report" element={<Report />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
