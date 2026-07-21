
import { useNavigate } from "react-router-dom";

function Logout(){

    const navigate = useNavigate();

    const handleLogout = ()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/");

    };


    return(
        <button
        onClick={handleLogout}
        className="text-red-400"
        >
            Logout
        </button>
    );
}

export default Logout;
