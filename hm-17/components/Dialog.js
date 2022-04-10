class DialogComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    if (super.isHTMLElement(this.container)) {
      this.container.hidden = true;
    }
  }

  showOverlay() {
    if (super.isHTMLElement(this.container)) {
      this.container.hidden = false;
    }
  }

  deleteOverlay() {
    if (super.isHTMLElement(this.container)) {
      this.container.hidden = true;
    }
  }

  showMessage() {
    alert("Bingo!!!!");
  }
}

const dialog = new DialogComponent(document.querySelector(".app-dialog"));

document.querySelector(".section button").onclick = () => {
  dialog.showOverlay();
};

document.querySelector("[data-dialog-reject]").onclick = () => {
  dialog.deleteOverlay();
};

document.querySelector("[data-dialog-submit]").onclick = () => {
  dialog.showMessage();
  dialog.deleteOverlay();
};
