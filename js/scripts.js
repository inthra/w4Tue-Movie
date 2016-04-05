// business logic
var Ticket = function(movie, time, regQty, kidQty, senQty) {
  this.movie = movie;
  this.time = time;
  this.regQty = regQty;
  this.kidQty = kidQty;
  this.senQty = senQty;
}

Ticket.prototype.totalQty = function () {
  return (this.regQty+this.kidQty+this.senQty);
}

Ticket.prototype.totalPrice = function() {
  //normal price = $10.00/ticket
  var totalPrice = 10.00*this.totalQty();

  if (this.movie === "new-release") {
    //can't discount price
  }
  else {
    //if before 5pm
    if (this.time <= 1700) {
      //discount $1.00/ticket
      totalPrice -= 1.00*this.totalQty();
    }
    //discount kids $0.50/ticket
    totalPrice -= 0.50*this.kidQty;
    //discount seniors $1.00/ticket
    totalPrice -= 1.00*this.senQty;
  }

  return totalPrice;
}

// user interface logic
$(document).ready(function() {
  $("#blank form").submit(function(event) {
    event.preventDefault();
    var movieValue = $("#movieName").val();
    var timeValue = parseInt($("#showtime").val());
    var regularQuantity = parseInt($("#regularAmount").val());
    var childQuantity = parseInt($("#childAmount").val());
    var seniorQuantity = parseInt($("#seniorAmount").val());

    var ticket = new Ticket (movieValue, timeValue, regularQuantity, childQuantity, seniorQuantity);

    $("#totalCost").text("$"+(ticket.totalPrice()).toFixed(2));
    $("#cost").show();
  });
});
