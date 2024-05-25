

  

import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ErrorComponent from './Other/ErrorComponent'
import LandingPage from "./LandingPage";
import AuthProvider from './security/AuthContext'
import PropertyAdd from './Other/PropertyAdd';
import ViewPosts from './ViewPosts';
import EditProperty from './EditProperty';



// function AuthenticatedRoute({ children }) {
//     const authContext = useAuth()

//     if (authContext.isAuthenticated)
//         return children

//     return <Navigate to="/" />
// }

export default function Rentify() {
    
    return (
        <div className="Rentify">
                
                <AuthProvider> 
                <BrowserRouter>
                    
                <Routes>
                    <Route path='/register' element={<Register />}></Route>
                    <Route path='/' element={<LandingPage />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/add' element={<PropertyAdd />}></Route>
                    <Route path='/view' element={<ViewPosts />}></Route>
                    <Route path='/edit' element={<EditProperty />}></Route>

                        
                    <Route path='*' element={<ErrorComponent />}></Route>

                    </Routes>
                </BrowserRouter>
                </AuthProvider>
            
        </div>

    )
}

