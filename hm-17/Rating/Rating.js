class RatingComponent extends BaseComponent {
  constructor(...args) {
    super(...args);

    this.ratingItems = this.container.querySelectorAll("i");
  }

  mouseOver() {
    const stars = this.ratingItems;
    stars.forEach((star, i) => {
      star.onmouseover = () => {
        star.classList.add("previewed");

        if (i > 0) {
          let prevSibling = star.previousElementSibling;
          prevSibling.classList.add("previewed");

          while (prevSibling) {
            prevSibling = prevSibling.previousElementSibling;

            if (prevSibling) {
              prevSibling.classList.add("previewed");
            }
          }
        }
      };

      star.onmouseout = () => {
        stars.forEach((star) => {
          star.classList.remove("previewed");
        });
      };
    });
  }
  setRating() {
    let index = 0;
    let stars = this.ratingItems;
    stars = Array.from(stars);

    stars.map((star, i) => {
      star.onclick = () => {
        star.classList.add("selected");
        index = i;
        if (i > 0) {
          let prevSibling = star.previousElementSibling;
          prevSibling.classList.add("selected");

          while (prevSibling) {
            prevSibling = prevSibling.previousElementSibling;

            if (prevSibling) {
              prevSibling.classList.add("selected");
            }
          }
        }
        for (let i = index + 1; i < stars.length; i++) {
          const elem = stars[i];
          elem.classList.remove("selected");
        }
      };
    });
  }
}

const rating = new RatingComponent(document.querySelector(".app-rating"));

rating.mouseOver();
rating.setRating();
