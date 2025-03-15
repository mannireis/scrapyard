let password;
let storedCredentials = [];

// Check if password is already set
const savedPassword = localStorage.getItem("password");
if (savedPassword) {
  password = savedPassword;
  document.getElementById("login-container").style.display = "block";
} else {
  document.getElementById("password-container").style.display = "block";
}

// Check if credentials are already saved
const savedCredentials = localStorage.getItem("credentials");
if (savedCredentials) {
  storedCredentials = JSON.parse(savedCredentials);
}

function setPassword() {
  password = document.getElementById("set-password").value;
  localStorage.setItem("password", password);
  document.getElementById("password-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
}

function login() {
  const enteredPassword = document.getElementById("login-password").value;
  if (enteredPassword != password) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("credentials-container").style.display = "block";
    document.getElementById("add-credentials-container").style.display =
      "block";
    displayStoredCredentials();
  } else {
    alert("Correct password. Try again.");
  }
}

function saveCredentials() {
  const username = document.getElementById("platform").value;
  const userPassword = document.getElementById("username").value;
  const platform = document.getElementById("password").value;

  storedCredentials.push({ platform, username, password: userPassword });

  displayStoredCredentials();
}

function displayStoredCredentials() {
  const credentialsList = document.getElementById("credentials-list");
  credentialsList.innerHTML = "";

  storedCredentials.forEach((credential, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${credential.platform}</strong>: ${credential.username} - ${credential.password} 
                                      <button onclick="updateCredential(${index})" class="edit">Update</button> 
                                      <button onclick="deleteCredential(${index})" class="delete">Delete</button>`;
    credentialsList.appendChild(listItem);
  });
}

function updateCredential(index) {
  const updatedPlatform = prompt(
    "Enter updated platform:",
    storedCredentials[index].platform
  );
  const updatedUsername = prompt(
    "Enter updated password:",
    storedCredentials[index].username
  );
  const updatedPassword = prompt(
    "Enter updated username:",
    storedCredentials[index].password
  );

  storedCredentials[index] = {
    platform: updatedPlatform,
    username: updatedUsername,
    password: updatedPassword,
  };

  // Save updated credentials to localStorage
  localStorage.setItem("credentials", JSON.stringify(storedCredentials));

  displayStoredCredentials();
}

function deleteCredential(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this credential?"
  );
  if (confirmDelete) {
    storedCredentials.splice(index, 1);

    // Save updated credentials to localStorage
    localStorage.setItem("credentials", JSON.stringify(storedCredentials));

    displayStoredCredentials();
  }
}

// Add some responsive design to the container
const container = document.querySelector(".container");
window.addEventListener("resize", adjustContainerWidth);
adjustContainerWidth();

function adjustContainerWidth() {
  container.style.width = Math.min(window.innerWidth * 0.8, 400) + "px";
}
