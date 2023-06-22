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
      const item = control.closest("li");
      const icon = item.querySelector(".faq__icon");
      const isActive = item.classList.contains("faq__item--active");
      
      icon.classList.remove("faq__icon--pressed");
      item.classList.remove("faq__item--active");

      const text = item.querySelector(".faq__body");

      setTimeout(() => {
        text.classList.remove("faq__body--expanded");
      });

      if (!isActive) {
       
        item.classList.add("faq__item--active");
        icon.classList.add("faq__icon--pressed")
        const text = item.querySelector(".faq__body");

        setTimeout(() => {
          text.classList.add("faq__body--expanded");
        });
      }
    });
  });

  // expanding services

  const servicesButton = document.querySelector("[data-js=services_expander]");
  const expandableServices = document.querySelector(
    ".services__list--expandable"
  );
  servicesButton.addEventListener("click", () => {
    expandableServices.classList.add("services__list--expanded");
    servicesButton.style.opacity = 0;
  });

  // popups

  const callbackPopupButtons = document.querySelectorAll(
    "[data-js=callback_popup_trigger]"
  );
  const messagePopupButtons = document.querySelectorAll(
    "[data-js=message_popup_trigger]"
  );
  const popupCloseButtons = document.querySelectorAll(".popup__close");

  const popupOverlay = document.querySelector(".overlay");
  popupOverlay.style.display = "none";
  popupOverlay.style.opacity = 0;
  document.querySelectorAll(".popup").forEach((popup) => {
    popup.style.display = "none";
  });

  callbackPopupButtons.forEach(callPopup);
  messagePopupButtons.forEach(callPopup);
  popupCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".popup").style.display = "none";
      popupOverlay.style.opacity = "0";
      setTimeout(() => {
        popupOverlay.style.display = "none";
      }, 300);
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    });
  });

  function callPopup(button) {
    button.addEventListener("click", (e) => {
      const popupType = button.dataset.js.split("_")[0];
      const popup = document.querySelector("#" + popupType);

      popup.style.display = "";
      popupOverlay.style.display = "block";
      setTimeout(() => {
        popupOverlay.style.opacity = "1";
      }, 10);
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "16px";
    });
  }
});
