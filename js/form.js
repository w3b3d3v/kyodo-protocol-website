// Initialize Firebase
var firebaseConfig = {
  apiKey: "AIzaSyD1sX-mckM0NDtJgyOkT5J8RLHbIOkWGq4",
  authDomain: "kyodo-protocol-website.firebaseapp.com",
  projectId: "kyodo-protocol-website",
  storageBucket: "kyodo-protocol-website.appspot.com",
  messagingSenderId: "306749329778",
  appId: "1:306749329778:web:979b5a3426fbca72ba4deb",
  measurementId: "G-XWH1M1SMFD",
}

firebase.initializeApp(firebaseConfig)

document.getElementById("waitlistForm").addEventListener("submit", function (e) {
  e.preventDefault() // Prevent the default form submission

  var email = e.target[0].value // Get the email value
  var interestReason = e.target[1].value // Get the interestReason value

  if (isValidEmail(email)) {
    // Save the email to Firebase
    if (interestReason !== "") {
      saveEmailToFirebase(email, interestReason)
    } else {
      alert("Please select your interest.")
    }
  } else {
    alert("Please enter a valid email address.")
  }
})

function isValidEmail(email) {
  // Regular expression pattern for validating an email
  var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return pattern.test(email)
}

function saveEmailToFirebase(email, interestReason) {
  var database = firebase.database()
  var ref = database.ref(interestReason) // 'waitlist' is the name of the node where you want to save the emails

  // Push the email to the 'waitlist' node
  ref.push(email, function (error) {
    if (error) {
      console.error("Data could not be saved. " + error)
    } else {
      console.log("Data saved successfully.")
      showSuccessMessage()
      hideForm()
    }
  })
}

function showSuccessMessage() {
  var successMessage = document.createElement("p")
  successMessage.textContent = "Thank you for joining the waitlist!"
  successMessage.style.color = "green"
  successMessage.style.fontSize = "18px"
  successMessage.style.fontWeight = "bold"
  document.querySelector(".form").appendChild(successMessage)
}

function hideForm() {
  document.getElementById("waitlistForm").style.display = "none"
}
