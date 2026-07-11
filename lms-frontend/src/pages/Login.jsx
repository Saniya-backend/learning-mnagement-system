import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import api from "../api/axios";


function Login(){


const navigate = useNavigate();


const [data,setData]=useState({

email:"",
password:""

});



const handleChange=(e)=>{

setData({

...data,

[e.target.name]:e.target.value

});

};




const login=async(e)=>{

e.preventDefault();


try{


const res = await api.post(
"/auth/login",
data
);



localStorage.setItem(
"token",
res.data.token
);



localStorage.setItem(
"user",
JSON.stringify(res.data.user)
);



if(res.data.user.role==="admin"){

navigate("/admin");

}

else if(res.data.user.role==="teacher"){

navigate("/teacher");

}

else{

navigate("/student");

}



}
catch(err){


alert(
err.response?.data?.message ||
"Login Failed"
);


}


};




return(


<div className="min-h-screen flex items-center justify-center bg-gray-100">


<form

onSubmit={login}

className="bg-white shadow-lg p-8 rounded w-96"

>



<h1 className="text-3xl font-bold text-center mb-6">

Login

</h1>




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





<button

className="bg-blue-600 text-white w-full p-2 rounded"

>

Login

</button>





<Link

to="/signup"

className="block text-center mt-4 text-blue-600"

>

Don't have an account? Signup

</Link>



</form>



</div>


)

}


export default Login;