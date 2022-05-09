import { Service } from 'wrcom'
class UserService extends Service {
	public rand = Math.floor(Math.random() * 5000);
	constructor(){
		super();
	}
}
export default UserService
