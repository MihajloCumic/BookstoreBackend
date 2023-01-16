function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    let privileges = "user";
    if (document.getElementById("admin").checked) privileges = "admin";
    if (document.getElementById("moderator").checked) privileges = "moderator";
    if (document.getElementById("user").checked) privileges = "user";
    const data = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      privileges,
    };

    document.getElementById("name").value === "" && delete data.name;
    document.getElementById("surname").value === "" && delete data.surname;
    document.getElementById("email").value === "" && delete data.email;
    document.getElementById("password").value === "" && delete data.password;

    document.getElementById("name").value = "";
    document.getElementById("surname").value = "";
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";

    fetch("http://127.0.0.1:7000/user", {
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
            "userLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Email: ${el.email}, Privileges: ${el.privileges}, WishListID: ${el.WishListId}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("userID").value);
    document.getElementById("userID").value = "";
    fetch(`http://127.0.0.1:7000/user/${id}`, {
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
            "userLst"
          ).innerHTML = `<li>UserID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Email: ${el.email}, Privileges: ${el.privileges}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    let privileges = "";
    if (document.getElementById("adminUpdate").checked) privileges = "admin";
    if (document.getElementById("moderatorUpdate").checked)
      privileges = "moderator";
    if (document.getElementById("userUpdate").checked) privileges = "user";
    const data = {
      name: document.getElementById("nameUpdate").value,
      surname: document.getElementById("surnameUpdate").value,
      email: document.getElementById("emailUpdate").value,
      password: document.getElementById("passwordUpdate").value,
      privileges,
    };
    const id = Number(document.getElementById("userIDUpdate").value);

    privileges === "" && delete data.privileges;
    document.getElementById("nameUpdate").value === "" && delete data.name;
    document.getElementById("surnameUpdate").value === "" &&
      delete data.surname;
    document.getElementById("emailUpdate").value === "" && delete data.email;
    document.getElementById("passwordUpdate").value === "" &&
      delete data.password;

    document.getElementById("userIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";
    document.getElementById("surnameUpdate").value = "";
    document.getElementById("emailUpdate").value = "";
    document.getElementById("passwordUpdate").value = "";

    fetch(`http://127.0.0.1:7000/user/${id}`, {
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
            "userLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Email: ${el.email}, Privileges: ${el.privileges}</li>`;
        }
      });
  });

  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("userIDGet").value);
    document.getElementById("userIDGet").value = "";
    fetch(`http://127.0.0.1:7000/user/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          console.log(el);
          const lst = document.getElementById("userLst");
          lst.innerHTML = `<li>UserID: ${el.user.id}, Name: ${el.user.name}, Surname: ${el.user.surname}, Email: ${el.user.email}, Privileges: ${el.user.privileges}</li>`;
          lst.innerHTML += `<li> WishListID: ${el.wishlist.id}, Name: ${el.wishlist.name}</li>`;
          el.wishlist.Books.forEach((book) => {
            lst.innerHTML += `<li>BookID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}</li>`;
          });
        }
      })
      .catch((err) => alert(err));
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("userLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Surname: ${el.surname}, Email: ${el.email}, Privileges: ${el.privileges}, WishListID: ${el.WishListId}</li>`;
        });
      });
  });

  document.getElementById("getorders").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("userIDOrder").value);
    document.getElementById("userIDOrder").value = "";
    fetch(`http://127.0.0.1:7000/user/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          const lst = document.getElementById("userLst");
          lst.innerHTML = `<li>UserID: ${el.user.id}, Name: ${el.user.name}, Surname: ${el.user.surname}, Email: ${el.user.email}, Privileges: ${el.user.privileges}</li>`;
          console.log(el);
          el.orders.forEach((order) => {
            lst.innerHTML += `<li>OrderID: ${order.id}, Date: ${order.date}, Status: ${order.status}, Amount: ${order.amount}, CouponID: ${order.couponID}</li>`;
          });
        }
      })
      .catch((err) => alert(err));
  });
}
