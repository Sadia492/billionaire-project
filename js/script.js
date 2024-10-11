const loadUser = async () => {
  const res = await fetch(`https://forbes400.onrender.com/api/forbes400/`);
  const data = await res.json();
  document.getElementById("spinner").classList.remove("hidden");
  setTimeout(() => {
    displayRandomUser(data);
  }, 2000);
};
let finalWealth = [];
let addedUsers = [];

const displayRandomUser = (data) => {
  document.getElementById("spinner").classList.add("hidden");
  const tableContainer = document.getElementById("table-container");
  let randomIndex = Math.floor(Math.random() * 400);
  const { countryOfCitizenship, person, finalWorth, rank, industries } =
    data[randomIndex];
  const { name, squareImage } = person;
  const [industry] = industries;
  // Add the user data to addedUsers array
  const user = { name, countryOfCitizenship, industry, rank, finalWorth };
  addedUsers.push(user); // Store the user data

  tableContainer.innerHTML += `
   <table class="table table-zebra">
                  
                    <tbody>
                      <!-- row 1 -->
                      <tr>
                        <td>${name}</td>
                        <td class="cursor-pointer">
                          <i class="fa-solid fa-eye"></i>
                        </td>
                        <td>${countryOfCitizenship}</td>
                        <td>${industry}</td>
                        <td>${rank}</td>
                        <td class="worth">$${finalWorth}</td>
                      </tr>

                    </tbody>
                  </table>
  `;
  finalWealth.push(finalWorth);
};

let sum = 0;
const calculateTotal = () => {
  for (const item of finalWealth) {
    sum += item;
  }
  document.getElementById("total-wealth").innerText = sum.toFixed(2);
};

const sortByRank = () => {
  // Sort the addedUsers array by rank
  addedUsers.sort((a, b) => b.rank - a.rank);

  // Clear the current table content
  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";

  // Re-render the sorted users in the table
  addedUsers.forEach((user) => {
    const { name, countryOfCitizenship, industry, rank, finalWorth } = user;
    tableContainer.innerHTML += `
        
            <tr>
              <td>${name}</td>
              <td class="cursor-pointer">
                <i class="fa-solid fa-eye"></i>
              </td>
              <td>${countryOfCitizenship}</td>
              <td>${industry}</td>
              <td>${rank}</td>
              <td class="worth">$${finalWorth}</td>
            </tr>
          
      `;
  });
};

// Hook the sort function to a button click event
document.getElementById("sortByRankBtn").addEventListener("click", sortByRank);

const doubleMoney = () => {
  // Update the finalWealth values
  finalWealth = finalWealth.map((worth) => worth * 2);

  // Select all the wealth elements in the table
  const worthElements = document.getElementsByClassName("worth");

  // Update the displayed worth values
  addedUsers.forEach((user, index) => {
    // Update the wealth in the addedUsers array
    user.finalWorth = finalWealth[index];

    // Update the displayed worth value in the table
    worthElements[index].innerText = `$${finalWealth[index]}`;
  });
};

const showAll = async () => {
  const res = await fetch(
    `https://forbes400.onrender.com/api/forbes400?limit=10`
  );
  const data = await res.json();
  displayAll(data);
};

const displayAll = (data) => {
  const cardContainer = document.getElementById("card-container");
  data.forEach((item) => {
    const {
      countryOfCitizenship,
      state,
      city,
      thumbnail,
      person: { name, squareImage },
      financialAssets,
    } = item;
    const { numberOfShares, sharePrice } = financialAssets[0];

    const div = document.createElement("div");
    div.innerHTML = `
     <div class="bg-[#0E1B34] p-4">
          <h2
            class="text-white font-bold drop-shadow-2xl shadow-white text-center"
          >
            ${name}
          </h2>
          <div class="flex items-center">
            <img class="w-1/2 mr-2" src=${squareImage} alt="" />
            <div class="py-4 border-l-2 border-white pl-4">
              <p class="text-white">
                <span class="font-bold">Citizenship: </span>${countryOfCitizenship}
              </p>

              <p class="text-white">
                <span class="font-bold">State: </span>${state}
              </p>

              <p class="text-white">
                <span class="font-bold">City: </span>${city}
              </p>

              <p class="text-white">
                <span class="font-bold">Total Shares: </span>${numberOfShares}
              </p>
              <p class="text-white">
                <span class="font-bold">Share Price: </span>$${sharePrice}
              </p>
            </div>
          </div>
        </div>
    
    `;
    cardContainer.appendChild(div);
  });
};
showAll();

const showBillionaire = () => {
  //   console.log("hello");
  const mainSection = document.getElementById("main-section");
  mainSection.classList.add("hidden");
  document.getElementById("richest-by-tech").classList.remove("hidden");
};
const reverseTask = () => {
  //   console.log("hello");
  const mainSection = document.getElementById("main-section");
  mainSection.classList.remove("hidden");
  document.getElementById("richest-by-tech").classList.add("hidden");
};
