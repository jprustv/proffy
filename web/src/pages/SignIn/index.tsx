import React, { useContext } from 'react'

import { AuthContext } from '../../contexts/auth'

const SignIn : React.FC = () => {

  const { signed, user, signIn } = useContext(AuthContext)

  console.log(signed)
  console.log(user)

  function handleSignIn() {
    signIn()
  }

  return (
    <button className="SignIn" onClick={handleSignIn}>
      Sign In
    </button>
  )
}

export default SignIn
