import axios from "axios";
import { Dispatch } from "redux";
import { API_BASE_URL } from "../../config/api";
import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./auth.actionType";

export const loginUser = (loginData : any) => async(dispatch: Dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    try {
        const config = {
            headers: {
                'Access-Control-Allow-Origin': '*', // Hoặc thay thế '*' bằng nguồn gốc bạn muốn cho phép
            }
        };
        const {data} = await axios.post(`${API_BASE_URL}/auth/login`, loginData.data, config);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        console.log("login success", data);
        dispatch({type: LOGIN_SUCCESS, payload : data.jwt});

    } catch (error) {
        console.error("login error");
        dispatch({type: LOGIN_FAILURE, payload: error});
    }
}

export const registerUser = (registerData : any) => async(dispatch: Dispatch) => {
    dispatch({type : REGISTER_REQUEST});
    try {
        const {data} = await axios.post(`${API_BASE_URL}/auth/login`, registerData.data);
        if (data.jwt) {
            localStorage.setItem("jwt", data.jwt);
        }
        console.log("register", data);
        dispatch({type : REGISTER_SUCCESS, payload : data.jwt});

    } catch (error) {
        console.error("error");
        dispatch({type: REGISTER_FAILURE, payload: error});
    }
}