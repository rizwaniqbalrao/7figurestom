import { lazy } from 'react';
import { RouteObject, Navigate } from 'react-router-dom';
import LanguageRouter from '../components/feature/LanguageRouter';

const HomePage = lazy(() => import('../pages/home/page'));
const ServicesPage = lazy(() => import('../pages/services/page'));
const CaseStudiesPage = lazy(() => import('../pages/case-studies/page'));
const ResourcesPage = lazy(() => import('../pages/resources/page'));
const AboutPage = lazy(() => import('../pages/about/page'));
const ContactPage = lazy(() => import('../pages/contact/page'));
const ShareProjectPage = lazy(() => import('../pages/share-project/page'));
const ThankYouPage = lazy(() => import('../pages/thank-you/page'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));
const ShopifyCROAgencyPage = lazy(() => import('../pages/shopify-cro-agency/page'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/:lang',
    element: <LanguageRouter />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'services',
        element: <ServicesPage />,
      },
      {
        path: 'case-studies',
        element: <CaseStudiesPage />,
      },
      {
        path: 'resources',
        element: <ResourcesPage />,
      },
      {
        path: 'about',
        element: <AboutPage />,
      },
      {
        path: 'contact',
        element: <ContactPage />,
      },
      {
        path: 'share-project',
        element: <ShareProjectPage />,
      },
      {
        path: 'thank-you',
        element: <ThankYouPage />,
      },
      {
        path: 'shopify-cro-agency',
        element: <ShopifyCROAgencyPage />,
      },
    ],
  },
  {
    path: '/crypto-listings',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/listing-intake',
    element: <Navigate to="/en" replace />,
  },
  {
    path: '/:lang/crypto-listings',
    element: <Navigate to="/:lang" replace />,
  },
  {
    path: '/:lang/listing-intake',
    element: <Navigate to="/:lang" replace />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;