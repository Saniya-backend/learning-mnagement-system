import {useEffect,useState} from "react";
import api from "../api/axios";


function Teacher(){


const [teachers,setTeachers]=useState([]);



const [form,setForm]=useState({

user_id:"",
organization_id:"",
specialization:"",
qualification:"",
experience:"",
bio:""

});



const [editId,setEditId]=useState(null);




const getTeachers=async()=>{

const res=await api.get("/teacher");

setTeachers(res.data);

};



useEffect(()=>{

getTeachers();

},[]);





const submit=async(e)=>{

e.preventDefault();


if(editId){

await api.put(
`/teacher/${editId}`,
form
);


}

else{


await api.post(
"/teacher",
form
);


}



setEditId(null);

getTeachers();


};




const remove=async(id)=>{


await api.delete(
`/teacher/${id}`
);


getTeachers();


};





return(

<div className="p-8">


<h1 className="text-3xl font-bold">

Teacher CRUD

</h1>



<form 
onSubmit={submit}
className="grid gap-3 mt-5"
>


{
Object.keys(form).map(key=>(


<input

key={key}

className="border p-2"

placeholder={key}

value={form[key]}

onChange={
e=>setForm({
...form,
[key]:e.target.value
})
}

/>


))

}



<button className="bg-blue-600 text-white p-2">

{
editId?"Update":"Create"
}

</button>


</form>





<table className="border w-full mt-5">


<thead>

<tr>

<th className="border">
ID
</th>

<th className="border">
Qualification
</th>

<th className="border">
Action
</th>


</tr>

</thead>



<tbody>


{

teachers.map(t=>(


<tr key={t.teacher_id}>


<td className="border p-2">

{t.teacher_id}

</td>



<td className="border p-2">

{t.qualification}

</td>



<td className="border p-2">


<button

className="bg-red-600 text-white px-3"

onClick={()=>remove(t.teacher_id)}

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


export default Teacher;