import axios from 'axios';
import {Service} from 'wrcom'

class UserService extends Service {
    public user: any = {data: {}, is: {}};
    public users: any = [];
    private _timeout : any;

    constructor() {
        super();
        axios.get('api/user/get')
            .then((resp)=>{
                this.users = resp.data;
            })
         const update = () => {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(()=>{
                axios.post('/api/user/update', {name: this.user.name, data: this.user.data});
            })
        }
    }
   
}
export default UserService