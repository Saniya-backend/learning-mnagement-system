import {useNavigate} from "react-router-dom";


function Navbar(){

const navigate=useNavigate();


const logout=()=>{

localStorage.removeItem("token");
localStorage.removeItem("user");

navigate("/");

};


return(

<nav className="bg-blue-600 text-white p-4 flex justify-between">

<h1 className="text-xl font-bold">
LMS
</h1>


<button
onClick={logout}
className="bg-white text-blue-600 px-4 py-1 rounded"
>
Logout
</button>


</nav>

)

}


export default Navbar;