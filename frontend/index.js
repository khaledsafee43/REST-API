const API_URL = "http://localhost:1212/api/users";

const listContainer = document.getElementById("listContainer");
const userCount = document.querySelector(".user-count span");
const userForm = document.getElementById("userForm");
const searchInput = document.getElementById("searchInput");

let users = [];

// ====================
// READ - Show Users
// ====================

async function showUsers() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    users = await response.json();

    displayUsers(users);
  } catch (error) {
    console.log(error);
  }
}

function displayUsers(users) {
  userCount.textContent = users.length;

  listContainer.innerHTML = users
    .map((user) => {
      const badgeClass =
        user.userRoll === "admin" ? "badge-admin" : "badge-user";

      const badgeText = user.userRoll === "admin" ? "Admin" : "Simple User";

      return `
        <div class="user-row">

          <div class="user-info">
            <div class="user-name">
              ${user.name}
            </div>

            <div class="user-email">
              ${user.email}
            </div>

            <div class="user-email">
              Age: ${user.age}
            </div>
          </div>

          <span class="badge ${badgeClass}">
            ${badgeText}
          </span>

          <div class="row-actions">

            <button
              type="button"
              class="icon-btn edit"
              data-action="edit"
              data-id="${user.id}">
              🖊️
            </button>

            <button
              type="button"
              class="icon-btn delete"
              data-action="delete"
              data-id="${user.id}">
              🗑️
            </button>

          </div>

        </div>
      `;
    })
    .join("");
}

// ====================
// CREATE + UPDATE
// ====================

userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();

  // مهم
  const userRoll = document.getElementById("roll").value;

  const userData = {
    name,
    email,
    age,
    userRoll,
  };

  console.log("Sending:", userData);

  try {
    let response;

    // UPDATE
    if (editId !== null) {
      response = await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    }

    // CREATE
    else {
      response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Operation failed");
    }

    // بعد از موفقیت
    editId = null;

    userForm.reset();

    document.getElementById("submitBtn").textContent = "New User";

    showUsers();
  } catch (error) {
    console.log(error);
  }
});

// ====================
// EDIT + DELETE
// ====================

listContainer.addEventListener("click", async (e) => {
  const editBTN = e.target.closest('[data-action="edit"]');
  const deleteBTN = e.target.closest('[data-action="delete"]');

  // ====================
  // EDIT
  // ====================

  if (editBTN) {
    const id = editBTN.dataset.id;

    try {
      const response = await fetch(`${API_URL}/${id}`);

      if (!response.ok) {
        throw new Error("User not found");
      }

      const user = await response.json();

      // Fill form
      document.getElementById("fullName").value = user.name;
      document.getElementById("email").value = user.email;
      document.getElementById("age").value = user.age;

      // خیلی مهم
      document.getElementById("roll").value = user.userRoll;

      // Save ID
      editId = id;

      // Change button
      document.getElementById("submitBtn").textContent = "Update";
    } catch (error) {
      console.log(error);
    }
  }

  // ====================
  // DELETE
  // ====================

  if (deleteBTN) {
    const id = deleteBTN.dataset.id;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      showUsers();
    } catch (error) {
      console.log(error);
    }
  }
});

searchInput.addEventListener("input", () => {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredUsers = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(searchValue) ||
      user.email.toLowerCase().includes(searchValue)
    );
  });

  displayUsers(filteredUsers);
});

showUsers();
