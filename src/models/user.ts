// The User model keeps track of users information
import { Role } from "./role";

export class User {
    [x: string]: any;
          userId: number;     // primary key
          username: string;   // not null, unique
          password: string;   // not null
          firstName: string;  // not null
          lastName: string;   // not null
          email: string;      // not null
          role: Role[];     // not null

          constructor(userId: number, username: string, password: string, firstname: string,
                      lastname: string, email: string, role: Role[] ) {
                          this.userId = userId;
                          this.username = username;
                          this.password = password;
                          this.firstName = firstname;
                          this.lastName = lastname;
                          this.email = email;
                          this.role = role;
          }
}