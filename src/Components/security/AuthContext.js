import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../../Api/UserApiService";


//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

//2: Share the created context with other components
export default function AuthProvider({ children }) {

    //3: Put some state in the context
    const [isAuthenticated, setAuthenticated] = useState(false)

    const [username, setUsername] = useState(null)

    const [likes,setLikes] = useState(0)

    const[usersDetails, setUsersDetails] = useState(null)

    
  

    async function register(firstName,lastName,email,phone, password,role) {

        try {

            const response = await registerUser(firstName,lastName,email,phone, password,role)

            if(response.status===200){ 
                setAuthenticated(true)
                setUsername(username)
                setUsersDetails(response.data)
                // fetchUserDetails()
                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }
    async function login(username, password) {

        try {

            const response = await loginUser(username, password)

            if(response.status===200){ 
                console.log(response.data);
                setUsersDetails(response.data);
                setAuthenticated(true)
                setUsername(username)
               // fetchUserDetails()
                return true            
            } else {
                logout()
                return false
            }    
        } catch(error) {
            logout()
            return false
        }
    }
   

    

    function increaseLikes(){
        setLikes(likes + 1)
    }
    function decreaseLikes(){
        setLikes(likes - 1)
    }

    function logout() {
     
        setAuthenticated(false)
        setUsername(null)
    }

    return (
        <AuthContext.Provider value={ {isAuthenticated, login, logout,register, username, likes, increaseLikes,decreaseLikes, usersDetails}  }>
            {children}
        </AuthContext.Provider>
    )
} 