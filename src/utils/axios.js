import axios from 'axios';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: CONFIG.serverUrl });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong!')
);

export default axiosInstance;

// ----------------------------------------------------------------------

export const fetcher = async (args) => {
  try {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await axiosInstance.get(url, { ...config });

    return res.data;
  } catch (error) {
    console.error('Failed to fetch:', error);
    throw error;
  }
};

// ----------------------------------------------------------------------

export const endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  auth: {
    me: '/auth/me',
    signIn: '/clientLogin',
    signUp: '/clientRegistration',
    country: '/miscellaneous/countries',
  },
  supporting: {
    countries: '/miscellaneous/countries',
  },
  client: {
    editProfile: '/client/profile/edit',
    profile: '/client/profile',
  },
  management: {
    getCoApplicant:'/client/familyMember/list',
  },
  mail: {
    list: '/api/mail/list',
    details: '/api/mail/details',
    labels: '/api/mail/labels',
  },
  post: {
    list: '/api/post/list',
    details: '/api/post/details',
    latest: '/api/post/latest',
    search: '/api/post/search',
  },
  product: {
    list: '/api/product/list',
    details: '/api/product/details',
    search: '/api/product/search',
  },
  appointment: {
    book : '/appointment/book',
    timeslot : '/miscellaneous/appointmentTimeSlots',
    type : '/miscellaneous/appointmentTypes',
    categories :'/miscellaneous/appointmentCategories'
  },
  countries : {
    countrylist : '/miscellaneous/countries'
  },
  assessments : {
    familyreunification : '/assessment/familyReunification',
    businessVisa : '/assessment/businessVisa'
  }
};
