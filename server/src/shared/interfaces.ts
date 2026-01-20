export interface AuthInterface {
    username: string;
    password: string;
    email?: string;
    age?: number;
}

export interface User {
    id: number;
    username: string;
    password: string;
}
