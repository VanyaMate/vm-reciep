import { User } from '@/modules/api/user/user-service.types.ts';
import { createContext } from 'react';


export const UserContext = createContext<User | null>(null);