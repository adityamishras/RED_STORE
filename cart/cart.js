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


      // --- Core Cart Logic ---

      const cartItemsBody = document.getElementById("cart-items-body");
      const subtotalDisplay = document.getElementById("cart-subtotal");
      const taxDisplay = document.getElementById("cart-tax");
      const grandTotalDisplay = document.getElementById("cart-grand-total");
      const TAX_RATE = 0.025; // 2.5% tax rate

      /**
       * Parses a monetary value string (e.g., "Rs 2000") into a number.
       * @param {string} text - The text to parse.
       * @returns {number} - The numeric price.
       */
      function parsePrice(text) {
        return parseFloat(text.replace(/Rs/g, "").trim());
      }

      /**
       * Formats a number back into a currency string (e.g., "Rs 4050").
       * @param {number} value - The numeric value.
       * @returns {string} - The formatted currency string.
       */
      function formatPrice(value) {
        return "Rs " + Math.round(value).toLocaleString();
      }

      /**
       * Calculates and updates all cart totals.
       */
      function updateCartTotal() {
        let cartSubtotal = 0;
        const itemRows = cartItemsBody.querySelectorAll("tr");

        itemRows.forEach((row) => {
          const pricePerUnit = parseFloat(row.dataset.price);
          const quantityInput = row.querySelector(".quantity-input");
          const subtotalCell = row.querySelector(".subtotal-display");

          // Ensure quantity is at least 1 and an integer
          let quantity = parseInt(quantityInput.value);
          if (isNaN(quantity) || quantity < 1) {
            quantity = 1;
            quantityInput.value = 1;
          }

          const itemSubtotal = pricePerUnit * quantity;
          cartSubtotal += itemSubtotal;

          // Update the subtotal display for the specific item
          subtotalCell.textContent = formatPrice(itemSubtotal);
        });

        // Calculate Tax and Grand Total
        const taxAmount = cartSubtotal * TAX_RATE;
        const grandTotal = cartSubtotal + taxAmount;

        // Update Summary Table
        subtotalDisplay.textContent = formatPrice(cartSubtotal);
        taxDisplay.textContent = formatPrice(taxAmount);
        grandTotalDisplay.textContent = formatPrice(grandTotal);
      }

      /**
       * Handles the removal of a cart item row.
       */
      function setupRemoveButtons() {
        document.querySelectorAll(".remove-item").forEach((button) => {
          button.addEventListener("click", (event) => {
            // Find the closest parent <tr> element
            const rowToRemove = event.target.closest("tr");
            if (rowToRemove) {
              rowToRemove.remove();
              // Recalculate totals after removal
              updateCartTotal();
            }
          });
        });
      }

      // --- Page Initialization ---
      document.addEventListener("DOMContentLoaded", () => {
        // Initial calculation on page load
        updateCartTotal();
        // Set up event listeners for removing items
        setupRemoveButtons();
      });

      // --- Utility Scripts (from previous pages) ---

      // Mobile Menu Toggle Script
      const menuToggle = document.getElementById("toggleMenu");
      const menuItems = document.getElementById("Menuitem");

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

      // Dark Mode Toggle Script
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