import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog'; // Replacing it with Lazy loading
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';
import { lazy, Suspense } from 'react';

const BlogPage = lazy(() => import('./pages/Blog')); // Lazy load BlogPage
const PostPage = lazy(() => import('./pages/Post')); // Lazy load PostPage

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element:<Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>, loader: () => import('./pages/Blog').then(module => module.loader()) },
          { path: ':id', element: <Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>, loader: ({ params }) => import('./pages/Post').then(module => module.loader({ params })) },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
