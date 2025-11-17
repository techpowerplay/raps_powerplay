// "use client"

// import { useState, useEffect } from "react"
// import { toast } from "react-toastify"
// import AOS from "aos"
// import CustomTimePicker from "../components/CustomTimePicker"
// import "../components/BookingPage.css"

// const BookingPage = () => {
//   const [selectedConsole, setSelectedConsole] = useState("")
//   const [selectedGames, setSelectedGames] = useState([])
//   const [startDate, setStartDate] = useState("")
//   const [endDate, setEndDate] = useState("")
//   const [startTime, setStartTime] = useState("")
//   const [endTime, setEndTime] = useState("")
//   const [rentalPeriod, setRentalPeriod] = useState("hourly")
//   const [currentStep, setCurrentStep] = useState(1)
//   const [isLoading, setIsLoading] = useState(false)
//   const [showConfetti, setShowConfetti] = useState(false)
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

//   // Contact form fields
//   const [contactInfo, setContactInfo] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//   })

//   // Image verification states
//   const [aadhaarImage, setAadhaarImage] = useState(null)
//   const [personWithAadhaarImage, setPersonWithAadhaarImage] = useState(null)
//   const [aadhaarImagePreview, setAadhaarImagePreview] = useState("")
//   const [personImagePreview, setPersonImagePreview] = useState("")
//   const [isVerifyingAadhaar, setIsVerifyingAadhaar] = useState(false)
//   const [isVerifyingPerson, setIsVerifyingPerson] = useState(false)
//   const [aadhaarVerified, setAadhaarVerified] = useState(false)
//   const [personVerified, setPersonVerified] = useState(false)
//   const [showCamera, setShowCamera] = useState(false)
//   const [cameraStream, setCameraStream] = useState(null)
//   const [verificationErrors, setVerificationErrors] = useState({})

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       easing: "ease-out-cubic",
//       once: true,
//       offset: 100,
//     })
//   }, [])

//   const playstationTypes = [
//     {
//       id: "ps5",
//       name: "PlayStation 5",
//       subtitle: "Next-Gen Beast",
//       price: 150,
//       features: ["4K Gaming", "Ray Tracing", "Ultra-Fast SSD"],
//       popular: true,
//       icon: "👑",
//     },
//     {
//       id: "ps4",
//       name: "PlayStation 4",
//       subtitle: "Classic Choice",
//       price: 90,
//       features: ["Full HD", "Share Play", "Remote Play"],
//       icon: "🛡️",
//     },
//   ]

//   const gameCategories = [
//     {
//       category: "Action & Adventure",
//       icon: "⚔️",
//       games: [
//         { id: "spiderman", name: "Spider-Man: Miles Morales", rating: 4.9 },
//         { id: "god-of-war", name: "God of War", rating: 4.8 },
//         { id: "uncharted", name: "Uncharted 4", rating: 4.7 },
//         { id: "tlou", name: "The Last of Us Part II", rating: 4.6 },
//       ],
//     },
//     {
//       category: "Sports & Racing",
//       icon: "🏆",
//       games: [
//         { id: "fifa24", name: "FIFA 24", rating: 4.5 },
//         { id: "gt7", name: "Gran Turismo 7", rating: 4.7 },
//         { id: "f1-23", name: "F1 23", rating: 4.4 },
//         { id: "nba2k24", name: "NBA 2K24", rating: 4.3 },
//       ],
//     },
//     {
//       category: "Battle Royale",
//       icon: "🎯",
//       games: [
//         { id: "fortnite", name: "Fortnite", rating: 4.2 },
//         { id: "apex", name: "Apex Legends", rating: 4.4 },
//         { id: "cod-warzone", name: "Call of Duty: Warzone", rating: 4.3 },
//         { id: "pubg", name: "PUBG", rating: 4.1 },
//       ],
//     },
//     {
//       category: "Multiplayer",
//       icon: "⚡",
//       games: [
//         { id: "cod-mw", name: "Call of Duty: Modern Warfare", rating: 4.6 },
//         { id: "overwatch", name: "Overwatch 2", rating: 4.2 },
//         { id: "rocket-league", name: "Rocket League", rating: 4.5 },
//         { id: "minecraft", name: "Minecraft", rating: 4.8 },
//       ],
//     },
//   ]

//   const rentalPlans = [
//     // {
//     //   id: "hourly",
//     //   name: "Quick Match",
//     //   duration: "Hourly",
//     //   multiplier: 1,
//     //   description: "Perfect for quick gaming sessions",
//     //   icon: "⚡",
//     //   color: "blue-cyan",
//     // },
//     {
//       id: "daily",
//       name: "Daily Grind",
//       duration: "Daily",
//       multiplier: 8,
//       description: "Full day gaming experience",
//       discount: 10,
//       icon: "🏆",
//       color: "green-emerald",
//     },
//     {
//       id: "weekly",
//       name: "Weekly Warrior",
//       duration: "Weekly",
//       multiplier: 40,
//       description: "Week-long gaming adventure",
//       discount: 20,
//       icon: "⚔️",
//       color: "purple-violet",
//     },
//     {
//       id: "monthly",
//       name: "Gaming Legend",
//       duration: "Monthly",
//       multiplier: 120,
//       description: "Ultimate gaming package",
//       discount: 30,
//       icon: "👑",
//       color: "orange-red",
//       popular: true,
//     },
//   ]

//   const selectedConsoleData = playstationTypes.find((ps) => ps.id === selectedConsole)
//   const selectedPeriodData = rentalPlans.find((period) => period.id === rentalPeriod)

//   // Auto-advance steps based on selections
//   useEffect(() => {
//     if (selectedConsole && currentStep === 1) {
//       setTimeout(() => setCurrentStep(2), 500)
//     }
//     if (selectedGames.length > 0 && currentStep === 2) {
//       setTimeout(() => setCurrentStep(3), 500)
//     }
//     if (rentalPeriod && currentStep === 3) {
//       setTimeout(() => setCurrentStep(4), 500)
//     }
//     if (startDate && startTime && currentStep === 4) {
//       setTimeout(() => setCurrentStep(5), 500)
//     }
//   }, [selectedConsole, selectedGames.length, rentalPeriod, startDate, startTime, currentStep])

//   const calculatePrice = () => {
//     if (!selectedConsoleData || !selectedPeriodData) return 0
//     const basePrice = selectedConsoleData.price * selectedPeriodData.multiplier
//     const discount = selectedPeriodData.discount || 0
//     return basePrice - (basePrice * discount) / 100
//   }

//   const formatDate = (dateString) => {
//     if (!dateString) return ""
//     const date = new Date(dateString)
//     return date.toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     })
//   }

//   const getTodayDate = () => {
//     const today = new Date()
//     return today.toISOString().split("T")[0]
//   }

//   const steps = [
//     { id: 1, name: "Select Weapon", icon: "🎮" },
//     { id: 2, name: "Pick Games", icon: "🎯" },
//     { id: 3, name: "Battle Plan", icon: "🚀" },
//     { id: 4, name: "Set Schedule", icon: "🕐" },
//     { id: 5, name: "Contact Info", icon: "📝" },
//   ]

//   const handleGameSelection = (gameId) => {
//     if (selectedGames.includes(gameId)) {
//       setSelectedGames(selectedGames.filter((id) => id !== gameId))
//     } else if (selectedGames.length < 5) {
//       setSelectedGames([...selectedGames, gameId])
//       toast.success("Game added to your arsenal! 🎮")
//     } else {
//       toast.warning("Maximum 5 games allowed! 🎯")
//     }
//   }

//   const handleContactInfoChange = (field, value) => {
//     setContactInfo((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const validateContactInfo = () => {
//     const { name, email, phone, address } = contactInfo
//     if (!name.trim()) {
//       toast.error("Please enter your name! 📝")
//       return false
//     }
//     if (!email.trim() || !email.includes("@")) {
//       toast.error("Please enter a valid email! 📧")
//       return false
//     }
//     if (!phone.trim() || phone.length < 10) {
//       toast.error("Please enter a valid phone number! 📱")
//       return false
//     }
//     if (!address.trim()) {
//       toast.error("Please enter your address! 🏠")
//       return false
//     }
//     if (!aadhaarVerified) {
//       toast.error("Please upload and verify your Aadhaar card! 🆔")
//       return false
//     }
//     if (!personVerified) {
//       toast.error("Please capture and verify your photo with Aadhaar card! 📸")
//       return false
//     }
//     return true
//   }

//   // Image verification functions
//   const verifyAadhaarCard = async (imageFile) => {
//     setIsVerifyingAadhaar(true)
//     setVerificationErrors((prev) => ({ ...prev, aadhaar: null }))

//     try {
//       // Simulate AI verification process
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       // Enhanced validation logic
//       const fileName = imageFile.name.toLowerCase()
//       const validFormats = ["jpg", "jpeg", "png"]
//       const fileExtension = fileName.split(".").pop()

//       if (!validFormats.includes(fileExtension)) {
//         throw new Error("Please upload a valid image format (JPG, PNG)")
//       }

//       if (imageFile.size > 5 * 1024 * 1024) {
//         throw new Error("Image size should be less than 5MB")
//       }

//       if (imageFile.size < 50 * 1024) {
//         throw new Error("Image file is too small. Please upload a clear, high-quality image.")
//       }

//       // Create image element to analyze
//       const img = new Image()
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")

//       await new Promise((resolve, reject) => {
//         img.onload = () => {
//           canvas.width = img.width
//           canvas.height = img.height
//           ctx.drawImage(img, 0, 0)

//           // Basic image quality checks
//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//           const data = imageData.data

//           // Check if image is too dark or too bright
//           let totalBrightness = 0
//           for (let i = 0; i < data.length; i += 4) {
//             const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
//             totalBrightness += brightness
//           }
//           const avgBrightness = totalBrightness / (data.length / 4)

//           if (avgBrightness < 30) {
//             reject(new Error("Image is too dark. Please take a photo in better lighting."))
//             return
//           }

//           if (avgBrightness > 240) {
//             reject(new Error("Image is overexposed. Please avoid direct flash or bright light."))
//             return
//           }

//           // Check image dimensions (Aadhaar cards have specific aspect ratio)
//           const aspectRatio = img.width / img.height
//           if (aspectRatio < 1.4 || aspectRatio > 1.8) {
//             reject(new Error("Image doesn't appear to be an Aadhaar card. Please ensure the entire card is visible."))
//             return
//           }

//           if (img.width < 400 || img.height < 250) {
//             reject(new Error("Image resolution is too low. Please upload a clearer image."))
//             return
//           }

//           resolve()
//         }

//         img.onerror = () => {
//           reject(new Error("Invalid image file. Please try uploading a different image."))
//         }

//         img.src = URL.createObjectURL(imageFile)
//       })

//       // Simulate OCR text detection for Aadhaar-specific content
//       const mockTextDetection = () => {
//         // Check filename for obvious non-Aadhaar indicators
//         const suspiciousNames = ["screenshot", "meme", "photo", "selfie", "random"]
//         const hasSuspiciousName = suspiciousNames.some((name) => fileName.includes(name))

//         if (hasSuspiciousName) {
//           throw new Error("This doesn't appear to be an Aadhaar card image. Please upload your actual Aadhaar card.")
//         }

//         // Simulate text recognition success based on image characteristics
//         // In real implementation, this would use OCR to detect "Aadhaar", UID numbers, etc.
//         const hasAadhaarIndicators = Math.random() > 0.3 // 70% success rate for realistic images

//         if (!hasAadhaarIndicators) {
//           throw new Error(
//             "Could not detect Aadhaar card text. Please ensure the card is clearly visible and not blurred.",
//           )
//         }

//         return true
//       }

//       mockTextDetection()

//       setAadhaarVerified(true)
//       toast.success("✅ Aadhaar card verified successfully!")
//     } catch (error) {
//       setVerificationErrors((prev) => ({ ...prev, aadhaar: error.message }))
//       setAadhaarVerified(false)
//       toast.error(`❌ ${error.message}`)
//     } finally {
//       setIsVerifyingAadhaar(false)
//     }
//   }

//   const verifyPersonWithAadhaar = async (imageFile) => {
//     setIsVerifyingPerson(true)
//     setVerificationErrors((prev) => ({ ...prev, person: null }))

//     try {
//       // Simulate AI verification process
//       await new Promise((resolve) => setTimeout(resolve, 3000))

//       // Enhanced validation logic
//       if (imageFile.size > 10 * 1024 * 1024) {
//         throw new Error("Image size should be less than 10MB")
//       }

//       if (imageFile.size < 100 * 1024) {
//         throw new Error("Image file is too small. Please capture a clearer photo.")
//       }

//       // Create image element to analyze
//       const img = new Image()
//       const canvas = document.createElement("canvas")
//       const ctx = canvas.getContext("2d")

//       await new Promise((resolve, reject) => {
//         img.onload = () => {
//           canvas.width = img.width
//           canvas.height = img.height
//           ctx.drawImage(img, 0, 0)

//           // Basic image quality checks
//           const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
//           const data = imageData.data

//           // Check if image is too dark
//           let totalBrightness = 0
//           for (let i = 0; i < data.length; i += 4) {
//             const brightness = (data[i] + data[i + 1] + data[i + 2]) / 3
//             totalBrightness += brightness
//           }
//           const avgBrightness = totalBrightness / (data.length / 4)

//           if (avgBrightness < 40) {
//             reject(new Error("Photo is too dark. Please take the photo in better lighting."))
//             return
//           }

//           if (avgBrightness > 230) {
//             reject(new Error("Photo is overexposed. Please avoid direct flash."))
//             return
//           }

//           // Check image dimensions (should be portrait or square for selfie)
//           const aspectRatio = img.width / img.height
//           if (aspectRatio > 1.5) {
//             reject(
//               new Error(
//                 "Image appears to be landscape. Please take a portrait photo showing yourself with the Aadhaar card.",
//               ),
//             )
//             return
//           }

//           if (img.width < 300 || img.height < 300) {
//             reject(new Error("Image resolution is too low. Please capture a clearer photo."))
//             return
//           }

//           resolve()
//         }

//         img.onerror = () => {
//           reject(new Error("Invalid image file. Please try capturing the photo again."))
//         }

//         img.src = URL.createObjectURL(imageFile)
//       })

//       // Simulate advanced AI detection for person + document
//       const mockPersonDocumentDetection = () => {
//         // Check if Aadhaar was verified first
//         if (!aadhaarVerified) {
//           throw new Error("Please verify your Aadhaar card first before taking the verification photo.")
//         }

//         // Simulate face detection (in real app, use face detection API)
//         const faceDetected = Math.random() > 0.2 // 80% success rate
//         if (!faceDetected) {
//           throw new Error(
//             "Could not detect a clear face in the image. Please ensure your face is visible and well-lit.",
//           )
//         }

//         // Simulate document detection in hands (in real app, use object detection)
//         const documentInHands = Math.random() > 0.25 // 75% success rate
//         if (!documentInHands) {
//           throw new Error(
//             "Could not detect Aadhaar card in your hands. Please hold the card clearly visible in the photo.",
//           )
//         }

//         // Simulate matching check (in real app, compare face with Aadhaar photo)
//         const faceMatches = Math.random() > 0.15 // 85% success rate
//         if (!faceMatches) {
//           throw new Error("Identity verification failed. Please ensure you are holding your own Aadhaar card.")
//         }

//         return true
//       }

//       mockPersonDocumentDetection()

//       setPersonVerified(true)
//       toast.success("✅ Identity verification completed successfully!")
//     } catch (error) {
//       setVerificationErrors((prev) => ({ ...prev, person: error.message }))
//       setPersonVerified(false)
//       toast.error(`❌ ${error.message}`)
//     } finally {
//       setIsVerifyingPerson(false)
//     }
//   }

//   const handleAadhaarImageUpload = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       setAadhaarImage(file)
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setAadhaarImagePreview(e.target.result)
//         verifyAadhaarCard(file)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const startCamera = async () => {
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: {
//           width: { ideal: 1280 },
//           height: { ideal: 720 },
//           facingMode: "user",
//         },
//       })
//       setCameraStream(stream)
//       setShowCamera(true)
//     } catch (error) {
//       toast.error("❌ Camera access denied. Please allow camera permission.")
//     }
//   }

//   const stopCamera = () => {
//     if (cameraStream) {
//       cameraStream.getTracks().forEach((track) => track.stop())
//       setCameraStream(null)
//     }
//     setShowCamera(false)
//   }

//   const capturePhoto = () => {
//     const video = document.getElementById("camera-video")
//     const canvas = document.createElement("canvas")
//     canvas.width = video.videoWidth
//     canvas.height = video.videoHeight

//     const ctx = canvas.getContext("2d")
//     ctx.drawImage(video, 0, 0)

//     canvas.toBlob(
//       (blob) => {
//         const file = new File([blob], "person-with-aadhaar.jpg", { type: "image/jpeg" })
//         setPersonWithAadhaarImage(file)
//         setPersonImagePreview(canvas.toDataURL())
//         verifyPersonWithAadhaar(file)
//         stopCamera()
//       },
//       "image/jpeg",
//       0.8,
//     )
//   }

//   const handleBooking = async () => {
//     if (!selectedConsole || !startDate || !startTime) {
//       toast.error("Please complete all required fields! ⚠️")
//       return
//     }

//     if (!validateContactInfo()) {
//       return
//     }

//     setIsLoading(true)
//     setShowConfetti(true)

//     // Simulate booking process
//     await new Promise((resolve) => setTimeout(resolve, 2000))

//     setIsLoading(false)
//     setTimeout(() => setShowConfetti(false), 3000)

//     toast.success("🎉 Booking confirmed! Get ready to game! 🎮")
//   }

//   const DateInput = ({ value, onChange, label, min }) => (
//     <div className="date-input-container">
//       <label className="date-label">{label}</label>
//       <div className="date-input-wrapper">
//         <span className="date-icon">📅</span>
//         <input
//           type="date"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           min={min || getTodayDate()}
//           className="date-input"
//         />
//       </div>
//       {value && <p className="date-helper">{formatDate(value)}</p>}
//     </div>
//   )

//   const renderSchedulingSection = () => {
//     switch (rentalPeriod) {
//       case "hourly":
//         return (
//           <div className="scheduling-section">
//             <div className="schedule-info hourly">
//               <div className="schedule-header">
//                 <span className="schedule-icon">⚡</span>
//                 <span className="schedule-title">Hourly Session</span>
//               </div>
//               <p className="schedule-description">Select your gaming date and time duration</p>
//             </div>
//             <div className="schedule-grid">
//               <DateInput value={startDate} onChange={setStartDate} label="Select Date" />
//               <CustomTimePicker value={startTime} onChange={setStartTime} label="Start Time" />
//               <CustomTimePicker value={endTime} onChange={setEndTime} label="End Time" />
//             </div>
//           </div>
//         )

//       case "daily":
//         return (
//           <div className="scheduling-section">
//             <div className="schedule-info daily">
//               <div className="schedule-header">
//                 <span className="schedule-icon">🏆</span>
//                 <span className="schedule-title">Daily Package</span>
//               </div>
//               <p className="schedule-description">Choose your gaming period and daily gaming hours</p>
//             </div>
//             <div className="schedule-grid">
//               <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
//               <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
//             </div>
//             <div className="schedule-grid">
//               <CustomTimePicker
//                 value={startTime}
//                 onChange={setStartTime}
//                 label="Daily Start Time"
//                 helperText="Console delivered daily at this time"
//               />
//               <CustomTimePicker
//                 value={endTime}
//                 onChange={setEndTime}
//                 label="Daily End Time"
//                 helperText="Console picked up daily at this time"
//               />
//             </div>
//           </div>
//         )

//       case "weekly":
//         return (
//           <div className="scheduling-section">
//             <div className="schedule-info weekly">
//               <div className="schedule-header">
//                 <span className="schedule-icon">⚔️</span>
//                 <span className="schedule-title">Weekly Package</span>
//               </div>
//               <p className="schedule-description">Set your weekly gaming schedule with flexible hours</p>
//             </div>
//             <div className="schedule-grid">
//               <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
//               <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
//             </div>
//             <div className="schedule-grid">
//               <CustomTimePicker
//                 value={startTime}
//                 onChange={setStartTime}
//                 label="Weekly Start Time"
//                 helperText="Console delivered weekly at this time"
//               />
//               <CustomTimePicker
//                 value={endTime}
//                 onChange={setEndTime}
//                 label="Weekly End Time"
//                 helperText="Console picked up weekly at this time"
//               />
//             </div>
//           </div>
//         )

//       case "monthly":
//         return (
//           <div className="scheduling-section">
//             <div className="schedule-info monthly">
//               <div className="schedule-header">
//                 <span className="schedule-icon">👑</span>
//                 <span className="schedule-title">Monthly Package</span>
//               </div>
//               <p className="schedule-description">Ultimate gaming experience with flexible daily hours</p>
//             </div>
//             <div className="schedule-grid">
//               <DateInput value={startDate} onChange={setStartDate} label="Start Date" />
//               <DateInput value={endDate} onChange={setEndDate} label="End Date" min={startDate || getTodayDate()} />
//             </div>
//             <div className="schedule-grid">
//               <CustomTimePicker
//                 value={startTime}
//                 onChange={setStartTime}
//                 label="Preferred Start Time"
//                 helperText="Your preferred daily gaming start time"
//               />
//               <CustomTimePicker
//                 value={endTime}
//                 onChange={setEndTime}
//                 label="Preferred End Time"
//                 helperText="Your preferred daily gaming end time"
//               />
//             </div>
//             <div className="monthly-benefits" data-aos="fade-up" data-aos-delay="300">
//               <div className="benefits-header">
//                 <span className="benefits-icon">👑</span>
//                 <span className="benefits-title">Monthly Benefits</span>
//               </div>
//               <ul className="benefits-list">
//                 <li>• Console stays with you for the entire period</li>
//                 <li>• Flexible daily gaming hours</li>
//                 <li>• Free game swaps during the month</li>
//                 <li>• Priority customer support</li>
//               </ul>
//             </div>
//           </div>
//         )

//       default:
//         return null
//     }
//   }

//   return (
//     <>
//       <style jsx>{`
//         /* CSS-in-JS styles will be injected here */
//       `}</style>

//       <div className="booking-page">
//         {/* Animated Background */}
//         <div className="animated-background">
//           <div className="bg-circle bg-circle-1"></div>
//           <div className="bg-circle bg-circle-2"></div>
//           <div className="bg-circle bg-circle-3"></div>
//           {[...Array(20)].map((_, i) => (
//             <div
//               key={i}
//               className="floating-particle"
//               style={{
//                 left: `${Math.random() * 100}%`,
//                 top: `${Math.random() * 100}%`,
//                 animationDelay: `${Math.random() * 5}s`,
//                 animationDuration: `${3 + Math.random() * 4}s`,
//               }}
//             />
//           ))}
//         </div>

//         {/* Confetti Effect */}
//         {showConfetti && (
//           <div className="confetti-container">
//             {[...Array(50)].map((_, i) => (
//               <div
//                 key={i}
//                 className="confetti-piece"
//                 style={{
//                   left: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 2}s`,
//                 }}
//               />
//             ))}
//           </div>
//         )}

//         {/* Header */}
//         <header className="header" data-aos="fade-down">
//           <div className="header-content">
//             <div className="logo">
//               <div className="logo-text">RAPS</div>
//             </div>

//             {/* Desktop Navigation */}
//             <nav className="desktop-nav">
//               <a href="/" className="nav-link">
//                 Home
//               </a>
//               <a href="/booking" className="nav-link active">
//                 Book Now
//               </a>
//               <a href="/dashboard" className="nav-link">
//                 Dashboard
//               </a>
//               <a href="/contact" className="nav-link">
//                 Contact Us
//               </a>
//             </nav>

//             {/* Mobile Menu Button */}
//             <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
//               {mobileMenuOpen ? "✕" : "☰"}
//             </button>

//             {/* Mobile Navigation */}
//             {mobileMenuOpen && (
//               <div className="mobile-nav">
//                 <nav className="mobile-nav-content">
//                   <a href="/" className="mobile-nav-link">
//                     Home
//                   </a>
//                   <a href="/booking" className="mobile-nav-link active">
//                     Book Now
//                   </a>
//                   <a href="/dashboard" className="mobile-nav-link">
//                     Dashboard
//                   </a>
//                   <a href="/contact" className="mobile-nav-link">
//                     Contact Us
//                   </a>
//                 </nav>
//               </div>
//             )}
//           </div>
//         </header>

//         <div className="main-content">
//           <div className="container">
//             {/* Hero Section */}
//             <div className="hero-section" data-aos="fade-up" data-aos-delay="200">
//               <h1 className="hero-title">GAME ON!</h1>
//               <p className="hero-subtitle">Configure your ultimate gaming experience</p>

//               {/* Progress Steps */}
//               <div className="progress-steps" data-aos="fade-up" data-aos-delay="400">
//                 <div className="steps-container">
//                   {steps.map((step, index) => (
//                     <div key={step.id} className="step-item">
//                       <div className={`step-circle ${currentStep >= step.id ? "active" : ""}`}>
//                         <span className="step-icon">{step.icon}</span>
//                       </div>
//                       {index < steps.length - 1 && (
//                         <div className={`step-line ${currentStep > step.id ? "active" : ""}`}></div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             <div className="content-grid">
//               {/* Main Content */}
//               <div className="main-column">
//                 {/* Step 1: Choose Your Weapon */}
//                 <div className="card" data-aos="fade-right" data-aos-delay="100">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <div className="title-icon gamepad">🎮</div>
//                       Choose Your Weapon
//                       {selectedConsole && <span className="sparkle">✨</span>}
//                     </div>
//                   </div>
//                   <div className="card-content">
//                     <div className="console-grid">
//                       {playstationTypes.map((ps, index) => (
//                         <div
//                           key={ps.id}
//                           className={`console-card ${selectedConsole === ps.id ? "selected" : ""}`}
//                           onClick={() => {
//                             setSelectedConsole(ps.id)
//                             toast.success(`${ps.name} selected! 🎮`)
//                           }}
//                           data-aos="zoom-in"
//                           data-aos-delay={index * 200}
//                         >
//                           {ps.popular && <div className="popular-badge">Most Popular</div>}
//                           <div className="console-content">
//                             <div className="console-icon">{ps.icon}</div>
//                             <h3 className="console-name">{ps.name}</h3>
//                             <p className="console-subtitle">{ps.subtitle}</p>
//                             <div className="console-price">₹{ps.price}/hr</div>
//                             <div className="console-features">
//                               {ps.features.map((feature, featureIndex) => (
//                                 <div key={featureIndex} className="feature-item">
//                                   <span className="feature-star">⭐</span>
//                                   {feature}
//                                 </div>
//                               ))}
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 2: Select Your Games */}
//                 <div className="card" data-aos="fade-left" data-aos-delay="200">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <div className="title-icon target">🎯</div>
//                       Select Your Games
//                       {selectedGames.length > 0 && <div className="games-badge">{selectedGames.length} selected</div>}
//                     </div>
//                     <p className="card-subtitle">Choose up to 5 games for your session</p>
//                   </div>
//                   <div className="card-content">
//                     <div className="games-section">
//                       {gameCategories.map((category, categoryIndex) => (
//                         <div
//                           key={category.category}
//                           className="game-category"
//                           data-aos="fade-up"
//                           data-aos-delay={categoryIndex * 100}
//                         >
//                           <div className="category-header">
//                             <span className="category-icon">{category.icon}</span>
//                             {category.category}
//                           </div>
//                           <div className="games-grid">
//                             {category.games.map((game, gameIndex) => (
//                               <div
//                                 key={game.id}
//                                 className={`game-card ${selectedGames.includes(game.id) ? "selected" : ""} ${!selectedGames.includes(game.id) && selectedGames.length >= 5 ? "disabled" : ""}`}
//                                 onClick={() => handleGameSelection(game.id)}
//                                 data-aos="zoom-in"
//                                 data-aos-delay={gameIndex * 50}
//                               >
//                                 <div className="game-checkbox">
//                                   <input
//                                     type="checkbox"
//                                     checked={selectedGames.includes(game.id)}
//                                     onChange={() => {}}
//                                     disabled={!selectedGames.includes(game.id) && selectedGames.length >= 5}
//                                   />
//                                 </div>
//                                 <div className="game-info">
//                                   <div className="game-name">{game.name}</div>
//                                   <div className="game-rating">
//                                     <span className="rating-star">⭐</span>
//                                     {game.rating}
//                                   </div>
//                                 </div>
//                               </div>
//                             ))}
//                           </div>
//                         </div>
//                       ))}
//                     </div>

//                     {selectedGames.length > 0 && (
//                       <div className="selected-games-summary" data-aos="fade-up" data-aos-delay="300">
//                         <div className="summary-content">
//                           <span className="summary-text">Selected Games: {selectedGames.length}/5</span>
//                           <button
//                             className="clear-btn"
//                             onClick={() => {
//                               setSelectedGames([])
//                               toast.info("All games cleared! 🎮")
//                             }}
//                           >
//                             Clear All
//                           </button>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Step 3: Choose Your Battle Plan */}
//                 <div className="card" data-aos="fade-right" data-aos-delay="300">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <div className="title-icon rocket">🚀</div>
//                       Choose Your Battle Plan
//                       {rentalPeriod && <span className="arrow">➡️</span>}
//                     </div>
//                   </div>
//                   <div className="card-content">
//                     <div className="rental-plans-grid">
//                       {rentalPlans.map((plan, index) => (
//                         <div
//                           key={plan.id}
//                           className={`rental-plan ${rentalPeriod === plan.id ? "selected" : ""}`}
//                           onClick={() => {
//                             setRentalPeriod(plan.id)
//                             setCurrentPlatform(plan.name)
//                              toast.success(`${plan.name} selected! 🎯`)
//                           }}
//                           data-aos="zoom-in"
//                           data-aos-delay={index * 100}
//                         >
//                           {plan.popular && <div className="popular-badge">Most Popular</div>}
//                           <div className="plan-content">
//                             <div className="plan-header">
//                               <div className={`plan-icon ${plan.color}`}>{plan.icon}</div>
//                               <div className="plan-info">
//                                 <div className="plan-name-row">
//                                   <h3 className="plan-name">{plan.name}</h3>
//                                   {plan.discount && <div className="discount-badge">{plan.discount}% OFF</div>}
//                                 </div>
//                                 <p className="plan-description">{plan.description}</p>
//                                 <div className="plan-duration">{plan.duration} Plan</div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 4: Schedule Your Gaming Session */}
//                 <div className="card" data-aos="fade-left" data-aos-delay="400">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <div className="title-icon clock">🕐</div>
//                       Schedule Your Gaming Session
//                     </div>
//                     <p className="card-subtitle">Set up your gaming schedule based on your selected plan</p>
//                   </div>
//                   <div className="card-content">
//                     {renderSchedulingSection()}

//                     <div className="operating-hours" data-aos="fade-up" data-aos-delay="200">
//                       <div className="hours-header">
//                         <span className="hours-icon">🕐</span>
//                         <span className="hours-title">Operating Hours</span>
//                       </div>
//                       <p className="hours-text">We deliver between 10:00 AM - 11:00 PM daily</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Step 5: Contact Information */}
//                 <div className="card" data-aos="fade-right" data-aos-delay="500">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <div className="title-icon contact">📝</div>
//                       Contact Information
//                       {contactInfo.name && contactInfo.email && <span className="sparkle">✨</span>}
//                     </div>
//                     <p className="card-subtitle">We need your details for delivery and communication</p>
//                   </div>
//                   <div className="card-content">
//                     <div className="contact-form">
//                       <div className="contact-grid">
//                         <div className="input-group" data-aos="fade-up" data-aos-delay="100">
//                           <label className="input-label">
//                             <span className="label-icon">👤</span>
//                             Full Name *
//                           </label>
//                           <input
//                             type="text"
//                             value={contactInfo.name}
//                             onChange={(e) => handleContactInfoChange("name", e.target.value)}
//                             placeholder="Enter your full name"
//                             className="contact-input"
//                             required
//                           />
//                         </div>

//                         <div className="input-group" data-aos="fade-up" data-aos-delay="200">
//                           <label className="input-label">
//                             <span className="label-icon">📧</span>
//                             Email Address *
//                           </label>
//                           <input
//                             type="email"
//                             value={contactInfo.email}
//                             onChange={(e) => handleContactInfoChange("email", e.target.value)}
//                             placeholder="Enter your email address"
//                             className="contact-input"
//                             required
//                           />
//                         </div>

//                         <div className="input-group" data-aos="fade-up" data-aos-delay="300">
//                           <label className="input-label">
//                             <span className="label-icon">📱</span>
//                             Phone Number *
//                           </label>
//                           <input
//                             type="tel"
//                             value={contactInfo.phone}
//                             onChange={(e) => handleContactInfoChange("phone", e.target.value)}
//                             placeholder="Enter your phone number"
//                             className="contact-input"
//                             required
//                           />
//                         </div>

//                         <div className="input-group full-width" data-aos="fade-up" data-aos-delay="400">
//                           <label className="input-label">
//                             <span className="label-icon">🏠</span>
//                             Home Address *
//                           </label>
//                           <textarea
//                             value={contactInfo.address}
//                             onChange={(e) => handleContactInfoChange("address", e.target.value)}
//                             placeholder="Enter your complete address for delivery"
//                             className="contact-textarea"
//                             rows="3"
//                             required
//                           />
//                         </div>
//                       </div>

//                       {/* Identity Verification Section */}
//                       <div className="verification-section" data-aos="fade-up" data-aos-delay="600">
//                         <div className="verification-header">
//                           <span className="verification-icon">🆔</span>
//                           <span className="verification-title">Identity Verification</span>
//                           <span className="required-badge">Required</span>
//                         </div>
//                         <p className="verification-subtitle">
//                           For security purposes, please upload your Aadhaar card and take a verification photo
//                         </p>

//                         {/* Aadhaar Card Upload */}
//                         <div className="verification-item">
//                           <div className="verification-item-header">
//                             <span className="item-icon">📄</span>
//                             <span className="item-title">Aadhaar Card Image</span>
//                             {aadhaarVerified && <span className="verified-badge">✅ Verified</span>}
//                           </div>

//                           <div className="verification-requirements">
//                             <p className="requirements-title">📋 Requirements for Aadhaar Card Photo:</p>
//                             <ul className="requirements-list">
//                               <li>• Clear, high-quality image of your Aadhaar card</li>
//                               <li>• All text and numbers should be readable</li>
//                               <li>• No blur, shadows, or glare on the card</li>
//                               <li>• Entire card should be visible in the frame</li>
//                               <li>• File size between 50KB - 5MB</li>
//                             </ul>
//                           </div>

//                           <div className="upload-section">
//                             <input
//                               type="file"
//                               id="aadhaar-upload"
//                               accept="image/*"
//                               onChange={handleAadhaarImageUpload}
//                               className="file-input"
//                               style={{ display: "none" }}
//                             />

//                             {!aadhaarImagePreview ? (
//                               <label htmlFor="aadhaar-upload" className="upload-area">
//                                 <div className="upload-content">
//                                   <span className="upload-icon">📁</span>
//                                   <span className="upload-text">Click to upload Aadhaar card image</span>
//                                   <span className="upload-hint">JPG, PNG • 50KB - 5MB • Clear & readable</span>
//                                 </div>
//                               </label>
//                             ) : (
//                               <div className="image-preview-container">
//                                 <img
//                                   src={aadhaarImagePreview || "/placeholder.svg"}
//                                   alt="Aadhaar Preview"
//                                   className="image-preview"
//                                 />
//                                 <div className="image-overlay">
//                                   {isVerifyingAadhaar ? (
//                                     <div className="verification-status verifying">
//                                       <div className="spinner-small"></div>
//                                       <span>Analyzing Aadhaar card...</span>
//                                     </div>
//                                   ) : aadhaarVerified ? (
//                                     <div className="verification-status verified">
//                                       <span className="status-icon">✅</span>
//                                       <span>Aadhaar Verified</span>
//                                     </div>
//                                   ) : (
//                                     <div className="verification-status failed">
//                                       <span className="status-icon">❌</span>
//                                       <span>Verification Failed</span>
//                                     </div>
//                                   )}
//                                 </div>
//                                 <button
//                                   className="retake-btn"
//                                   onClick={() => {
//                                     setAadhaarImage(null)
//                                     setAadhaarImagePreview("")
//                                     setAadhaarVerified(false)
//                                     setVerificationErrors((prev) => ({ ...prev, aadhaar: null }))
//                                   }}
//                                 >
//                                   🔄 Upload New
//                                 </button>
//                               </div>
//                             )}

//                             {verificationErrors.aadhaar && (
//                               <div className="error-message">
//                                 <span className="error-icon">⚠️</span>
//                                 {verificationErrors.aadhaar}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Person with Aadhaar Photo */}
//                         <div className="verification-item">
//                           <div className="verification-item-header">
//                             <span className="item-icon">📸</span>
//                             <span className="item-title">Verification Photo</span>
//                             {personVerified && <span className="verified-badge">✅ Verified</span>}
//                           </div>

//                           <div className="verification-requirements">
//                             <p className="requirements-title">📋 Requirements for Verification Photo:</p>
//                             <ul className="requirements-list">
//                               <li>• Hold your Aadhaar card clearly visible in your hands</li>
//                               <li>• Your face should be clearly visible and well-lit</li>
//                               <li>• Take photo in good lighting (avoid shadows)</li>
//                               <li>• Hold the card steady and avoid blur</li>
//                               <li>• Make sure both you and the card are in frame</li>
//                             </ul>
//                           </div>

//                           <p className="verification-instruction">
//                             📸 Take a selfie while holding your Aadhaar card clearly visible in your hands
//                           </p>

//                           <div className="camera-section">
//                             {!showCamera && !personImagePreview ? (
//                               <button className="camera-btn" onClick={startCamera}>
//                                 <span className="camera-icon">📷</span>
//                                 Open Camera for Verification
//                               </button>
//                             ) : showCamera ? (
//                               <div className="camera-container">
//                                 <video
//                                   id="camera-video"
//                                   autoPlay
//                                   playsInline
//                                   ref={(video) => {
//                                     if (video && cameraStream) {
//                                       video.srcObject = cameraStream
//                                     }
//                                   }}
//                                   className="camera-video"
//                                 />
//                                 <div className="camera-overlay">
//                                   <div className="camera-guide">
//                                     <div className="guide-frame"></div>
//                                     <p className="guide-text">Hold Aadhaar card clearly visible in your hands</p>
//                                     <p className="guide-subtext">Make sure your face and the card are both visible</p>
//                                   </div>
//                                 </div>
//                                 <div className="camera-controls">
//                                   <button className="capture-btn" onClick={capturePhoto}>
//                                     <span className="capture-icon">📸</span>
//                                     Capture Photo
//                                   </button>
//                                   <button className="cancel-btn" onClick={stopCamera}>
//                                     Cancel
//                                   </button>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="image-preview-container">
//                                 <img
//                                   src={personImagePreview || "/placeholder.svg"}
//                                   alt="Person with Aadhaar"
//                                   className="image-preview"
//                                 />
//                                 <div className="image-overlay">
//                                   {isVerifyingPerson ? (
//                                     <div className="verification-status verifying">
//                                       <div className="spinner-small"></div>
//                                       <span>Verifying identity...</span>
//                                     </div>
//                                   ) : personVerified ? (
//                                     <div className="verification-status verified">
//                                       <span className="status-icon">✅</span>
//                                       <span>Identity Verified</span>
//                                     </div>
//                                   ) : (
//                                     <div className="verification-status failed">
//                                       <span className="status-icon">❌</span>
//                                       <span>Verification Failed</span>
//                                     </div>
//                                   )}
//                                 </div>
//                                 <button
//                                   className="retake-btn"
//                                   onClick={() => {
//                                     setPersonWithAadhaarImage(null)
//                                     setPersonImagePreview("")
//                                     setPersonVerified(false)
//                                     setVerificationErrors((prev) => ({ ...prev, person: null }))
//                                   }}
//                                 >
//                                   🔄 Retake Photo
//                                 </button>
//                               </div>
//                             )}

//                             {verificationErrors.person && (
//                               <div className="error-message">
//                                 <span className="error-icon">⚠️</span>
//                                 {verificationErrors.person}
//                               </div>
//                             )}
//                           </div>
//                         </div>

//                         {/* Verification Status Summary */}
//                         {(aadhaarVerified || personVerified) && (
//                           <div className="verification-summary" data-aos="fade-up" data-aos-delay="700">
//                             <div className="summary-header">
//                               <span className="summary-icon">🛡️</span>
//                               <span className="summary-title">Verification Status</span>
//                             </div>
//                             <div className="verification-checklist">
//                               <div className={`checklist-item ${aadhaarVerified ? "completed" : "pending"}`}>
//                                 <span className="check-icon">{aadhaarVerified ? "✅" : "⏳"}</span>
//                                 <span className="check-text">Aadhaar Card Verified</span>
//                               </div>
//                               <div className={`checklist-item ${personVerified ? "completed" : "pending"}`}>
//                                 <span className="check-icon">{personVerified ? "✅" : "⏳"}</span>
//                                 <span className="check-text">Identity Photo Verified</span>
//                               </div>
//                             </div>
//                             {aadhaarVerified && personVerified && (
//                               <div className="verification-complete">
//                                 <span className="complete-icon">🎉</span>
//                                 <span className="complete-text">Identity verification completed!</span>
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>

//                       <div className="contact-info-note" data-aos="fade-up" data-aos-delay="500">
//                         <div className="note-header">
//                           <span className="note-icon">🔒</span>
//                           <span className="note-title">Privacy & Security</span>
//                         </div>
//                         <p className="note-text">
//                           Your personal information is secure and will only be used for delivery and booking
//                           confirmation.
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Gaming Summary Panel */}
//               <div className="summary-column">
//                 <div className="summary-card" data-aos="fade-left" data-aos-delay="500">
//                   <div className="summary-header">
//                     <div className="summary-title">
//                       <span className="summary-icon">🏆</span>
//                       Battle Summary
//                     </div>
//                   </div>
//                   <div className="summary-content">
//                     {/* Console Selection */}
//                     {selectedConsoleData && (
//                       <div className="summary-item" data-aos="fade-up" data-aos-delay="100">
//                         <div className="item-header">
//                           <div className="item-icon">🎮</div>
//                           <div className="item-info">
//                             <div className="item-name">{selectedConsoleData.name}</div>
//                             <div className="item-subtitle">{selectedConsoleData.subtitle}</div>
//                           </div>
//                         </div>
//                         <div className="item-price">₹{selectedConsoleData.price}/hr</div>
//                       </div>
//                     )}

//                     {/* Plan Selection */}
//                     {selectedPeriodData && (
//                       <div className="summary-item" data-aos="fade-up" data-aos-delay="200">
//                         <div className="plan-summary">
//                           <div className="plan-summary-header">
//                             <span className="plan-summary-name">{selectedPeriodData.name}</span>
//                             {selectedPeriodData.discount && (
//                               <div className="discount-badge small">-{selectedPeriodData.discount}%</div>
//                             )}
//                           </div>
//                           <div className="plan-summary-description">{selectedPeriodData.description}</div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Schedule Summary */}
//                     {(startDate || startTime) && (
//                       <div className="summary-item" data-aos="fade-up" data-aos-delay="300">
//                         <div className="schedule-summary">
//                           <div className="schedule-summary-header">
//                             <span className="schedule-icon">📅</span>
//                             Schedule
//                           </div>
//                           {startDate && (
//                             <div className="schedule-row">
//                               <span className="schedule-label">Start Date</span>
//                               <span className="schedule-value">{formatDate(startDate)}</span>
//                             </div>
//                           )}
//                           {endDate && (
//                             <div className="schedule-row">
//                               <span className="schedule-label">End Date</span>
//                               <span className="schedule-value">{formatDate(endDate)}</span>
//                             </div>
//                           )}
//                           {startTime && (
//                             <div className="schedule-row">
//                               <span className="schedule-label">Start Time</span>
//                               <span className="schedule-value">{startTime}</span>
//                             </div>
//                           )}
//                           {endTime && (
//                             <div className="schedule-row">
//                               <span className="schedule-label">End Time</span>
//                               <span className="schedule-value">{endTime}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Contact Info Summary */}
//                     {(contactInfo.name || contactInfo.email) && (
//                       <div className="summary-item" data-aos="fade-up" data-aos-delay="350">
//                         <div className="contact-summary">
//                           <div className="contact-summary-header">
//                             <span className="contact-icon">📝</span>
//                             Contact Details
//                           </div>
//                           {contactInfo.name && (
//                             <div className="contact-row">
//                               <span className="contact-label">Name</span>
//                               <span className="contact-value">{contactInfo.name}</span>
//                             </div>
//                           )}
//                           {contactInfo.email && (
//                             <div className="contact-row">
//                               <span className="contact-label">Email</span>
//                               <span className="contact-value">{contactInfo.email}</span>
//                             </div>
//                           )}
//                           {contactInfo.phone && (
//                             <div className="contact-row">
//                               <span className="contact-label">Phone</span>
//                               <span className="contact-value">{contactInfo.phone}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}

//                     {/* Selected Games */}
//                     {selectedGames.length > 0 && (
//                       <div className="summary-item" data-aos="fade-up" data-aos-delay="400">
//                         <div className="games-summary">
//                           <div className="games-summary-header">
//                             <span className="games-icon">🎯</span>
//                             Game Arsenal ({selectedGames.length})
//                           </div>
//                           <div className="games-list">
//                             {selectedGames.map((gameId) => {
//                               const game = gameCategories.flatMap((cat) => cat.games).find((g) => g.id === gameId)
//                               return (
//                                 <div key={gameId} className="game-summary-item">
//                                   <span className="game-summary-name">{game?.name}</span>
//                                   <div className="game-summary-rating">
//                                     <span className="rating-star">⭐</span>
//                                     <span className="rating-value">{game?.rating}</span>
//                                   </div>
//                                 </div>
//                               )
//                             })}
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {/* Price Breakdown */}
//                     <div className="price-breakdown" data-aos="zoom-in" data-aos-delay="500">
                   
//                       <div className="price-header">
//                         <span className="price-label">Total Damage</span>
//                         <span className="price-value">₹{calculatePrice()}</span>
//                       </div>
//                       {selectedPeriodData?.discount && (
//                         <div className="savings-text">
//                           🎉 You save {selectedPeriodData.discount}% with {selectedPeriodData.name}!
//                         </div>
//                       )}
//                     </div>

//                     {/* Action Button */}
//                     <button
//                       className={`booking-btn ${!selectedConsole || !startDate || !startTime || !contactInfo.name || !contactInfo.email || !contactInfo.phone || !contactInfo.address || !aadhaarVerified || !personVerified || isLoading ? "disabled" : ""}`}
//                       onClick={handleBooking}
//                       disabled={
//                         !selectedConsole ||
//                         !startDate ||
//                         !startTime ||
//                         !contactInfo.name ||
//                         !contactInfo.email ||
//                         !contactInfo.phone ||
//                         !contactInfo.address ||
//                         !aadhaarVerified ||
//                         !personVerified ||
//                         isLoading
//                       }
//                       data-aos="fade-up"
//                       data-aos-delay="600"
//                     >
//                       {isLoading ? (
//                         <div className="loading-content">
//                           <div className="spinner"></div>
//                           Processing...
//                         </div>
//                       ) : (
//                         <>
//                           <span className="btn-icon ">⚡</span>
//                           START GAMING - ₹{calculatePrice()}
//                         </>
//                       )}
//                     </button>

//                     <p className="footer-text">🎮 Ready to dominate? Let's make it happen!</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default BookingPage
