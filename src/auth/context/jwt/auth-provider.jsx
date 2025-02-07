import { useMemo, useEffect, useCallback } from "react"
import { useSetState } from "src/hooks/use-set-state"
import { useNavigate, useLocation } from "react-router-dom"
import { paths } from "src/routes/paths"
import { STORAGE_KEY } from "./constant"
import { AuthContext } from "../auth-context"
import { setSession, isValidToken, jwtDecode } from "./utils"

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const { state, setState } = useSetState({
    user: null,
    loading: true,
  })

  const checkUserSession = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY)
      // console.log("Stored access token:", accessToken)

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)

        const decoded = jwtDecode(accessToken)
        if (decoded) {
          setState({
            user: {
              ...decoded,
              accessToken,
              role: decoded.role || "admin",
            },
            loading: false,
          })

          // Only navigate to dashboard if we're on the login page or root
          if (location.pathname === paths.auth.jwt.signIn || location.pathname === "/") {
            navigate(paths.dashboard.root, { replace: true })
          }
        } else {
          console.error("Failed to decode token")
          setSession(null)
          setState({ user: null, loading: false })
        }
      } else {
        // console.log("No valid token found, clearing session")
        setSession(null)
        setState({ user: null, loading: false })
      }
    } catch (error) {
      console.error("Error in checkUserSession:", error)
      setState({ user: null, loading: false })
    }
  }, [setState, navigate, location.pathname])

  useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  const login = useCallback(
    async (accessToken) => {
      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken)
        const decoded = jwtDecode(accessToken)
        if (decoded) {
          setState({
            user: {
              ...decoded,
              accessToken,
              role: decoded.role || "admin",
            },
            loading: false,
          })
          navigate(paths.dashboard.root, { replace: true })
        } else {
          console.error("Failed to decode token")
          throw new Error("Invalid token")
        }
      } else {
        throw new Error("Invalid access token")
      }
    },
    [setState, navigate],
  )

  const logout = useCallback(() => {
    setSession(null)
    setState({ user: null, loading: false })
    navigate(paths.auth.jwt.signIn, { replace: true })
  }, [setState, navigate])

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      login,
      logout,
      checkUserSession,
      loading: state.loading,
      authenticated: !!state.user,
      unauthenticated: !state.user && !state.loading,
    }),
    [state.user, state.loading, login, logout, checkUserSession],
  )

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>
}

