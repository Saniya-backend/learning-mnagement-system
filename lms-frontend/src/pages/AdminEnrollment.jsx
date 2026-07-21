import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminEnrollment() {
  const [enrollments, setEnrollments] = useState([]);

  // Get all enrollments for admin
  const getEnrollments = async () => {
    try {
      const res = await api.get("/enrollment");
      setEnrollments(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    getEnrollments();
  }, []);

  // Remove enrollment
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to remove this enrollment?")) {
      return;
    }

    try {
      await api.delete(`/enrollment/${id}`);
      alert("Enrollment Removed Successfully");
      getEnrollments();
    } catch (err) {
      alert(err.response?.data?.message || "Remove Failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-5">Enrolled Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Enrollment ID</th>
              <th className="border p-2">Student Name</th>
              <th className="border p-2">Student Email</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Teacher</th>
              <th className="border p-2">Enrolled At</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.length > 0 ? (
              enrollments.map((item) => (
                <tr key={item.enrollment_id}>
                  <td className="border p-2">{item.enrollment_id}</td>
                  <td className="border p-2">{item.student_name}</td>
                  <td className="border p-2">{item.student_email}</td>
                  <td className="border p-2">{item.course_name}</td>
                  <td className="border p-2">
                    {item.teacher_name || "N/A"}
                  </td>
                  <td className="border p-2">
                    {new Date(item.enrolled_at).toLocaleString()}
                  </td>

                  <td className="border p-2">
                    <button
                      onClick={() => remove(item.enrollment_id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4">
                  No enrollments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminEnrollment;