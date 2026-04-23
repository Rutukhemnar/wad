
let users = JSON.parse(localStorage.getItem("users")) || [];

document.getElementById("regForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let user = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
   course: document.getElementById("course").value
  };

  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  // AJAX POST request (dummy API)
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "https://jsonplaceholder.typicode.com/posts", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onload = function () {
    if (xhr.status === 201) {
      alert("🎉 Registration Successful!");
      document.getElementById("regForm").reset();
      window.location.href = "list.html";
    }
  };

  xhr.send(JSON.stringify(user));
});