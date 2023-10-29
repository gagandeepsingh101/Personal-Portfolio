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

// move to other section of page on some button click
function scrollToElement(element,target) {
  $(document).ready(function () {
    $(element).on("click", function (event) {
      $("html, body").animate({
        scrollTop:$(target).offset().top
      },500);
    });
  });
}

scrollToElement("#hire-btn",".contact");
scrollToElement("#scroll-animation",".about");

// sending message
let form = $(".form-sec form");
form.submit(function (e) {
  e.preventDefault();
  let name = $("#name").val();
  let email = $("#email-address").val();
  let subject = $("#subject").val();
  let message = $("#message").val();
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
  }).then(()=>{
    visibleMessage("Message sent successfully", "success");
  });
}

// visible situation of sending message
function visibleMessage(message, res) {
  $(".response").toggleClass("show-response");
  $(".response").text(message);
  if (res==="success") {
    $(".response").removeClass("error");
    $(".response").addClass("success");
  }
  else{
    $(".response").removeClass("success");
    $(".response").addClass("error");
  }
  setTimeout(() => {
    $(".response").toggleClass("show-response");
  }, 1000);
}
