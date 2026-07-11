import { useEffect, useState } from "react";
import api from "../api/axios";

function Enrollment() {
  const [enrollments, setEnrollments] = useState([]);

  const [form, setForm] = useState({
    course_id: "",
    user_id: "",
  });

  // GET
  const getEnrollments = async () => {
    try {
      const res = await api.get("/enrollment");
      setEnrollments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getEnrollments();
  }, []);

  // CREATE
  const enroll = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending Data:", form);

      const res = await api.post("/enrollment", form);

      console.log("Success:", res.data);

      alert("Enrollment Done");

      setForm({
        course_id: "",
        user_id: "",
      });

      getEnrollments();
    } catch (err) {
      console.error("Enrollment Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Response:", err.response.data);

        alert(
          err.response.data.message ||
            JSON.stringify(err.response.data)
        );
      } else {
        alert("Server Error");
      }
    }
  };

  // DELETE
  const remove = async (id) => {
    try {
      await api.delete(`/enrollment/${id}`);
      getEnrollments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Enrollment</h1>

      <form onSubmit={enroll} className="grid gap-3 mt-5">
        <input
          className="border p-2"
          placeholder="Course ID"
          value={form.course_id}
          onChange={(e) =>
            setForm({
              ...form,
              course_id: e.target.value,
            })
          }
        />

        <input
          className="border p-2"
          placeholder="User ID"
          value={form.user_id}
          onChange={(e) =>
            setForm({
              ...form,
              user_id: e.target.value,
            })
          }
        />

        <button
          type="submit"
          className="bg-green-600 text-white p-2"
        >
          Enroll
        </button>
      </form>

      <table className="border w-full mt-5">
        <thead>
          <tr>
            <th className="border">ID</th>
            <th className="border">Course ID</th>
            <th className="border">User ID</th>
            <th className="border">Action</th>
          </tr>
        </thead>

        <tbody>
          {enrollments.map((item) => (
            <tr key={item.enrollment_id}>
              <td className="border p-2">{item.enrollment_id}</td>
              <td className="border p-2">{item.course_id}</td>
              <td className="border p-2">{item.user_id}</td>
              <td className="border p-2">
                <button
                  onClick={() => remove(item.enrollment_id)}
                  className="bg-red-600 text-white px-3 py-1"
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