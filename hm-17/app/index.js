class DOMError extends Error {}

class BaseComponent {
  constructor(container, props = {}) {
    if (!(container instanceof HTMLElement)) {
      throw new DOMError("Container not found");
    }

    this.container = container;
    this.props = props;
  }
}
