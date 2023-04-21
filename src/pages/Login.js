//styled componenets
import { TextLink, StyledButton, StyledTextInput, StyledFormArea, StyledFromButton, Avatar, StyledLabel, StyledTitle, colors, ButtonGroup, ExtraText, StyledContainer } from "../components/Styles";
import Logo from './../assets/logo.png'

// formik
import { Formik, Form } from "formik";
import { TextInput } from "../components/FormLib";
import * as Yup from 'yup'

//icons
import {FiMail, FiLock} from 'react-icons/fi'

//loader
import {ThreeDots} from 'react-loader-spinner'

//auth and redux
import {connect} from 'react-redux'
import { loginUser } from "../auth/actions/userActions";
import { useNavigate } from 'react-router-dom'


const Login = ({loginUser}) => {
    const history = useNavigate();
    return (
        <StyledContainer>
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}> Member Login</StyledTitle>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    
                    validationSchema = {
                        Yup.object({
                            email: Yup.string().email("Invalid email address")
                            .required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30, "Password is too long")
                            .required("Required"),
                        })
                    }

                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        console.log(values);
                        loginUser(values, history, setFieldError, setSubmitting);
                    }}
                >
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="xyz@gmail.com"
                            icon={<FiMail/>}
                        />

                        <TextInput 
                           name="password"
                           type="password"
                           label="Password"
                           placeholder="*********" 
                           icon={<FiLock/>}
                        />

                        <ButtonGroup>
                            {!isSubmitting &&<StyledFromButton
                            type="submit">Login    
                            </StyledFromButton> }

                            {isSubmitting && (
                                <ThreeDots 
                                    color={colors.theme}
                                    height={49}
                                    width={100}
                                />
                            )}
                        </ButtonGroup>
                    </Form>
                )}
            </Formik>
            <ExtraText>
                New here? <TextLink to='/signup'>Signup</TextLink> 
            </ExtraText>
            </StyledFormArea>
        </div>
        </StyledContainer>
    );
};

export default connect(null, {loginUser} )(Login);