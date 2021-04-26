$(document).ready(function () {

  if (typeof getCookie("login") === "undefined") {
    $("#Exitli").remove();
    $("#Cartli").remove();
  }
  if (typeof getCookie("login") !== "undefined") {
    $("#Enterli").remove();
  }
  $("#search").keyup(function () {
    var name = $("#search").val();
    if (name === "") {
      $("#display").html("");
    } else {
      $.ajax({
        type: "POST",
        url: "/handler",
        data: {
          search: name,
        },
        success: function (response) {
          $("#display").html(response);
        },
      });
    }
  });
});
function fill(Value) {
  $("#search").val(Value);
  $("#display").hide();
}
Exit.onclick = function () {
  console.log("login");
  document.cookie = "login" + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  location.reload();
};
function getCookie(name) {
  var matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
