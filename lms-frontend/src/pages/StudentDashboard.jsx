import StudentSidebar from "../components/StudentSidebar";
import Navbar from "../components/Navbar";
import Logout from "../components/Logout";

function StudentDashboard(){


return(

<div className="flex">


<StudentSidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-8">


<h1 className="text-3xl font-bold">
Student Dashboard
</h1>



<div className="grid grid-cols-3 gap-5 mt-8">


<div className="shadow p-5 rounded">

<h2>
My Courses
</h2>

<p className="text-3xl">
5
</p>

</div>



<div className="shadow p-5 rounded">

<h2>
Completed
</h2>

<p className="text-3xl">
3
</p>

</div>



<div className="shadow p-5 rounded">

<h2>
Progress
</h2>

<p className="text-3xl">
70%
</p>

</div>



</div>


</div>


</div>


</div>


)

}


export default StudentDashboard;