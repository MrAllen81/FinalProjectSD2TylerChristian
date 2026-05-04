$(document).ready(function () {

  const API_KEY = "cur_live_V3yAjlOhpYovzymLcBC9XNW577U9gG0lh3CBH0av"; 
  
  let RATES = {
    euro:  null,
    pound: null,
    yen:   null,
    yuan:  null,
  };

  // Fetch live rates on page load
  fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=USD&currencies=EUR,GBP,JPY,CNY`)
    .then(res => res.json())
    .then(data => {
      RATES.euro  = data.data.EUR.value;
      RATES.pound = data.data.GBP.value;
      RATES.yen   = data.data.JPY.value;
      RATES.yuan  = data.data.CNY.value;
      console.log("Live rates loaded:", RATES);
    })
    .catch(err => {
      console.warn("Could not fetch live rates.", err);
    });

  // --- Output paragraph references ---
  const $euroOut  = $("section p").last();
  const $poundOut = $(".British p").last();
  const $yenOut   = $(".Yen p").last();
  const $yuanOut  = $(".Yuan p").last();

  // --- Helper: parse, validate, and convert ---
  function convert(inputVal, rate) {
    const num = parseFloat(inputVal);
    if (inputVal.trim() === "") return null;
    if (rate === null) return "loading";
    if (isNaN(num) || num < 0) return "error";
    return num * rate;
  }

  // --- Helper: format a converted number for display ---
  function format(value, symbol, decimals) {
    return symbol + parseFloat(value).toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  }

  // --- USD to Euro ---
  $("input[name='USD2EURO']").on("input", function () {
    const result = convert($(this).val(), RATES.euro);
    if (result === null)          $euroOut.text("Euro amount displayed here");
    else if (result === "loading") $euroOut.text("Rates loading, try again shortly.");
    else if (result === "error")  $euroOut.text("Please enter a valid number.");
    else                          $euroOut.text(format(result, "€", 2));
  });

  // --- USD to British Pound ---
  $("input[name='USD2POUND']").on("input", function () {
    const result = convert($(this).val(), RATES.pound);
    if (result === null)          $poundOut.text("Pound amount displayed here");
    else if (result === "loading") $poundOut.text("Rates loading, try again shortly.");
    else if (result === "error")  $poundOut.text("Please enter a valid number.");
    else                          $poundOut.text(format(result, "£", 2));
  });

  // --- USD to Japanese Yen ---
  $("input[name='USD2YEN']").on("input", function () {
    const result = convert($(this).val(), RATES.yen);
    if (result === null)          $yenOut.text("Yen amount displayed here");
    else if (result === "loading") $yenOut.text("Rates loading, try again shortly.");
    else if (result === "error")  $yenOut.text("Please enter a valid number.");
    else                          $yenOut.text(format(result, "¥", 0));
  });

  // --- USD to Chinese Yuan ---
  $("input[name='USD2YUAN']").on("input", function () {
    const result = convert($(this).val(), RATES.yuan);
    if (result === null)          $yuanOut.text("Yuan amount displayed here");
    else if (result === "loading") $yuanOut.text("Rates loading, try again shortly.");
    else if (result === "error")  $yuanOut.text("Please enter a valid number.");
    else                          $yuanOut.text(format(result, "¥", 2));
  });

});
