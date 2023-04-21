import axios from "axios";
import { sessionService } from "redux-react-session";

export const loginUser = (credentials, history, setFieldError, setSubmitting) => {
    //Make checks and get some data
    return() => {
    axios.post("http://localhost:3000/user/signin/", credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} = response;
        console.log(data);
        if(data.status === "FAILED"){
                const {message} = data;
                setFieldError("email",message);
                setFieldError("password",message);
        } else if (data.status === "SUCCESS"){
            const userData = data.data[0];
            const token = userData._id;
            sessionService.saveSession(token).then(() =>{
                    sessionService.saveUser(userData).then(() => {
                        history("/mappage");
                    }).catch(err => console.error(err))
            }).catch(err => console.error(err))
        }
        //complete submission
        setSubmitting(false);
    }).catch(err => console.error(err))
}};

export const signupUser = (credentials, history, setFieldError, setSubmitting)  =>{
    return (dispatch) => {
    axios.post("http://localhost:3000/user/signup/", credentials, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        const {data} = response;
        if(data.status === "FAILED"){
            setFieldError("repeatPassword","failed to signup user");
            setSubmitting(false);
        } else if (data.status === "SUCCESS"){
            const {email,password} = credentials;
            dispatch(loginUser({email,password},history,setFieldError,setSubmitting));
        }
    }).catch(err => console.error(err))

}};

export const logoutUser = (history) => {
    return () => {
        sessionService.deleteSession();
        sessionService.deleteUser();
        history("/");
    }
}