document.getElementById("resultForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentId = document.getElementById("studentId").value.trim();
  const name = document.getElementById("studentName").value.trim();
  const course = document.getElementById("course").value.trim();
  const semester = document.getElementById("semester").value.trim();
  const fileInput = document.getElementById("resultFile");
  const file = fileInput.files[0];

  if (!studentId || !name || !course || !semester || !file) {
    alert("Please fill in all fields and upload a result file.");
    return;
  }

  const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.type)) {
    alert("Invalid file type. Only PDF, JPG, and PNG are allowed.");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert("File is too large. Max size is 5MB.");
    return;
  }

  // Simulate form submission (replace with actual backend API call)
  alert("Result uploaded successfully!");
  this.reset();
});
