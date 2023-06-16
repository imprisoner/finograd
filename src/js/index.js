import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";

document.addEventListener("DOMContentLoaded", (e) => {
  // slider
  document.querySelectorAll(".splide").forEach((item) => {
    const speed = item.dataset.js === "forward" ? 0.5 : -0.5;

    new Splide(item, {
      type: "loop",
      drag: "free",
      focus: "center",
      perPage: 4,
      fixedWidth: "386px",
      gap: "20px",
      arrows: false,
      pagination: false,
      autoScroll: {
        speed,
      },
      breakpoints: {
        1024: {
          fixedWidth: "168px",
          gap: "8px",
        },
      },
    }).mount({ AutoScroll });
  });

  // faq expanding text

  const faqControls = document.querySelectorAll("[data-js=faq_control]");

  faqControls.forEach((control) => {
    control.addEventListener("click", () => {
      const isActive = control.classList.contains("faq__icon--pressed");
      
      control.classList.remove("faq__icon--pressed");
      const text = control.closest("li").querySelector(".faq__body");
      setTimeout(() => {
        text.classList.remove("faq__body--expanded");
      });

      if (!isActive) {
        control.classList.add("faq__icon--pressed");

        const text = control.closest("li").querySelector(".faq__body");

        setTimeout(() => {
          text.classList.add("faq__body--expanded");
        });
      }

    });
  });

  // expanding services

  const servicesButton = document.querySelector("[data-js=services_expander]")
  const expandableServices = document.querySelector(".services__list--expandable")
  servicesButton.addEventListener("click", () => {
    expandableServices.classList.add("services__list--expanded")
    servicesButton.style.opacity = 0
  })

  // menu anchor scroll
});
