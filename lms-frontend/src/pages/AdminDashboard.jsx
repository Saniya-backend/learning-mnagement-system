import { useEffect, useState } from "react";
import axios from "../api/axios";
import AdminSidebar from "../components/AdminSidebar";


function AdminDashboard(){

const [dashboard,setDashboard]=useState({
    totalUsers:0,
    totalTeachers:0,
    totalOrganizations:0,
    totalCourses:0,
    totalEnrollments:0
});


useEffect(()=>{

const getDashboard=async()=>{

try{

const res=await axios.get("/admin/dashboard");

setDashboard(res.data.dashboard);

}
catch(error){
console.log(error);
}

};

getDashboard();

},[]);



return(

<div className="min-h-screen bg-gray-100 flex">


<AdminSidebar/>


<div className="flex-1 p-8">

<h1 className="text-3xl font-bold mb-8">
Welcome To Admin Dashboard
</h1>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">


<div className="bg-white p-6 rounded-lg shadow">
<h2 className="text-gray-500 text-lg">
Total Users
</h2>

<p className="text-3xl font-bold mt-3">
{dashboard.totalUsers}
</p>
</div>



<div className="bg-white p-6 rounded-lg shadow">
<h2 className="text-gray-500 text-lg">
Total Teachers
</h2>

<p className="text-3xl font-bold mt-3">
{dashboard.totalTeachers}
</p>
</div>




<div className="bg-white p-6 rounded-lg shadow">
<h2 className="text-gray-500 text-lg">
Total Organizations
</h2>

<p className="text-3xl font-bold mt-3">
{dashboard.totalOrganizations}
</p>
</div>




<div className="bg-white p-6 rounded-lg shadow">
<h2 className="text-gray-500 text-lg">
Total Courses
</h2>

<p className="text-3xl font-bold mt-3">
{dashboard.totalCourses}
</p>
</div>




<div className="bg-white p-6 rounded-lg shadow">
<h2 className="text-gray-500 text-lg">
Total Enrollments
</h2>

<p className="text-3xl font-bold mt-3">
{dashboard.totalEnrollments}
</p>
</div>



</div>


</div>


</div>

)

}


export default AdminDashboard;