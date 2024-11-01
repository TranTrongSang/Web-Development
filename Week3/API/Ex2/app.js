const USER_API_URL = 'https://jsonplaceholder.typicode.com/users';
let usersData = [];

fetch(USER_API_URL)
  .then(response => response.json())
  .then(data => {
    usersData = data;
    displayUsers(usersData);
  })
  .catch(error => console.error('Error fetching data:', error));

function displayUsers(users) {
  const userListDiv = document.getElementById('user-list');
  userListDiv.innerHTML = users.map(user => `
    <div class="user-item">
      <strong>${user.name}</strong> - <a href="mailto:${user.email}">${user.email}</a>
    </div>
  `).join('');
}

function filterUsers() {
  const searchTerm = document.getElementById('searchBox').value.toLowerCase();
  const filteredUsers = usersData.filter(user => 
    user.name.toLowerCase().includes(searchTerm)
  );
  displayUsers(filteredUsers);
}
