function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      date: document.getElementById("date").value,
      status: document.getElementById("status").value,
      address: document.getElementById("address").value,
      couponID: document.getElementById("couponID").value,
      userID: document.getElementById("userID").value,
    };

    document.getElementById("date").value === "" && delete data.date;
    document.getElementById("address").value === "" && delete data.address;
    document.getElementById("status").value === "" && delete data.status;
    document.getElementById("couponID").value === "" && delete data.couponID;
    document.getElementById("userID").value === "" && delete data.userID;

    document.getElementById("date").value = "";
    document.getElementById("address").value = "";
    document.getElementById("status").value = "";
    document.getElementById("couponID").value = "";
    document.getElementById("userID").value = "";

    fetch("http://127.0.0.1:7000/order", {
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
            "orderLst"
          ).innerHTML = `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("orderID").value);
    document.getElementById("orderID").value = "";
    fetch(`http://127.0.0.1:7000/order/${id}`, {
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
            "orderLst"
          ).innerHTML = `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      date: document.getElementById("dateUpdate").value,
      status: document.getElementById("statusUpdate").value,
      address: document.getElementById("addressUpdate").value,
      amount: document.getElementById("amountUpdate").value,
      couponID: document.getElementById("couponIDUpdate").value,
      userID: document.getElementById("userIDUpdate").value,
    };
    const id = Number(document.getElementById("orderIDUpdate").value);

    document.getElementById("dateUpdate").value === "" && delete data.date;
    document.getElementById("addressUpdate").value === "" &&
      delete data.address;
    document.getElementById("statusUpdate").value === "" && delete data.status;
    document.getElementById("couponIDUpdate").value === "" &&
      delete data.couponID;
    document.getElementById("userIDUpdate").value === "" && delete data.userID;

    document.getElementById("orderIDUpdate").value = "";
    document.getElementById("dateUpdate").value = "";
    document.getElementById("addressUpdate").value = "";
    document.getElementById("statusUpdate").value = "";
    document.getElementById("amountUpdate").value = "";
    document.getElementById("couponIDUpdate").value = "";
    document.getElementById("userIDUpdate").value = "";

    fetch(`http://127.0.0.1:7000/order/${id}`, {
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
            "orderLst"
          ).innerHTML = `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
        }
      });
  });
  document.getElementById("addbook").addEventListener("click", (e) => {
    e.preventDefault();

    const orderID = Number(document.getElementById("bookorderID").value);
    const bookID = Number(document.getElementById("bookID").value);

    document.getElementById("bookorderID").value = "";
    document.getElementById("bookID").value = "";

    fetch(`http://127.0.0.1:7000/order/${orderID}/book/${bookID}`, {
      method: "PUT",
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
            "orderLst"
          ).innerHTML = `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("orderIDGet").value);
    document.getElementById("orderIDGet").value = "";
    fetch(`http://127.0.0.1:7000/order/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          if (el[0]) {
            const lst = document.getElementById("orderLst");
            lst.innerHTML = `<li>ID: ${el[0].id}, Date: ${el[0].date}, Status: ${el[0].status}, Amount: ${el[0].amount}, CouponID: ${el[0].couponID}, userID: ${el[0].userID}</li>`;
            lst.innerHTML += `<p>Books:</p>`;
            const books = el[0]["Books"];

            books.forEach((book) => {
              lst.innerHTML += `<li>ID: ${book.id}, Title: ${book.title}, Publisher: ${book.publisher}, ISBN: ${book.ISBN}, Description: ${book.description}</li>`;
            });
          } else {
            const lst = document.getElementById("orderLst");
            lst.innerHTML = `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
            lst.innerHTML += `<p>No books</p>`;
          }
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/order", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("orderLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Date: ${el.date}, Status: ${el.status}, Amount: ${el.amount}, CouponID: ${el.couponID}, userID: ${el.userID}</li>`;
        });
      });
  });
}
