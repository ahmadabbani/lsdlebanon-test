(function () {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll(".navmenu .toggle-dropdown").forEach((navmenu) => {
    navmenu.addEventListener("click", function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle("active");
      this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
      e.stopImmediatePropagation();
    });
  });

  /* active class to the active nav link*/
  document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll("#navmenu ul li a");

    // Get the current URL path (without query params)
    const currentPath = window.location.pathname;

    navLinks.forEach((link) => {
      // Remove 'active' class from all links
      link.classList.remove("active");

      // Get the link's href (without query params)
      const linkHref = new URL(link.href).pathname;

      // Handle the 'Home' page
      if (
        (currentPath === "/" && link.getAttribute("href") === "/") || // Root path (home page)
        (currentPath === "/index.html" && link.getAttribute("href") === "/") // In case index.html is accessed directly
      ) {
        link.classList.add("active");
      }
      // Handle the 'Projects' page and any project-related pages (e.g., project-details.html)
      else if (
        (currentPath === "/projects.html" &&
          link.getAttribute("href") === "projects.html") ||
        (currentPath.startsWith("/project-details.html") &&
          link.getAttribute("href") === "projects.html")
      ) {
        link.classList.add("active");
      }
      // Handle the 'Programms' page and any program-related pages (e.g., program-details.html)
      else if (
        (currentPath === "/programms.html" &&
          link.getAttribute("href") === "programms.html") ||
        (currentPath.startsWith("/program-details.html") &&
          link.getAttribute("href") === "programms.html")
      ) {
        link.classList.add("active");
      }
      // Handle other pages (About, Contact, etc.)
      else if (currentPath === "/" + link.getAttribute("href")) {
        link.classList.add("active");
      }
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /*location*/
  document.querySelectorAll(".card-clickable").forEach((card) => {
    card.addEventListener("click", function () {
      const url = this.getAttribute("data-url");
      if (url.includes("wa.me") || url.includes("maps.google.com")) {
        window.open(url, "_blank"); // Open in a new tab
      } else {
        window.location.href = url; // Open in the same tab for other URLs
      }
    });
  });

  /**
   * Init swiper tabs sliders
   */
  function initSwiperTabs() {
    document
      .querySelectorAll(".init-swiper-tabs")
      .forEach(function (swiperElement) {
        let config = JSON.parse(
          swiperElement.querySelector(".swiper-config").innerHTML.trim()
        );

        const dotsContainer = swiperElement
          .closest("section")
          .querySelector(".js-custom-dots");
        if (!dotsContainer) return;

        const customDots = dotsContainer.querySelectorAll("a");

        // Remove the default pagination setting
        delete config.pagination;

        const swiperInstance = new Swiper(swiperElement, config);

        swiperInstance.on("slideChange", function () {
          updateSwiperTabsPagination(swiperInstance, customDots);
        });

        customDots.forEach((dot, index) => {
          dot.addEventListener("click", function (e) {
            e.preventDefault();
            swiperInstance.slideToLoop(index);
            updateSwiperTabsPagination(swiperInstance, customDots);
          });
        });

        updateSwiperTabsPagination(swiperInstance, customDots);
      });
  }

  /*donation form*/
  document
    .getElementById("donationSelect")
    .addEventListener("change", function () {
      const customAmountRow = document.getElementById("customAmountRow");
      const customAmountInput = document.getElementById("customAmountInput");

      if (this.value === "custom") {
        customAmountRow.style.display = "flex"; // Show custom amount input
        customAmountInput.value = ""; // Clear previous value
      } else {
        customAmountRow.style.display = "none"; // Hide custom amount input
      }
    });

  document
    .getElementById("donationForm")
    .addEventListener("submit", function (event) {
      const nameInput = document.getElementById("nameInput");
      const emailInput = document.getElementById("emailInput");
      const donationSelect = document.getElementById("donationSelect");
      const customAmountInput = document.getElementById("customAmountInput");
      const errorMessages = document.getElementById("errorMessages");

      let errors = []; // Collect errors

      // Validate Name
      if (nameInput.value.trim().length < 3) {
        errors.push("Name must be at least 3 characters long.");
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        errors.push("Please enter a valid email address.");
      }

      // Validate Donation Amount
      if (donationSelect.value === "custom") {
        if (!customAmountInput.value || customAmountInput.value <= 0) {
          errors.push("Please enter a valid custom donation amount.");
        }
      } else if (!donationSelect.value) {
        errors.push("Please select a donation amount.");
      }

      // Display Errors or Submit Form
      if (errors.length > 0) {
        event.preventDefault(); // Stop form submission
        errorMessages.innerHTML = `<ul>${errors
          .map((err) => `<li>${err}</li>`)
          .join("")}</ul>`;
      } else {
        errorMessages.innerHTML = ""; // Clear errors if valid
      }
    });

  function updateSwiperTabsPagination(swiperInstance, customDots) {
    const activeIndex = swiperInstance.realIndex;
    customDots.forEach((dot, index) => {
      if (index === activeIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  window.addEventListener("load", initSwiperTabs);

  /**
   * Initiate glightbox
   */
  const lightbox = GLightbox({
    selector: ".glightbox",
    closeIcon: true,
  });
  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll(".isotope-layout").forEach(function (isotopeItem) {
    let layout = isotopeItem.getAttribute("data-layout") ?? "masonry";
    let filter = isotopeItem.getAttribute("data-default-filter") ?? "*";
    let sort = isotopeItem.getAttribute("data-sort") ?? "original-order";

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector(".isotope-container"), function () {
      initIsotope = new Isotope(
        isotopeItem.querySelector(".isotope-container"),
        {
          itemSelector: ".isotope-item",
          layoutMode: layout,
          filter: filter,
          sortBy: sort,
        }
      );
    });

    isotopeItem
      .querySelectorAll(".isotope-filters li")
      .forEach(function (filters) {
        filters.addEventListener(
          "click",
          function () {
            isotopeItem
              .querySelector(".isotope-filters .filter-active")
              .classList.remove("filter-active");
            this.classList.add("filter-active");
            initIsotope.arrange({
              filter: this.getAttribute("data-filter"),
            });
            if (typeof aosInit === "function") {
              aosInit();
            }
          },
          false
        );
      });
  });
})();
