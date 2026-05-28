const container = document.querySelector(".container");
const input = document.querySelector("input");

let usersArray = [];

const url = "https://jsonplaceholder.typicode.com/users";

const createCardList = (array) => {
  container.innerHTML = "";

  array.forEach((obj) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `<div class="name">Name</div><div class="name-content">${obj.username}</div><div class="email">Email</div><div class="email-content">${obj.email}</div>`;
    container.appendChild(card);
  });
};

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((result) => {
    console.log(result);
    usersArray = result;
    createCardList(usersArray);
  });

input.addEventListener("input", (event) => {
  const searchStr = event.target.value.toLowerCase();

  const filteredArray = usersArray.filter((ele) => {
    return (
      ele.username.toLowerCase().includes(searchStr) ||
      ele.email.toLowerCase().includes(searchStr)
    );
  });

  createCardList(filteredArray);
});

// particle js configuration
particlesJS.load("particles-js", "particles.json");

const addUserButton = document.querySelector(".controls img");

addUserButton.addEventListener("click", () => {
  const username = prompt("Enter your username");
  const email = prompt("Enter your email");

  const newUser = {
    username,
    email,
  };

  fetch(`${url}/adddata`, {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((data) => data.json())
    .then((result) => {
      usersArray = result;
      createCardList(result);
    })
    .catch((error) => {
      console.log(error);
      alert("User not added");
    });
});
