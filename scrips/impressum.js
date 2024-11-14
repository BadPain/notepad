// Impressumsbutton
function impressumView() {
    var y = document.getElementById("on");
    var x = document.getElementById("off");

    if (window.getComputedStyle(y).display === "none") {
        y.style.display = "block";
        x.style.display = "none";
    } else {
        y.style.display = "none";
        x.style.display = "block";
    }
}