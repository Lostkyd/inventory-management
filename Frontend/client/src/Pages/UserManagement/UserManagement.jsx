import UserForm from '../../Components/Forms/UserForm';
import UserList from '../../Components/List/UserList';
import './UserManagement.css';

const UserManagement = () => {
    return (
        <div>
            <div className="user-container text-light">
                <div className="left-column">
                    {/* <UserForm /> */}
                </div>
                <div className="right-column">
                    {/* <UserList /> */}
                </div>
            </div>
        </div>
    )
}

export default UserManagement;