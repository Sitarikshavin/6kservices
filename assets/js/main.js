/**
* Template Name: Selecao
* Template URL: https://bootstrapmade.com/selecao-bootstrap-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }
  
// Update these URLs to your SMS/OTP API endpoints
const SMS_API_URL = "https://your-backend.example.com/send-otp";
const VERIFY_API_URL = "https://your-backend.example.com/verify-otp";

document.addEventListener('DOMContentLoaded', function () {
  const otpForm = document.getElementById('otpForm');
  const mobileInput = document.getElementById('loginMobile');
  const otpInputDiv = document.getElementById('otpInputDiv');
  const otpInput = document.getElementById('loginOTP');
  const sendOtpBtn = document.getElementById('sendOtpBtn');
  const verifyOtpBtn = document.getElementById('verifyOtpBtn');
  const otpError = document.getElementById('otpError');

  function showError(msg) {
    otpError.innerText = msg;
    otpError.style.display = 'block';
  }
  function clearError() {
    otpError.innerText = '';
    otpError.style.display = 'none';
  }

  sendOtpBtn.addEventListener('click', function () {
    clearError();
    const mobile = mobileInput.value.trim();
    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      showError("Enter a valid 10-digit Indian mobile number.");
      return;
    }
    sendOtpBtn.disabled = true;
    sendOtpBtn.innerText = "Sending...";
    // Call SMS API (implement server-side for security)
    fetch(SMS_API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile})
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        otpInputDiv.classList.remove("d-none");
        verifyOtpBtn.classList.remove("d-none");
        sendOtpBtn.classList.add("d-none");
      } else {
        showError(data.error || "Failed to send OTP. Try again.");
      }
    })
    .catch(()=>showError("Could not send OTP."))
    .finally(()=>{
      sendOtpBtn.disabled = false;
      sendOtpBtn.innerText = "Send OTP";
    });
  });

  otpForm.addEventListener('submit', function(e){
    e.preventDefault();
    clearError();
    const mobile = mobileInput.value.trim();
    const otp = otpInput.value.trim();
    if (!/^[0-9]{6}$/.test(otp)) {
      showError("Enter a valid 6-digit OTP.");
      return;
    }
    verifyOtpBtn.disabled = true;
    verifyOtpBtn.innerText = "Verifying...";
    fetch(VERIFY_API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({mobile, otp})
    })
    .then(res=>res.json())
    .then(data=>{
      if (data.verified) {
        // Success: Grant access, close modal, etc.
        alert("Login successful!");
        var otpModal = bootstrap.Modal.getInstance(document.getElementById('otpLoginModal'));
        otpModal.hide();
        otpForm.reset();
        otpInputDiv.classList.add("d-none");
        verifyOtpBtn.classList.add("d-none");
        sendOtpBtn.classList.remove("d-none");
      } else {
        showError(data.error || "Incorrect OTP!");
      }
    })
    .catch(()=>showError("OTP verification failed."))
    .finally(()=>{
      verifyOtpBtn.disabled = false;
      verifyOtpBtn.innerText = "Verify OTP";
    });
  });
});
  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
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
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
