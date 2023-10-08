// HTML elemek
const $input = document.querySelector(".js-keres");
const $form = document.querySelector("form");
const $container = document.querySelector(".js-container");

// Globális változók
let userList = [];

// fetch függvény - API adatok kinyerése
const fetchData = () => {
  fetch("https://dummyjson.com/users?limit=100")
    .then((response) => response.json())
    .then((data) => {
      sortUser(data.users);
    });
};

// segéd függvények
const sortUser = (users) => {
  const sortedUsers = users.map((user) => {
    return {
      name: `${user.firstName} ${user.lastName}`,
      image: user.image,
      id: user.id,
    };
  });
  userList = sortedUsers;
  render(sortedUsers);
};

const filteredUsers = (users, keres) => {
  const modifiedUsers = users.filter((user) => {
    const name = user.name;
    const nameLower = name.toLowerCase();

    const keresett = keres.toLowerCase();

    return nameLower.includes(keresett);
  });

  render(modifiedUsers);
};

// render
const render = (users) => {
  let HTML = "";

  users.map((user) => {
    HTML += `
        <div class="user">
            <h2>${user.id} ${user.name}</h2>
            <img src=${user.image} alt="nap pali" />
        </div> 
        `;
  });

  $container.innerHTML = HTML;
};

// események kezelése
$form.addEventListener("submit", (e) => {
  e.preventDefault();
});

const eventHandler = (e) => {
  const filter = e.target.value;
  filteredUsers(userList, filter);
};

$input.addEventListener("keypress", eventHandler);

$input.addEventListener("keyup", eventHandler);

// fő függvény meghívása
fetchData();
