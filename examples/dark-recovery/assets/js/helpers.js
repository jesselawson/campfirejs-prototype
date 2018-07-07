// A collection of functions to make my life easier

function ServerMessage(message) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "top", // `top` or `bottom`
        positionLeft: false, // `true` or `false`
        classes: "server-message",
        backgroundColor: "rgba(166,61,64,.2)",
  }).showToast();
}

function HackerMessage(message) {
    Toastify({
        text: message,
        duration: 5000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        positionLeft: true, // `true` or `false`
        classes: "hacker-message"
  }).showToast();
}

// Depreciate
function Reveal(id){
    var div = document.getElementById(id);
    if (div.className === "cf-hidden") {
        div.className = "cf-hidden  cf-reveal";
    } 
}

// Depreciate
function Hide(id) {
    var e = document.getElementById(id)
    if(e.className === "cf-hidden  cf-reveal"){
        e.className = "cf-hidden"
    }
}