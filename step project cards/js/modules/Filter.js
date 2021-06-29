export default class Filter {
  constructor() {
    this.filter = document.querySelector(".container-filter");
    this.doctorSelect = this.filter.querySelector("#select-doctor");
    this.urgencySelect = this.filter.querySelector("#select-urgency");
    this.btn = this.filter.querySelector("#search");
  }
  listenSearch() {
    this.listenDoctor();
    this.listenUrgency();
    this.btn.addEventListener("click", (event) => {
      event.preventDefault();
      this.searchDoctor();
      this.searchUrgency();
    });
  }
  clearFields() {
    this.doctorSelect.value = "Все";
    this.urgencySelect.value = "Все";
  }

  listenDoctor() {
    this.doctorSelect.addEventListener("change", (event) => {
      this.doctorSelect.querySelectorAll("option").forEach((option) => {
        option.classList.remove("chosen");
      });
      this.doctorSelect
        .querySelector(`option[value=${event.target.value}]`)
        .classList.add("chosen");
    });
  }
  listenUrgency() {
    this.urgencySelect.addEventListener("change", (event) => {
      this.urgencySelect.querySelectorAll("option").forEach((option) => {
        option.classList.remove("chosen");
      });
      this.urgencySelect
        .querySelector(`option[value=${event.target.value}]`)
        .classList.add("chosen");
    });
  }
  searchDoctor() {
    document.querySelectorAll(".card").forEach((card) => {
      let currentOptions = this.doctorSelect.querySelectorAll(
        "#select-doctor .chosen"
      );
      if (currentOptions[0].id === "all-doctors") {
        card.classList.remove("hidden-doctor");
        return;
      }
      currentOptions.forEach((option) => {
        if (
          option.id.substring(option.id.indexOf("-") + 1) === card.classList[1]
        ) {
          card.classList.remove("hidden-doctor");
          return;
        } else {
          card.classList.add("hidden-doctor");
        }
      });
    });
  }
  searchUrgency() {
    document.querySelectorAll(".card").forEach((card) => {
      let currentOptions = this.urgencySelect.querySelectorAll(
        "#select-urgency .chosen"
      );
      if (currentOptions[0].id === "all-urgency") {
        card.classList.remove("hidden-urgency");
        return;
      }
      currentOptions.forEach((option) => {
        let cardUrgency = card.querySelector(".urgency");
        let cardUrgencyValue = cardUrgency.textContent
          .substring(cardUrgency.textContent.indexOf(":") + 1)
          .trim();
        if (cardUrgencyValue === option.value) {
          card.classList.remove("hidden-urgency");
          return;
        } else {
          card.classList.add("hidden-urgency");
        }
      });
    });
  }
}
