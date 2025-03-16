import { PageLoading } from '@ui/utils/PageLoading';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

/* Code split listings page */
const ListingsPage = lazy(async () => await import('./pages/ListingsPage'));

const Router = () => {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/listings',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ListingsPage />
          </Suspense>
        )
      }
    ],
    { basename: `${import.meta.env.BASE_URL}` }
  );
  return <RouterProvider router={router} />;
};

export default Router;
