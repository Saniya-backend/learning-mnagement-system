import {Link} from "react-router-dom";
import Logout from "./Logout";

function TeacherSidebar(){

return(

<div className="w-64 bg-gray-900 text-white min-h-screen p-5">


<h2 className="text-xl font-bold mb-6">
Teacher Panel
</h2>


<Link 
className="block mb-4"
to="/teacher">

Dashboard

</Link>






<Link 
className="block mb-4"
to="/category">

Category

</Link>



<Link 
className="block mb-4"
to="/course">

Course

</Link>



<Link 
className="block mb-4"
to="/profile">

Profile

</Link>
<Logout/>


</div>

)

}


export default TeacherSidebar;