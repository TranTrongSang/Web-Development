const API_URL = 'https://jsonplaceholder.typicode.com/posts';

fetch(API_URL)
  .then(response => response.json())
  .then(data => analyzeData(data))
  .catch(error => console.error('Error fetching data:', error));

function analyzeData(posts) {
  const totalPosts = posts.length;
  const totalTitleLength = posts.reduce((sum, post) => sum + post.title.length, 0);
  const averageTitleLength = (totalTitleLength / totalPosts).toFixed(2);
  const postsByUser1 = posts.filter(post => post.userId === 1).length;

  displayStatistics(totalPosts, averageTitleLength, postsByUser1);
}

function displayStatistics(total, averageTitleLength, postsByUser1) {
  const statsDiv = document.getElementById('statistics');
  statsDiv.innerHTML = `
    <p>Total number of posts: <strong>${total}</strong></p>
    <p>Average title length: <strong>${averageTitleLength}</strong> characters</p>
    <p>Number of posts by user ID 1: <strong>${postsByUser1}</strong></p>
  `;
}
