export type User = {
    name?: string;
    email?: string;
    avatar_url?: string;
}

export type SignInData = {
    cpf: string;
    password: string;
    id: string;
}

export type AuthContextType = {
    // isAuthenticated: boolean;
    // user: User | null;
    // userName: string;
    //setUserName: (string: string) => void;
    // retorna dados axios para requisição
    SignIn: (signInData: SignInData) => Promise<any>;
    SignOut: () => void;
}


