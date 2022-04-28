class DialogComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.container.hidden = true;

    const button = document.querySelector(".section button");

    button.onclick = () => this.showOverlay();

    const rejectButton = document.querySelector("[data-dialog-reject]");

    rejectButton.onclick = () => this.hideOverlay();

    const submButton = document.querySelector("[data-dialog-submit]");

    submButton.onclick = () => {
      this.props.showMessage();
      this.hideOverlay();
    };
  }

  showOverlay() {
    this.container.hidden = false;
  }

  hideOverlay() {
    this.container.hidden = true;
  }
}

const dialog = new DialogComponent(document.querySelector(".app-dialog"), {
  showMessage: () => {
    alert("Bingo!!!!");
  },
});
