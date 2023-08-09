let data = [];

const addBtn = document.querySelector(".add-btn"),
  errorToast = document.querySelector(".alert"),
  tableBody = document.querySelector(".table-body");

const saveDataToLocalStorage = () => {
  localStorage.setItem("data", JSON.stringify(data));
};

const getDataLocalStorage = () => {
  const getValue = localStorage.getItem("data");
  if (getValue !== null) {
    data = JSON.parse(getValue);
  } else {
    data = [];
  }
};
getDataLocalStorage();

addBtn.addEventListener("click", () => {
  const phone = document.querySelector(".post-phone"),
    name = document.querySelector(".post-name"),
    lastName = document.querySelector(".post-last-name"),
    email = document.querySelector(".post-email"),
    rejex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (
    phone.value !== "" &&
    name.value !== "" &&
    lastName.value !== "" &&
    rejex.test(email.value)
  ) {
    const uuid = window.uuid.v4();
    data.push({
      id: uuid,
      name: name.value,
      lastName: lastName.value,
      phoneNumber: phone.value,
      email: email.value,
    });
    renderData(data);
    errorToast.classList.add("d-none");
    phone.value = "";
    email.value = "";
    lastName.value = "";
    name.value = "";
    saveDataToLocalStorage();
  } else {
    errorToast.classList.remove("d-none");
  }
});

const renderData = (data) => {
  tableBody.innerHTML = ''; // Clear the table body before rendering
  data.forEach((item) => {
    tableBody.innerHTML += `
      <tr>
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.lastName}</td>
        <td>${item.phoneNumber}</td>
        <td>${item.email}</td>
        <td class="text-end">
            <button type="button" class="btn btn-warning edit-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-id="${item.id}"><i class='bx bxs-edit' style='color:#ffffff'></i></button>
            <button type="button" class="btn btn-danger delete-btn" data-id="${item.id}"><i class='bx bxs-trash-alt' style='color:#ffffff'></i></button>
        </td>
      </tr>
    `;
  });

  const editButtons = document.querySelectorAll(".edit-btn");
  const deleteButtons = document.querySelectorAll(".delete-btn");

  editButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      editData(itemId)
    });
  });



  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const itemId = button.getAttribute("data-id");
      deleteData(itemId);
      console.log(itemId)
    });
  });
};
renderData(data);

const deleteData = (itemId) => {
  data = data.filter(item => item.id !== itemId);
  renderData(data);
  saveDataToLocalStorage();
};

const editData = (itemID) => {
  const editName = document.querySelector('#edit-name'),
    editLastName = document.querySelector('#edit-last-name'),
    editPhone = document.querySelector('#edit-phone'),
    editEmail = document.querySelector('#edit-email'),
    updateBtn = document.querySelector('.update-btn');
  const filteredData = data.filter(item => item.id === itemID)
  const selectedData = filteredData[0]
  editName.value = selectedData.name
  editLastName.value = selectedData.lastName
  editPhone.value = selectedData.phoneNumber
  editEmail.value = selectedData.email

  updateBtn.addEventListener('click', () => {
    selectedData.name = editName.value;
    selectedData.lastName = editLastName.value;
    selectedData.phoneNumber = editPhone.value;
    selectedData.email = editEmail.value
    renderData(data)
    saveDataToLocalStorage()

  })
}

// You can create an editData(itemId) function for editing/updating data here
