import {useEffect,useState} from "react";
import api from "../api/axios";


function Course(){


const [courses,setCourses]=useState([]);

const [teachers,setTeachers]=useState([]);

const [form, setForm] = useState({
  course_name: "",
  description: "",
  price: "",
  category_id: "",
  teacher_id: ""
});


const [editId,setEditId]=useState(null);



// GET ALL COURSES

const getCourses=async()=>{

try{

const res=await api.get("/course");

setCourses(res.data);

}
catch(err){

console.log(err);

}

};



// GET ALL TEACHERS

const getTeachers=async()=>{

try{

const res=await api.get("/teacher");

setTeachers(res.data);

}
catch(err){

console.log(err);

}

};



// LOAD DATA

useEffect(()=>{

getCourses();
getTeachers();

},[]);




// CREATE + UPDATE

const submit=async(e)=>{

e.preventDefault();


try{


if(editId){

await api.put(
`/course/${editId}`,
form
);

alert("Course Updated");

}
else{


await api.post(
"/course",
form
);

alert("Course Created");

}



setEditId(null);


setForm({

course_name:"",
description:"",
category_id:"",
teacher_id:""

});


getCourses();


}
catch(err){

console.log(err);

}

};




// DELETE

const remove=async(id)=>{

try{

await api.delete(`/course/${id}`);

getCourses();

}
catch(err){

console.log(err);

}

};




// EDIT

const edit=(course)=>{


setEditId(course.course_id);


setForm({

course_name:course.course_name,
description:course.description,
category_id:course.category_id,
teacher_id:course.teacher_id

});


};




return(

<div className="p-8">


<h1 className="text-3xl font-bold">
Course Management
</h1>



<form
onSubmit={submit}
className="shadow p-5 mt-5 grid gap-3"
>


<input

className="border p-2"

placeholder="Course Name"

value={form.course_name}

onChange={(e)=>setForm({
...form,
course_name:e.target.value
})}

/>



<textarea

className="border p-2"

placeholder="Description"

value={form.description}

onChange={(e)=>setForm({
...form,
description:e.target.value
})}

/>





<input

className="border p-2"

placeholder="Category ID"

value={form.category_id}

onChange={(e)=>setForm({
...form,
category_id:e.target.value
})}

/>





{/* Teacher Dropdown */}

<select

className="border p-2"

value={form.teacher_id}

onChange={(e)=>setForm({
...form,
teacher_id:e.target.value
})}

>


<option value="">
Select Teacher
</option>



{

teachers.map((teacher)=>(


<option

key={teacher.teacher_id}

value={teacher.teacher_id}

>

{teacher.teacher_name}

</option>


))


}


</select>




<button className="bg-blue-600 text-white p-2">

{
editId ? "Update Course" : "Create Course"
}

</button>



</form>






<table className="w-full border mt-5">


<thead>

<tr>

<th className="border">
ID
</th>

<th className="border">
Course
</th>

<th className="border">
Action
</th>

</tr>


</thead>




<tbody>


{

courses.map(course=>(


<tr key={course.course_id}>


<td className="border p-2">

{course.course_id}

</td>



<td className="border p-2">

{course.course_name}

</td>



<td className="border p-2">


<button

onClick={()=>edit(course)}

className="bg-green-600 text-white px-3 py-1"

>

Edit

</button>



<button

onClick={()=>remove(course.course_id)}

className="bg-red-600 text-white px-3 py-1 ml-2"

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

)

}


export default Course;