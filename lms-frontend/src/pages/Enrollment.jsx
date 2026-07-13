import { useEffect, useState } from "react";
import api from "../api/axios";

function Enrollment() {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);

  // Get Courses
  const getCourses = async () => {
    try {
      const res = await api.get("/course");
      setCourses(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // Get Enrollments
  const getEnrollments = async () => {
    try {
      const res = await api.get("/enrollment");
      setEnrollments(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getCourses();
    getEnrollments();
  }, []);

  // Enroll
  const enroll = async (courseId) => {
    try {
      await api.post("/enrollment", {
        course_id: courseId,
      });

      alert("Enrolled Successfully");
      getEnrollments();
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment Failed");
    }
  };

  // Delete Enrollment
  const remove = async (id) => {
    try {
      await api.delete(`/enrollment/${id}`);
      alert("Enrollment Deleted");
      getEnrollments();
    } catch (err) {
      alert(err.response?.data?.message || "Delete Failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Enrollment</h1>

      {/* Course Cards */}
      <div className="grid grid-cols-3 gap-5 mt-5">
        {courses.map((course) => (
          <div
            key={course.course_id}
            className="border rounded-lg shadow p-4"
          >
            <h2 className="text-xl font-bold">
              {course.course_name}
            </h2>

            <p>{course.description}</p>

            <p>
              <b>Price:</b> ₹{course.price}
            </p>

            <p>
              <b>Category:</b> {course.category_name}
            </p>

            <p>
              <b>Teacher:</b> {course.teacher_name}
            </p>

            <button
              className="bg-green-600 text-white px-4 py-2 rounded mt-3"
              onClick={() => enroll(course.course_id)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* Enrollment Table */}
      <table className="w-full border-collapse border mt-8">
        <thead>
          <tr>
            <th className="border p-2">Enrollment ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Course</th>
            <th className="border p-2">Enrolled At</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((item) => (
            <tr key={item.enrollment_id}>
              <td className="border p-2">{item.enrollment_id}</td>
              <td className="border p-2">{item.user_name}</td>
              <td className="border p-2">{item.course_name}</td>
              <td className="border p-2">{item.enrolled_at}</td>

              <td className="border p-2">
                <button
                  onClick={() => remove(item.enrollment_id)}
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

export default Enrollment;