import { useState } from "react";
import {useField } from "formik";
import {
    StyledTextInput,
    StyledLabel,
    StyledIcon,
    ErrorMsg
} from './../components/Styles'

//eye for password
import {FiEyeOff, FiEye} from 'react-icons/fi'
import { useAsyncError } from "react-router-dom";

export const TextInput = ({icon, ...props}) => {
    const [field,meta] = useField(props);
    const [show, setShow] = useState(false);
    return (
        <div style={{position: "relative"}}>
            <StyledLabel htmlFor={props.name}>
                {props.label}
            </StyledLabel>
            {props.type !== "password" && <StyledTextInput 
                invalid={meta.error && meta.touched}
                {...field}
                {...props}
            />}
            
            {
                props.type==="password" && (
                    <StyledTextInput
                    invalid={meta.error && meta.touched}
                    {...field}
                    {...props}  
                    type={show ? "text" : "password"} 
                    />
            )}

            <StyledIcon>
                {icon}
            </StyledIcon>

            {
                props.type==="password" && (
                <StyledIcon onClick={() => setShow(!show)} right>
                    {show && <FiEye/>}
                    {!show && <FiEyeOff/>}
                </StyledIcon>
            )}

            {meta.touched && meta.error ? (
                <ErrorMsg>{meta.error}</ErrorMsg>
            ): (
                <ErrorMsg style={{visibility: "hidden"}}>.</ErrorMsg>
            )}
        </div>
    )
}