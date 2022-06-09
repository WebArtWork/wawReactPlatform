import axios from 'axios';
import {Service} from 'wrcom'
import RenderService from "./render.service";

class UserService extends Service {
    public user: any = {data: {}, is: {}};
    public users: any = [];
    private _timeout : any;

    constructor() {
        const rs = new RenderService()
        super();
        axios.get('http://localhost:3000/api/user/get')
            .then((resp)=>{
                this.users = resp.data;
                rs.render('users')
                console.log(this.users)
            })
    }


    update(user: any) {
        clearTimeout(this._timeout);
        this._timeout = setTimeout(()=>{
            axios.post(
                'api/user/update', 
                    {
                        _id: user._id, 
                        data: user.data
                    }
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