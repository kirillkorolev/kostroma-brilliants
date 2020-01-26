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
})();
