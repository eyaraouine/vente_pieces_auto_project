import jwt_decode from "jwt-decode";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TokenProps from "../types/tokenProps";
import { getUserId } from "./getUserId";

export const getRole = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
        const user = jwt_decode<TokenProps>(token);
        return user.role;
    }
    else {
        return "";
    }
};

export const useUserRole = (allowedRoles : string[]) => {
    const role = getRole();
    const navigate = useNavigate();
    useEffect(() => {
      if (!allowedRoles.includes(role)) {
        if (role === "") {
        navigate("/login")
        }
        else {
            navigate("/error" , {state : {message : "403 - Forbidden"}})
        }
      }
    }, [allowedRoles , role])
    return true
}

