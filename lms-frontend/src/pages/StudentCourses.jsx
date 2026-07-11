import {useEffect, useState} from "react";
import api from "../api/axios";


function StudentCourses(){


const [courses,setCourses] = useState([]);



// Get All Courses

const getCourses = async()=>{


try{


const res = await api.get("/course");


setCourses(res.data);



}
catch(err){


console.log(err);


}


};




useEffect(()=>{

getCourses();

},[]);





// Enroll Course

const enrollCourse = async(courseId)=>{


try{


const res = await api.post(

"/enrollment",

{
course_id:courseId
}

);



alert(res.data.message);



}
catch(err){


alert(

err.response?.data?.message ||
"Enrollment Failed"

);


}


};






return(


<div className="p-8 bg-gray-100 min-h-screen">



<h1 className="text-3xl font-bold mb-8">

Available Courses

</h1>





<div className="grid md:grid-cols-3 gap-6">



{

courses.length === 0 ?


<h2>
No Courses Available
</h2>


:

courses.map((course)=>(



<div

key={course.course_id}

className="bg-white shadow-lg rounded-xl p-6"

>



<h2 className="text-xl font-bold">

{course.course_name}

</h2>





<p className="mt-3 text-gray-700">

Teacher :

{
course.teacher_name || "Not Available"
}

</p>





<p className="mt-3 text-gray-600">

{course.description}

</p>





<button

onClick={()=>enrollCourse(course.course_id)}

className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded mt-5"

>

Enroll Now

</button>




</div>



))


}




</div>




</div>


)


}



export default StudentCourses;