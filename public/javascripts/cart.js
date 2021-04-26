$(document).ready(function () {
  $.ajax({
    type: "POST",
    dataType: "JSON",
    url: "/carthandler",
    data: { login: $.cookie("login") },
    success: (response) => {
      response = response.filter(function (item, pos) {
        return response.indexOf(item) == pos;
      });
      $(".total-items").text(response.length);
      $("#total-cart-count").text(response.length);
      response = response.sort();
      cartcall(response);
    },
  });
  $(".btn-buy").click(function () {
    product = $(this).attr("id");
    setItems(product);
    let $btn = $(this);
    if ($btn.hasClass("bought")) {
      window.location.href = "/cart"; // Если класс уже добавлен - перенаправить.
    } else {
      $btn.addClass("bought");
      $btn.text("Оформить заказ");
    }
  });
});
function setItems(product) {
  let username = $.cookie("login");
  productid = product;
  $("#total-cart-count").text(parseInt($("#total-cart-count").text()) + 1);
  $.ajax({
    type: "POST",
    dataType: "JSON",
    url: "/deleteitemfromcart",
    data: { username: username, item: product },
    success: (response) => {},
  });
  $.post("buy", { username: username, item: productid });
}
function quantitycheck(id) {
  let c =
    parseInt($("#price" + id).html()) * parseInt($("#quantity" + id).val());
  $("#multiple" + id).text(c);
}
function remove(a) {
  $.ajax({
    type: "POST",
    dataType: "JSON",
    url: "/deleteitemfromcart",
    data: { username: $.cookie("login"), item: a },
    success: (response) => {},
  });
  location.reload();
}
function cartcall(a) {
  function getMaxOfArray(a) {
    return Math.max.apply(null, a);
  }
  max = getMaxOfArray(a);
  for (var i = 0; i <= max; i++) {
    if (typeof a[i] !== "undefined") {
      $.ajax({
        type: "POST",
        dataType: "JSON",
        url: "/carthandler2",
        data: { Id: parseInt(a[i]) },
        success: (response) => {
          $(".itemlist").append(
            '<div class="basket-product"><div class="item"><div class="product-image"><img id="' +
              response.image +
              'Image" alt="Placholder Image 2" class="product-frame"></div><div class="product-details"><h1><strong><span>' +
              response.name +
              '</span></strong></h1><p></p><p id="item' +
              response.num +
              '">ID товара: <span class="number">' +
              response.num +
              '</span></p></div></div><div class="price"><span id="price' +
              response.num +
              '">' +
              response.cost +
              '</span></div><div class="quantity"><input type="number" min="1" class="quantity-field" id="quantity' +
              response.num +
              '" onclick="quantitycheck(' +
              response.num +
              ')"></div><div class="subtotal"><span id="multiple' +
              response.num +
              '"></span></div><div class="remove"><button class="removebutton" onclick="remove(' +
              response.num +
              ')">Remove</button></div></div>'
          );
          $("#" + response.image + "Image").attr(
            "src",
            "img/" + response.image + ".png"
          );
        },
      });
    }
  }
}
$(".checkout-cta").click(() => {
  items = [];
  name = $("#username").text();
  var arr = $(".number")
    .map(function () {
      return $.trim(this.innerHTML);
    })
    .get();
  let last = arr.slice(-1)[0];
  for (i = 0; i < last; i++) {
    a = $("#item" + (i + 1)).text();
    if (a != "") {
      items.push(a);
    }
  }
  $.post(
    "/sendemail",
    {
      items: items,
      name: name,
    },
    function (data, status) {
      console.log("Data: " + data + "\nStatus: " + status);
    }
  );
});