import {Link} from "react-router-dom";


function StudentSidebar(){


return(

<div className="w-64 bg-gray-900 text-white min-h-screen p-5">


<h2 className="text-xl font-bold mb-6">
Student Panel
</h2>



<Link 
className="block mb-4"
to="/student">

Dashboard

</Link>




<Link 
className="block mb-4"
to="/student/courses">

Courses

</Link>

<Link 
className="block mb-4"
to="/student/courses">

Available Courses

</Link>

<Link 
className="block mb-4"
to="/student/enrollment">

My Enrollment

</Link>



<Link 
className="block mb-4"
to="/profile">

Profile

</Link>


</div>


)

}


export default StudentSidebar;