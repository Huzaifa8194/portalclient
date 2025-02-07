import { paths } from "src/routes/paths"
import axios from "src/utils/axios"
import { STORAGE_KEY } from "./constant"

export function jwtDecode(token) {
  try {
    if (!token) {
      console.error("No token provided")
      return null
    }

    console.log("Received token:", token)

    // Check if the token is in the format "id|token"
    const parts = token.split("|")
    if (parts.length === 2) {
      // If it's in the "id|token" format, return an object with id and token
      return {
        id: parts[0],
        token: parts[1],
      }
    }

    // If it's not in the "id|token" format, try to decode it as a JWT
    const jwtParts = token.split(".")
    if (jwtParts.length !== 3) {
      console.error("Invalid token format. Token parts:", jwtParts)
      return null
    }

    const base64Url = jwtParts[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    )

    const decoded = JSON.parse(jsonPayload)
    console.log("Decoded token:", decoded)
    return decoded
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export function isValidToken(accessToken) {
  if (!accessToken) {
    return false
  }

  const decoded = jwtDecode(accessToken)
  if (!decoded) {
    console.error("Invalid token structure:", decoded)
    return false
  }

  // If the token is in the "id|token" format, consider it valid
  if (decoded.id && decoded.token) {
    return true
  }

  // For JWT tokens, check the expiration
  if (decoded.exp) {
    const currentTime = Date.now() / 1000
    return decoded.exp > currentTime
  }

  return false
}

export function tokenExpired(exp) {
  if (!exp) return true

  const currentTime = Date.now() / 1000
  if (exp < currentTime) {
    console.log("Token expired")
    sessionStorage.removeItem(STORAGE_KEY)
    window.location.href = paths.auth.jwt.signIn
    return true
  }
  return false
}

export async function setSession(accessToken) {
  if (accessToken) {
    sessionStorage.setItem(STORAGE_KEY, accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`

    const decoded = jwtDecode(accessToken)
    if (decoded && decoded.exp) {
      tokenExpired(decoded.exp)
    }
  } else {
    sessionStorage.removeItem(STORAGE_KEY)
    delete axios.defaults.headers.common.Authorization
  }
}

