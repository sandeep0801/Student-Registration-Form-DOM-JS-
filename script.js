// script.js

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("student-form");
    const tableBody = document.querySelector("#student-table tbody");

    // Load students from localStorage
    let students = JSON.parse(localStorage.getItem("students")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("students", JSON.stringify(students));
    }

    function renderTable() {
        tableBody.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.studentId}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td class="action-buttons">
                    <button class="edit" onclick="editStudent(${index})">Edit</button>
                    <button class="delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const studentId = document.getElementById("studentId").value.trim();
        const email = document.getElementById("email").value.trim();
        const contact = document.getElementById("contact").value.trim();

        if (!name.match(/^[A-Za-z ]+$/)) {
            alert("Name should contain only letters.");
            return;
        }
        if (!studentId.match(/^\d+$/)) {
            alert("Student ID should be a number.");
            return;
        }
        if (!contact.match(/^\d{10}$/)) {
            alert("Contact number should be 10 digits.");
            return;
        }

        students.push({ name, studentId, email, contact });
        saveToLocalStorage();
        renderTable();
        form.reset();
    });

    window.editStudent = (index) => {
        const student = students[index];
        document.getElementById("name").value = student.name;
        document.getElementById("studentId").value = student.studentId;
        document.getElementById("email").value = student.email;
        document.getElementById("contact").value = student.contact;

        students.splice(index, 1);
        saveToLocalStorage();
        renderTable();
    };

    window.deleteStudent = (index) => {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            saveToLocalStorage();
            renderTable();
        }
    };

    renderTable();
});
