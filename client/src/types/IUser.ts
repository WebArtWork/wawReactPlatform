export interface IUser {
    _id: string;
    email: string;
    thumb: string;
    is: {
        admin: boolean;
    };
    token: string;
    data: {
        name: string,
        phone: string,
        bio: string,
    };
    pass: any;
}