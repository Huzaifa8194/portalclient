import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';
import { AppointmentSweden } from 'src/sections/overview/manageAppointment/view/ApplicationTable';
import { AppointmentGovernment } from 'src/sections/overview/manageAppointment/view/GovernmentAuthority';
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
const UserEditPage = lazy(() => import('src/pages/dashboard/HousingPage/edit'));
// Blog
const BlogPostsPage = lazy(() => import('src/pages/dashboard/post/list'));
const BlogPostPage = lazy(() => import('src/pages/dashboard/post/details'));
const BlogNewPostPage = lazy(() => import('src/pages/dashboard/post/new'));
const BlogEditPostPage = lazy(() => import('src/pages/dashboard/post/edit'));
const CoApplicant = lazy(() => import('src/pages/dashboard/coapplicant/list'));
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
const BusinessVisa= lazy(() => import('src/pages/dashboard/businessVisa/new'));
const FamilyReunification= lazy(() => import('src/pages/dashboard/familyReunification/new'));
const LongTermEU= lazy(() => import('src/pages/dashboard/LongTermEUStatus/new'));
const StudentVisa= lazy(() => import('src/pages/dashboard/StudentVisa/new'));
const VisitVisa= lazy(() => import('src/pages/dashboard/VisitVisa/new'));
const WorkPermit= lazy(() => import('src/pages/dashboard/WorkPermit/new'));
const ImmigrationEvisa= lazy(() => import('src/pages/dashboard/immigrationEvisa/index'));
const GlobalServiceVisa= lazy(() => import('src/pages/dashboard/globalServices/index'));
const ImmigrationEvisaInfo =lazy(() => import('src/pages/dashboard/ImmigrationEVisaInfo/index'));
const GlobalImmigrationEvisaInfo =lazy(() => import('src/pages/dashboard/globalInfo/index'));
const GlobalImmigrationEvisa =lazy(() => import('src/pages/dashboard/globalServices/index'));
const TermsAndCondition=lazy(() => import('src/pages/dashboard/TermsandConditons/new'));
const Reviews=lazy(() => import('src/pages/dashboard/Reviews/new'));
const HealthInsurance=lazy(() => import('src/pages/dashboard/HealthInsurance/index'));
const AssessmentList=lazy(() => import('src/pages/dashboard/AssessmentQuery/new'));
const ImmigrationEVisaList=lazy(() => import('src/pages/dashboard/immigrationEVisaList/new'));
const ImmigrationGlobalList=lazy(() => import('src/pages/dashboard/immigrationGlobalList/new'));
const HealthInsuranceList=lazy(() => import('src/pages/dashboard/HealthInsuranceList/new'));
const LawyersList=lazy(() => import('src/pages/dashboard/LawyerList/new'));
const AuPairList=lazy(() => import('src/pages/dashboard/AuPairList/new'));
const PetRelocationList=lazy(() => import('src/pages/dashboard/PetRelocationList/new'));
const LogisticsList=lazy(() => import('src/pages/dashboard/LogisticsSolutionList/new'));
const POAList=lazy(() => import('src/pages/dashboard/POAList/new'));

// const Government=lazy(() => import('src/sections/overview/analytics/view/'));

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
        path: 'profile',
        children: [
          { path: 'account', element: <UserAccountPage /> },
          { path: 'coapplicant', element: <CoApplicant /> },
          { path: ':id/edit', element: <JobEditPage /> },

        ],
      },
      {
        path: 'appointment',
        children: [
          { path: 'new', element: <BlogNewPostPage /> },
          { path: 'manage', element: <AppointmentListPage /> },


        ],
      },
      {
        path: 'user',
        children: [
          { element: <UserProfilePage />, index: true },
          // { path: 'coapplicant', element: <CoApplicant /> },
          { path: 'profile', element: <UserProfilePage /> },
          { path: 'cards', element: <UserCardsPage /> },
          { path: 'list', element: <AppointmentListPage /> },
          { path: 'new', element: <UserCreatePage /> },
          { path: ':id/edit', element: <UserEditPage /> },
          // { path: 'account', element: <UserAccountPage /> },
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
      { path: 'appointment-sweden-relocators', element: <AppointmentSweden /> },
      { path: 'appointment-government', element: <AppointmentGovernment /> },



      { path: 'assessments', element: <AssessmentsPage /> },
      { path: 'assessments-list', element: <AssessmentList /> },


      { path: 'businessquery', element: <  BusinessQueryPage /> },

      { path: 'entrepenaur', element: < Entrepenaur /> },
      { path: 'importexport', element: < ImportExportServices /> },
      { path: 'investors', element: < Investors /> },
      { path: 'terms-and-condition', element: < TermsAndCondition/>},

      { path: 'e-visa', element: < EVisa />},
      { path: 'embassy-files', element: < EmbassyFile />},
      { path: 'global-visa', element: < GlobalVisa />},
      { path: 'global-services', element: < GlobalServiceVisa />},
      { path: 'immigration-Evisa', element: < ImmigrationEvisa />},
      { path: 'immigration-Evisa-info', element: < ImmigrationEvisaInfo />},
      { path: 'immigration-Evisa-List', element: < ImmigrationEVisaList />},


      { path: 'immigration-global-Evisa', element: < GlobalImmigrationEvisa />},
      { path: 'immigration-global-Evisa-info', element: < GlobalImmigrationEvisaInfo />},
      { path: 'immigration-global-List', element: < ImmigrationGlobalList />},
      { path: 'health-insurance-list', element: < HealthInsuranceList />},
      { path: 'lawyers-list', element: < LawyersList />},
      { path: 'Au-Pair-List', element: < AuPairList />},
      { path: 'pet-relocation-List', element: < PetRelocationList />},
      { path: 'logistics-solution-List', element: < LogisticsSolution />},
      { path: 'POA-List', element: < POAList />},

      { path: 'business-visa', element: < BusinessVisa />},
      { path: 'student-visa', element: < StudentVisa />},
      { path: 'visit-visa', element: < VisitVisa />},
      { path: 'work-visa', element: < WorkPermit />},
      { path: 'reviews', element: < Reviews />},

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
      { path: 'family-reunification', element: < FamilyReunification /> },
      { path: 'long-term-eu-status', element: < LongTermEU /> },
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
      { path: 'health-insurance', element: <HealthInsurance /> },
    ],
  },
];
