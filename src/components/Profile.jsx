// src/components/Profile.jsx
import React, { useRef, useContext } from 'react'
import { ImCross } from 'react-icons/im'
import { IoIosCamera } from 'react-icons/io'
import "../style.css"
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { api, assetURL } from '../lib/api'

function Profile({ userdp, setuserdp, profileimge }) {
  const navigate = useNavigate()
  const { profile, setprofile, logout, user } = useContext(AuthContext)

  const myimg = useRef()
  const inputfile = useRef()

  async function UpdateDP() {
    try {
      const file = inputfile.current?.files?.[0]
      if (!file) return

      // Local preview
      const objectUrl = URL.createObjectURL(file)
      if (myimg.current) myimg.current.src = objectUrl
      if (profileimge?.current) profileimge.current.src = objectUrl

      const formdata = new FormData()
      formdata.append("DP", file)

      const { data } = await api.post(`/user/update_user_dp/${user._id}`, formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      // Backend returns { success: true, DP: "Images/DP/filename" }
      if (data?.success && data.DP && typeof setuserdp === "function") {
        setuserdp(data.DP)
      }
    } catch (e) {
      console.warn("Update DP failed:", e?.response?.data?.message || e.message)
    }
  }

  const displayDp = userdp?.startsWith("http") ? userdp : assetURL(userdp || "")

  return (
    <>
      <div className="cont w-[370px] md:w-[400px] h-[400px] fixed flex flex-col items-center px-5 justify-start py-5 gap-2 top-[100px] right-[10px] md:right-[50px] z-30 border-3 rounded-md bg-transparent">
        <ImCross
          onClick={() => setprofile(false)}
          className="font-bold text-2xl cursor-pointer text-white absolute right-[10px] top-[10px]"
        />
        <div className="flex justify-center items-center w-[100%] h-[100%] bg-[#302C27]">
          <div className="bg-[#302C27] text-white shadow-lg rounded-2xl p-6 w-[100%] text-center">
            <form encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
              <img
                src={displayDp}
                alt="User"
                ref={myimg}
                className="w-[120px] relative user-img1 h-[120px] pxmx-auto rounded-full border-4 border-red-700 shadow-lg"
              />
              <label htmlFor="myfile">
                <IoIosCamera className="text-5xl z-40 absolute top-[128px] right-[148px]" />
              </label>
              <input
                type="file"
                ref={inputfile}
                onChange={UpdateDP}
                name="file"
                className="hidden"
                id="myfile"
                accept="image/*"
              />
            </form>

            <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
            <p className="text-sm">{user.email}</p>

            <div className="mt-6 flex flex-col gap-3">
              <Link
                to={"/updateprofile"}
                onClick={() => setprofile(false)}
                className="w-full no-underline bg-[#FA9021] text-white py-2 border-2 border-[#000] outline-none rounded-md hover:bg-[#cf781b] transition"
              >
                Update User
              </Link>
              <button
                onClick={() => {
                  logout()
                  navigate("/signup")
                  setprofile(false)
                }}
                className="w-full bg-red-500 text-white text-xl py-2 border-2 rounded-md shadow hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile