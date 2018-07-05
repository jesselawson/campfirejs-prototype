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