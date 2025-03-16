import { PageLoading } from '@ui/utils/PageLoading';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

/* Code split pages */
const ListingsPage = lazy(async () => await import('./pages/ListingsPage'));
const ApiDocsPage = lazy(async () => await import('./pages/ApiDocsPage'));

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
      },
      {
        path: '/api-docs',
        element: (
          <Suspense fallback={<PageLoading />}>
            <ApiDocsPage />
          </Suspense>
        )
      }
    ],
    { basename: `${import.meta.env.BASE_URL}` }
  );
  return <RouterProvider router={router} />;
};

export default Router;
