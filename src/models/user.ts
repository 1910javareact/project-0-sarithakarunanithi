// The User model keeps track of users information

export class User {
    [x: string]: any;
          userId: number;     // primary key
          username: string;   // not null, unique
          password: string;   // not null
          firstName: string;  // not null
          lastName: string;   // not null
          email: string;      // not null
          role: string[];     // not null

          constructor(userId: number, username: string, password: string, firstname: string,
                      lastName: string, email: string, role: string []) {
                          this.userId = userId;
                          this.username = username;
                          this.password = password;
                          this.firstName = firstname;
                          this.lastName = lastName;
                          this.email = email;
                          this.role = role;
          }
}