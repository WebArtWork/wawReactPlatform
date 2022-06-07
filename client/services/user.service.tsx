import {Service} from 'wrcom'
import axios from "axios";

class UserService extends Service {
    public user: any = {data: {}, is: {}};
    public users: any = [];
    private _timeout;

    constructor() {
        super();
        axios.get('api/user/get')
            .then((resp)=>{
                this.users = resp.data;
                // console.log(this.users)
            })
        // console.log(this)
        const update = () => {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(()=>{
                axios.post('/api/user/update', {name: this.user.name, data: this.user.data});
            })
        }
    }
}

export default UserService