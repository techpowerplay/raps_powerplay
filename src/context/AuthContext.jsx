// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react"
import { api } from "../lib/api"

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"))
  const [token, setToken] = useState(() => localStorage.getItem("token"))
  const [profile, setprofile] = useState(false)
  const [update, setupdate] = useState(false)

  // Apply/remove Authorization header on token change
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }
  }, [token])

  const login = (data) => {
    const t = data?.token
    const u = data?.user
    if (!t || !u) return
    setUser(u)
    setToken(t)
    localStorage.setItem("user", JSON.stringify(u))
    localStorage.setItem("token", t)
    api.defaults.headers.common["Authorization"] = `Bearer ${t}`
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    delete api.defaults.headers.common["Authorization"]
  }

  // Refresh /me on token or update change
  useEffect(() => {
    const fetchMe = async () => {
      if (!token) return
      try {
        const { data } = await api.get("/user/me")
        if (data?.ok && data?.user) {
          localStorage.setItem("user", JSON.stringify(data.user))
          setUser(data.user)
        }
      } catch (err) {
        // If token invalid/expired, logout
        if (err?.response?.status === 401) logout()
      }
    }
    fetchMe()
  }, [token, update])

  return (
    <AuthContext.Provider value={{ user, token, login, logout, profile, setprofile, setupdate, update }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)