$(document).ready(function () {
 
  // --- Exchange rates (USD base) ---
  // Update these values to refresh the rates
  const RATES = {
    euro:  0.92,
    pound: 0.79,
    yen:   149.50,
    yuan:  7.24,
  };
 
  // --- Output paragraph references ---
  // These match the order of the <p> tags after each <form> in home.html
  const $euroOut  = $("section p").last();
  const $poundOut = $(".British p").last();
  const $yenOut   = $(".Yen p").last();
  const $yuanOut  = $(".Yuan p").last();
 
  // --- Helper: parse, validate, and convert ---
  function convert(inputVal, rate) {
    const num = parseFloat(inputVal);
    if (inputVal.trim() === "") return null;
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
    if (result === null)       $euroOut.text("Euro amount displayed here");
    else if (result === "error") $euroOut.text("Please enter a valid number.");
    else                       $euroOut.text(format(result, "€", 2));
  });
 
  // --- USD to British Pound ---
  $("input[name='USD2POUND']").on("input", function () {
    const result = convert($(this).val(), RATES.pound);
    if (result === null)       $poundOut.text("Pound amount displayed here");
    else if (result === "error") $poundOut.text("Please enter a valid number.");
    else                       $poundOut.text(format(result, "£", 2));
  });
 
  // --- USD to Japanese Yen ---
  $("input[name='USD2YEN']").on("input", function () {
    const result = convert($(this).val(), RATES.yen);
    if (result === null)       $yenOut.text("Yen amount displayed here");
    else if (result === "error") $yenOut.text("Please enter a valid number.");
    else                       $yenOut.text(format(result, "¥", 0));
  });
 
  // --- USD to Chinese Yuan ---
  $("input[name='USD2YUAN']").on("input", function () {
    const result = convert($(this).val(), RATES.yuan);
    if (result === null)       $yuanOut.text("Yuan amount displayed here");
    else if (result === "error") $yuanOut.text("Please enter a valid number.");
    else                       $yuanOut.text(format(result, "¥", 2));
  });
});