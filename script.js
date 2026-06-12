document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("bookingModal");
  const closeBtn = document.querySelector(".close-btn");

  const selectedRoomText = document.getElementById("selectedRoom");
  const selectedPriceText = document.getElementById("selectedPrice");

  const bookingForm = document.getElementById("bookingForm");

  const paymentMethod = document.getElementById("paymentMethod");
  const paymentInfo = document.getElementById("paymentInfo");

  const transactionBox = document.getElementById("transactionBox");
  const transactionId = document.getElementById("transactionId");

  let pricePerNight = 0;
  let roomName = "";

  document.querySelectorAll(".room-card .btn").forEach(btn => {

    btn.addEventListener("click", function () {

      const card = this.closest(".room-card");

      roomName = card.querySelector("h5").textContent;
      pricePerNight = parseInt(card.querySelector("p").textContent);

      selectedRoomText.textContent = "Room: " + roomName;
      selectedPriceText.textContent = "Price: " + pricePerNight + " ETB";

      modal.style.display = "flex";
    });

  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  paymentMethod.addEventListener("change", function () {

    transactionBox.style.display = "none";
    transactionId.value = "";

    if (this.value === "cash") {

      paymentInfo.textContent =
        "💵 Pay at hotel during check-in.";

    }

    else if (this.value === "telebirr") {

      paymentInfo.textContent =
        "📱 Send payment using TeleBirr and enter your transaction ID below.";

      transactionBox.style.display = "block";
    }

    else if (this.value === "cbe") {

      paymentInfo.textContent =
        "🏦 Send payment using CBE Birr and enter your transaction ID below.";

      transactionBox.style.display = "block";
    }

    else {

      paymentInfo.textContent = "";
    }

  });

  bookingForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("guestName").value;
    const days = document.getElementById("days").value;
    const payment = paymentMethod.value;

    if (!name || !days || !payment) {
      alert("Please fill all fields!");
      return;
    }

    const total = pricePerNight * days;

    if (payment === "telebirr" || payment === "cbe") {

      if (transactionId.value.trim() === "") {

        alert("Please enter your Transaction ID.");
        return;
      }

      const confirmBooking = confirm(
        "Have you completed the payment?"
      );

      if (!confirmBooking) {
        return;
      }

      alert(
        "✅ Booking Submitted!\n\n" +
        "Status: Pending Payment Verification\n" +
        "Name: " + name + "\n" +
        "Room: " + roomName + "\n" +
        "Days: " + days + "\n" +
        "Transaction ID: " + transactionId.value + "\n" +
        "Total: " + total + " ETB"
      );

    }

    else {

      const confirmBooking = confirm(
        "Confirm your booking?"
      );

      if (!confirmBooking) {
        return;
      }

      alert(
        "🎉 Booking Confirmed!\n\n" +
        "Name: " + name + "\n" +
        "Room: " + roomName + "\n" +
        "Days: " + days + "\n" +
        "Payment: Cash on Arrival\n" +
        "Total: " + total + " ETB"
      );

    }

    modal.style.display = "none";

    bookingForm.reset();

    paymentInfo.textContent = "";
    transactionBox.style.display = "none";
    transactionId.value = "";

  });

});