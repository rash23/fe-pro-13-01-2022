class RatingComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.ratingItems = this.container.querySelectorAll("i");

    this.mouseOver();
    this.mouseOut();
    this.setRating();
  }

  mouseOver() {
    const stars = this.ratingItems;
    stars.forEach((star, i) => {
      star.onmouseover = () => {
        star.classList.add("previewed");
        let prevSibling = star.previousElementSibling;

        while (prevSibling) {
          if (prevSibling) {
            prevSibling.classList.add("previewed");
            prevSibling = prevSibling.previousElementSibling;
          }
        }
      };
    });
  }

  mouseOut() {
    const stars = this.ratingItems;
    stars.forEach((star) => {
      star.onmouseout = () => {
        if (star.classList.contains("previewed")) {
          star.classList.remove("previewed");
        }
      };
    });
  }

  setRating() {
    let stars = this.ratingItems;

    stars.forEach((star) => {
      star.onclick = () => {
        star.classList.add("selected");

        let prevSibling = star.previousElementSibling;
        let nextSibling = star.nextElementSibling;

        for (let i = 1; i < 5; i++) {
          if (prevSibling) {
            prevSibling.classList.add("selected");
            prevSibling = prevSibling.previousElementSibling;
          }
          if (nextSibling) {
            nextSibling.classList.remove("selected");
            nextSibling = nextSibling.nextElementSibling;
          }
        }
      };
    });
  }
}

const rating = new RatingComponent(document.querySelector(".app-rating"));
