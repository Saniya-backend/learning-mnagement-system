import { useEffect, useState } from "react";
import api from "../api/axios";

function Course() {
  const [courses, setCourses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    course_name: "",
    description: "",
    price: "",
    category_id: "",
    teacher_id: "",
  });

  useEffect(() => {
    getCourses();
    getTeachers();
    getCategories();
  }, []);

  // ---------------- GET COURSES ----------------

  const getCourses = async () => {
    try {
      const res = await api.get("/course");
      setCourses(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ---------------- GET TEACHERS ----------------

  const getTeachers = async () => {
    try {
      const res = await api.get("/teacher");
      setTeachers(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ---------------- GET CATEGORIES ----------------

  const getCategories = async () => {
    try {
      const res = await api.get("/category");
      setCategories(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ---------------- INPUT CHANGE ----------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------- CREATE / UPDATE ----------------

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(`/course/${editId}`, form);
        alert("Course Updated Successfully");
      } else {
        await api.post("/course", form);
        alert("Course Created Successfully");
      }

      setForm({
        course_name: "",
        description: "",
        price: "",
        category_id: "",
        teacher_id: "",
      });

      setEditId(null);

      getCourses();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  // ---------------- EDIT ----------------

  const handleEdit = (course) => {
    setEditId(course.course_id);

    setForm({
      course_name: course.course_name,
      description: course.description,
      price: course.price,
      category_id: course.category_id,
      teacher_id: course.teacher_id,
    });
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course?")) return;

    try {
      await api.delete(`/course/${id}`);

      alert("Course Deleted");

      getCourses();
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Course Management</h2>

      <form
        onSubmit={handleSubmit}
        className="grid gap-3 bg-white shadow p-5 rounded mb-6"
      >
        <input
          type="text"
          name="course_name"
          placeholder="Course Name"
          value={form.course_name}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.category_id} value={category.category_id}>
              {category.category_name}
            </option>
          ))}
        </select>

        <select
          name="teacher_id"
          value={form.teacher_id}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">Select Teacher</option>

          {teachers.map((teacher) => (
            <option key={teacher.teacher_id} value={teacher.teacher_id}>
              {teacher.teacher_name}
            </option>
          ))}
        </select>

        <button className="bg-blue-600 text-white p-2 rounded">
          {editId ? "Update Course" : "Create Course"}
        </button>

        {editId && (
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded"
            onClick={() => {
              setEditId(null);

              setForm({
                course_name: "",
                description: "",
                price: "",
                category_id: "",
                teacher_id: "",
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Teacher</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.course_id}>
              <td className="border p-2">{course.course_id}</td>

              <td className="border p-2">{course.course_name}</td>

              <td className="border p-2">{course.description}</td>

              <td className="border p-2">₹ {course.price}</td>
<td className="border p-2">{course.category_name}</td>

<td className="border p-2">{course.teacher_name}</td>

              <td className="border p-2">
                <button
                  onClick={() => handleEdit(course)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(course.course_id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Course;
