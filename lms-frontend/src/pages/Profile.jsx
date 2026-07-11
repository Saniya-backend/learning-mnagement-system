function Profile(){


const user=JSON.parse(
localStorage.getItem("user")
);


return(

<div className="p-8">

<h1 className="text-3xl font-bold">
Profile
</h1>


<div className="mt-5 shadow p-5">


<p>
Name : {user?.name}
</p>


<p>
Email : {user?.email}
</p>


<p>
Role : {user?.role}
</p>


</div>


</div>

)

}


export default Profile;