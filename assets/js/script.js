'use strict';  // Kích hoạt chế độ nghiêm ngặt của JavaScript để giúp tìm lỗi cú pháp và những hành vi không rõ ràng.

// Hàm toggle class cho phần tử
const elementToggleFunc = function (elem) { 
  elem.classList.toggle("active"); // Thêm hoặc xóa class "active" khỏi phần tử được chọn
}


// *** Sidebar ***

// Lấy các phần tử liên quan đến sidebar
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Thêm sự kiện click cho nút sidebar trên di động
sidebarBtn.addEventListener("click", function () { 
  elementToggleFunc(sidebar); // Khi click, sidebar sẽ mở hoặc đóng
});


// *** Testimonials (Lời chứng thực) ***

// Lấy tất cả các mục testimonials
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// Lấy các phần tử trong modal (cửa sổ hiển thị thông tin chi tiết)
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Hàm toggle cho modal (mở/đóng modal)
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Thêm sự kiện click cho tất cả các mục testimonials
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {

    // Cập nhật nội dung trong modal khi một mục testimonials được click
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    // Mở modal
    testimonialsModalFunc();
  });
}

// Thêm sự kiện click để đóng modal
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);


// *** Custom Select (Dropdown tùy chỉnh) ***

// Lấy các phần tử cho custom select
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Toggle custom select khi click
select.addEventListener("click", function () { 
  elementToggleFunc(this); 
});

// Thêm sự kiện click cho tất cả các mục trong custom select
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();  // Lấy giá trị được chọn
    selectValue.innerText = this.innerText;  // Hiển thị giá trị được chọn trong custom select
    elementToggleFunc(select);  // Đóng custom select
    filterFunc(selectedValue);  // Thực hiện chức năng lọc dựa trên giá trị được chọn
  });
}


// *** Filter (Lọc) ***

// Lấy tất cả các mục cần lọc
const filterItems = document.querySelectorAll("[data-filter-item]");

// Hàm lọc các mục
const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {

    // Nếu giá trị được chọn là "all", hiển thị tất cả các mục
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } 
    // Nếu giá trị khớp với dataset category của mục, hiển thị mục đó
    else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } 
    // Ẩn các mục khác
    else {
      filterItems[i].classList.remove("active");
    }
  }
}

// Thêm sự kiện click cho các nút lọc trên màn hình lớn
let lastClickedBtn = filterBtn[0];  // Lưu trữ nút đã được click trước đó (mặc định là nút đầu tiên)

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();  // Lấy giá trị từ nút được click
    selectValue.innerText = this.innerText;  // Cập nhật custom select với giá trị vừa chọn
    filterFunc(selectedValue);  // Thực hiện chức năng lọc

    lastClickedBtn.classList.remove("active");  // Loại bỏ class "active" khỏi nút trước đó
    this.classList.add("active");  // Thêm class "active" cho nút hiện tại
    lastClickedBtn = this;  // Cập nhật nút hiện tại làm nút cuối cùng được click
  });
}


// *** Form liên hệ ***

// Lấy các phần tử liên quan đến form
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// Thêm sự kiện input cho tất cả các trường form
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // Kiểm tra tính hợp lệ của form
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");  // Kích hoạt nút gửi nếu form hợp lệ
    } else {
      formBtn.setAttribute("disabled", "");  // Vô hiệu hóa nút gửi nếu form không hợp lệ
    }
  });
}


// *** Điều hướng trang ***

// Lấy các liên kết điều hướng và các trang
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Thêm sự kiện click cho các liên kết điều hướng
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    // Kiểm tra trang nào tương ứng với liên kết và hiển thị trang đó
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);  // Cuộn lên đầu trang
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}


// *** Gửi Email ***

// Hàm gửi email
function emailSend() {
  var userName = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  var message = document.getElementById('message').value;

  var messageBody = "Name: " + userName +
                    "<br/> Email: " + email +
                    "<br/> Message: " + message;

  Email.send({
      Host: "smtp.elasticemail.com",
      Username: "ghenhot12@gmail.com", 
      Password: "92BB4A290BA948FD6A920B210686226A9816", 
      To: 'lethanhlam9287@gmail.com',
      From: 'lethanhlam9287@gmail.com', 
      Subject: "New Message from " + userName,
      Body: messageBody
  }).then(function(message) {
      if (message == 'OK') {
          swal("Success", "Email has been sent successfully!", "success");
      } else {
          swal("Error", "Failed to send email!", "error");
      }
  });
}


// *** Cập nhật nội dung của phần tử có class "title" ***

// Lấy phần tử <p> có class "title"
var titleElement = document.querySelector('.title');

// Lấy giá trị của thuộc tính title và đặt nó làm nội dung văn bản
titleElement.textContent = titleElement.getAttribute('title');
