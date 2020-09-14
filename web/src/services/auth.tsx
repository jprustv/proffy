import api from './api'

interface IAuthResponse {
  token : string,
  user : {
    name : string,
    email : string
  }
}

const signIn = () : Promise<IAuthResponse> => {
  return new Promise ((resolve, reject) => {
    resolve ({
      token : 'as98du2naiusz-okt23jsa@31Sdsgdfgd35iasaiodjofgf48',
      user : {
        name : 'Jonathan Prust Vernizzi',
        email : 'jprustv@live.com'
      }
    })
  })
}

export {
  signIn
}
