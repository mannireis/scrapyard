let password;
let storedCredentials = [];
let storedCard = [];

function add() {
  alert("Added!");
  localStorage.setItem("card", JSON.stringify(storedCard));
}

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const savedPassword = localStorage.getItem("password");
if (savedPassword) {
  password = savedPassword;
  document.getElementById("login-container").style.display = "block";
} else {
  document.getElementById("password-container").style.display = "block";
}

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
  if (enteredPassword != password && enteredPassword.length > 3) {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("credentials-container").style.display = "block";
    document.getElementById("add-credentials-container").style.display =
      "block";
    displayStoredCredentials();
  } else {
    alert("Correct password or too short. Try again.");
  }
}

function saveCredentials() {
  const platform = document.getElementById("platform").value;
  const username = document.getElementById("username").value;
  const userPassword = document.getElementById("password").value;

  storedCredentials.push({
    platform,
    username,
    password: userPassword,
  });

  localStorage.setItem("credentials", JSON.stringify(storedCredentials));

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
  const updatedPassword = prompt(
    "Enter updated username:",
    storedCredentials[index].password
  );
  const updatedUsername = prompt(
    "Enter updated password:",
    storedCredentials[index].username
  );
  const updatedPlatform = prompt(
    "Enter updated platform:",
    storedCredentials[index].platform
  );

  storedCredentials[index] = {
    platform: updatedPlatform,
    username: updatedUsername,
    password: updatedPassword,
  };

  localStorage.setItem("credentials", JSON.stringify(storedCredentials));

  displayStoredCredentials();
}

function deleteCredential(index) {
  const confirmDelete = confirm(
    "Are you sure you want to delete this credential?"
  );
  if (confirmDelete) {
    storedCredentials.splice(index, 1);

    localStorage.setItem("credentials", JSON.stringify(storedCredentials));
    displayStoredCredentials();
  }
}

const container = document.querySelector(".container");
window.addEventListener("resize", adjustContainerWidth);
adjustContainerWidth();

function adjustContainerWidth() {
  container.style.width = Math.min(window.innerWidth * 0.8, 400) + "px";
}

setInterval(function () {
  openNav;
}, 3);
