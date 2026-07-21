import {useEffect,useState} from "react";
import api from "../api/axios";


function Category(){


const [categories,setCategories]=useState([]);

const [form,setForm]=useState({

category_name:"",
description:""

});


const [editId,setEditId]=useState(null);



// GET

const getCategories=async()=>{

const res=await api.get("/category");

setCategories(res.data);

};



useEffect(()=>{

getCategories();

},[]);



// CREATE UPDATE

const submit=async(e)=>{

e.preventDefault();


try{


if(editId){


await api.put(
`/category/${editId}`,
form
);


alert("Category Updated");


}

else{


await api.post(
"/category",
form
);


alert("Category Created");


}



setEditId(null);


setForm({

category_name:"",
description:""

});


getCategories();



}
catch (err) {
  alert(err.response?.data?.message || "Something went wrong");


}


};





// DELETE

const remove=async(id)=>{


await api.delete(
`/category/${id}`
);


getCategories();


};





// EDIT

const edit=(cat)=>{


setEditId(cat.category_id);


setForm({

category_name:cat.category_name,

description:cat.description

});


};





return(

<div className="p-8">


<h1 className="text-3xl font-bold">

Category Management

</h1>



<form
onSubmit={submit}
className="shadow p-5 mt-5 grid gap-3"
>



<input

className="border p-2"

placeholder="Category Name"

value={form.category_name}

onChange={
e=>setForm({
...form,
category_name:e.target.value
})
}

/>



<textarea

className="border p-2"

placeholder="Description"

value={form.description}

onChange={
e=>setForm({
...form,
description:e.target.value
})
}

/>



<button className="bg-blue-600 text-white p-2">

{
editId?"Update":"Create"
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
Name
</th>

<th className="border">
Action
</th>

</tr>


</thead>



<tbody>


{

categories.map(cat=>(


<tr key={cat.category_id}>


<td className="border p-2">

{cat.category_id}

</td>


<td className="border p-2">

{cat.category_name}

</td>



<td className="border p-2">


<button

onClick={()=>edit(cat)}

className="bg-green-600 text-white px-3 py-1"

>

Edit

</button>



<button

onClick={()=>remove(cat.category_id)}

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


export default Category;