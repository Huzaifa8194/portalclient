import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  /* Management
  */
//  {
//    subheader: 'Management',
//    items: [

//      {
//        title: 'Profile',
//        path: paths.dashboard.user.root,
//        icon: ICONS.user,
//        children: [
//          { title: 'Profile', path: paths.dashboard.user.account },
//          { title: 'Co-Applicant', path: paths.dashboard.job.root },


//        ],
//      },
//      {
//       title: 'Appointment',
//       path: paths.dashboard.post.root,
//       icon: ICONS.blog,
//       children: [


//         { title: 'Book An Appointment', path: paths.dashboard.post.new },
//         { title: 'Manage Appointments', path: paths.dashboard.user.list },
//       ],
//     },
//     {
//       title: 'Documents',
//       path: paths.dashboard.order.root,
//       icon: ICONS.order,
//       children: [
//         { title: 'All Documents', path: paths.dashboard.order.root },
//         { title: 'Upload Documents', path: paths.dashboard.product.new },
//       ],
//     },
//     { title: 'Invoices (Faktura)', path: paths.dashboard.invoice.root, icon: ICONS.order },

//      { title: 'Messages', path: paths.dashboard.chat, icon: ICONS.chat },
//      { title: 'Application Status', path: paths.dashboard.general.analytics, icon: ICONS.calendar },



//      { title: 'Assessments', path: paths.dashboard.assessment, icon: ICONS.calendar },
//      { title: 'Lawyers', path: paths.dashboard.lawyers, icon: ICONS.calendar },

//    ],
//  },
  {
   subheader: 'Management',
   items: [

     {
       title: 'Profile',
       path: paths.dashboard.user.root,
       icon: ICONS.user,
       children: [
         { title: 'Profile', path: paths.dashboard.user.account },
         { title: 'Co-Applicant', path: paths.dashboard.job.root },


       ],
     },
     {
      title: 'Appointment',
      path: paths.dashboard.post.root,
      icon: ICONS.blog,
      children: [


        { title: 'Book An Appointment', path: paths.dashboard.post.new },
        { title: 'Manage Appointments', path: paths.dashboard.user.list },
      ],
    },
    {
      title: 'Documents',
      path: paths.dashboard.order.root,
      icon: ICONS.order,
      children: [
        { title: 'All Documents', path: paths.dashboard.order.root },
        { title: 'Upload Documents', path: paths.dashboard.product.new },
      ],
    },
    { title: 'Invoices (Faktura)', path: paths.dashboard.invoice.root, icon: ICONS.order },

     { title: 'Messages', path: paths.dashboard.chat, icon: ICONS.chat },
     { title: 'Application Status', path: paths.dashboard.general.analytics, icon: ICONS.calendar },
     { title: 'Service Charges', path: paths.dashboard.serviceCharges, icon: ICONS.calendar },

   ],
 },
 {
  subheader: 'Immigration Services',
  items: [

    { title: 'Assessments', path: paths.dashboard.assessment, icon: ICONS.calendar },
    {
      title: 'E-Visa',
      path: paths.dashboard.user.root,
      icon: ICONS.user,
      children: [
        { title: 'Apply Now', path: paths.dashboard.immigrationEvisa },
        { title: 'Before you apply', path: paths.dashboard.immigrationEvisaInfo },


      ],
    },
    {
     title: 'Global Visa',
     path: paths.dashboard.post.root,
     icon: ICONS.blog,
     children: [


       { title: 'Apply Now', path: paths.dashboard.globalEvisa },
       { title: 'Before you apply ', path: paths.dashboard.globalEvisaInfo },
       { title: 'Embassy Files', path: paths.dashboard.visaPermit.embassyFiles },


     ],
   },
   { title: 'Health Insurance', path: paths.dashboard.healthInsurance, icon: ICONS.calendar },

    { title: 'Lawyers', path: paths.dashboard.lawyers, icon: ICONS.calendar },
    { title: 'Au Pair', path:paths.dashboard.auPair, icon: ICONS.calendar },


  ],
},
  /**
   * Overview
   */
  {
    subheader: 'Relocation Services',
    items: [
    
      { title: 'Housing', path: paths.dashboard.housing, icon: ICONS.tour },


      {
        title: 'Business',
        path: paths.dashboard.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Entrepenaur', path: paths.dashboard.business.entrepenaur },
          { title: 'Import-Export Services', path: paths.dashboard.business.importexport },
          { title: 'Investors', path: paths.dashboard.business.investors },
          { title: 'Business Inquiry', path: paths.dashboard.business.businessInquiry},

 
 
        ],
      },
      { title: 'Money Management', path: paths.dashboard.moneyManagement, icon: ICONS.calendar },

      { title: 'Pet Relocation', path: paths.dashboard.petRelocation, icon: ICONS.calendar },
      { title: 'Logistics Solution', path: paths.dashboard.logisticsSolution, icon: ICONS.calendar },
      { title: 'Payroll Services', path: paths.dashboard.payrollServices, icon: ICONS.calendar },
      { title: 'EOR', path: paths.dashboard.EOR, icon: ICONS.calendar },

    ],
  },
  /**
  
  /**
   * Item State
   */

  {
    subheader: 'Support & Agreements',
    items: [
      // {
      //   title: 'Visa & Permits',
      //   path: paths.dashboard.user.root,
      //   icon: ICONS.user,
      //   children: [
      //     { title: 'E-Visa', path: paths.dashboard.visaPermit.eVisa },
      //     { title: 'Embassy Files', path: paths.dashboard.visaPermit.embassyFiles },
      //     { title: 'Global Visa', path: paths.dashboard.visaPermit.globalVisa },

 
 
      //   ],
      // },      
      { title: 'Power of Attorney', path: paths.dashboard.powerOfAttorney, icon: ICONS.calendar },
 

      { title: 'Terms & Conditions', path: paths.dashboard.termsAndCondition, icon: ICONS.calendar },
      { title: 'FAQ', path:paths.dashboard.faq, icon: ICONS.calendar },
      { title: 'Feedback', path: paths.dashboard.feedback, icon: ICONS.calendar },
      { title: 'Reviews', path: paths.dashboard.reviews, icon: ICONS.calendar },
      // { title: 'tour', path: paths.dashboard.tour.root, icon: ICONS.calendar },

    ],
  },
];
