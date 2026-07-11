import {
BrowserRouter,
Routes,
Route
} from "react-router-dom";


import Login from "./pages/Login";
import Signup from "./pages/Signup";


import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentDashboard from "./pages/StudentDashboard";

import StudentCourses from "./pages/StudentCourses";
import Organization from "./pages/Organization";
import Teacher from "./pages/Teacher";
import Category from "./pages/Category";
import Course from "./pages/Course";
import Enrollment from "./pages/Enrollment";


import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";


import ProtectedRoute from "./routes/ProtectedRoute";



function App(){


return(

<BrowserRouter>


<Routes>



{/* Public Routes */}


<Route

path="/"

element={<Login/>}

/>



<Route

path="/signup"

element={<Signup/>}

/>





{/* Admin Dashboard */}


<Route

path="/admin"

element={

<ProtectedRoute role="admin">

<AdminDashboard/>

</ProtectedRoute>

}

/>

<Route

path="/student/courses"

element={

<ProtectedRoute role="user">

<StudentCourses/>

</ProtectedRoute>

}

/>



{/* Teacher Dashboard */}


<Route

path="/teacher"

element={

<ProtectedRoute role="teacher">

<TeacherDashboard/>

</ProtectedRoute>

}

/>





{/* Student Dashboard */}


<Route

path="/student"

element={

<ProtectedRoute role="user">

<StudentDashboard/>

</ProtectedRoute>

}

/>






{/* Teacher Modules */}



<Route

path="/organization"

element={

<ProtectedRoute role="teacher">

<Organization/>

</ProtectedRoute>

}

/>




<Route

path="/category"

element={

<ProtectedRoute role="teacher">

<Category/>

</ProtectedRoute>

}

/>




<Route

path="/course"

element={

<ProtectedRoute role="teacher">

<Course/>

</ProtectedRoute>

}

/>






{/* Student Modules */}



<Route

path="/student/courses"

element={

<ProtectedRoute role="user">

<Course/>

</ProtectedRoute>

}

/>



<Route

path="/student/enrollment"

element={

<ProtectedRoute role="user">

<Enrollment/>

</ProtectedRoute>

}

/>






{/* Common */}



<Route

path="/profile"

element={<Profile/>}

/>



<Route

path="/change-password"

element={<ChangePassword/>}

/>





</Routes>


</BrowserRouter>


)

}


export default App;