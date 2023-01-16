function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
    };

    document.getElementById("name").value === "" && delete data.name;

    document.getElementById("name").value = "";

    fetch("http://127.0.0.1:7000/category", {
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
            "categoryLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("categoryID").value);
    document.getElementById("categoryID").value = "";
    fetch(`http://127.0.0.1:7000/category/${id}`, {
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
            "categoryLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("nameUpdate").value,
    };
    const id = Number(document.getElementById("categoryIDUpdate").value);

    document.getElementById("nameUpdate").value === "" && delete data.name;

    document.getElementById("categoryIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";

    fetch(`http://127.0.0.1:7000/category/${id}`, {
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
            "categoryLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("categoryIDGet").value);
    document.getElementById("categoryIDGet").value = "";
    fetch(`http://127.0.0.1:7000/category/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          if (el[0]) {
            const lst = document.getElementById("categoryLst");
            lst.innerHTML = `<li>ID: ${el[0].id}, Name: ${el[0].name}</li>`;
            lst.innerHTML += `<p>Books:</p>`;
            const books = el[0]["Books"];

            books.forEach((book) => {
              lst.innerHTML += `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}</li>`;
            });
          } else {
            const lst = document.getElementById("categoryLst");
            lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}</li>`;
            lst.innerHTML += `<p>No books</p>`;
          }
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/category", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("categoryLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}</li>`;
        });
      });
  });
}
