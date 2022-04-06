///////////////// Task 2 /////////////////

const arrTags = document.body.querySelectorAll("*");

console.log(arrTags);

const countTags = (arr) => {
  let newArr = Array.from(arr);

  arr = newArr.map((element) => {
    return element.tagName;
  });

  let resObj = arr.reduce(function (acc, el) {
    acc[el] = (acc[el] || 0) + 1;
    return acc;
  }, {});

  let result = "";
  for (const key in resObj) {
    if (Object.hasOwnProperty.call(resObj, key)) {
      result += `<li>[${key}] - ${resObj[key]}</li>`;
    }
  }
  return result;
};

document.querySelector("ul.tag-list").innerHTML = countTags(arrTags);
