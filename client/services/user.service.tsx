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
}

export default UserService
