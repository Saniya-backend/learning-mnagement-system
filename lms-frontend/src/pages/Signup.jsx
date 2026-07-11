import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../api/axios";


function Signup(){


const navigate=useNavigate();



const [data,setData]=useState({

name:"",
email:"",
password:"",
role:"user"

});




const handleChange=(e)=>{


setData({

...data,

[e.target.name]:e.target.value

});


};





const signup=async(e)=>{


e.preventDefault();


try{


await api.post(

"/auth/signup",

data

);


alert("Signup Successful");


navigate("/");


}
catch(err){


alert(

err.response?.data?.message ||
"Signup Failed"

);


}


};





return(


<div className="min-h-screen flex items-center justify-center bg-gray-100">



<form

onSubmit={signup}

className="bg-white shadow-lg p-8 rounded w-96"

>



<h1 className="text-3xl font-bold text-center mb-6">

Signup

</h1>





<input

className="border p-2 w-full rounded mb-3"

name="name"

placeholder="Name"

value={data.name}

onChange={handleChange}

/>





<input

className="border p-2 w-full rounded mb-3"

type="email"

name="email"

placeholder="Email"

value={data.email}

onChange={handleChange}

/>





<input

className="border p-2 w-full rounded mb-3"

type="password"

name="password"

placeholder="Password"

value={data.password}

onChange={handleChange}

/>





<select

className="border p-2 w-full rounded mb-3"

name="role"

value={data.role}

onChange={handleChange}

>


<option value="user">
Student
</option>


<option value="teacher">
Teacher
</option>


</select>





<button

className="bg-green-600 text-white w-full p-2 rounded"

>

Signup

</button>





<Link

to="/"

className="block text-center mt-4 text-blue-600"

>

Already have account? Login

</Link>




</form>


</div>


)

}


export default Signup;