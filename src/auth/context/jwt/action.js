import axios, { endpoints } from "src/utils/axios"
import { setSession, jwtDecode } from "./utils"

/** **************************************
 * Sign in
 *************************************** */
export const signInWithPassword = async ({ email, password }) => {
  try {
    const params = { email, password };

    // Include params in the request body
    const res = await axios.post("https://api.swedenrelocators.se/api/clientLogin", params);

    const { token } = res.data.data;
    if (!token) {
      throw new Error("Access token not found in response");
    }

    const decodedToken = jwtDecode(token);
    if (!decodedToken) {
      console.error("Failed to decode token:", token);
      throw new Error("Invalid token received from server");
    }

    localStorage.setItem("authToken", token);
    setSession(token);
    console.log("Login Token: ", token);
    return { ...decodedToken, accessToken: token };
  } catch (error) {
    console.error("Error during sign in:", error);
    throw error;
  }
};

/** **************************************
 * Sign up
 *************************************** */

// Helper function to get country identifier
const getCountryId = async (countryName) => {
  try {
    const response = await axios.get(`${endpoints.auth.country}/${countryName}`, {
      headers: {
        Accept: "application/json",
      },
    })

    if (response.data.data && response.data.data[0]) {
      return response.data.data[0].id
    }
    throw new Error(`Country not found: ${countryName}`)
  } catch (error) {
    console.error(`Error fetching country ID for ${countryName}:`, error)
    throw error
  }
}

export const signUp = async ({
  name,
  email,
  password,
  password_confirmation,
  dob,
  nationality,
  postal,
  place_of_birth,
  currently_residing,
  address,
  gender,
  city,
  contact_number,
  is_term_accepted,
}) => {
  try {
    // Get country IDs
    const nationalityId = await getCountryId(nationality)
    const placeOfBirthId = await getCountryId(place_of_birth)
    const currentlyResidingId = await getCountryId(currently_residing)

    console.log(gender);
    // Prepare the form data
    const formData = new FormData()
    formData.append("name", name)
    formData.append("email", email)
    formData.append("password", password)
    formData.append("password_confirmation", password_confirmation)
    formData.append("dob", dob)
    formData.append("place_of_birth", placeOfBirthId)
    formData.append("currently_residing", currentlyResidingId)
    formData.append("nationality", nationalityId)
    formData.append("address", address)
    formData.append("city", city)
    formData.append("postal_code", postal)
    formData.append("contact_number", contact_number)
    formData.append("is_term_accepted", is_term_accepted ? "1" : "0")
    console.log("Gender (before conversion):", gender)
    formData.append("gender_id", gender.toString())
    console.log("Gender (after conversion):", gender.toString())
    // Log form data for debugging
    console.log("Form Data:")
    ;[...formData.entries()].forEach(([key, value]) => {
      console.log(`${key}: ${value}`)
    })

    // Make the sign-up API call
    const res = await axios.post(endpoints.auth.signUp, formData, {
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
      },
    })

    return res.data
  } catch (error) {
    console.error("Error during sign-up:", error)
    if (error.response?.data) {
      throw error.response.data
    }
    throw error
  }
}

/** **************************************
 * Sign out
 *************************************** */
export const signOut = async () => {
  try {
    await setSession(null)
  } catch (error) {
    console.error("Error during sign out:", error)
    throw error
  }
}

