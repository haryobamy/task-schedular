import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ErrorBoundaryFallback } from './components/ui/error-boundary-fallback.tsx';
import { store } from './lib/redux/store.ts';
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/*"
      element={<App />}
      errorElement={<ErrorBoundaryFallback />}
    />
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />

    <Toaster position="top-center" reverseOrder={false} />
  </Provider>
);
