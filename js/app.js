let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const body = document.querySelector("body");
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const employee = document.querySelector("#employee");

function displayInitial(employeeData){
    employees = employeeData;
    displayEmployees(employeeData);
}

function displayEmployees(arr){
    let employeeHTML = '';
    arr.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;
        employeeHTML += `
        <div class="card-container" data-index="${index}">
            <img class="avatar" src="${picture.large}">
            <div class="text-container employee-display">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>  
        `;
    });
    gridContainer.innerHTML = employeeHTML;
}

gridContainer.addEventListener('click', (e) => {
    if (e.target !== gridContainer) {
      const card = e.target.closest(".card-container");
      const index = card.getAttribute("data-index");
      const filteredEmployees = employee.value.trim() !== '' ? employees.filter((worker) => {
        const searchTerm = employee.value.toLowerCase();
        const fullName = `${worker.name.first} ${worker.name.last}`.toLowerCase();
        return fullName.includes(searchTerm);
      }) : employees;
      displayModal(index, filteredEmployees);
    }
  });
  
  function displayModal(index, employees) {
    let { name, dob, phone, email, location: { city, street, state, postcode }, picture } = employees[index];
    let date = new Date(dob.date);
    const modalHTML = `
      <img class="avatar" id="modal-avatar" src="${picture.large}" />
      <div class="text-container text-modal">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth()} / ${date.getDate()} / ${date.getFullYear()}</p>
      </div>
    `;
    overlay.classList.remove("hidden");
    body.classList.add("body-overlay");
    modalContainer.innerHTML = modalHTML;
  }
  
modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
    body.classList.remove("body-overlay");
});

employee.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEmployees = employees.filter((employee) => {
      const fullName = `${employee.name.first} ${employee.name.last}`.toLowerCase();
      return fullName.includes(searchTerm);
    });
    displayEmployees(filteredEmployees);
  });

fetch(urlAPI)
    .then(response => response.json())
    .then(data => data.results)
    .then(displayInitial)
    .catch(err => console.log(err));

