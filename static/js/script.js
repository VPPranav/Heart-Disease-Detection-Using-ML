// script.js

document.addEventListener("DOMContentLoaded", () => {
    // Fade in animation for containers
    const container = document.querySelector(".container, .login-card, .app-container")
    if (container) {
      container.style.opacity = 0
      setTimeout(() => {
        container.style.transition = "opacity 0.8s ease-in-out"
        container.style.opacity = 1
      }, 100)
    }
  
    // Form validation
    const forms = document.querySelectorAll("form")
    forms.forEach((form) => {
      form.addEventListener("submit", (event) => {
        const requiredInputs = form.querySelectorAll("[required]")
        let isValid = true
  
        requiredInputs.forEach((input) => {
          if (input.value.trim() === "") {
            isValid = false
            showInputError(input, "This field is required")
            input.focus()
          } else {
            clearInputError(input)
          }
        })
  
        // Validate numeric inputs
        const numericInputs = form.querySelectorAll('input[type="number"]')
        numericInputs.forEach((input) => {
          if (input.value.trim() !== "") {
            const min = input.getAttribute("min")
            const max = input.getAttribute("max")
            const value = Number.parseFloat(input.value)
  
            if (min && value < Number.parseFloat(min)) {
              isValid = false
              showInputError(input, `Value must be at least ${min}`)
            } else if (max && value > Number.parseFloat(max)) {
              isValid = false
              showInputError(input, `Value must be at most ${max}`)
            }
          }
        })
  
        if (!isValid) {
          event.preventDefault()
        }
      })
    })
  
    // Show/hide password toggle
    const passwordToggle = document.querySelector(".password-toggle")
    if (passwordToggle) {
      passwordToggle.addEventListener("click", togglePassword)
    }
  
    // Initialize tooltips for form fields
    initializeTooltips()
  
    // Initialize mobile menu toggle
    initializeMobileMenu()
  
    // Initialize risk trend chart if on history page
    initializeRiskTrendChart()
  
    // Initialize videos page functionality
    initializeVideos()
  
    // Initialize lifestyle tracker
    initializeLifestyleTracker()
  })
  
  // Show input error message
  function showInputError(input, message) {
    const formGroup = input.closest(".form-group")
    let errorElement = formGroup.querySelector(".error-feedback")
  
    if (!errorElement) {
      errorElement = document.createElement("div")
      errorElement.className = "error-feedback"
      errorElement.style.color = "var(--danger-color)"
      errorElement.style.fontSize = "0.875rem"
      errorElement.style.marginTop = "0.25rem"
      formGroup.appendChild(errorElement)
    }
  
    errorElement.textContent = message
    input.style.borderColor = "var(--danger-color)"
  }
  
  // Clear input error
  function clearInputError(input) {
    const formGroup = input.closest(".form-group")
    const errorElement = formGroup.querySelector(".error-feedback")
  
    if (errorElement) {
      errorElement.remove()
    }
  
    input.style.borderColor = ""
  }
  
  // Toggle password visibility
  function togglePassword() {
    const passwordInput = document.getElementById("password")
    const passwordToggle = document.querySelector(".password-toggle i")
  
    if (passwordInput && passwordToggle) {
      if (passwordInput.type === "password") {
        passwordInput.type = "text"
        passwordToggle.classList.remove("fa-eye")
        passwordToggle.classList.add("fa-eye-slash")
      } else {
        passwordInput.type = "password"
        passwordToggle.classList.remove("fa-eye-slash")
        passwordToggle.classList.add("fa-eye")
      }
    }
  }
  
  // Initialize tooltips for form fields
  function initializeTooltips() {
    const tooltipContainers = document.querySelectorAll(".tooltip-container")
    tooltipContainers.forEach((container) => {
      const input = container.querySelector("input, select")
      const tooltip = container.querySelector(".tooltip")
  
      if (input && tooltip) {
        input.addEventListener("focus", () => {
          tooltip.style.opacity = "1"
          tooltip.style.visibility = "visible"
        })
  
        input.addEventListener("blur", () => {
          tooltip.style.opacity = "0"
          tooltip.style.visibility = "hidden"
        })
      }
    })
  }
  
  // Initialize mobile menu
  function initializeMobileMenu() {
    const navbar = document.querySelector(".navbar")
    if (navbar) {
      const mobileMenuButton = document.createElement("button")
      mobileMenuButton.className = "mobile-menu-button"
      mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>'
      mobileMenuButton.style.display = "none"
  
      const navLinks = document.querySelector(".nav-links")
  
      if (window.innerWidth <= 768 && navLinks) {
        mobileMenuButton.style.display = "block"
        navLinks.style.display = "none"
        navbar.insertBefore(mobileMenuButton, navLinks)
  
        mobileMenuButton.addEventListener("click", () => {
          if (navLinks.style.display === "none") {
            navLinks.style.display = "flex"
            navLinks.style.flexDirection = "column"
            mobileMenuButton.innerHTML = '<i class="fas fa-times"></i>'
          } else {
            navLinks.style.display = "none"
            mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>'
          }
        })
      }
  
      window.addEventListener("resize", () => {
        if (window.innerWidth <= 768) {
          if (!document.querySelector(".mobile-menu-button")) {
            navbar.insertBefore(mobileMenuButton, navLinks)
          }
          mobileMenuButton.style.display = "block"
          navLinks.style.display = "none"
        } else {
          mobileMenuButton.style.display = "none"
          navLinks.style.display = "flex"
          navLinks.style.flexDirection = "row"
        }
      })
    }
  }
  
  // Initialize risk trend chart on history page
  function initializeRiskTrendChart() {
    const chartCanvas = document.getElementById("riskTrendChart")
    if (chartCanvas && typeof Chart !== "undefined") {
      // Sample data - in a real app, this would come from the backend
      const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Risk Score",
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      }
  
      new Chart(chartCanvas, {
        type: "line",
        data: data,
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              title: {
                display: true,
                text: "Risk Score",
              },
            },
            x: {
              title: {
                display: true,
                text: "Month",
              },
            },
          },
        },
      })
    }
  }
  
  // Function to view prediction details
  function viewDetails(predictionId) {
    alert(`Viewing details for prediction ${predictionId}`)
    // In a real app, this would open a modal or navigate to a details page
  }
  
  // Function to delete prediction
  function deletePrediction(predictionId) {
    if (confirm(`Are you sure you want to delete prediction ${predictionId}?`)) {
      alert(`Prediction ${predictionId} deleted`)
      // In a real app, this would send a request to the server
    }
  }
  
  // Initialize videos page functionality
  function initializeVideos() {
    const videosContainer = document.querySelector(".videos-container")
    if (!videosContainer) return
  
    const categoryButtons = document.querySelectorAll(".category-btn")
    const videoCards = document.querySelectorAll(".video-card")
    const emptyState = document.querySelector(".videos-empty")
  
    // Filter videos by category
    function filterVideos(category) {
      let visibleCount = 0
  
      videoCards.forEach((card) => {
        if (category === "all" || card.dataset.category === category) {
          card.style.display = "block"
          visibleCount++
        } else {
          card.style.display = "none"
        }
      })
  
      // Show/hide empty state
      if (visibleCount === 0 && emptyState) {
        emptyState.style.display = "flex"
      } else if (emptyState) {
        emptyState.style.display = "none"
      }
    }
  
    // Add event listeners to category buttons
    categoryButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Remove active class from all buttons
        categoryButtons.forEach((btn) => btn.classList.remove("active"))
        
        // Add active class to clicked button
        button.classList.add("active")
        
        // Filter videos
        filterVideos(button.dataset.category)
      })
    })
  
    // Handle video suggestion form
    const suggestionForm = document.querySelector(".suggestion-form")
    if (suggestionForm) {
      suggestionForm.addEventListener("submit", (e) => {
        e.preventDefault()
        alert("Thank you for your suggestion! We'll review it soon.")
        suggestionForm.reset()
      })
    }
  }
  
  // Reset video filters
  function resetVideoFilters() {
    const allButton = document.querySelector('.category-btn[data-category="all"]')
    if (allButton) {
      allButton.click()
    }
  }
  
  // Initialize lifestyle tracker
  function initializeLifestyleTracker() {
    const saveButton = document.getElementById("save-tracker")
    if (!saveButton) return
  
    // Load saved tracker data from localStorage
    const trackerItems = document.querySelectorAll(".tracker-item input[type='checkbox']")
    const savedData = localStorage.getItem("lifestyleTracker")
    
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      trackerItems.forEach((item) => {
        if (parsedData[item.id]) {
          item.checked = true
        }
      })
    }
  
    // Save tracker data to localStorage
    saveButton.addEventListener("click", () => {
      const data = {}
      trackerItems.forEach((item) => {
        data[item.id] = item.checked
      })
      
      localStorage.setItem("lifestyleTracker", JSON.stringify(data))
      alert("Your progress has been saved!")
    })
  }