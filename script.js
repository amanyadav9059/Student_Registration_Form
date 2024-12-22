document.addEventListener("DOMContentLoaded", () => {
    const studentForm = document.getElementById("student-form");
    const studentsTableBody = document.querySelector("#students-table tbody");
    const addStudentButton = document.getElementById("add-student");
    // Load existing data from local storage
    const loadStudents = () => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    studentsTableBody.innerHTML = "";
    students.forEach((student, index) => {
        appendStudentRow(student, index);
    });
    };
    const appendStudentRow = (student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
        </td>
    `;
    studentsTableBody.appendChild(row);
    };
    const validateInputs = (name, id, email, contact) => {
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.match(namePattern)) {
        alert("Name should contain only characters.");
        return false;
    }
    if (isNaN(id) || id === "") {
        alert("Student ID should be a number.");
        return false;
    }
    if (!email.match(emailPattern)) {
        alert("Please enter a valid email.");
        return false;
    }
    if (isNaN(contact) || contact === "") {
        alert("Contact number should be a number.");
        return false;
    }
    return true;
    };
    addStudentButton.addEventListener("click", () => {
    const name = document.getElementById("student-name").value.trim();
    const id = document.getElementById("student-id").value.trim();
    const email = document.getElementById("email-id").value.trim();
    const contact = document.getElementById("contact-no").value.trim();
    if (!validateInputs(name, id, email, contact)) return;
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.push({ name, id, email, contact });
    localStorage.setItem("students", JSON.stringify(students));
    studentForm.reset();
    loadStudents();
    });
    window.editStudent = (index) => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const student = students[index];
    document.getElementById("student-name").value = student.name;
    document.getElementById("student-id").value = student.id;
    document.getElementById("email-id").value = student.email;
    document.getElementById("contact-no").value = student.contact;
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
    };
    window.deleteStudent = (index) => {
    const students = JSON.parse(localStorage.getItem("students")) || [];
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
    };
    loadStudents();
});