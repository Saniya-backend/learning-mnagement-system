import AdminSidebar from "../components/AdminSidebar";
import Navbar from "../components/Navbar";


function AdminDashboard(){


return(

<div className="flex">


<AdminSidebar/>


<div className="flex-1">


<Navbar/>


<div className="p-8">


<h1 className="text-3xl font-bold">
Admin Dashboard
</h1>



<div className="grid grid-cols-3 gap-5 mt-8">


<div className="shadow p-5 rounded bg-white">

<h2 className="text-xl">
Organizations
</h2>

<p className="text-3xl font-bold">
10
</p>

</div>




<div className="shadow p-5 rounded bg-white">

<h2 className="text-xl">
Teachers
</h2>

<p className="text-3xl font-bold">
20
</p>

</div>




<div className="shadow p-5 rounded bg-white">

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


export default AdminDashboard;