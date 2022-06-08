import axios from 'axios';
import {Service} from 'wrcom'

interface IUser {
    _id: string;
    email: string;
    thumb: string;
    name: string;
    phone: string;
    bio: string;
    is: {
        admin: boolean;
    };
    token: string;
    data:object;
}

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
    }

    update(user: any) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(()=>{
            axios.post(
                'api/user/update', 
                    {_id: user._id, name: user.name, data: user.data}
                );
        })
    }

    delete(id:string) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(()=>{
            axios.delete(
                'api/user/delete', 
                    {
                        data:{
                            _id:id
                        }
                    }
                );
        })
    }
}
export default UserService