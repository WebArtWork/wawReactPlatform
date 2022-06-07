import {Service} from 'wrcom'
import axios from "axios";

class UserService extends Service {
    public user: any = {data: {}, is: {}};
    public users: any = [];

    constructor() {
        super();
        axios.get('api/user/get')
            .then((resp)=>{
                this.users = resp.data;
                // console.log(this.users)
            })
        // console.log(this)
    }
}

export default UserService