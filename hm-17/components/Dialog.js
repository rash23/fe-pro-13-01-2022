class DialogComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.container.hidden = true;

    const button = document.querySelector(".section button");

    if (button instanceof HTMLElement) {
      button.onclick = () => {
        this.showOverlay();
      };
    }

    const onReject = document.querySelector("[data-dialog-reject]");

    if (onReject instanceof HTMLElement) {
      onReject.onclick = () => {
        this.hideOverlay();
      };
    }

    const onSubmit = document.querySelector("[data-dialog-submit]");

    if (onSubmit instanceof HTMLElement) {
      onSubmit.onclick = () => {
        this.showMessage();
        this.hideOverlay();
      };
    }
  }

  showOverlay() {
    this.container.hidden = false;
  }

  hideOverlay() {
    this.container.hidden = true;
  }

  showMessage() {
    alert("Bingo!!!!");
  }
}

const dialog = new DialogComponent(document.querySelector(".app-dialog"));
