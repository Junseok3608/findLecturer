document.addEventListener("DOMContentLoaded", () => {
  const signupPage = document.getElementById("signup-page");
  const loginPage = document.getElementById("login-page");
  const timetablePage = document.getElementById("timetable-page");

  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const availableTimesForm = document.getElementById("available-times-form");

  const toSignupButton = document.getElementById("to-signup");
  const toLoginButton = document.getElementById("to-login");

  // Show login page by default
  loginPage.style.display = "block";

  // Event listeners for page navigation
  toSignupButton.addEventListener("click", () => {
    loginPage.style.display = "none";
    signupPage.style.display = "block";
  });

  toLoginButton.addEventListener("click", () => {
    signupPage.style.display = "none";
    loginPage.style.display = "block";
  });

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById("employee-id").value;
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, username, password }),
    });

    if (response.ok) {
      alert("Signup successful");
      signupPage.style.display = "none";
      loginPage.style.display = "block";
    } else {
      alert("Signup failed");
    }
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      loginPage.style.display = "none";
      timetablePage.style.display = "block";
    } else {
      alert("Login failed");
    }
  });

  availableTimesForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const date = document.getElementById("available-date").value;
    const time = document.getElementById("available-time").value;
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/available-times", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ date, time }),
    });

    if (response.ok) {
      alert("Available time registered");
    } else {
      alert("Registration failed");
    }
  });
});
