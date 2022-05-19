import type {NextPage} from 'next'
import Navbar from '../../components/Navbar/Navbar'

const Users: NextPage = () => {
    return (
        <div>
            <Navbar/>
            <div className='w-card _pd'>
                <h1>Admin Users</h1>
            </div>
        </div>

    )
}

export default Users;
