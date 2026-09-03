const SUPABASE_URL = "https://hqpxxkuisvwkjkkxuroq.supabase.co";
const SUPABASE_KEY = "sb_publishable_kkIYksD0Qz9lJwHsRMkMVA_PhgNNe8N";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);

const studentList = document.getElementById("studentList");
const studentForm = document.getElementById("studentForm");

// Lấy danh sách sinh viên
async function loadStudents() {

    const { data, error } = await supabaseClient
        .from("students")
        .select("*")
        .order("id", { ascending: true });

    if (error) {
        console.error(error);
        alert("Lỗi tải dữ liệu!");
        return;
    }

    studentList.innerHTML = "";

    data.forEach(student => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.student_code}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.major}</td>
            <td>
                <button
                    class="delete-btn"
                    onclick="deleteStudent(${student.id})">
                    Xóa
                </button>
            </td>
        `;

        studentList.appendChild(row);
    });
}

// Thêm sinh viên
studentForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const student_code =
        document.getElementById("student_code").value;

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const major =
        document.getElementById("major").value;

    const { error } = await supabaseClient
        .from("students")
        .insert([
            {
                student_code,
                name,
                email,
                major
            }
        ]);

    if (error) {
        console.error(error);
        alert("Thêm sinh viên thất bại!");
        return;
    }

    alert("Thêm sinh viên thành công!");

    studentForm.reset();

    loadStudents();
});

// Xóa sinh viên
async function deleteStudent(id) {

    const confirmDelete = confirm(
        "Bạn có chắc muốn xóa sinh viên này?"
    );

    if (!confirmDelete) {
        return;
    }

    const { error } = await supabaseClient
        .from("students")
        .delete()
        .eq("id", id);

    if (error) {
        console.error(error);
        alert("Xóa thất bại!");
        return;
    }

    alert("Xóa thành công!");

    loadStudents();
}

// Chạy khi mở website
loadStudents();