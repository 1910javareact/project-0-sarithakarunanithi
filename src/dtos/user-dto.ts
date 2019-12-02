//Data Transfer Object - DB version of 1 of our model

export class UserDTO {
    user_id: number;
    user_name: string;
    password: string;
    first_name: string;
    last_name: string;
    email: string;
    role_id: number;
    role_title: string;
}