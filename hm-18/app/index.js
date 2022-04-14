class DOMError extends Error {}

class BaseComponent {
  constructor(container, props = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new DOMError("Container not found");
    }

    this.container = container;
    this.props = props;
  }

  isHTMLElement(elem) {
    return elem instanceof HTMLElement;
  }
}

class Accordion extends BaseComponent {
  constructor(...args) {
    super(...args);
    this.body = this.container;

    this.accordions = document.createElement("div");
    this.accordions.classList.add("accordions");
    this.body.append(this.accordions);

    this.createNewAccordians();
  }

  create(title, text) {
    this.accordion = document.createElement("div");
    this.accordion.classList.add("accordion");
    this.accordions.append(this.accordion);

    this.accordHead = document.createElement("div");
    this.accordHead.classList.add("accordion__header");
    this.accordion.append(this.accordHead);

    this.accordTitle = document.createElement("div");
    this.accordTitle.classList.add("accordion__title");
    this.accordTitle.innerHTML = title;
    this.accordHead.append(this.accordTitle);

    this.accordBody = document.createElement("div");
    this.accordBody.classList.add("accordion__body");
    this.accordion.append(this.accordBody);

    this.accordInner = document.createElement("div");
    this.accordInner.classList.add("accordion__inner");
    this.accordBody.append(this.accordInner);

    this.accordText = document.createElement("div");
    this.accordText.classList.add("accordion__text");
    this.accordText.innerHTML = text;

    this.accordInner.append(this.accordText);

    const accords = document.querySelectorAll(".accordion");

    accords[0].classList.add("active");

    const firstAccordBody = document.querySelector(".accordion__body");
    firstAccordBody.style.height = document.querySelector(".accordion__inner").offsetHeight + "px";
  }

  forEachAccordion() {
    const accordClass = this.accordion.className;
    const accordHeadClass = this.accordHead.className;
    let accords = document.querySelectorAll(`.${accordClass}`);

    accords.forEach((element) => {
      element.querySelector(`.${accordHeadClass}`).onclick = () => {
        this.toggleAccordion(element);
      };
    });
  }

  toggleAccordion(element) {
    let isActive = element.classList.contains("active");
    const accordClass = this.accordion.className;

    const accordBodyClass = this.accordBody.className;
    const accordBodyElement = element.querySelector(`.${accordBodyClass}`);

    const accordHeadClass = this.accordHead.className;
    const accordHeadElement = element.querySelector(`.${accordHeadClass}`);

    const accordInnerClass = this.accordInner.className;
    const accordInnerElement = element.querySelector(`.${accordInnerClass}`);

    const activeHead = document.querySelector(`.${accordClass}.active .${accordHeadClass}`);
    const activeBody = document.querySelector(`.${accordClass}.active .${accordBodyClass}`);

    if (document.querySelectorAll(`.${accordClass}.active`).length > 0) {
      activeBody.style.width = activeHead.offsetWidth + "px";
      activeBody.style.height = activeHead.offsetHeight + "px";
      document.querySelector(`.${accordClass}.active`).classList.remove("active");
    }

    if (isActive) {
      accordBodyElement.style.width = accordHeadElement.offsetWidth + "px";
      accordBodyElement.style.height = accordHeadElement.offsetHeight * 0.5 + "px";
      element.classList.remove("active");
    } else {
      accordBodyElement.style.width = accordInnerElement.offsetWidth + "px";
      accordBodyElement.style.height = accordInnerElement.offsetHeight + "px";
      element.classList.add("active");
    }
  }

  createNewAccordians(arr) {
    arr = this.props;

    arr.forEach((element) => {
      this.create(element.title, element.body);
      this.forEachAccordion();
    });
  }
}

const items = [
  {
    title: "Accordion 1",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  },
  {
    title: "Accordion 2",
    body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took",
  },
];

const accordions = new Accordion(document.querySelector("body"), items);
