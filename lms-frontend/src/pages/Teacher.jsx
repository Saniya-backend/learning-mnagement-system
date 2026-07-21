import { useEffect, useState } from "react";
import api from "../api/axios";

function Teacher() {
  const [teachers, setTeachers] = useState([]);
  const [teacherUsers, setTeacherUsers] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    user_id: "",
    organizations_id: "",
    specialization: "",
    qualification: "",
    experience: "",
    bio: "",
  });


  useEffect(() => {
    getTeachers();
    getOrganizations();
  }, []);


  useEffect(() => {
    getTeacherUsers();
  }, [teachers]);


  // Get All Created Teachers
  const getTeachers = async () => {
    try {
      const res = await api.get("/teacher");
      setTeachers(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };


  // Get Users Role Teacher
  const getTeacherUsers = async () => {
    try {
      const res = await api.get("/auth/users");

      const users = res.data.users || res.data;

      const availableTeachers = users.filter(
        (user) =>
          user.role?.toLowerCase() === "teacher" &&
          !teachers.some(
            (teacher) => teacher.user_id === user.user_id
          )
      );

      setTeacherUsers(availableTeachers);

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };


  // Get Organizations
  const getOrganizations = async () => {
    try {
      const res = await api.get("/organization");

      setOrganizations(
        res.data.organizations || res.data
      );

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // Create Update Teacher
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      if(editId){

        await api.put(`/teacher/${editId}`, form);
        alert("Teacher Updated");

      }
      else{

        await api.post("/teacher", form);
        alert("Teacher Created");

      }


      setForm({
        user_id:"",
        organizations_id:"",
        specialization:"",
        qualification:"",
        experience:"",
        bio:"",
      });


      setEditId(null);
      getTeachers();


    } catch(error){

      console.log(error.response?.data || error);

    }

  };



  // Edit
  const editTeacher = (teacher)=>{

    setEditId(teacher.teacher_id);

    setForm({
      user_id: teacher.user_id || "",
      organizations_id: teacher.organizations_id || "",
      specialization: teacher.specialization || "",
      qualification: teacher.qualification || "",
      experience: teacher.experience || "",
      bio: teacher.bio || "",
    });

  };



  // Delete
  const deleteTeacher = async(id)=>{

    try{

      await api.delete(`/teacher/${id}`);
      getTeachers();

    }
    catch(error){

      console.log(error.response?.data || error);

    }

  };



return (

<div className="p-6">


<h1 className="text-2xl font-bold mb-5">
Teacher Management
</h1>


<form 
onSubmit={handleSubmit}
className="grid gap-3 w-96"
>


<select
className="border p-2"
name="user_id"
value={form.user_id}
onChange={handleChange}
>

<option value="">
Select Teacher
</option>


{
teacherUsers.map((user)=>(

<option 
key={user.user_id}
value={user.user_id}
>
{user.name}
</option>

))
}

</select>



<select
className="border p-2"
name="organizations_id"
value={form.organizations_id}
onChange={handleChange}
>

<option value="">
Select Organization
</option>


{
organizations.map((org)=>(

<option
key={org.organizations_id}
value={org.organizations_id}
>

{org.organization_name}

</option>

))
}


</select>



<input
className="border p-2"
name="specialization"
placeholder="Specialization"
value={form.specialization}
onChange={handleChange}
/>



<input
className="border p-2"
name="qualification"
placeholder="Qualification"
value={form.qualification}
onChange={handleChange}
/>



<input
className="border p-2"
type="number"
name="experience"
placeholder="Experience"
value={form.experience}
onChange={handleChange}
/>



<textarea
className="border p-2"
name="bio"
placeholder="Bio"
value={form.bio}
onChange={handleChange}
/>



<button className="bg-blue-600 text-white p-2 rounded">

{
editId ? "Update Teacher" : "Create Teacher"
}

</button>


</form>





<table className="border w-full mt-6">

<thead className="bg-gray-200">

<tr>

<th className="border p-2">ID</th>
<th className="border p-2">Teacher</th>
<th className="border p-2">Organization</th>
<th className="border p-2">Qualification</th>
<th className="border p-2">Experience</th>
<th className="border p-2">Action</th>

</tr>

</thead>


<tbody>

{
teachers.map((t)=>(

<tr key={t.teacher_id}>

<td className="border p-2">
{t.teacher_id}
</td>


<td className="border p-2">
{t.teacher_name}
</td>


<td className="border p-2">
{t.organization_name}
</td>


<td className="border p-2">
{t.qualification}
</td>


<td className="border p-2">
{t.experience}
</td>



<td className="border p-2">


<button
className="bg-yellow-500 text-white px-3 mr-2"
onClick={()=>editTeacher(t)}
>
Edit
</button>



<button
className="bg-red-600 text-white px-3"
onClick={()=>deleteTeacher(t.teacher_id)}
>
Delete
</button>


</td>


</tr>


))
}


</tbody>

</table>


</div>

);

}

export default Teacher;