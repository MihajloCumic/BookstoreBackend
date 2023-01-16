function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
      discount: Number(document.getElementById("discount").value),
      enddate: document.getElementById("enddate").value,
    };

    document.getElementById("name").value === "" && delete data.name;
    document.getElementById("discount").value === "" && delete data.discount;
    document.getElementById("enddate").value === "" && delete data.enddate;

    document.getElementById("name").value = "";
    document.getElementById("discount").value = "";
    document.getElementById("enddate").value = "";

    fetch("http://127.0.0.1:7000/sale", {
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
          document.getElementById("saleLst").innerHTML = `<li>ID: ${
            el.id
          }, Name: ${el.name}, Discount: ${el.discount}, EndDate: ${
            el.enddate && el.enddate.toString()
          }</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("saleID").value);
    document.getElementById("saleID").value = "";
    fetch(`http://127.0.0.1:7000/sale/${id}`, {
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
          document.getElementById("saleLst").innerHTML = `<li>ID: ${
            el.id
          }, Name: ${el.name}, Discount: ${el.discount}, EndDate: ${
            el.enddate && el.enddate.toString()
          }</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("nameUpdate").value,
      discount: document.getElementById("discountUpdate").value,
      enddate: document.getElementById("enddateUpdate").value,
    };
    const id = Number(document.getElementById("saleIDUpdate").value);

    document.getElementById("nameUpdate").value === "" && delete data.name;
    document.getElementById("discountUpdate").value === "" &&
      delete data.discount;
    document.getElementById("enddateUpdate").value === "" &&
      delete data.enddate;

    document.getElementById("saleIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";
    document.getElementById("discountUpdate").value = "";
    document.getElementById("enddateUpdate").value = "";

    fetch(`http://127.0.0.1:7000/sale/${id}`, {
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
          document.getElementById("saleLst").innerHTML = `<li>ID: ${
            el.id
          }, Name: ${el.name}, Discount: ${el.discount}, EndDate: ${
            el.enddate && el.enddate.toString()
          }</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("saleIDGet").value);
    document.getElementById("saleIDGet").value = "";
    fetch(`http://127.0.0.1:7000/sale/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          if (el[0]) {
            const lst = document.getElementById("saleLst");
            lst.innerHTML = `<li>ID: ${el[0].id}, Name: ${el[0].name}</li>`;
            lst.innerHTML += `<p>Books on sale:</p>`;
            const books = el[0]["Books"];

            books.forEach((book) => {
              lst.innerHTML += `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}</li>`;
            });
          } else {
            const lst = document.getElementById("saleLst");
            lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Discount: ${
              el.discount
            }, EndDate: ${el.enddate && el.enddate.toString()}</li>`;
            lst.innerHTML += `<p>No books on sale</p>`;
          }
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/sale", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("saleLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Discount: ${
            el.discount
          }, EndDate: ${el.enddate && el.enddate.toString()}</li>`;
        });
      });
  });
}
