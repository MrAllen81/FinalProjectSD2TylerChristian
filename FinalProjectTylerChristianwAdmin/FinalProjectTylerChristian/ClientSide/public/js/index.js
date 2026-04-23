document.addEventListener("DOMContentLoaded", () => {
  const promptText = document.querySelector(".animateSpaceBar");
  let isNavigating = false;
 
  function navigate() {
    if (isNavigating) return;
    isNavigating = true;
 
    //This helps provide the flash effect to the website
    promptText.classList.remove("animateSpaceBar");
    promptText.classList.add("flash");
    promptText.textContent = "Loading...";
 
    setTimeout(() => {
      window.location.href = "../views/home.html";
    }, 300);
  }
 
  //This fires when the spacebar key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault(); //This prevents page scroll. Index page doesn't need that.
      navigate();
    }
  });
 
  //This is also used in case the spacebar function doesn't work, and you can just click to get to the homepage
  promptText.addEventListener("click", navigate); } );

