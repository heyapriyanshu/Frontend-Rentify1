import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

function ManagePost() {
  return (
    <Dropdown>
      <Dropdown.Toggle className = "btn btn-outline-light dropdown-toggle ms-5"variant="" id="dropdown-basic">
        Manage Posts
      </Dropdown.Toggle>

      <Dropdown.Menu className= "dropdown-menu dropdown-menu-dark">
        <Dropdown.Item as={Link} to="/add">Add Post</Dropdown.Item>
        <Dropdown.Item as={Link} to="/view">View Posts</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}


export default ManagePost;