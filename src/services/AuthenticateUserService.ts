import axios from "axios";
/**Recebe o codigo via string
 * precisa recuperar o access token no github
 * Verifica se usuarion existe no banco de dados
 * se exixtir gera um token
 * senão cria no banco de dados gera um token
 * retornar o token com as infos do usuario logado
 */

class AuthenticateUserService {
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token";

    const response = await axios.post(url,null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,

      },
      headers: {
        "Accept": "apllication/json"
      }
  })


  return  response.data;
  }
}


export { AuthenticateUserService }; 