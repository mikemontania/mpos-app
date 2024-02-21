 
import { Usuario } from "../interfaces/User.interfaces"; 
import { decode } from 'base-64';

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    token: string | null;
    errorMessage: string;
    user: Usuario | null;
}
type AuthAction  = 
| {type:'login' , payload:{token:string}} 
| {type:'addError' , payload:string} 
| { type: 'removeError' }
| {type:'notAuthenticated' }
| {type:'logout'  }
 

export const authReducer = ( state: AuthState, action: AuthAction ): AuthState => {

    switch (action.type) {
        case 'addError':
            return {
                ...state,
                user: null,
                status: 'not-authenticated',
                token: null,
                errorMessage: action.payload
            }
    
        case 'removeError':
            return {
                ...state,
                errorMessage: ''
            };

        case 'login':
            return {
                ...state,
                errorMessage: '',
                status: 'authenticated',
                token: action.payload.token, 
                user: getUser(action.payload.token)
            }


        case 'logout':
        case 'notAuthenticated':
            return {
                ...state,
                status: 'not-authenticated',
                token: null,
                user: null
            }

        default:
            return state;
    }


}

const getUser = (token: string) => {
    try {
        const decodedToken = decode(token.split('.')[1]);
        console.log(decodedToken)
        return JSON.parse(decodedToken);
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};