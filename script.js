const pillow = document.getElementById("pillow");
pillow.addEventListener("click", () => {
  pillow.classList.add("move-pillow");
  const myDolls = document.getElementById("my-dolls");
  myDolls.style.display = "block";
  myDolls.style.marginTop = "-300px";
});

Array.from(document.getElementsByClassName("tell")).forEach(function (click) {
  click.addEventListener("click", function () {
    let doll = click.getAttribute("data-doll");
    //newWorries(doll)
  });
});

Array.from(document.getElementsByClassName("review-worries")).forEach(function (click) {
  click.addEventListener("click", function () {
    //worriesList(doll)
  });
});

//function worriesList(doll) {
// logic
//}

//function newWorries(doll) {
//logic
//}
