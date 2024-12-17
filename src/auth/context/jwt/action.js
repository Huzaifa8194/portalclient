import axios, { endpoints } from 'src/utils/axios';

import { setSession } from './utils';
import { STORAGE_KEY } from './constant';

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    const res = await axios.post(endpoints.auth.signIn, params);

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    setSession(accessToken);
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */

export const signUp = async ({
  firstName,
  email,
  password,
  passwordConfirmation,
  dateOfBirth,
  nationality,
  placeOfBirth,
  countryResiding,
  address,
  contactNumber,
}) => {
  // Prepare the form data for multipart/form-data
  const formData = new FormData();
  formData.append('name', firstName);
  formData.append('email', email);
  formData.append('password', password);
  formData.append('password_confirmation', passwordConfirmation);
  formData.append('dob', dateOfBirth);
  formData.append('place_of_birth', placeOfBirth);
  formData.append('currently_residing', countryResiding);
  formData.append('nationality', nationality);
  formData.append('address', address);
  formData.append('contact_number', contactNumber);

  try {
    const res = await axios.post(`${endpoints.auth.signUp}`, formData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    });

    const { accessToken } = res.data;

    if (!accessToken) {
      throw new Error('Access token not found in response');
    }

    sessionStorage.setItem(STORAGE_KEY, accessToken);
  } catch (error) {
    console.error('Error during sign up:', error);

    throw error;
  }
};

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null);
  } catch (error) {
    console.error('Error during sign out:', error);
    throw error;
  }
};
