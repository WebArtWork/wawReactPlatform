import {Service} from 'wrcom'
import axios from "axios";

class UserService extends Service {
    public user: any = {data: {}, is: {}};
    public users: any = [];

    constructor() {
        super();
        axios.get('/api/user/get')
            .then((users)=>{
                this.users = users;
                // console.log(this.users)
            })
    }
}

export default UserService