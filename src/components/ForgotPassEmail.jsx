// src/pages/ForgotPassEmail.jsx
import React, { useRef, useState } from 'react'
import "../style.css"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'
import { api } from '../lib/api'

function ForgotPassEmail() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const submitBtn = useRef()

  const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email")
      return
    }

    try {
      setLoading(true)
      if (submitBtn.current) submitBtn.current.innerText = "Sending..."

      const { data } = await api.post(`/user/SendForgotPassEmail/${encodeURIComponent(email)}`)

      if (data?.success === false) {
        toast.error(data.msg || "Failed to send OTP")
        return
      }

      toast.success("An OTP has been sent to your email")
      navigate(`/forgotPassPage/${email}`)
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Failed to send OTP")
    } finally {
      setLoading(false)
      if (submitBtn.current) submitBtn.current.innerText = "Submit"
    }
  }

  return (
    <>
      <div className="cont w-[100%] flex flex-col items-center justify-center h-[100vh] fixed top-0 left-0 overflow-hidden polymorphism">
        <div className="mycont relative lg:w-[60%] md:w-[80%] w-[90%] polymorphism1 flex flex-col items-center justify-center gap-4 rounded-md h-[70%]">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="text-4xl font-bold mb-6 text-center text-white"
          >
            Reset Password
          </motion.h3>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="flex flex-col space-y-6 w-[90%]"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <div className="flex gap-6 flex-col md:flex-row">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
                required
              />
            </div>

            <motion.button
              ref={submitBtn}
              type="submit"
              disabled={loading}
              className="custom-button mx-auto w-fit py-4 bg-[#e87d0e] text-white font-bold rounded-lg transition-all duration-300 ease-in-out hover:bg-[#d68000]"
            >
              Submit
            </motion.button>
          </motion.form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassEmail