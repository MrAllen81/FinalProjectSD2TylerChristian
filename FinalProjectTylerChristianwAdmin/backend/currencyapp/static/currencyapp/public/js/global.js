$(document).ready(function () {
 

  function fixBackground() {
    const winW = $(window).width();
    const winH = $(window).height();
    const imgRatio = 16 / 9; // adjust if your CLOUDS.jpg has a different ratio
    const winRatio = winW / winH;
 
    if (winRatio > imgRatio) {
      $("html").css("background-size", "100% auto");
    } else {
      $("html").css("background-size", "auto 100%");
    }
  }
 
  $(window).on("resize", fixBackground);
  fixBackground();
 
  const currentPage = window.location.pathname.split("/").pop();
  $("#nav_menu a").each(function () {
    const linkPage = $(this).attr("href").split("/").pop();
    if (linkPage === currentPage) {
      $(this).addClass("current");
    } else {
      $(this).removeClass("current");
    }
  });
 
  // --- Page fade-in on load ---
  $("body").css("opacity", 0).animate({ opacity: 1 }, 400);
 
  // --- Page fade-out on nav link click ---
  $("#nav_menu a").on("click", function (e) {
    const href = $(this).attr("href");
    if (href && href !== "#") {
      e.preventDefault();
      $("body").animate({ opacity: 0 }, 250, function () {
        window.location.href = href;
      });
    }
  });
 
  // --- Footer: auto-update year ---
  // Keeps the footer copyright year current automatically
  const footer = $("footer p");
  if (footer.length) {
    const year = new Date().getFullYear();
    footer.text(footer.text().replace(/\d{4}/, year));
  }});


//Each of these var's are for each list element on the nav bar. Every var needs a listener for it to function.
var homeButton = document.getElementById('home');

homeButton.addEventListener('click', home, false);

function home() {
    window.location.href = 'home';
}

var regButton = document.getElementById('reg');

regButton.addEventListener('click', reg, false);

function reg() {
    window.location.href = 'registration';
}

var logButton = document.getElementById('log');

if (logButton) {
  logButton.addEventListener('click', log, false);
}

function log() {
    window.location.href = 'loginP';
}

var logoutButton = document.getElementById('logout')

if (logoutButton) {
  logoutButton.addEventListener('click', logout, false);
}

function logout() {
  window.location.href = 'logoutU'
}

var profButton = document.getElementById('prof');

profButton.addEventListener('click', prof, false);

function prof() {
    window.location.href = 'profile';
}
