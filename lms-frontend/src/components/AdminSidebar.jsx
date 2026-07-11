import {Link} from "react-router-dom";


function AdminSidebar(){

return(

<div className="w-64 bg-gray-900 text-white min-h-screen p-5">


<h2 className="text-xl mb-5">
Admin Panel
</h2>


<Link className="block mb-3" to="/admin">
Dashboard
</Link>


<Link className="block mb-3" to="/organization">
Organization
</Link>


<Link className="block mb-3" to="/teacher">
Teacher
</Link>


<Link className="block mb-3" to="/category">
Category
</Link>


<Link className="block mb-3" to="/course">
Course
</Link>


<Link className="block mb-3" to="/enrollment">
Enrollment
</Link>


</div>

)

}


export default AdminSidebar;