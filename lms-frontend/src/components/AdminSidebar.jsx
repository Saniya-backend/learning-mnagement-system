import { Link } from "react-router-dom";
import Logout from "./Logout";

function AdminSidebar(){

return(

<div className="w-64 bg-gray-900 text-white min-h-screen p-5">


<h2 className="text-xl mb-5">
Admin Panel
</h2>


<Link 
className="block mb-3" 
to="/admin">
Dashboard
</Link>


<Link 
className="block mb-3" 
to="/admin/organization">
Organization
</Link>


<Link 
className="block mb-3" 
to="/admin/teachers">
Teacher
</Link>


<Link 
className="block mb-3" 
to="/admin/category">
Category
</Link>


<Link 
className="block mb-3" 
to="/admin/courses">
Course
</Link>


<Link 
className="block mb-3" 
to="/admin/enrollments">
Enrollment
</Link>


<Link 
className="block mb-3" 
to="/profile">
Profile
</Link>


<Logout/>

</div>

)

}


export default AdminSidebar;