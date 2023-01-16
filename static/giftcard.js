function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
      amount: document.getElementById("amount").value,
    };

    document.getElementById("name").value === "" && delete data.name;
    document.getElementById("amount").value === "" && delete data.amount;

    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";

    console.log(data);

    fetch("http://127.0.0.1:7000/giftcard", {
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
            "giftCardLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Amount: ${el.amount}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("giftCardID").value);
    document.getElementById("giftCardID").value = "";
    fetch(`http://127.0.0.1:7000/giftcard/${id}`, {
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
            "giftCardLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Amount: ${el.amount}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("nameUpdate").value,
      amount: document.getElementById("amountUpdate").value,
    };
    const id = Number(document.getElementById("giftCardIDUpdate").value);

    document.getElementById("nameUpdate").value === "" && delete data.name;
    document.getElementById("amountUpdate").value === "" && delete data.amount;

    document.getElementById("giftCardIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";
    document.getElementById("amountUpdate").value = "";

    fetch(`http://127.0.0.1:7000/giftcard/${id}`, {
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
            "giftCardLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Amount: ${el.amount}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("giftCardIDGet").value);
    document.getElementById("giftCardIDGet").value = "";
    fetch(`http://127.0.0.1:7000/giftcard/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          const lst = document.getElementById("giftCardLst");
          lst.innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Amount: ${el.amount}</li>`;
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/giftcard", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("giftCardLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Amount: ${el.amount}</li>`;
        });
      });
  });
}
