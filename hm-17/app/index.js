class DOMError extends Error {}

class BaseComponent {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new DOMError("Container not found");
    }

    this.container = container;
  }
}
