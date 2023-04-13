export interface UserDataInterface {
    "name": string,
    "phone": string,
    "bio": string
}

export interface UserInterface {
    "_id": string,
    "email": string,
    "reg_email": string,
    "is": {
        "admin": boolean
    },
    "thumb": string,
    "data": UserDataInterface
}