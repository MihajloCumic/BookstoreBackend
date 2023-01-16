function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById("title").value,
      publisher: document.getElementById("publisher").value,
      ISBN: document.getElementById("isbn").value,
      description: document.getElementById("description").value,
      price: document.getElementById("price").value,
      categoryID: document.getElementById("categoryID").value,
      authorID: document.getElementById("authorID").value,
    };

    document.getElementById("title").value === "" && delete data.title;
    document.getElementById("publisher").value === "" && delete data.publisher;
    document.getElementById("isbn").value === "" && delete data.ISBN;
    document.getElementById("description").value === "" &&
      delete data.description;
    document.getElementById("price").value === "" && delete data.price;
    document.getElementById("categoryID").value === "" &&
      delete data.categoryID;
    document.getElementById("authorID").value === "" && delete data.authorID;

    document.getElementById("title").value = "";
    document.getElementById("publisher").value = "";
    document.getElementById("isbn").value = "";
    document.getElementById("description").value = "";
    document.getElementById("price").value = "";
    document.getElementById("categoryID").value = "";
    document.getElementById("authorID").value = "";

    fetch("http://127.0.0.1:7000/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((book) => {
        if (book.msg) {
          alert(book.msg);
        } else {
          document.getElementById(
            "bookLst"
          ).innerHTML = `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}, price: ${book.price}, categoryID: ${book.categoryID}, saleID: ${book.saleID}, authorID: ${book.authorID}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("bookID").value);
    document.getElementById("bookID").value = "";
    fetch(`http://127.0.0.1:7000/book/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((book) => {
        if (book.msg) {
          alert(book.msg);
        } else {
          document.getElementById(
            "bookLst"
          ).innerHTML = `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}, price: ${book.price}, categoryID: ${book.categoryID}, saleID: ${book.saleID}, authorID: ${book.authorID}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      title: document.getElementById("titleUpdate").value,
      publisher: document.getElementById("publisherUpdate").value,
      ISBN: document.getElementById("isbnUpdate").value,
      description: document.getElementById("descriptionUpdate").value,
      price: document.getElementById("priceUpdate").value,
      categoryID: document.getElementById("categoryIDUpdate").value,
      authorID: document.getElementById("authorIDUpdate").value,
      saleID: document.getElementById("saleIDUpdate").value,
    };

    const id = document.getElementById("bookIDUpdate").value;

    document.getElementById("titleUpdate").value === "" && delete data.title;
    document.getElementById("publisherUpdate").value === "" &&
      delete data.publisher;
    document.getElementById("isbnUpdate").value === "" && delete data.ISBN;
    document.getElementById("descriptionUpdate").value === "" &&
      delete data.description;
    document.getElementById("priceUpdate").value === "" && delete data.price;
    document.getElementById("categoryIDUpdate").value === "" &&
      delete data.categoryID;
    document.getElementById("authorIDUpdate").value === "" &&
      delete data.authorID;
    document.getElementById("saleIDUpdate").value === "" && delete data.saleID;

    document.getElementById("bookIDUpdate").value = "";

    document.getElementById("titleUpdate").value = "";
    document.getElementById("publisherUpdate").value = "";
    document.getElementById("isbnUpdate").value = "";
    document.getElementById("descriptionUpdate").value = "";
    document.getElementById("priceUpdate").value = "";
    document.getElementById("categoryIDUpdate").value = "";
    document.getElementById("authorIDUpdate").value = "";
    document.getElementById("saleIDUpdate").value = "";

    fetch(`http://127.0.0.1:7000/book/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((book) => {
        if (book.msg) {
          alert(book.msg);
        } else {
          document.getElementById(
            "bookLst"
          ).innerHTML = `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}, price: ${book.price}, categoryID: ${book.categoryID}, saleID: ${book.saleID}, authorID: ${book.authorID}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("bookIDGet").value);
    document.getElementById("bookIDGet").value = "";
    fetch(`http://127.0.0.1:7000/book/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((book) => {
        if (book.msg) {
          alert(book.msg);
        } else {
          document.getElementById(
            "bookLst"
          ).innerHTML = `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}, price: ${book.price}, categoryID: ${book.categoryID}, saleID: ${book.saleID}, authorID: ${book.authorID}</li>`;
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/book", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("bookLst");
        lst.innerHTML = " ";
        data.forEach((book) => {
          lst.innerHTML += `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}, price: ${book.price}, categoryID: ${book.categoryID}, saleID: ${book.saleID}, authorID: ${book.authorID}</li>`;
        });
      });
  });
}
