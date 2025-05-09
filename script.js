document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll(".page-section");
  const serviceItems = document.querySelectorAll(".service-item");
  const form = document.querySelector("form");

  // Sticky header
  window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
      header.style.background = "rgba(74, 144, 226, 0.95)";
      header.style.padding = "0.5rem 5%";
    } else {
      header.style.background = "rgba(74, 144, 226, 0.9)";
      header.style.padding = "1rem 5%";
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      });
    });
  });

  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Service items hover effect
  serviceItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("bounce");
    });

    item.addEventListener("animationend", () => {
      item.classList.remove("bounce");
    });
  });

  // Parallax effect for hero section
  window.addEventListener("scroll", () => {
    const hero = document.querySelector(".hero");
    const scrollPosition = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrollPosition * 0.7}px`;
  });

  // Form submission with animation
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const submitButton = form.querySelector("button[type='submit']");

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch("/submit-form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });

      const result = await response.json();

      if (result.success) {
        submitButton.textContent = "Sent!";
        submitButton.classList.add("success");
        form.reset();

        setTimeout(() => {
          submitButton.textContent = "Send Message";
          submitButton.classList.remove("success");
          submitButton.disabled = false;
        }, 3000);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Error:", error);
      submitButton.textContent = "Error";
      submitButton.classList.add("error");

      setTimeout(() => {
        submitButton.textContent = "Send Message";
        submitButton.classList.remove("error");
        submitButton.disabled = false;
      }, 3000);
    }
  });

  // Typing effect for hero subtitle
  const heroSubtitle = document.querySelector(".hero p");
  const text = heroSubtitle.textContent;
  heroSubtitle.textContent = "";

  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      heroSubtitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  setTimeout(typeWriter, 1000);

  // Counter animation for years of experience
  const counters = document.querySelectorAll(".counter");
  counters.forEach((counter) => {
    const target = +counter.getAttribute("data-target");
    const increment = target / 200;

    function updateCounter() {
      const count = +counter.innerText;
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(updateCounter, 10);
      } else {
        counter.innerText = target;
      }
    }

    updateCounter();
  });
});
