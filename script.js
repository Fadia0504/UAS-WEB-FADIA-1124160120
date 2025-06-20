// ===== DATA & VARIABEL GLOBAL =====
let transactions = [];
let transactionIdCounter = 1;
let currentDiscount = 0;
let appliedPromoCode = "";
let isDarkMode = false;

//Dark Mode 
class DarkModeManager {
  constructor() {
    this.darkModeToggle = document.getElementById("darkModeToggle");
    this.htmlElement = document.documentElement;
    this.userPreference = null;
    this.init();
  }

  init() {
    const savedPreference = localStorage.getItem("darkMode");

    if (savedPreference !== null) {
      this.userPreference = savedPreference === "true";
    } else {
      this.userPreference = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
    }

    if (this.userPreference) {
      this.enableDarkMode();
    } else {
      this.disableDarkMode();
    }

    // Event listener untuk toggle button
    this.darkModeToggle.addEventListener("click", () => {
      this.toggleDarkMode();
    });

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (this.userPreference === null) {
          if (e.matches) {
            this.enableDarkMode();
          } else {
            this.disableDarkMode();
          }
        }
      });
  }

  enableDarkMode() {
    this.htmlElement.classList.add("dark");
    isDarkMode = true;
  }

  disableDarkMode() {
    this.htmlElement.classList.remove("dark");
    isDarkMode = false;
  }

  toggleDarkMode() {
    if (this.htmlElement.classList.contains("dark")) {
      this.disableDarkMode();
      this.userPreference = false;
    } else {
      this.enableDarkMode();
      this.userPreference = true;
    }

    // Set Dark Mode sesuai preferensi user
    localStorage.setItem("darkMode", this.userPreference.toString());
  }
}

const promoCodes = {
        'PROMAX': { discount: 10, type: 'percentage', description: 'Selamat anda mendapatkan sebesar Diskon 10%'},
        'MANTAP': { discount: 20000, type: 'fixed', description: 'Selamat anda mendapatkan sebesar Potongan 20.000'},
        'PELAJARINDO': { discount: 20, type: 'percentage', description: 'Selamat anda mendapatkan sebesar Diskon 20%'},
};