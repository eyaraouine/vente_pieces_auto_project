import jwt_decode from "jwt-decode";
import TokenProps from "../types/tokenProps";


export const getUserId = ()  => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode<TokenProps>(token);
        return user.id;
    }
}
