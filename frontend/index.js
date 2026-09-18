const API_URL = "http://localhost:1212/api/users";
const listContainer = document.getElementById("listContainer");
const userCount = document.querySelector(".user-count span");
const searchInput = document.getElementById("searchInput");

async function showUsers() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    const users = await response.json();
    displayUsers(users);
  } catch (err) {
    listContainer.innerHTML = `
    <span>Failed to load users</span>
    `;
  }
}

function displayUsers(user) {}

getUsers();
