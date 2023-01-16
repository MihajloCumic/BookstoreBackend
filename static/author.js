function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      country: document.getElementById("country").value,
    };

    document.getElementById("name").value === "" && delete data.name;
    document.getElementById("surname").value === "" && delete data.surname;
    document.getElementById("country").value === "" && delete data.country;

    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("country").value = "";

    fetch("http://127.0.0.1:7000/author", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          document.getElementById(
            "authorLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Country: ${el.country}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("authorID").value);
    document.getElementById("authorID").value = "";
    fetch(`http://127.0.0.1:7000/author/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          document.getElementById(
            "authorLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Country: ${el.country}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("nameUpdate").value,
      surname: document.getElementById("surnameUpdate").value,
      country: document.getElementById("countryUpdate").value,
    };
    const id = Number(document.getElementById("authorIDUpdate").value);

    document.getElementById("nameUpdate").value === "" && delete data.name;
    document.getElementById("surnameUpdate").value === "" &&
      delete data.surname;
    document.getElementById("countryUpdate").value === "" &&
      delete data.country;

    document.getElementById("authorIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";
    document.getElementById("surnameUpdate").value = "";
    document.getElementById("countryUpdate").value = "";

    fetch(`http://127.0.0.1:7000/author/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          document.getElementById(
            "authorLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Country: ${el.country}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("authorIDGet").value);
    document.getElementById("authorIDGet").value = "";
    fetch(`http://127.0.0.1:7000/author/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          if (el[0]) {
            const lst = document.getElementById("authorLst");
            lst.innerHTML = `<li>ID: ${el[0].id}, Name: ${el[0].name}, Surname: ${el[0].surname}, Country: ${el[0].country}</li>`;
            lst.innerHTML += `<p>Books:</p>`;
            const books = el[0]["Books"];

            books.forEach((book) => {
              lst.innerHTML += `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}</li>`;
            });
          } else {
            const lst = document.getElementById("authorLst");
            lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Country: ${el.country}</li>`;
            lst.innerHTML += `<p>No books</p>`;
          }
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/author", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("authorLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Country: ${el.country}</li>`;
        });
      });
  });
}
