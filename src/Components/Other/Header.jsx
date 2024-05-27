// src/components/Header.js
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../security/AuthContext";
import ManagePost from "./ManagePost";

function Header() {
	const navigate = useNavigate();
	const authContext = useAuth();
	const isAuthenticated = authContext.isAuthenticated;
	

  function handleLogout(){
	window.location.reload();
    navigate("/")
    authContext.logout();
  }
	return (
		<header className="p-3 bg-dark text-white sticky-top">
			<div className="container">
				<div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
			
					<Link to="/" className="text-decoration-none">
					<h3 className="d-flex align-items-center mb-2 mb-lg-0 text-white ">Rentify</h3>	
					</Link>
					<ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
						<li>
							
							<Link to="/" className="nav-link px-2 text-secondary">Where Renting Meets Simplicity</Link>
						
						</li>
					</ul>
         
            {isAuthenticated && <><h2 className="d-block"> 💖</h2>
      <p className="mt-3"> { authContext.likes} </p></>}  
      {isAuthenticated && <ManagePost />
}           
      
                     
                {/* <form className="me-3 ms-3">
                    <input
                        type="search"
                        className="form-control form-control-dark"
                        placeholder="Search..."
                        aria-label="Search"
                    />
                </form> */}
         
					<div className="text-end ms-5">
          {!isAuthenticated && <button type="button" onClick={() => navigate("/login")}
							className="btn btn-outline-light me-2" > Login </button>}

          {!isAuthenticated && 	<button type="button" onClick={() => navigate("/register")}
							className="btn btn-warning" > Register </button> }

          {isAuthenticated && 	<button type="button" onClick={handleLogout}
							className="btn btn-warning" > Logout </button> }

					</div>
          
				</div>
			</div>
		</header>
	);
}

export default Header;
