console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
//setTimeout(() schedules the callback to execute after the specified delay. Javascript doesnot block the function execution for this.So the code prints 3 and then,2.
console.log("1");
setTimeout(() => console.log("2"), 2);
console.log("3");
//The 2ms "2" gets printed then only the 1000ms "2" gets printed. Both get executed after the synchronous code is executed. So the output is 1,3,1,3,2,2.
console.log("Fetching data...");
setTimeout(() => {
  console.log("Data received!");
},2000);

const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  setTimeout(() => {
    if (success) resolve("Data loaded!");
    else reject("Something went wrong");
  }, 1000)
});
getData
  .then((message) => {
    console.log("Success:", message);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const startValue = new Promise((resolve) => resolve(5));
startValue
.then((num)=> {return num*2})
.then((num)=> {return num+10})
.then((result)=> {console.log(result)});

const promise1 = new Promise((resolve) => setTimeout(() => resolve("User loaded"), 1000));
const promise2 = new Promise((resolve) => setTimeout(() => resolve("Orders loaded"), 1500));
Promise.all([promise1, promise2])
.then((results)=>console.log( results));


const getUserData= async() =>{
    try{
        const response=await fetch(`https://jsonplaceholder.typicode.com/users/1`);
        const user=await response.json();
        console.log(user.name);
    }
    catch(error){
        console.error(error);
    }
};
getUserData();

const getUserById= async(id) =>{
    try{
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        const user=await response.json();
        return{
            name:user.name,
            email:user.email
        };
}
catch(error){
    console.error(error);
}
};
getUserById(3).then(result => console.log(result));

const getAllUsers= async() => {
    try{
        const response =await fetch(`https://jsonplaceholder.typicode.com/users`);
        const users=await response.json();
        return users.map(user => ({
            name:user.name,
            email:user.email
        }));

    }catch(error){
        console.error(error);
    }
};
getAllUsers().then(results => console.log(results));

/*error
const fetchUser = async () => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/1`)
  const data = await response.json()
  console.log(data)
}
*/
const fetchUser = async () => {
    try{
  const response = await fetch("https://jsonplaceholder.typicode.com/users/invalid-url");
  const data = await response.json();
  console.log(data);
    }catch(error){
        console.error(error);
    }
};
fetchUser();
/*error
const fetchMissing = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/99999`)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Caught:", error.message)
  }
}
fetchMissing()
*/
const fetchMissing = async () => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/99999`);
    if(!response.ok){
        throw new Error(`${response.status}`);
    }
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.log("Caught:", error.message);
  }
};
fetchMissing();

const fetchWithCheck = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }
  return response.json();
};
const fetchUsers = async () => {
  const results = await Promise.allSettled([
    fetchWithCheck("https://jsonplaceholder.typicode.com/users/1"),
    fetchWithCheck("https://jsonplaceholder.typicode.com/invalid-url")
  ]);

  results.forEach((result, index) => {
    if (result.status === "fulfilled") {
      console.log(`Request ${index + 1} succeeded`);
    } else {
      console.log(`Request ${index + 1} failed`);
      console.log(result.reason.message);
    }
  });
};
fetchUsers();


const title = document.querySelector("#title");
title.textContent = "Hello, Intern!";
const subtitle = document.querySelector("#subtitle");
subtitle.style.color = "blue";
const counter = document.querySelector("#counter");
const count = Number(counter.textContent);
counter.textContent = count + 1;
const names = ["Alice", "Bob", "Carol"];
const userList = document.querySelector("#user-list");
names.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  userList.appendChild(li);
});
function toggleTitle() {
  document.querySelector("#title").classList.toggle("highlight");
}
toggleTitle();


const greetBtn = document.querySelector("#greet-btn");
greetBtn.addEventListener("click", () => {
  const name = document.querySelector("#name-input").value.trim();
  if(name === ""){
    document.querySelector("#greeting").textContent = "Please enter a name";
  }else{
    document.querySelector("#greeting").textContent = `Hello, ${name}!`;
  }
});
let count1=0;
document.querySelector("#add-btn").addEventListener("click", () => {
  count1++;
  document.querySelector("#click-count").textContent = `Clicks: ${count1}`;
});

document.querySelector("#reset-btn").addEventListener("click", () => {
  count1 = 0;
  document.querySelector("#click-count").textContent = `Clicks: ${count1}`;
});
document.querySelector("#name-input").addEventListener("input", () => {
  const name = document.querySelector("#name-input").value;

  if (name === "") {
    document.querySelector("#greeting").textContent = "";
  } else {
    document.querySelector("#greeting").textContent = `Hello, ${name}!`;
  }
});
document.querySelector("#name-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    document.querySelector("#greet-btn").click();
  }
});


let users = [];
document.querySelector("#load-btn").addEventListener("click", async () => {
  document.querySelector("#status").textContent = "Loading...";
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    users = await response.json();
    const container = document.querySelector("#users-container");
    container.innerHTML = "";
    users.forEach(user => {
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${user.name}</h3>
        <p>${user.email}</p>
        <p>${user.address.city}</p>
      `;
      container.appendChild(div);
    });
    document.querySelector("#status").textContent =
      `${users.length} users loaded`;
  } catch (error) {
    document.querySelector("#status").textContent =
      "Failed to load users. Try again.";
    document.querySelector("#users-container").innerHTML = "";
  }
});
document.querySelector("#search").addEventListener("input", (event) => {
  const searchText = event.target.value.toLowerCase();
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );
  const container = document.querySelector("#users-container");
  container.innerHTML = "";
  filteredUsers.forEach(user => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
      <p>${user.address.city}</p>
    `;
    container.appendChild(div);
  });
});

const loadUserAndPosts = async () => {
  const [userResponse, postsResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/users/1"),
    fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
  ]);
  const user = await userResponse.json();
  const posts = await postsResponse.json();
  console.log(`${user.name} has ${posts.length} posts`);
};
loadUserAndPosts();
const container = document.querySelector("#users-container");
users.forEach(user => {
  const div = document.createElement("div");
  const name = document.createElement("h3");
  name.textContent = user.name;
  const email = document.createElement("p");
  email.textContent = user.email;
  const city = document.createElement("p");
  city.textContent = user.address.city;
  div.appendChild(name);
  div.appendChild(email);
  div.appendChild(city);
  container.appendChild(div);
});

document.querySelector("#load-btn").addEventListener("click", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  localStorage.setItem("users", JSON.stringify(users));
  console.log("Users saved");
});
const savedUsers = JSON.parse(
  localStorage.getItem("users")
);
console.log(savedUsers);

let controller;
document.querySelector("#load-btn").addEventListener("click", async () => {
  controller = new AbortController();
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users",
      {
        signal: controller.signal
      }
    );
    const users = await response.json()
    console.log(users);
  } catch (error) {
    console.log("Request cancelled");
  }
});
document.querySelector("#cancel-btn").addEventListener("click", () => {
  controller.abort();
});




