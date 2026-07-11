import {useState} from "react";
import api from "../api/axios";


function ChangePassword(){


const [password,setPassword]=useState("");



const change=async()=>{


await api.put(
"/auth/change-password",
{
password
}
);


alert("Password Changed");


};



return(

<div className="p-8">


<h1 className="text-3xl font-bold">
Change Password
</h1>


<input

className="border p-2 mt-5"

type="password"

placeholder="New Password"

onChange={
e=>setPassword(e.target.value)
}

/>


<button

onClick={change}

className="bg-blue-600 text-white p-2 ml-3"

>

Update

</button>


</div>

)

}


export default ChangePassword;