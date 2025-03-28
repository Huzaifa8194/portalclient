import { paramCase } from 'src/utils/change-case';

import { _id, _postTitles } from 'src/_mock/assets';
import { Root } from 'yet-another-react-lightbox';

// ----------------------------------------------------------------------

const MOCK_ID = _id[1];

const MOCK_TITLE = _postTitles[2];

const ROOTS = {
  AUTH: '/auth',
  AUTH_DEMO: '/auth-demo',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  presignup: '/presignup',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/error/403',
  page404: '/error/404',
  page500: '/error/500',
  components: '/components',
  docs: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
  zoneStore: 'https://mui.com/store/items/zone-landing-page/',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  freeUI: 'https://mui.com/store/items/minimal-dashboard-free/',
  figmaUrl: 'https://www.figma.com/design/cAPz4pYPtQEXivqe11EcDE/%5BPreview%5D-Minimal-Web.v6.0.0',
  product: {
    root: `/product`,
    checkout: `/product/checkout`,
    details: (id) => `/product/${id}`,
    demo: { details: `/product/${MOCK_ID}` },
  },
  post: {
    root: `/post`,
    details: (title) => `/post/${paramCase(title)}`,
    demo: { details: `/post/${paramCase(MOCK_TITLE)}` },
  },
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in-options`,
      signInEmail: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
      signUpComany: `${ROOTS.AUTH}/jwt/sign-up-company`,
      signUpPartner: `${ROOTS.AUTH}/jwt/sign-up-partner`,
      signUpOptions: `${ROOTS.AUTH}/jwt/sign-up-options`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  authDemo: {
    split: {
      signIn: `${ROOTS.AUTH_DEMO}/split/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/split/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/split/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/split/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/split/verify`,
    },
    centered: {
      signIn: `${ROOTS.AUTH_DEMO}/centered/sign-in`,
      signUp: `${ROOTS.AUTH_DEMO}/centered/sign-up`,
      resetPassword: `${ROOTS.AUTH_DEMO}/centered/reset-password`,
      updatePassword: `${ROOTS.AUTH_DEMO}/centered/update-password`,
      verify: `${ROOTS.AUTH_DEMO}/centered/verify`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    mail: `${ROOTS.DASHBOARD}/mail`,
    chat: `${ROOTS.DASHBOARD}/chat`,
    blank: `${ROOTS.DASHBOARD}/blank`,
    assessment:{
      assessment: `${ROOTS.DASHBOARD}/assessments`,
      assessmentLists: `${ROOTS.DASHBOARD}/assessments-list `,
    },
    // assessment: `${ROOTS.DASHBOARD}/assessments`,
    housing: `${ROOTS.DASHBOARD}/housing`,
    kanban: `${ROOTS.DASHBOARD}/kanban`,
    calendar: `${ROOTS.DASHBOARD}/calendar`,
    fileManager: `${ROOTS.DASHBOARD}/file-manager`,
    permission: `${ROOTS.DASHBOARD}/permission`,
    serviceCharges: `${ROOTS.DASHBOARD}/service-charges`,
    powerOfAttorney: `${ROOTS.DASHBOARD}/power-of-attorney`,
    businessVisa: `${ROOTS.DASHBOARD}/business-visa`,
    familyReunification: `${ROOTS.DASHBOARD}/family-reunification`,
    longTermEuStatus: `${ROOTS.DASHBOARD}/long-term-eu-status`,
    studentVisa:`${ROOTS.DASHBOARD}/student-visa`,
    visitVisa:`${ROOTS.DASHBOARD}/visit-visa`,
    workPermit:`${ROOTS.DASHBOARD}/work-visa`,
    immigrationEvisa:`${ROOTS.DASHBOARD}/immigration-Evisa`,
    immigrationEvisaInfo:`${ROOTS.DASHBOARD}/immigration-Evisa-info`,
    immigrationEvisaList:`${ROOTS.DASHBOARD}/immigration-Evisa-List`,
    termsAndCondition: `${ROOTS.DASHBOARD}/terms-and-condition`,
    globalEvisa:`${ROOTS.DASHBOARD}/immigration-global-Evisa`,
    globalList:`${ROOTS.DASHBOARD}/immigration-global-List`,
    healthInsuranceList:`${ROOTS.DASHBOARD}/health-insurance-list`,
    lawyerList:`${ROOTS.DASHBOARD}/lawyers-list`,
    AuPairList:`${ROOTS.DASHBOARD}/Au-Pair-List`,
    PetRelocationList:`${ROOTS.DASHBOARD}/pet-relocation-List`,
    logisticsSolutionList:`${ROOTS.DASHBOARD}/logistics-solution-List`,
    POAList:`${ROOTS.DASHBOARD}/POA-List`,
    appointmentSweden:`${ROOTS.DASHBOARD}/appointment-sweden-relocators`,
    appointmentGovernment:`${ROOTS.DASHBOARD}/appointment-government`,
    globalEvisaInfo:`${ROOTS.DASHBOARD}/immigration-global-Evisa-info`,
    globalServices:`${ROOTS.DASHBOARD}/global-services`,
    petRelocation: `${ROOTS.DASHBOARD}/pet-relocation`,
    logisticsSolution: `${ROOTS.DASHBOARD}/logistics-solution`,
    moneyManagement: `${ROOTS.DASHBOARD}/money-management`,
    Assessment: `${ROOTS.DASHBOARD}/assessment`,
    EOR: `${ROOTS.DASHBOARD}/eor`,
    payrollServices: `${ROOTS.DASHBOARD}/payroll-services`,
    lawyers: `${ROOTS.DASHBOARD}/lawyers`,
    complaint: `${ROOTS.DASHBOARD}/complaint`,
    experience: `${ROOTS.DASHBOARD}/experience`,
    hostFamily: `${ROOTS.DASHBOARD}/host-family`,
    iAmAuPair: `${ROOTS.DASHBOARD}/AuPair`,
    reviews: `${ROOTS.DASHBOARD}/reviews`,
    healthInsurance: `${ROOTS.DASHBOARD}/health-insurance`,

    visaPermit:{
      eVisa: `${ROOTS.DASHBOARD}/e-visa`,
      embassyFiles: `${ROOTS.DASHBOARD}/embassy-files`,
      globalVisa: `${ROOTS.DASHBOARD}/global-visa`,

    },
    business: {
      entrepenaur: `${ROOTS.DASHBOARD}/entrepenaur`,
      importexport: `${ROOTS.DASHBOARD}/importexport`,
      investors: `${ROOTS.DASHBOARD}/investors`,
      businessInquiry : `${ROOTS.DASHBOARD}/business-inquiry`,
    },
    feedback: `${ROOTS.DASHBOARD}/feedback`,
    auPair:`${ROOTS.DASHBOARD}/au-pair`,
    faq:`${ROOTS.DASHBOARD}/faq`,

    general: {
      app: `${ROOTS.DASHBOARD}/app`,
      ecommerce: `${ROOTS.DASHBOARD}/ecommerce`,
      analytics: `${ROOTS.DASHBOARD}/analytics`,
      banking: `${ROOTS.DASHBOARD}/banking`,
      booking: `${ROOTS.DASHBOARD}/booking`,
      file: `${ROOTS.DASHBOARD}/file`,
      course: `${ROOTS.DASHBOARD}/course`,
    },
    profile:{
      account: `${ROOTS.DASHBOARD}/profile/account`,
      coapplicant: `${ROOTS.DASHBOARD}/profile/coapplicant`,
      editCoapplicant: (id) => `${ROOTS.DASHBOARD}/profile/${id}/edit`,
    },

    appointment:{
      bookAppointment:`${ROOTS.DASHBOARD}/appointment/new`,
      manageAppointment: `${ROOTS.DASHBOARD}/appointment/manage`,
    },
    user: {
      root: `${ROOTS.DASHBOARD}/user`,
      new: `${ROOTS.DASHBOARD}/user/new`,
      list: `${ROOTS.DASHBOARD}/user/list`,
      cards: `${ROOTS.DASHBOARD}/user/cards`,
      profile: `${ROOTS.DASHBOARD}/user/profile`,
      // account: `${ROOTS.DASHBOARD}/user/account`,
      // coapplicant: `${ROOTS.DASHBOARD}/user/coapplicant`,
      edit: (id) => `${ROOTS.DASHBOARD}/user/${id}/edit`,
      demo: {
        edit: `${ROOTS.DASHBOARD}/user/${MOCK_ID}/edit`,
      },
    },
    product: {
      root: `${ROOTS.DASHBOARD}/product`,
      new: `${ROOTS.DASHBOARD}/product/new`,
      details: (id) => `${ROOTS.DASHBOARD}/product/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/product/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/product/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/product/${MOCK_ID}/edit`,
      },
    },
    invoice: {
      root: `${ROOTS.DASHBOARD}/invoice`,
      new: `${ROOTS.DASHBOARD}/invoice/new`,
      details: (id) => `${ROOTS.DASHBOARD}/invoice/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/invoice/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/invoice/${MOCK_ID}/edit`,
      },
    },
    post: {
      root: `${ROOTS.DASHBOARD}/post`,
      new: `${ROOTS.DASHBOARD}/post/new`,
      details: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}`,
      edit: (title) => `${ROOTS.DASHBOARD}/post/${paramCase(title)}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}`,
        edit: `${ROOTS.DASHBOARD}/post/${paramCase(MOCK_TITLE)}/edit`,
      },
    },
    order: {
      root: `${ROOTS.DASHBOARD}/order`,
      details: (id) => `${ROOTS.DASHBOARD}/order/${id}`,
      demo: {
        details: `${ROOTS.DASHBOARD}/order/${MOCK_ID}`,
      },
    },
    job: {
      root: `${ROOTS.DASHBOARD}/job`,
      new: `${ROOTS.DASHBOARD}/job/new`,
      details: (id) => `${ROOTS.DASHBOARD}/job/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/job/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/job/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/job/${MOCK_ID}/edit`,
      },
    },
    tour: {
      root: `${ROOTS.DASHBOARD}/tour`,
      new: `${ROOTS.DASHBOARD}/tour/new`,
      details: (id) => `${ROOTS.DASHBOARD}/tour/${id}`,
      edit: (id) => `${ROOTS.DASHBOARD}/tour/${id}/edit`,
      demo: {
        details: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}`,
        edit: `${ROOTS.DASHBOARD}/tour/${MOCK_ID}/edit`,
      },
    },
  },
};
