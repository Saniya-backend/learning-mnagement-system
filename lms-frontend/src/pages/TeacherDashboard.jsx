import TeacherSidebar from "../components/TeacherSidebar";
import Navbar from "../components/Navbar";


function TeacherDashboard(){


return(

<div className="flex">


<TeacherSidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-8">


<h1 className="text-3xl font-bold">
Teacher Dashboard
</h1>



<div className="grid grid-cols-3 gap-5 mt-8">



<div className="shadow p-5 rounded">

<h2 className="text-xl">
Organizations
</h2>

<p className="text-3xl font-bold">
5
</p>

</div>




<div className="shadow p-5 rounded">

<h2 className="text-xl">
Courses
</h2>

<p className="text-3xl font-bold">
20
</p>

</div>





<div className="shadow p-5 rounded">

<h2 className="text-xl">
Students
</h2>

<p className="text-3xl font-bold">
100
</p>

</div>



</div>


</div>


</div>


</div>


)

}


export default TeacherDashboard;