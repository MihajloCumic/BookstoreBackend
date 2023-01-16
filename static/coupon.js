function init() {
  const cookies = document.cookie.split("=");
  const token = cookies[cookies.length - 1];

  document.getElementById("add").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("name").value,
      code: document.getElementById("code").value,
      discount: Number(document.getElementById("discount").value),
    };

    document.getElementById("name").value === "" && delete data.name;
    document.getElementById("code").value === "" && delete data.code;
    document.getElementById("discount").value === "" && delete data.discount;

    document.getElementById("name").value = "";
    document.getElementById("code").value = "";
    document.getElementById("discount").value = "";

    fetch("http://127.0.0.1:7000/coupon", {
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
            "couponLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Code: ${el.code}, Discount: ${el.discount}</li>`;
        }
      });
  });
  document.getElementById("delete").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("couponID").value);
    document.getElementById("couponID").value = "";
    fetch(`http://127.0.0.1:7000/coupon/${id}`, {
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
            "couponLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Code: ${el.code}, Discount: ${el.discount}</li>`;
        }
      });
  });
  document.getElementById("update").addEventListener("click", (e) => {
    e.preventDefault();
    const data = {
      name: document.getElementById("nameUpdate").value,
      code: document.getElementById("codeUpdate").value,
      discount: Number(document.getElementById("discountUpdate").value),
    };
    const id = Number(document.getElementById("couponIDUpdate").value);

    document.getElementById("nameUpdate").value === "" && delete data.name;
    document.getElementById("codeUpdate").value === "" && delete data.code;
    document.getElementById("discountUpdate").value === "" &&
      delete data.discount;

    document.getElementById("couponIDUpdate").value = "";
    document.getElementById("nameUpdate").value = "";
    document.getElementById("codeUpdate").value = "";
    document.getElementById("discountUpdate").value = "";

    fetch(`http://127.0.0.1:7000/coupon/${id}`, {
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
            "couponLst"
          ).innerHTML = `<li>ID: ${el.id}, Name: ${el.name}, Code: ${el.code}, Discount: ${el.discount}</li>`;
        }
      });
  });
  document.getElementById("get").addEventListener("click", (e) => {
    e.preventDefault();
    const id = Number(document.getElementById("couponIDGet").value);
    document.getElementById("couponIDGet").value = "";
    fetch(`http://127.0.0.1:7000/coupon/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((el) => {
        if (el.msg) {
          alert(el.msg);
        } else {
          const lst = document.getElementById("couponLst");
          lst.innerHTML = `<li>CouponID: ${el.coupon.id}, Name: ${el.coupon.name}, Code: ${el.coupon.code}, Discount: ${el.coupon.discount}</li>`;
          el.orders.forEach((order) => {
            lst.innerHTML += `<li>OrderID: ${
              order.id
            }, Date: ${order.date.toString()}, Status: ${
              order.status
            }, Adress: ${order.address}, Amount: ${order.amount}</li>`;
          });
        }
      });
  });
  document.getElementById("getAll").addEventListener("click", (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:7000/coupon", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const lst = document.getElementById("couponLst");
        lst.innerHTML = " ";
        data.forEach((el) => {
          lst.innerHTML += `<li>ID: ${el.id}, Name: ${el.name}, Code: ${el.code}, Discount: ${el.discount}</li>`;
        });
      });
  });
}
