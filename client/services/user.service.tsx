import axios from 'axios';
import {Service} from 'wrcom'

class UserService extends Service {

    public rand = Math.floor(Math.random() * 5000);
    public roles = ['admin']
    public users: any = [];
    public _users: any = {};
    public user: any = {data: {}, is: {}};

    constructor() {
        super();
    }

//     private _timeout;
//     update(){
//         clearTimeout(this._timeout);
//         this._timeout = setTimeout(()=>{
//         axios.post('/api/user/update', {name: this.user.name, data: this.user.data});
//   })
// }

    private _timeout;
    update(){
        clearTimeout(this._timeout);
        this._timeout = serTimeout(() => {
            axios.post('api/user/update', {name: this.user.name, phone: this.user.phone, bio: this.user.bio, data: this.user.data})
        })
    }
  
}

export default UserService