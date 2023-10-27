// Navigation Toggle

let navToggle = $(".nav-toggle");
let navList = $(".nav-list");
navToggle.on("click", function () {
  navList.toggleClass("show-nav");
  navToggle.toggleClass("active");
});

// Smooth scrolling
$(document).ready(function () {
  $("a").on("click", function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $("html, body").animate(
        {
          scrollTop: $(`.${hash.slice(1)}`).offset().top,
        },
        1000,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });
});
