document.addEventListener("DOMContentLoaded", function () {
    initValidation("myform", "success");
});

document.getElementById("formBtn").addEventListener("click", function () {
    document.getElementById("form").scrollIntoView({ behavior: "smooth" });
});