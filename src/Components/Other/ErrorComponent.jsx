
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Header from './Header';

export default function ErrorComponent() {
    return (
        <>
        <Header />
        <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
            <h1> Houston, we have a problem :(</h1>
           <div className='text-muted'>
            Apologies for the error. Come again later or Reach out to me at 
            <Link to="https://linkedin.com/in/priyanshuranjan-">
                <IconButton>
                    <LinkedInIcon />
                </IconButton>
                </Link> 
            </div>
            
            <Link to={"/"} className='text-decoration-none' >
            <div class="d-grid gap-2">
                <button
                    type="button"
                    name="button"
                    id="button"
                    class="btn btn-outline-dark"
                    
                >
                    Try Again
                </button>
                </div>
                </Link>
            
        </div>
        </div>
        </>
    )
}