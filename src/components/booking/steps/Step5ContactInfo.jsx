import { useRef } from "react"
import { FaIdCard } from "react-icons/fa"

export default function Step5ContactInfo({ contactInfo, onChangeContact,  AdharImg,
  setAdharImg,
 }) {
  let filelabel=useRef()

  return (
    <div className="card" data-aos="fade-right" data-aos-delay="500">
      <div className="card-header">
        <div className="card-title">
          <div className="title-icon contact">📝</div>
          Contact Information
          {contactInfo.name && contactInfo.email && <span className="sparkle">✨</span>}
        </div>
        <p className="card-subtitle">We need your details for delivery and communication</p>
      </div>
      <div className="card-content">
        <div className="contact-form">
          <div className="contact-grid">
            <div className="input-group" data-aos="fade-up" data-aos-delay="100">
              <label className="input-label"><span className="label-icon"></span>Full Name *</label>
              <input type="text" value={contactInfo.name} onChange={(e)=>onChangeContact("name", e.target.value)} placeholder="Enter your full name" className="contact-input" required />
            </div>

            <div className="input-group" data-aos="fade-up" data-aos-delay="200">
              <label className="input-label"><span className="label-icon"></span>Email Address *</label>
              <input type="email" value={contactInfo.email} onChange={(e)=>onChangeContact("email", e.target.value)} placeholder="Enter your email address" className="contact-input" required />
            </div>

            <div className="input-group" data-aos="fade-up" data-aos-delay="300">
              <label className="input-label"><span className="label-icon"></span>Phone Number *</label>
              <input type="tel" value={contactInfo.phone} onChange={(e)=>onChangeContact("phone", e.target.value)} placeholder="Enter your phone number" className="contact-input" required />
            </div>
            <div className="input-group" data-aos="fade-up" data-aos-delay="300">
              <label className="input-label"><span className="label-icon"></span>Upload Adhar *</label>
              <input type="file"  onChange={(e)=>{
                //  filelabel.current.innerText=String(e.target.files[0].name).length>20?String(e.target.files[0].name).slice(0,20)+"...":String(e.target.files[0].name)
            // HandleAdharUpload(e.target.name,e.target.files[0])
            setAdharImg(e.target.files[0])
              }} placeholder="Enter your phone number" className="contact-input" required />
            </div>
            {/* <div className="input-group" data-aos="fade-up" data-aos-delay="300">

          <label htmlFor="file" ref={filelabel} className="input-label bg-black/30  flex items-center justify-center">
            <FaIdCard className="text-2xl"/>Upload AdharCard</label>
          <input type="file" name="AdharImg" onChange={(e)=>{
            filelabel.current.innerText=String(e.target.files[0].name).length>20?String(e.target.files[0].name).slice(0,20)+"...":String(e.target.files[0].name)
            // HandleAdharUpload(e.target.name,e.target.files[0])
            setAdharImg(e.target.files[0])
          }}  id="file" className="hidden" />
          
          </div> */}
    
            <div className="input-group full-width" data-aos="fade-up" data-aos-delay="400">
              <label className="input-label"><span className="label-icon"></span>Home Address *</label>
              <textarea value={contactInfo.address} onChange={(e)=>onChangeContact("address", e.target.value)} placeholder="Enter your complete address for delivery" className="contact-textarea" rows="3" required />
            </div>
          </div>

          <div className="contact-info-note" data-aos="fade-up" data-aos-delay="500">
            <div className="note-header"><span className="note-icon">🔒</span><span className="note-title">Privacy & Security</span></div>
            <p className="note-text">Your personal information is secure and will only be used for delivery and booking confirmation.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
