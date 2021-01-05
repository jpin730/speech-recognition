const text = document.getElementById("text");
let recognition;

if(!("webkitSpeechRecognition" in window)) {
  alert("Web Kit Speech Recognition API not available.");
} else {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.continuos = true;
  recognition.interim = true;
  // WRITE "text" CALLBACK
  recognition.addEventListener("result", (event) => {
    text.classList.remove("font-italic");
    for (let i = event.resultIndex; i < event.results.length; i++) {
      text.innerHTML = event.results[i][0].transcript;
    }
  });
}

// LISTEN MIC
document.getElementById("mic").addEventListener("click", () => {
  text.classList.add("font-italic");
  text.innerHTML = "Listening from your mic...";
  recognition.start();
});

// READ "text"
document.getElementById("speaker").addEventListener("click", () => {
  speechSynthesis.speak(new SpeechSynthesisUtterance(text.innerHTML));
});