(function () {
  emailjs.init("V9ozORtji3UMr36gg"); // Public Key của bạn
})();

// Kiểm tra nếu tất cả các input hợp lệ để kích hoạt nút gửi
document.getElementById("fullname").addEventListener("input", validateForm);
document.getElementById("email").addEventListener("input", validateForm);
document.getElementById("message").addEventListener("input", validateForm);

function validateForm() {
  var userName = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var submitBtn = document.getElementById("submit-btn");

  if (userName && email && message) {
    submitBtn.disabled = false; // Kích hoạt nút gửi
  } else {
    submitBtn.disabled = true; // Vô hiệu hóa nút gửi
  }
}

function emailSend() {
  var userName = document.getElementById("fullname").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  var templateParams = {
    user_name: userName,
    user_email: email,
    user_message: message,
  };

  emailjs.send("service_uknt4ty", "template_x3geafh", templateParams).then(
    function (response) {
      swal("Success", "Email has been sent successfully!", "success");
      console.log("Email sent!", response);
    },
    function (error) {
      swal("Error", "Failed to send email!", "error");
      console.error("Email failed to send", error);
    }
  );
}
