import React, { createContext, useState } from 'react'
import * as auth from '../services/auth'

interface IAuthContext {
  signed : boolean,
  user : object | null,
  signIn() : Promise<void>
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider : React.FC = ({ children }) => {

  const [ user, setUser ] = useState<object | null>(null)

  async function signIn() {
    const response = await auth.signIn()
    setUser(response.user)
  }

  return (
    <AuthContext.Provider value ={{
      signed : Boolean(user),
      user,
      signIn
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export {
  AuthContext,
  AuthProvider
}
