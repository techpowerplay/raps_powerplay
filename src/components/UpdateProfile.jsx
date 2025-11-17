// src/components/UpdateProfile.jsx
import React, { useContext, useEffect, useState } from 'react'
import "../style.css"
import { toast } from 'react-toastify'
import { motion, useAnimate } from "framer-motion"
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from "react-router-dom"
import { ImCross } from 'react-icons/im'
import { api } from '../lib/api'

function UpdateProfile() {
  const { user, setupdate, update } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formdata, setformdata] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  })

  const HandleChange = (e) => {
    const { name, value } = e.target
    setformdata((prev) => ({ ...prev, [name]: value }))
  }

  const HandleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.post(`/user/update_user/${user._id}`, formdata)
      setupdate(!update)
      toast.success("Updated successfully")
      navigate("/")
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || "Update failed")
    }
  }

  useEffect(() => {
    // placeholder for any init logic
  }, [])

  return (
    <>
      <div className="cont w-[100%] flex flex-col items-center justify-center h-[100vh] fixed top-0 left-0 overflow-hidden polymorphism">
        <div className="mycont relative lg:w-[60%] md:w-[80%] w-[90%] polymorphism1 flex flex-col items-center justify-center gap-4 rounded-md h-[70%]">
          <Link to={"/"} className='text-white'>
            <ImCross className='text-2xl absolute right-[20px] top-[20px] font-bold' />
          </Link>

          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="text-3xl font-bold mb-6 text-center text-white"
          >
            Update User
          </motion.h3>

          <motion.form
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
            className="flex flex-col space-y-6 w-[90%]"
            onSubmit={HandleSubmit}
            encType="multipart/form-data"
          >
            <div className="flex gap-6 flex-col md:flex-row">
              <input
                type="text"
                name="name"
                value={formdata.name}
                onChange={HandleChange}
                className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
                required
              />
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              <input
                type="email"
                name="email"
                value={formdata.email}
                onChange={HandleChange}
                className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
                required
              />
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              <input
                type="tel"
                name="phone"
                value={formdata.phone}
                onChange={HandleChange}
                className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
                required
              />
            </div>

            <div className="flex gap-6 flex-col md:flex-row">
              <input
                type="text"
                name="address"
                value={formdata.address}
                onChange={HandleChange}
                className="w-full p-4 bg-transparent border-2 border-solid border-gray-400 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#e87d0e] focus:border-[#e87d0e] transition-all duration-300 font-poppins font-semibold"
                required
              />
            </div>

            <motion.button
              type="submit"
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

export default UpdateProfile