import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import { Suspensed } from './components/ui';

const RootModule = lazy(() => import('./layouts/root-layout'));

function App() {
  const location = useLocation();

  useEffect(() => {
    if (window)
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
        left: 0,
      });
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/*"
        element={
          <Suspensed>
            <RootModule />
          </Suspensed>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
