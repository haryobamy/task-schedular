import { Route, Routes } from 'react-router-dom';
import { Suspensed } from '../components/ui';
import { lazy } from 'react';
import Footer from '../components/shared/footer';

const TaskModule = lazy(() => import('../page/Task'));

function Layout() {
  return (
    <div className="h-screen relative">
      <main className=" bg-gray-100 h-full py-6 overflow-y-auto ">
        <div className="container mx-auto xs:px-5 sm:px-5">
          <Routes>
            <Route
              path="/"
              element={
                <Suspensed>
                  <TaskModule />
                </Suspensed>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
