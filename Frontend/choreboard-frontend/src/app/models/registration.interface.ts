export interface RegistrationRequest {
    username: string;
    password: string;
    email: string;
    role: 'ADMIN' | 'PARENT' | 'CHILD';
}
