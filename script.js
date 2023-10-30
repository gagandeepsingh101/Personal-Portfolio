// Navigation Toggle

let navToggle = $(".nav-toggle");
let navList = $(".nav-list");
navToggle.on("click", function () {
  navList.toggleClass("show-nav");
  navToggle.toggleClass("active");
});

// Hide navigation on click on nav item in mobile screen
$(document).ready(function () {
  var allTabs = $(".nav-list li a");
  allTabs.on("click", function () {
    $(".nav-list").toggleClass("show-nav");
    $(".nav-toggle").toggleClass("active");
  });
});

// Smooth scrolling
$(document).ready(function () {
  // set active state of navigation nav link according to section on screen
  $(window).scroll(function () {
    let scrollPos = $(window).scrollTop() + 1;
    activeTab("home", scrollPos);
    activeTab("about", scrollPos);
    activeTab("skill", scrollPos);
    activeTab("project", scrollPos);
    activeTab("contact", scrollPos);
  });

  // in these function we set activeTab acccroding to its top position and height of current Section
  function activeTab(currentSec, scrollPos) {
    let currentSecTopPos = $(`.${currentSec}`).offset().top - 200;
    let currentSecHeight = $(`.${currentSec}`).height();
    if (
      scrollPos >= currentSecTopPos &&
      scrollPos < currentSecTopPos + currentSecHeight
    ) {
      $(`.${currentSec}-link`).css("color", "#FFD15C");
    } else {
      $(`.${currentSec}-link`).css("color", "white");
    }
  }

  // goes website to top on reloading
  $("html, body").animate(
    {
      scrollTop: 0,
    },
    1000
  );

  // on click navigation scroll to desired section
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

// move to other section of page on some button click
function scrollToElement(element, target) {
  $(document).ready(function () {
    $(element).on("click", function (event) {
      $("html, body").animate(
        {
          scrollTop: $(target).offset().top,
        },
        500
      );
    });
  });
}

scrollToElement("#hire-btn", ".contact");
scrollToElement("#scroll-animation", ".about");

// sending message
let form = $(".form-sec form");

// fetch form data
form.submit(function (e) {
  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email-address").val();
  let subject = $("#subject").val();
  let message = $("#message").val();

  // add validation on form submit
  if (name && email && subject && message) {
    sendMessage(name, email, subject, message);
  } else {
    let message = "";
    if (name === "") {
      message += "Name ";
    } else if (email === "") {
      message += "Email ";
    } else if (subject === "") {
      message += "Subject ";
    } else if (message === "") {
      message += "Message";
    }
    message += " is required";
    visibleMessage(message, "fail");
  }
});

// established connection with smtpjs
function sendMessage(name, email, subject, message) {
  Email.send({
    SecureToken: "6d1c1b79-25e3-4da1-83c4-5aaea800236b",
    To: "gagandeepsingh128548@gmail.com",
    From: "gagandeepsingh128548@gmail.com",
    Subject: `${subject}`,
    Body: `<h5>Name : ${name}<br>
    Email : ${email}</h5> <br>${message}`,
  }).then(() => {
    visibleMessage("Message sent successfully", "success");
  });
}

// visible situation of sending message
function visibleMessage(message, res) {
  $(".response").toggleClass("show-response");
  $(".response").text(message);
  if (res === "success") {
    $(".response").removeClass("error");
    $(".response").addClass("success");
  } else {
    $(".response").removeClass("success");
    $(".response").addClass("error");
  }
  setTimeout(() => {
    $(".response").toggleClass("show-response");
  }, 1000);
}


// 