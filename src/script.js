$(document).ready(function () {
  var user = {};

  function register(e) {
    user.idnumber = document.getElementById("idnumber").value;
    user.firstname = document.getElementById("firstname").value;
    user.lastname = document.getElementById("lastname").value;
    user.gender = document.getElementById("gender").value;
    user.bday = document.getElementById("bday").value;
    user.program = document.getElementById("program").value;
    user.yearlevel = document.getElementById("yearlevel").value;
    console.log(user);

    $.ajax({
      type: "POST",
      data: { action: "register", userdata: user },
      url: "src/php/user.php",
      success: function (response) {
        idresponse = jQuery.parseJSON(response);
        var table = $("#usertable tbody");
        if (idresponse == 0) {
          alert("Error saving the user!");
        } else {
          user.id = idresponse;
          appendUser(user, table);
        }
        $("#userForm").find("input, select").val("");
      },
    });

    e.preventDefault();
  }

  function getUsers() {
    $.ajax({
      type: "GET",
      data: { action: "getusers" },
      url: "src/php/user.php",
      success: function (response) {
        users = jQuery.parseJSON(response);
        var table = $("#usertable tbody");
        for (var i = 0; i < users.length; i++) {
          appendUser(users[i], table);
        }
      },
    });
  }

  function appendUser(user, table) {
    row =
      `<tr id="${user.id}">` +
      '<th scope="row">' +
      user.id +
      "</th>" +
      "<td>" +
      user.idnumber +
      "</td>" +
      "<td>" +
      user.firstname +
      "</td>" +
      "<td>" +
      user.lastname +
      "</td>" +
      "<td>" +
      user.gender +
      "</td>" +
      "<td>" +
      user.bday +
      "</td>" +
      "<td>" +
      user.program +
      "</td>" +
      "<td>" +
      user.yearlevel +
      "</td>" +
      "<td>" +
      `<button type="button" id="delete-user-${user.id}" class="btn btn-danger">delete</button>` +
      "</td>" +
      "</tr>";

    table.append(row);

    $("#delete-user-" + user.id).click(function (e) {
      const btn = this;
      deleteUser(user.id);
    });
  }

  function deleteUser(userId) {
    $.ajax({
      type: "POST",
      data: { action: "deleteuser", userId: userId },
      url: "src/php/user.php",
      success: function (response) {
        console.log(response);
        $(`#${userId}`).remove();
      },
    });

    console.log("hello");
  }

  $("#userForm").submit(register);

  getUsers();
});
