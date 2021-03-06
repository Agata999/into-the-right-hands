document.addEventListener("DOMContentLoaded", function() {
  /**
   * HomePage - Help section
   */
  class Help {
    constructor($el) {
      this.$el = $el;
      this.$buttonsContainer = $el.querySelector(".help--buttons");
      this.$slidesContainers = $el.querySelectorAll(".help--slides");
      this.currentSlide = this.$buttonsContainer.querySelector(".active").parentElement.dataset.id;
      this.init();
    }

    init() {
      this.events();
    }

    events() {
      /**
       * Slide buttons
       */
      this.$buttonsContainer.addEventListener("click", e => {
        if (e.target.classList.contains("btn")) {
          this.changeSlide(e);
        }
      });

      /**
       * Pagination buttons
       */
      this.$el.addEventListener("click", e => {
        if (e.target.classList.contains("btn") && e.target.parentElement.parentElement.classList.contains("help--slides-pagination")) {
          this.changePage(e);
        }
      });
    }

    changeSlide(e) {
      e.preventDefault();
      const $btn = e.target;

      // Buttons Active class change
      [...this.$buttonsContainer.children].forEach(btn => btn.firstElementChild.classList.remove("active"));
      $btn.classList.add("active");

      // Current slide
      this.currentSlide = $btn.parentElement.dataset.id;

      // Slides active class change
      this.$slidesContainers.forEach(el => {
        el.classList.remove("active");

        if (el.dataset.id === this.currentSlide) {
          el.classList.add("active");
        }
      });
    }

    /**
     * TODO: callback to page change event
     */
    changePage(e) {
      e.preventDefault();
      const page = e.target.dataset.page;

      console.log(page);
    }
  }
  const helpSection = document.querySelector(".help");
  if (helpSection !== null) {
    new Help(helpSection);
  }

  /**
   * Form Select
   */
  class FormSelect {
    constructor($el) {
      this.$el = $el;
      this.options = [...$el.children];
      this.init();
    }

    init() {
      this.createElements();
      this.addEvents();
      this.$el.parentElement.removeChild(this.$el);
    }

    createElements() {
      // Input for value
      this.valueInput = document.createElement("input");
      this.valueInput.type = "text";
      this.valueInput.name = this.$el.name;

      // Dropdown container
      this.dropdown = document.createElement("div");
      this.dropdown.classList.add("dropdown");

      // List container
      this.ul = document.createElement("ul");

      // All list options
      this.options.forEach((el, i) => {
        const li = document.createElement("li");
        li.dataset.value = el.value;
        li.innerText = el.innerText;

        if (i === 0) {
          // First clickable option
          this.current = document.createElement("div");
          this.current.innerText = el.innerText;
          this.dropdown.appendChild(this.current);
          this.valueInput.value = el.value;
          li.classList.add("selected");
        }

        this.ul.appendChild(li);
      });

      this.dropdown.appendChild(this.ul);
      this.dropdown.appendChild(this.valueInput);
      this.$el.parentElement.appendChild(this.dropdown);
    }

    addEvents() {
      this.dropdown.addEventListener("click", e => {
        const target = e.target;
        this.dropdown.classList.toggle("selecting");

        // Save new value only when clicked on li
        if (target.tagName === "LI") {
          this.valueInput.value = target.dataset.value;
          this.current.innerText = target.innerText;
        }
      });
    }
  }
  document.querySelectorAll(".form-group--dropdown select").forEach(el => {
    new FormSelect(el);
  });

  /**
   * Hide elements when clicked on document
   */
  document.addEventListener("click", function(e) {
    const target = e.target;
    const tagName = target.tagName;

    if (target.classList.contains("dropdown")) return false;

    if (tagName === "LI" && target.parentElement.parentElement.classList.contains("dropdown")) {
      return false;
    }

    if (tagName === "DIV" && target.parentElement.classList.contains("dropdown")) {
      return false;
    }

    document.querySelectorAll(".form-group--dropdown .dropdown").forEach(el => {
      el.classList.remove("selecting");
    });
  });

  /**
   * Switching between form steps
   */
  class FormSteps {
    constructor(form) {
      this.$form = form;
      this.$next = form.querySelectorAll(".next-step");
      this.$prev = form.querySelectorAll(".prev-step");
      this.$step = form.querySelector(".form--steps-counter span");
      this.currentStep = 1;
      this.$checkboxCategories = form.querySelectorAll("input[type=checkbox]");
      this.$categoriesOfInstitution = form.querySelectorAll(".categories");
      this.$quantity = form.querySelector("input[name=bags]");
      this.$street = form.querySelector("input[name=address]");
      this.$city = form.querySelector("input[name=city]");
      this.$postcode = form.querySelector("input[name=postcode]");
      this.$phone = form.querySelector("input[name=phone]");
      this.$date = form.querySelector("input[name=data]");
      this.$time = form.querySelector("input[name=time]");
      this.$moreInfo = form.querySelector("textarea[name=more_info]");
      this.$streetOutput = form.querySelector("li[name=address]");
      this.$cityOutput = form.querySelector("li[name=city]");
      this.$postcodeOutput = form.querySelector("li[name=postcode]");
      this.$phoneOutput = form.querySelector("li[name=phone]");
      this.$dateOutput = form.querySelector("li[name=data]");
      this.$timeOutput = form.querySelector("li[name=time]");
      this.$moreInfoOutput = form.querySelector("li[name=more_info]");
      this.$summaryDonation = form.querySelector("span[name=summary--donation]");
      this.$summaryOrganization = form.querySelector("span[name=summary--organization]");
      this.$stepInstructions = form.querySelectorAll(".form--steps-instructions p");
      const $stepForms = form.querySelectorAll("form > div");
      this.slides = [...this.$stepInstructions, ...$stepForms];

      this.init();
    }

    /**
     * Init all methods
     */
    init() {
      this.events();
      this.updateForm();
    }

    /**
     * All events that are happening in form
     */
    events() {
      // Next step
      this.$next.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();

          if(this.currentStep == 1 && !this.$form.querySelector('input[type=checkbox]:checked')) {
        alert("Wybierz rzeczy, które chcesz oddać");
        return false;
      }
          if(this.currentStep == 2 && this.$quantity.value.length == 0) {
        alert("Musisz wskazać liczbę worków");
        return false;
      }
          if(this.currentStep == 3 && !this.$form.querySelector('input[name=organization]:checked')) {
        alert("Wybierz organizację, której chcesz pomóc");
        return false;
      }
          if(this.currentStep == 4 && (this.$street.value.length == 0 || this.$city.value.length == 0 || this.$postcode.value.length == 0 || this.$phone.value.length == 0 || this.$date.value.length == 0 || this.$time.value.length == 0)) {
        alert("Pola oznaczone gwiazdką są obowiązkowe");
        return false;
      }
          this.currentStep++;
          this.updateForm();
        });
      });

      // Previous step
      this.$prev.forEach(btn => {
        btn.addEventListener("click", e => {
          e.preventDefault();

          this.currentStep--;
          this.updateForm();
        });
      });

      // Form submit
      this.$form.querySelector("form").addEventListener("submit", e => this.submit(e));
    }

    /**
     * Update form front-end
     * Show next or previous section etc.
     */
    updateForm() {
      this.$step.innerText = this.currentStep;

      // TODO: Validation



      this.slides.forEach(slide => {
        slide.classList.remove("active");

        if (slide.dataset.step == this.currentStep) {
          slide.classList.add("active");
        }
      });




      this.$stepInstructions[0].parentElement.parentElement.hidden = this.currentStep >= 6;
      this.$step.parentElement.hidden = this.currentStep >= 6;

      // TODO: get data from inputs and show them in summary

      let categories = [];
      this.$checkboxCategories.forEach(function (e) {
        if (e.checked) {
          categories.push(e.value)
        }
      });

      for (let i = 0; i < categories.length; i++) {
        for (let j = 0; j < this.$categoriesOfInstitution.length; j++) {
          let categoriesOfInstitution = this.$categoriesOfInstitution[j].innerText;
          if (categoriesOfInstitution.indexOf(categories[i]) >= 0) {
          } else {
            this.$categoriesOfInstitution[j].parentElement.hidden = true
          }
        }
      }

      let categoriesNames = [];
      for (let i = 0; i < categories.length; i++) {
        if (categories[i] == 1) {
          categoriesNames.push("ubrań")
        } else if (categories[i] == 2) {
          categoriesNames.push("zabawek")
        } else if (categories[i] == 3) {
          categoriesNames.push("książek")
        } else if (categories[i] == 4) {
          categoriesNames.push("sprzętu AGD")
        } else if (categories[i] == 5) {
          categoriesNames.push("jedzenia")
        }
      }

      if (this.$quantity.value == 1) {
        this.$summaryDonation.innerText = this.$quantity.value + " worek " + categoriesNames
      } else if (this.$quantity.value >= 2 && this.$quantity.value <= 4) {
        this.$summaryDonation.innerText = this.$quantity.value + " worki " + categoriesNames
      } else {
        this.$summaryDonation.innerText = this.$quantity.value + " worków " + categoriesNames
      }

      var checkedInstitution = form.querySelector('input[name=organization]:checked').value;

      this.$summaryOrganization.innerText = "Wspierasz organizację: " + checkedInstitution;
      this.$streetOutput.innerText = this.$street.value;
      this.$cityOutput.innerText = this.$city.value;
      this.$postcodeOutput.innerText = this.$postcode.value;
      this.$phoneOutput.innerText = this.$phone.value;
      this.$dateOutput.innerText = this.$date.value;
      this.$timeOutput.innerText = this.$time.value;
      this.$moreInfoOutput.innerText = this.$moreInfo.value;
    }


  }
  const form = document.querySelector(".form--steps");
  if (form !== null) {
    new FormSteps(form);
  }
});

