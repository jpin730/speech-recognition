var text = document.getElementById("text");
var voiceSelect = document.getElementById("voice-select");
var langSelected = voiceSelect.options[voiceSelect.selectedIndex].getAttribute("data-lang");
let recognition;

if(!("webkitSpeechRecognition" in window)) {
  alert("Web Kit Speech Recognition API not available.");
} else {
  recognition = new webkitSpeechRecognition();
  recognition.lang = langSelected;
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
  recognition.lang = langSelected;
  recognition.start();
});

// READ "text"
document.getElementById("speaker").addEventListener("click", () => {
  var reading = new SpeechSynthesisUtterance(text.innerHTML);
  reading.lang = langSelected;
  speechSynthesis.speak(reading);
});

// GET LANG
function getLang() {
  voiceSelect = document.getElementById("voice-select");
  langSelected = voiceSelect.options[voiceSelect.selectedIndex].getAttribute("data-lang");
}
voiceSelect.addEventListener("change", getLang);