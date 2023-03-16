let menuObj = []
let CurrentOrderObj = [];

$(document).ready(function () {
  $("#sendButton").click(function () {
    const optionArray = ["1", "99", "98", "97", "0"];
    var inputValue = $("#main-input").val();
    $("#error").html("<p></p>");
    if (inputValue === "1") {
      // load food menu
      axios
        .get("http://localhost:3000/chat/get-menu")
        .then((res) => {
          res.data.map((food) => {
            $("#chat").append(
              `<textarea id="bot-reply">Input "${food.number}" for ${food.title}</textarea>`
            );
          });
          menuObj = [...res.data];
        })
        .catch((err) => {
          console.log(err);
        });
      // clear input area
      $("#main-input").val("");
    }
    if (inputValue === "99") {
        if(!CurrentOrderObj) {
            $("#chat").append(
              `<textarea id="bot-reply">Your cart is empty. Please input a number from 1 to ${menuObj.length}</textarea>`
            );
            // clear input area
            $("#main-input").val("");
        }
        else {
            // push current order to order db
            axios
              .post("http://localhost:3000/chat/place-order", {
                params: {
                  orders: CurrentOrderObj,
                },
              })
              .then((res) =>
                $("#chat").append(
                  `<textarea id="bot-reply">${res.data.message} with orderId(${res.data.orderId})</textarea>`
                )
              )
              .catch((err) =>
                $("#chat").append(
                  `<textarea id="bot-reply">An error occured. Please try again.</textarea>`
                )
              );
            // clear input area
            $("#main-input").val("");
        }
        }
    if (inputValue === "98") {
      // get order history
      axios
        .get("http://localhost:3000/chat/orders")
        .then((orders) => {
          console.log(orders);
          // $("#chat").append(
          //   `<textarea id="bot-reply">Here is your order history</textarea>`
          // );
        })
        .catch((err) => {
          $("#chat").append(
            `<textarea id="bot-reply">You have not placed an order.</textarea>`
          );
        });
      // clear input area
      $("#main-input").val("");
    }
    if (inputValue === "97") {
      if(!CurrentOrderObj){
        $("#chat").append(
          `<textarea id="bot-reply">You have not current order.</textarea>`
        );
      }
      else {
        CurrentOrderObj.map(order => 
        $("#chat").append(
          `<textarea id="bot-reply">Order placed for ${order.title}</textarea>`
        )
        )} 
        
      // clear input area
      $("#main-input").val("");
    }
    if (inputValue === "0") {
      $("#chat").append(`<textarea id="bot-reply">Order Cancelled!</textarea>`);
      // then do something
      // clear input area
      $("#main-input").val("");
    }
    if (!optionArray.includes(inputValue)) {
      $("#error").html(
        '<p>Please input the correct option</p>'
      );
      $("#main-input").val("");
    }
  });
});

$(document).ready(function () {
  $("#optionButton").click(function () {
    var inputValue = Number($("#menu-input").val());
    if(menuObj.length === 0) {
        $("#chat").append(
          `<textarea id="bot-reply">Please first select an option from the main menu area.</textarea>`
        );
        // clear input area
        $("#menu-input").val("");
    }
    if(menuObj && inputValue <= menuObj.length) {
      $("#chat").append(`<textarea id="user-reply">"${inputValue}"</textarea>`);
      // clear input area
      $("#menu-input").val("");
      // TODO: ADD CURRENT ORDER OBJECT TO CURRENT ORDER OBJECT.
      let orderArr = menuObj.filter((menu) => menu.number === inputValue);
    orderArr.map(item => CurrentOrderObj.push({title:item.title, description:item.description, number:item.number}));
    }
    if (menuObj.length > 0 && inputValue > menuObj.length) {
      $("#chat").append(
        `<textarea id="bot-reply">Please input a number from 1 to ${menuObj.length}</textarea>`
      );
      $("#menu-input").val("");
    }
    
  });
});
