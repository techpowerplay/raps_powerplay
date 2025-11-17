// src/pages/Dashboard.jsx
"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { assets } from "../assets/assets"
import { Link } from "react-router-dom"
import AOS from "aos"
import "../components/Dashboard.css"
import { AnimatePresence, motion } from "framer-motion"
import { api } from "../lib/api" // use shared axios instance

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings")
  const [searchTerm, setSearchTerm] = useState("")
  const [BookingInputValue, setBookingInputValue] = useState("")
  const [BookingSearchData, setBookingSearchData] = useState([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [dateRange, setDateRange] = useState("week")
  const [UserData, setUserData] = useState([])
  const [SearchedUserData, setSearchedUserData] = useState([])
  const [realTimeData, setRealTimeData] = useState({})
  const [notifications, setNotifications] = useState([])
  const [DefaultBookingData, setDefaultBookingData] = useState([])
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [filterOrNot, setfilterOrNot] = useState(false)

  // All bookings
  const [BookingData, setBookingData] = useState([])

  async function GetBookingsOfUser() {
    try {
      // const userid = JSON.parse(localStorage.getItem("user"))?._id
      const { data } = await api.get(`/api/GetAllBookings`)
      setBookingData(data || [])
      setDefaultBookingData(data || [])
    } catch (e) {
      toast.error(e.response?.data?.message || e.message || "Failed to load bookings")
    }
  }

  function formatMongoDate(createdAt) {
    const date = new Date(createdAt)
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  async function HandleStatusFiltering(e) {
    const v = e.target.value
    if (v !== "all") {
      const fitlerdata = DefaultBookingData.filter((item) => item.status === v)
      setBookingData(fitlerdata)
    } else {
      setBookingData(DefaultBookingData)
    }
  }

  function getDateCategory(createdAt) {
    const createdDate = new Date(createdAt)
    const now = new Date()
    const diffMs = now - createdDate
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    if (diffDays < 1) return "today"
    if (diffDays < 7) return "week"
    if (diffDays < 30) return "month"
    return "older"
  }

  async function HandleDateFilter(value) {
    switch (value) {
      case "today":
        setBookingData(DefaultBookingData.filter((item) => getDateCategory(item.createdAt) === "today"))
        break
      case "all":
        setBookingData(DefaultBookingData)
        break
      case "week":
        setBookingData(DefaultBookingData.filter((item) => getDateCategory(item.createdAt) === "week"))
        break
      case "month":
        setBookingData(DefaultBookingData.filter((item) => getDateCategory(item.createdAt) === "month"))
        break
      default:
        setBookingData(DefaultBookingData)
    }
  }

  async function HandleSearch(e) {
    const { name, value } = e.target
    if (name === "bookingsearch") {
      setBookingInputValue(value)
      const newarr = BookingData.filter((item) => String(item?.contactInfo?.name || "").toLowerCase().includes(value.toLowerCase()))
      setBookingSearchData(newarr)
    } else if (name === "usersearch") {
      setBookingInputValue(value)
      const newarr = UserData.filter((item) => String(item?.name || "").toLowerCase().includes(value.toLowerCase()))
      setSearchedUserData(newarr)
    }
  }

  async function GetAllTheUser() {
    try {
      const { data } = await api.get(`/user/GetAllUser`)
      setUserData(data || [])
    } catch (e) {
      toast.error(e.response?.data?.message || e.message || "Failed to load users")
    }
  }

  useEffect(() => {
    GetAllTheUser()
    GetBookingsOfUser()
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    })

    const interval = setInterval(() => {
      updateRealTimeData()
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const updateRealTimeData = () => {
    const updates = [
      "New booking received from Alex Kumar",
      "Console PS5-2024-003 delivered successfully",
      "User Sarah Wilson earned 50 loyalty points",
      "Wallet top-up of ₹500 by Mike Johnson",
      "Premium member John Doe extended subscription",
    ]
    const randomUpdate = updates[Math.floor(Math.random() * updates.length)]
    setNotifications((prev) => [
      { id: Date.now(), message: randomUpdate, time: new Date().toLocaleTimeString() },
      ...prev.slice(0, 4),
    ])
  }

  // Mock data for dashboard stats/sections not wired to backend
  const mockBookings = [
    {
      id: "BK001",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      console: "PlayStation 5",
      games: ["Spider-Man: Miles Morales", "God of War", "FIFA 24"],
      plan: "Daily Grind",
      startDate: "2024-01-15",
      endDate: "2024-01-17",
      startTime: "10:00",
      endTime: "22:00",
      totalAmount: 1200,
      discountApplied: 120,
      loyaltyPointsEarned: 60,
      status: "active",
      address: "123 Gaming Street, Tech City",
      createdAt: "2024-01-14T10:30:00Z",
      paymentMethod: "wallet",
    },
    {
      id: "BK002",
      customerName: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+91 87654 32109",
      console: "PlayStation 4",
      games: ["Call of Duty: Modern Warfare", "Rocket League"],
      plan: "Quick Match",
      startDate: "2024-01-16",
      endDate: "2024-01-16",
      startTime: "14:00",
      endTime: "18:00",
      totalAmount: 360,
      discountApplied: 0,
      loyaltyPointsEarned: 18,
      status: "completed",
      address: "456 Player Avenue, Game Town",
      createdAt: "2024-01-15T14:20:00Z",
      paymentMethod: "card",
    },
    {
      id: "BK003",
      customerName: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 76543 21098",
      console: "PlayStation 5",
      games: ["Gran Turismo 7", "F1 23", "NBA 2K24"],
      plan: "Weekly Warrior",
      startDate: "2024-01-20",
      endDate: "2024-01-27",
      startTime: "12:00",
      endTime: "20:00",
      totalAmount: 4800,
      discountApplied: 480,
      loyaltyPointsEarned: 240,
      status: "pending",
      address: "789 Console Road, Gaming District",
      createdAt: "2024-01-16T09:15:00Z",
      paymentMethod: "wallet",
    },
  ]

  const mockUsers = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91 98765 43210",
      address: "123 Gaming Street, Tech City",
      totalBookings: 15,
      totalSpent: 12500,
      joinDate: "2023-12-01",
      status: "active",
    },
    {
      id: "USR002",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+91 87654 32109",
      address: "456 Player Avenue, Game Town",
      totalBookings: 8,
      totalSpent: 3200,
      joinDate: "2024-01-05",
      status: "active",
    },
    {
      id: "USR003",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+91 76543 21098",
      address: "789 Console Road, Gaming District",
      totalBookings: 3,
      totalSpent: 6800,
      joinDate: "2024-01-10",
      status: "new",
    },
  ]

  const mockOrders = [
    {
      id: "ORD001",
      bookingId: "BK001",
      customerName: "John Doe",
      console: "PlayStation 5",
      deliveryStatus: "delivered",
      deliveryDate: "2024-01-15",
      returnDate: "2024-01-17",
      deliveryAddress: "123 Gaming Street, Tech City",
      deliveryAgent: "Agent A",
      notes: "Premium member - VIP delivery",
      amount: 1200,
      trackingId: "TRK001",
      estimatedDelivery: "10:00 AM",
      actualDelivery: "09:45 AM",
    },
    {
      id: "ORD002",
      bookingId: "BK002",
      customerName: "Sarah Wilson",
      console: "PlayStation 4",
      deliveryStatus: "returned",
      deliveryDate: "2024-01-16",
      returnDate: "2024-01-16",
      deliveryAddress: "456 Player Avenue, Game Town",
      deliveryAgent: "Agent B",
      notes: "Standard delivery completed",
      amount: 360,
      trackingId: "TRK002",
      estimatedDelivery: "02:00 PM",
      actualDelivery: "01:55 PM",
    },
    {
      id: "ORD003",
      bookingId: "BK003",
      customerName: "Mike Johnson",
      console: "PlayStation 5",
      deliveryStatus: "scheduled",
      deliveryDate: "2024-01-20",
      returnDate: "2024-01-27",
      deliveryAddress: "789 Console Road, Gaming District",
      deliveryAgent: "Agent C",
      notes: "VIP member - Priority delivery requested",
      amount: 4800,
      trackingId: "TRK003",
      estimatedDelivery: "11:00 AM",
      actualDelivery: null,
    },
  ]

  const mockInventory = [
    {
      id: "PS5001",
      type: "PlayStation 5",
      serialNumber: "PS5-2024-001",
      status: "available",
      condition: "excellent",
      lastMaintenance: "2024-01-10",
      totalBookings: 15,
      currentLocation: "Warehouse A",
      purchaseDate: "2023-11-15",
      warrantyExpiry: "2025-11-15",
      value: 45000,
    },
    {
      id: "PS5002",
      type: "PlayStation 5",
      serialNumber: "PS5-2024-002",
      status: "rented",
      condition: "good",
      lastMaintenance: "2024-01-08",
      totalBookings: 12,
      currentLocation: "Customer - John Doe",
      returnDate: "2024-01-17",
      purchaseDate: "2023-12-01",
      warrantyExpiry: "2025-12-01",
      value: 45000,
    },
    {
      id: "PS4001",
      type: "PlayStation 4",
      serialNumber: "PS4-2023-001",
      status: "maintenance",
      condition: "fair",
      lastMaintenance: "2024-01-16",
      totalBookings: 28,
      currentLocation: "Service Center",
      purchaseDate: "2023-06-01",
      warrantyExpiry: "2024-06-01",
      value: 25000,
    },
  ]

  const membershipTiers = {
    basic: { name: "Basic", color: "#6b7280", discount: 0, pointsMultiplier: 1 },
    standard: { name: "Standard", color: "#10b981", discount: 10, pointsMultiplier: 1.2 },
    premium: { name: "Premium", color: "#f59e0b", discount: 20, pointsMultiplier: 1.5 },
    vip: { name: "VIP", color: "#8b5cf6", discount: 30, pointsMultiplier: 2 },
  }

  const loyaltyTiers = {
    bronze: { name: "Bronze", color: "#cd7f32", minPoints: 0 },
    silver: { name: "Silver", color: "#c0c0c0", minPoints: 500 },
    gold: { name: "Gold", color: "#ffd700", minPoints: 1000 },
    platinum: { name: "Platinum", color: "#e5e4e2", minPoints: 2000 },
  }

  const stats = {
    totalBookings: mockBookings.length,
    activeBookings: mockBookings.filter((b) => b.status === "active").length,
    totalRevenue: mockBookings.reduce((sum, b) => sum + b.totalAmount, 0),
    totalUsers: mockUsers.length,
    availableConsoles: mockInventory.filter((i) => i.status === "available").length,
    rentedConsoles: mockInventory.filter((i) => i.status === "rented").length,
    premiumMembers: mockUsers.length, // demo
    totalWalletBalance: mockUsers.reduce((sum, u) => sum + (u.wallet?.balance || 0), 0),
    totalLoyaltyPoints: mockUsers.reduce((sum, u) => sum + (u.loyaltyPoints?.current || 0), 0),
    averageOrderValue: mockBookings.reduce((sum, b) => sum + b.totalAmount, 0) / mockBookings.length,
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "delivered":
      case "available":
        return "status-success"
      case "pending":
      case "scheduled":
        return "status-warning"
      case "completed":
      case "returned":
        return "status-info"
      case "cancelled":
      case "maintenance":
        return "status-danger"
      default:
        return "status-default"
    }
  }

  const getMembershipColor = (tier) => {
    return membershipTiers[tier]?.color || "#6b7280"
  }

  const getLoyaltyTierColor = (tier) => {
    return loyaltyTiers[tier]?.color || "#6b7280"
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount) => {
    const n = Number(amount || 0)
    return `₹${n.toLocaleString()}`
  }

  const handleStatusUpdate = async (id, newStatus, type) => {
    if (type === "Booking") {
      try {
        await api.post(`/api/UpdateStatus/${id}`, { status: newStatus })
        GetBookingsOfUser()
        toast.success("Booking status updated")
      } catch (e) {
        toast.error(e.response?.data?.message || e.message || "Failed to update status")
      }
    }
  }

  const handleExport = (type) => {
    toast.success(`${type} data exported successfully! 📊`)
  }

  const handleWalletAction = (userId, action, amount = 0) => {
    switch (action) {
      case "topup":
        toast.success(`Wallet topped up with ${formatCurrency(amount)}! 💰`)
        break
      case "refund":
        toast.success(`Refund of ${formatCurrency(amount)} processed! 💸`)
        break
      case "freeze":
        toast.warning("Wallet frozen! ❄️")
        break
      case "unfreeze":
        toast.success("Wallet unfrozen! ✅")
        break
      default:
        break
    }
  }

  const handleLoyaltyAction = (userId, action, points = 0) => {
    switch (action) {
      case "add":
        toast.success(`${points} loyalty points added! ⭐`)
        break
      case "redeem":
        toast.success(`${points} loyalty points redeemed! 🎁`)
        break
      case "adjust":
        toast.info(`Loyalty points adjusted! 📊`)
        break
      default:
        break
    }
  }

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || user.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || order.deliveryStatus === filterStatus
    return matchesSearch && matchesStatus
  })

  const renderBookings = () => (
    <div className="bookings-section border-2">
      <div className="section-header" data-aos="fade-up">
        <h3>Bookings Management</h3>
        <div className="header-actions">
          <button className="btn-secondary hidden" onClick={() => handleExport("Bookings")}>
            Export 📊
          </button>
          <button className="btn-primary hidden">New Booking ➕</button>
        </div>
      </div>

      <div className="filters-section" data-aos="fade-up" data-aos-delay="100">
        <div className="search-box">
          <span className="search-icon ">🔍</span>
          <input
            type="search"
            name="bookingsearch"
            placeholder="Search bookings..."
            value={BookingInputValue}
            onChange={HandleSearch}
          />
        </div>
        <select onChange={HandleStatusFiltering} className="filter-select">
          <option defaultChecked value="all">
            All Status
          </option>
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <select onChange={(e) => HandleDateFilter(e.target.value)} className="filter-select">
          <option defaultChecked value="all">
            All Time
          </option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <div className="bookings-grid" data-aos="fade-up" data-aos-delay="200">
        {(BookingInputValue === "" ? BookingData : BookingSearchData)?.map((booking, index) => (
          <div key={booking._id || index} className="booking-card enhanced" data-aos="zoom-in" data-aos-delay={index * 100}>
            <div className="booking-header">
              <div className="booking-id">#{booking.bookingCode}</div>
              <div className={`booking-status ${getStatusColor(booking.status)}`}>{String(booking.status || "pending").toUpperCase()}</div>
            </div>

            <div className="booking-content">
              <div className="customer-info">
                <h4>{booking?.contactInfo?.name}</h4>
                <p>📧 {booking?.contactInfo?.email}</p>
                <p>📱 {booking?.contactInfo?.phone}</p>
                <p>🏠 {booking?.contactInfo?.address}</p>
              </div>

              <div className="booking-details">
                <div className="detail-row">
                  <span className="detail-label">Console:</span>
                  <span className="detail-value">{booking.selectedConsole}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Plan:</span>
                  <span className="detail-value">{booking.rentalPeriod}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span className="detail-value">
                    {formatDate(booking.startAt)} - {formatDate(booking.endAt)}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Time:</span>
                  <span className="detail-value">
                    {booking.startTime} - {booking.endTime}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment:</span>
                  <span className="detail-value">{booking.paymentMethod || "—"}</span>
                </div>
              </div>

              <div className="games-list">
                <strong>Selected Games ({booking?.selectedGames?.length || 0}):</strong>
                <ul>
                  {(booking?.selectedGames || []).map((game, idx) => (
                    <li key={idx}>{game}</li>
                  ))}
                </ul>
              </div>

              <div className="booking-metrics">
                <div className="metric-item">
                  <span className="metric-label">Amount:</span>
                  <span className="metric-value">{formatCurrency(booking.total)}</span>
                </div>
              </div>

              <div className="booking-footer relative">
                <div className="booking-actions">
                  <select
                    value={booking.status || "pending"}
                    onChange={(e) => handleStatusUpdate(booking._id, e.target.value, "Booking")}
                    className="status-select"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                  {/* Aadhaar viewer */}
                  {booking?.AdharImg ? (
                    <Link
                      to={`/showadhar/${encodeURIComponent(`Images/Aadhaar/${booking.AdharImg}`)}`}
                      className="font-semibold text-sm text-white bg-[#1F2937] px-3 py-1 rounded-xl absolute no-underline right-0"
                    >
                      Aadhaar
                    </Link>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderUsers = () => (
    <div className="users-section">
      <div className="section-header" data-aos="fade-up">
        <h3>Users Management</h3>
        <div className="header-actions">
          <button className="btn-secondary hidden" onClick={() => handleExport("Users")}>
            Export 📊
          </button>
          <button className="btn-primary hidden">Add User ➕</button>
        </div>
      </div>

      <div className="filters-section" data-aos="fade-up" data-aos-delay="100">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input type="text" name="usersearch" placeholder="Search users..." onChange={HandleSearch} />
        </div>
      </div>

      <div className="users-grid" data-aos="fade-up" data-aos-delay="200">
        {(BookingInputValue === "" ? UserData : SearchedUserData).map((user, index) => (
          <div key={user._id || index} className="user-card enhanced" data-aos="zoom-in" data-aos-delay={index * 100}>
            <div className="user-header relative">
              <div className="user-avatar">
                {(user?.name || "")
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            <div className="user-content">
              <h4>{user.name}</h4>
              <p>📧 {user.email}</p>
              <p>📱 {user.phone}</p>
              <p>🏠 {user.address}</p>

              <div className="user-actions">
                <Link to="/updateprofile" className="btn-secondary">
                  View Profile
                </Link>
                <button className="btn-outline hidden" onClick={() => toast.info(`Contacting ${user.name}`)}>
                  Contact
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  // Other sections kept as-is (mocked) ...

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return renderBookings()
      case "users":
        return renderUsers()
      default:
        return renderBookings()
    }
  }

  return (
    <div className="dashboard-page absolute top-0 right-0 w-[100%]">
      {/* Animated Background */}
      <div className="dashboard-background">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="dashboard-header md:z-0 z-30" data-aos="fade-down">
        <div className="header-content">
          <div className="logo">
            <div className="logo-text">RAPS</div>
          </div>
          <nav className="nav-links">
            <a href="/" className="nav-link">
              Home
            </a>
            <a href="/booking" className="nav-link">
              Book Now
            </a>
            <a href="/dashboard" className="nav-link active">
              Dashboard
            </a>
            <a href="/contact" className="nav-link">
              Contact Us
            </a>
          </nav>
          <img
            onClick={() => setIsSidebarOpen(true)}
            src={assets.menu_icon}
            className="menu-dash w-10 cursor-pointer absolute right-4 mb-6 sm:mb-0"
            alt="Menu"
          />
        </div>

        {/* Mobile Sidebar */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 h-[100vh] text-white z-50 p-6 flex flex-col gap-2"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3 }}
            >
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="flex items-center gap-3 px-6 py-4 hover:text-orange-500 transition text-left"
              >
                <img src={assets.dropdown_icon} className="h-5 w-5 rotate-180 object-contain" alt="Back" />
                <span className="text-lg font-medium">Back</span>
              </button>

              <nav className="dash-nav flex flex-col items-center justify-center gap-5">
                <a href="/" className="py-3 pl-6 border-t border-2 border-red-700 text-lg text-left no-underline transition text-white hover:text-orange-400">
                  Home
                </a>
                <a href="/booking" className="py-3 pl-6 border-t text-lg text-left no-underline transition text-white hover:text-orange-400">
                  Book Now
                </a>
                <a href="/dashboard" className="py-3 pl-6 border-t text-lg text-left no-underline transition text-white hover:text-orange-400">
                  Dashboard
                </a>
                <a href="/contact" className="py-3 pl-6 border-t text-lg text-left no-underline transition text-white hover:text-orange-400">
                  Contact Us
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <div className="dashboard-container z-20 min-h-screen">
        <div className="dashboard-hero" data-aos="fade-up">
          <h1 className="dashboard-title">ADMIN DASHBOARD</h1>
          <p className="dashboard-subtitle">
            Comprehensive management system with real-time insights, membership tracking, and loyalty rewards
          </p>
        </div>

        <div className="dashboard-nav" data-aos="fade-up" data-aos-delay="200">
          <div className="nav-tabs">
            <button className={`nav-tab ${activeTab === "bookings" ? "active" : ""}`} onClick={() => setActiveTab("bookings")}>
              <span className="tab-icon">📅</span>
              <span className="tab-text">Bookings</span>
            </button>
            <button className={`nav-tab ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>
              <span className="tab-icon">👥</span>
              <span className="tab-text">Users</span>
            </button>
          </div>
        </div>

        <div className="dashboard-content">{renderContent()}</div>
      </div>
    </div>
  )
}

export default Dashboard