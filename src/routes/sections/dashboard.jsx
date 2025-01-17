import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

// Overview
const IndexPage = lazy(() => import('src/pages/dashboard'));
const OverviewEcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'));
const OverviewAnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'));
const OverviewBankingPage = lazy(() => import('src/pages/dashboard/banking'));
const OverviewBookingPage = lazy(() => import('src/pages/dashboard/booking'));
const OverviewFilePage = lazy(() => import('src/pages/dashboard/file'));
const OverviewCoursePage = lazy(() => import('src/pages/dashboard/course'));
// Product
const ProductDetailsPage = lazy(() => import('src/pages/dashboard/product/details'));
const ProductListPage = lazy(() => import('src/pages/dashboard/product/list'));
const ProductCreatePage = lazy(() => import('src/pages/dashboard/product/new'));
const ProductEditPage = lazy(() => import('src/pages/dashboard/product/edit'));

// Assessment
const AssessmentsPage = lazy(() => import('src/pages/dashboard/assessment/new'));
// Housing
const HousingPage = lazy(() => import('src/pages/dashboard/housing/list'));

// BusinessQeury

const BusinessQueryPage = lazy(() => import('src/pages/dashboard/post/new'));

// Entrepenaur

const Entrepenaur = lazy(() => import('src/pages/dashboard/entrepenaur/new'));

// Import Export Services

const ImportExportServices = lazy(() => import('src/pages/dashboard/importexport/new'));

// Investors

const Investors = lazy(() => import('src/pages/dashboard/investors/new'));





// Appointment Calender
const AppointmentCalendarPage = lazy(() => import('src/pages/dashboard/appointmentcalendar'));

// Appointment List

const AppointmentListPage = lazy(() => import('src/pages/dashboard/appointmentlist/list'));

// Order
const OrderListPage = lazy(() => import('src/pages/dashboard/order/list'));
const OrderDetailsPage = lazy(() => import('src/pages/dashboard/order/details'));
// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoice/list'));
const InvoiceDetailsPage = lazy(() => import('src/pages/dashboard/invoice/details'));
const InvoiceCreatePage = lazy(() => import('src/pages/dashboard/invoice/new'));
const InvoiceEditPage = lazy(() => import('src/pages/dashboard/invoice/edit'));
// User
const UserProfilePage = lazy(() => import('src/pages/dashboard/user/profile'));
const UserCardsPage = lazy(() => import('src/pages/dashboard/user/cards'));
const UserListPage = lazy(() => import('src/pages/dashboard/user/list'));
const UserAccountPage = lazy(() => import('src/pages/dashboard/user/account'));
const UserCreatePage = lazy(() => import('src/pages/dashboard/user/new'));
const UserEditPage = lazy(() => import('src/pages/dashboard/user/edit'));
// Blog
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
// Job
const JobDetailsPage = lazy(() => import('src/pages/dashboard/job/details'));
const JobListPage = lazy(() => import('src/pages/dashboard/job/list'));
const JobCreatePage = lazy(() => import('src/pages/dashboard/job/new'));
const JobEditPage = lazy(() => import('src/pages/dashboard/job/edit'));
// Tour
const TourDetailsPage = lazy(() => import('src/pages/dashboard/tour/details'));
const TourListPage = lazy(() => import('src/pages/dashboard/tour/list'));
const TourCreatePage = lazy(() => import('src/pages/dashboard/tour/new'));
const TourEditPage = lazy(() => import('src/pages/dashboard/tour/edit'));
// File manager
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'));
// App
const ChatPage = lazy(() => import('src/pages/dashboard/chat'));
const MailPage = lazy(() => import('src/pages/dashboard/mail'));
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'));
// Test render page by role
const PermissionDeniedPage = lazy(() => import('src/pages/dashboard/permission'));
// Blank page
const ParamsPage = lazy(() => import('src/pages/dashboard/params'));
const BlankPage = lazy(() => import('src/pages/dashboard/blank'));
const VisaPermitPage = lazy(() => import('src/pages/dashboard/VisaPermits/new'));
const ServiceCharges = lazy(() => import('src/pages/dashboard/ServiceCharges/new'));
const PowerOfAttorney = lazy(() => import('src/pages/dashboard/PowerOfAttorney/new'));
const PetRelocation = lazy(() => import('src/pages/dashboard/PetRelocation/new'));
const LogisticsSolution = lazy(() => import('src/pages/dashboard/LogisticsSolution/new'));
const MoneyManagement = lazy(() => import('src/pages/dashboard/MoneyManagement/new'));
const EOR = lazy(() => import('src/pages/dashboard/EOR/new'));
const PayrollServices = lazy(() => import('src/pages/dashboard/PayrollServices/new'));
const Lawyer = lazy(() => import('src/pages/dashboard/Lawyer/new'));
const Complaint = lazy(() => import('src/pages/dashboard/complaint/new'));
const Experience = lazy(() => import('src/pages/dashboard/experience/new'));
const Feedback= lazy(() => import('src/pages/dashboard/feedback/new'));
const Business= lazy(() => import('src/pages/dashboard/businessInquiry/list'));
const AuPair= lazy(() => import('src/pages/dashboard/AuPair/new'));
const HostFamily= lazy(() => import('src/pages/dashboard/HostFamily/new'));
const IamAuPair= lazy(() => import('src/pages/dashboard/IamAuPair/new'));
const EVisa= lazy(() => import('src/pages/dashboard/E-Visa/index'));
const EmbassyFile= lazy(() => import('src/pages/dashboard/EmbassyFiles/index'));
const GlobalVisa= lazy(() => import('src/pages/dashboard/GlobalVisa/index'));
const FAQ= lazy(() => import('src/pages/dashboard/faqs'));




// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'ecommerce', element: <OverviewEcommercePage /> },
      { path: 'analytics', element: <OverviewAnalyticsPage /> },
      { path: 'banking', element: <OverviewBankingPage /> },
      { path: 'booking', element: <OverviewBookingPage /> },
      { path: 'file', element: <OverviewFilePage /> },
      { path: 'course', element: <OverviewCoursePage /> },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          { path: 'coapplicant', element: <JobListPage /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <AppointmentListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          { path: 'account', element: <UserAccountPage /> },
        ],
      },


      {
        path: 'product',
        children: [
          { element: <ProductListPage />, index: true },
          { path: 'list', element: <ProductListPage /> },
          { path: ':id', element: <ProductDetailsPage /> },
          { path: 'new', element: <ProductCreatePage /> },
          { path: ':id/edit', element: <ProductEditPage /> },
        ],
      },
      {
        path: 'order',
        children: [
          { element: <OrderListPage />, index: true },
          { path: 'list', element: <OrderListPage /> },
          { path: ':id', element: <OrderDetailsPage /> },
        ],
      },
      {
        path: 'invoice',
        children: [
          { element: <InvoiceListPage />, index: true },
          { path: 'list', element: <InvoiceListPage /> },
          { path: ':id', element: <InvoiceDetailsPage /> },
          { path: ':id/edit', element: <InvoiceEditPage /> },
          { path: 'new', element: <InvoiceCreatePage /> },
        ],
      },
      {
        path: 'post',
        children: [
          { element: <BlogPostsPage />, index: true },
          { path: 'list', element: <BlogPostsPage /> },
          { path: ':title', element: <BlogPostPage /> },
          { path: ':title/edit', element: <BlogEditPostPage /> },
          { path: 'new', element: <BlogNewPostPage /> },
        ],
      },
      {
        path: 'job',
        children: [
          { element: <JobListPage />, index: true },
          { path: 'list', element: <JobListPage /> },
          { path: ':id', element: <JobDetailsPage /> },
          { path: 'new', element: <JobCreatePage /> },
          { path: ':id/edit', element: <JobEditPage /> },
        ],
      },
      {
        path: 'tour',
        children: [
          { element: <TourListPage />, index: true },
          { path: 'list', element: <TourListPage /> },
          { path: ':id', element: <TourDetailsPage /> },
          { path: 'new', element: <TourCreatePage /> },
          { path: ':id/edit', element: <TourEditPage /> },
        ],
      },
      { path: 'file-manager', element: <FileManagerPage /> },



      { path: 'assessments', element: <AssessmentsPage /> },

      { path: 'businessquery', element: <  BusinessQueryPage /> },

      { path: 'entrepenaur', element: < Entrepenaur /> },
      { path: 'importexport', element: < ImportExportServices /> },
      { path: 'investors', element: < Investors /> },

      { path: 'e-visa', element: < EVisa />},
      { path: 'embassy-files', element: < EmbassyFile />},
      { path: 'global-visa', element: < GlobalVisa />},

      { path: 'pet-relocation', element: < PetRelocation />},
      { path: 'service-charges', element: < ServiceCharges />},
      { path: 'power-of-attorney', element: < PowerOfAttorney />},
      { path: 'logistics-solution', element: < LogisticsSolution />},
      { path: 'money-management', element: < MoneyManagement />},
      { path: 'eor', element: < EOR />},
      { path: 'payroll-services', element: < PayrollServices />},
      { path: 'lawyers', element: < Lawyer />},
      { path: 'complaint', element: < Complaint />},
      { path: 'feedback', element: < Feedback />},
      { path: 'au-pair', element: < AuPair /> },
      { path: 'host-family', element: < HostFamily /> },
      { path: 'AuPair', element: < IamAuPair /> },
      { path: 'faq', element: < FAQ /> },
      { path: 'business-inquiry', element: < Business />},
      { path: 'experience', element: < Experience />},
      { path: 'housing', element: <HousingPage /> },
      { path: 'mail', element: <MailPage /> },
      { path: 'chat', element: <ChatPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'appointmentcalendar', element: <AppointmentCalendarPage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'permission', element: <PermissionDeniedPage /> },
      { path: 'params', element: <ParamsPage /> },
      { path: 'blank', element: <BlankPage /> },
    ],
  },
];
