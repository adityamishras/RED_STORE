tailwind.config = {
  darkMode: "class", // Enables dark mode based on the 'dark' class on the HTML tag
  theme: {
    extend: {
      colors: {
        "primary-red": "#FF4545", // Bright red for accents
        "dark-bg": "#1a202c", // Dark background for dark mode
        "dark-card": "#2d3748", // Card background in dark mode
        "light-bg": "#f7fafc", // Light background
        "light-card": "#ffffff", // Card background in light mode
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
};

// --- Mobile Menu Toggle Script ---
const menuToggle = document.getElementById("toggleMenu");
const menuItems = document.getElementById("Menuitem");

// Initial check for mobile menu state
let isMenuOpen = false;

menuToggle.addEventListener("click", () => {
  if (isMenuOpen) {
    menuItems.style.maxHeight = "0px";
    isMenuOpen = false;
  } else {
    menuItems.style.maxHeight = menuItems.scrollHeight + "px";
    isMenuOpen = true;
  }
});

// --- Dark Mode Toggle Script ---
const darkModeToggle = document.getElementById("darkModeToggle");
const htmlElement = document.documentElement;

if (
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  htmlElement.classList.add("dark");
  htmlElement.classList.remove("light");
} else {
  htmlElement.classList.add("light");
  htmlElement.classList.remove("dark");
}

darkModeToggle.addEventListener("click", () => {
  if (htmlElement.classList.contains("dark")) {
    htmlElement.classList.remove("dark");
    htmlElement.classList.add("light");
    localStorage.theme = "light";
  } else {
    htmlElement.classList.add("dark");
    htmlElement.classList.remove("light");
    localStorage.theme = "dark";
  }
});

// --- Product Image Gallery Script ---
const mainimage = document.getElementById("mainimage");
const smallimgs = document.getElementsByClassName("smallimg");

Array.from(smallimgs).forEach((img, index) => {
  img.onclick = function () {
    // Change the main image source
    mainimage.src = img.src;

    // Update border to show which image is currently selected
    Array.from(smallimgs).forEach((i) =>
      i.classList.remove("border-primary-red", "border-transparent")
    );

    // Add red border to the clicked image
    img.classList.add("border-primary-red");
  };

  // Set the initial border for the first image
  if (index === 0) {
    img.classList.add("border-primary-red");
  } else {
    img.classList.add("border-transparent");
  }
});
