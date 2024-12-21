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
  // Helper function to get country identifier
  const getCountryId = async (country) => {
    try {
      const response = await axios.get(`${endpoints.auth.country}/${country}`, {
        headers: {
          Accept: 'application/json',
        },
      });

      console.log('GET COUNTRY RESPONSE: ', response.data.data[0]);
      return response.data.data[0].id; // Assuming the API returns an 'id' for the country
    } catch (error) {
      console.error(`Error fetching country ID for ${country}:`, error);
      throw new Error(`Unable to fetch country ID for ${country}`);
    }
  };

  try {
    // Fetch IDs for the necessary countries
    const nationalityId = await getCountryId(nationality);
    const placeOfBirthId = await getCountryId(placeOfBirth);
    const countryResidingId = await getCountryId(countryResiding);

    // Prepare the form data for multipart/form-data
    const formData = new FormData();
    formData.append('name', firstName);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('password_confirmation', passwordConfirmation);
    formData.append('dob', dateOfBirth);
    formData.append('place_of_birth', placeOfBirthId); // Use fetched ID
    formData.append('currently_residing', countryResidingId); // Use fetched ID
    formData.append('nationality', nationalityId); // Use fetched ID
    formData.append('address', address);
    formData.append('contact_number', contactNumber);

    // Log form data to console
    console.log('Form Data:');
    [...formData.entries()].forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });

    // Make the sign-up API call
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
    console.error('Error during sign-up:', error);
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
