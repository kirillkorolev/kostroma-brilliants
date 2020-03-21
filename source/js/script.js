"use strict";

(function() {
  var pageHeader = document.querySelector(".page-header");
  var menuToggle = pageHeader.querySelector(".js-menu-toggle");
  var catalog = document.querySelector(".catalog");
  var service = document.querySelector(".service");

  var catalogItems = catalog.querySelectorAll(".catalog__item");
  var serviceItems = service.querySelectorAll(".service__item");
  var previousItemButton = catalog.querySelector(
    ".catalog__controls--previous"
  );
  var nextItemButton = catalog.querySelector(".catalog__controls--next");
  var previousServiceButton = service.querySelector(
    ".service__button--previous"
  );
  var nextServiceButton = service.querySelector(".service__button--next");
  var currentSlide = 0;

  var questions = document.querySelector(".questions");
  var inputName = questions.querySelector(".js-input-name");
  var inputEmail = questions.querySelector(".js-input-email");
  var inputMessage = questions.querySelector(".js-text-message");
  var inputNameTitle = questions.querySelector(".questions__title-name");
  var inputEmailTitle = questions.querySelector(".questions__title-email");
  var inputMessageTitle = questions.querySelector(".questions__title-message");
  var message = questions.querySelector(".js-text-message");
  var confirmationCheckbox = questions.querySelector(
    ".js-confirmation-checkbox"
  );
  var confirmationMailingCheckbox = questions.querySelector(
    ".js-mailing-checkbox"
  );
  var submitButton = questions.querySelector(".js-submit-button");

  var errors = {
    noname: "введите имя",
    noemail: "введите адрес почты",
    noconfirmation: "подтвердите согласие"
  };

  var successModal = document.querySelector(".success");
  var closeSuccessButton = document.querySelector(".js-close-success-button");
  var blackout = document.querySelector(".blackout");
  var ESC_KEYCODE = 27;
  var htmlGlobal = document.querySelector("html");
  var bodyGlobal = document.querySelector("body");

  menuToggle.addEventListener("click", function() {
    pageHeader.classList.toggle("page-header--menu-closed");
  });

  var goToNextItem = function(n) {
    catalogItems[currentSlide].classList.remove("catalog__item--showing-slide");
    currentSlide = (n + catalogItems.length) % catalogItems.length;
    catalogItems[currentSlide].classList.add("catalog__item--showing-slide");
  };

  var goToNextService = function(n) {
    serviceItems[currentSlide].classList.remove("service__item--showing-slide");
    currentSlide = (n + serviceItems.length) % serviceItems.length;
    serviceItems[currentSlide].classList.add("service__item--showing-slide");
  };

  previousItemButton.addEventListener("click", function() {
    goToNextItem(currentSlide - 1);
  });

  nextItemButton.addEventListener("click", function() {
    goToNextItem(currentSlide + 1);
  });

  previousServiceButton.addEventListener("click", function() {
    goToNextService(currentSlide - 1);
  });

  nextServiceButton.addEventListener("click", function() {
    goToNextService(currentSlide + 1);
  });

  inputName.onblur = function() {
    inputNameTitle.classList.add("questions__title-name--visible");
  };

  inputName.onfocus = function() {
    inputNameTitle.classList.remove("questions__title-name--visible");
  };

  inputEmail.onblur = function() {
    inputEmailTitle.classList.add("questions__title-email--visible");
  };

  inputEmail.onfocus = function() {
    inputEmailTitle.classList.remove("questions__title-email--visible");
  };

  inputMessage.onblur = function() {
    inputMessageTitle.classList.add("questions__title-message--visible");
  };

  inputMessage.onfocus = function() {
    inputMessageTitle.classList.remove("questions__title-message--visible");
  };

  var validateFilling = function(input, errorType) {
    var filling = input.value;

    if (!filling) {
      input.setCustomValidity(errorType);
      input.classList.add("questions__input--error");
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains("questions__input--error")) {
        input.classList.remove("questions__input--error");
      }
      return true;
    }
  };

  var validateEmail = function(input, errorType) {
    var mail = input.value;
    var regEx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (regEx.test(mail) === false) {
      input.setCustomValidity(errorType);
      input.classList.add("questions__input--error");
      return false;
    } else {
      input.setCustomValidity("");
      input.classList.remove("questions__input--error");
      return true;
    }
  };

  var validateCheckbox = function(input, errorType) {
    if (input.checked === false) {
      input.setCustomValidity(errorType);
      input.classList.add("questions__checkbox--error");
      return false;
    } else {
      input.setCustomValidity("");
      if (input.classList.contains("questions__checkbox--error")) {
        input.classList.remove("questions__checkbox--error");
      }
      return true;
    }
  };

  var resetForm = function() {
    inputName.value = "";
    inputEmail.value = "";
    message.value = "";
    confirmationCheckbox.checked = false;
    confirmationMailingCheckbox.checked = false;
  };

  var confirmation = function(checkbox) {
    checkbox.checked = true;
  };

  confirmation(confirmationCheckbox);

  var openModal = function(modal, hiddenClass) {
    if (!pageHeader.classList.contains("page-header--menu-closed")) {
      pageHeader.classList.add("page-header--menu-closed");
    }
    if (modal.classList.contains(hiddenClass)) {
      modal.classList.remove(hiddenClass);
      document.addEventListener("keydown", closeModalOnEscPress);
      blackout.addEventListener("click", closeModalOnButtonClick);
      showBlackout();

      htmlGlobal.style.paddingLeft = "17px";
      bodyGlobal.style.overflow = "hidden";
      bodyGlobal.style.touchAction = "none";
    }
  };

  var closeModal = function(modal, className) {
    modal.classList.add(className);
    document.removeEventListener("keydown", closeModalOnEscPress);
    blackout.removeEventListener("click", closeModalOnButtonClick);
    hideBlackout();

    htmlGlobal.style.paddingLeft = "";
    bodyGlobal.style.overflow = "";
    bodyGlobal.style.touchAction = "";

    resetForm();
  };

  var closeModalOnEscPress = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closeModal(successModal, "success--hidden");
    }
  };

  var closeModalOnButtonClick = function() {
    blackout.addEventListener(
      "click",
      closeModal(successModal, "success--hidden")
    );
  };

  var showBlackout = function() {
    if (blackout.classList.contains("blackout--hidden")) {
      blackout.classList.remove("blackout--hidden");
    }
  };

  var hideBlackout = function() {
    blackout.classList.add("blackout--hidden");
  };

  submitButton.addEventListener("click", function(evt) {
    if (
      validateFilling(inputName, errors.noname) &&
      validateEmail(inputEmail, errors.noemail) &&
      validateCheckbox(confirmationCheckbox, errors.noconfirmation)
    ) {
      evt.preventDefault();
      openModal(successModal, "success--hidden");
    }
  });

  closeSuccessButton.addEventListener("click", function() {
    closeModal(successModal, "success--hidden");
  });
})();
