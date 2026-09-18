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

function displayUsers(users) {
  listContainer.innerHTML = users.map(user=>{
    return `
    <div class="user-row">
        <div class="user-info">
          <div class="user-name">${user.name}</div>
          <div class="user-email">${user.email}</div>
        </div>
        <span class="badge"></span>
        <span class="row-date"></span>
        <div class="row-actions">
          <button class="icon-btn edit" title="edit" data-action="edit" data-id="${user.id}">🖊️</button>
          <button class="icon-btn delete" title="remove" data-action="delete" data-id="${user.id}">🗑️</button>
        </div>
    </div>
    `
  }).join('')
}

showUsers();
