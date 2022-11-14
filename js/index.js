window.addEventListener("DOMContentLoaded", (e) => {
  // Search github for users
  const searchUsers = (e) => {
    e.preventDefault();
    const user = e.target.search.value;
    fetch(`https://api.github.com/search/users?q=${user}`, {
      Accept: "application/vnd.github.v3+json",
    })
      .then((res) => res.json())
      .then((data) => data.items.forEach(renderUsers));
  };

  // Render the users from GET request
  const renderUsers = (user) => {
    const { login, avatar_url } = user;

    const userList = document.getElementById("user-list");
    const userCard = document.createElement("div");
    userCard.id = login;

    const nameEl = document.createElement("h3");
    const imgEl = document.createElement("img");

    imgEl.src = avatar_url;
    nameEl.innerText = `Name: ${login}`;
    userCard.addEventListener("click", () => searchRepos(login));

    userCard.append(nameEl, imgEl);
    userList.append(userCard);
  };

  // Search for a users repos onClick
  const searchRepos = (usersLogin) => {
    fetch(`https://api.github.com/users/${usersLogin}/repos`, {
      Accept: "application/vnd.github.v3+json",
    })
      .then((res) => res.json())
      .then((data) => data.forEach(createRepos));
  };

  // Create and render repos from GET request
  const createRepos = (repo) => {
    const userCard = document.getElementById(repo.owner.login);

    const repoLi = document.createElement("li");
    repoLi.innerText = `Repo-Name: ${repo.name}`;

    userCard.append(repoLi);
  };

  // Setup form for initial request
  const form = document.querySelector("#github-form");
  form.addEventListener("submit", searchUsers);
});
