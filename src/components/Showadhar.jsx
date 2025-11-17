// src/pages/Showadhar.jsx
import React, { useEffect, useMemo } from 'react'
import "../style.css"
import { useParams } from 'react-router-dom'
import { assetURL } from '../lib/api'

function Showadhar() {
  const { AdharImg } = useParams()

  const src = useMemo(() => {
    const raw = AdharImg ? decodeURIComponent(AdharImg) : ""
    return assetURL(raw)
  }, [AdharImg])

  useEffect(() => {
    // For debugging
    // console.log("AdharImg param:", AdharImg, " -> src:", src)
  }, [AdharImg, src])

  if (!src) {
    return (
      <div className="cont w-[100%] flex flex-col items-center justify-center h-[100vh] fixed top-0 left-0 overflow-hidden polymorphism">
        <div className="mycont relative lg:w-[60%] md:w-[80%] w-[90%] polymorphism1 flex flex-col items-center justify-center gap-4 rounded-md h-[70%] text-white">
          Aadhaar image not found.
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="cont w-[100%] flex flex-col items-center justify-center h-[100vh] fixed top-0 left-0 overflow-hidden polymorphism">
        <div className="mycont relative lg:w-[60%] md:w-[80%] w-[90%] polymorphism1 flex flex-col items-center justify-center gap-4 rounded-md h-[70%]">
          <img src={src} alt="Aadhaar" className="w-[100%] rounded-xl h-[100%] object-contain" />
        </div>
      </div>
    </>
  )
}

export default Showadhar