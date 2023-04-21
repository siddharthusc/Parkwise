//styled componenets
import { TextLink, StyledButton,StyledContainer, StyledTextInput, StyledFormArea, StyledFromButton, Avatar, StyledLabel, StyledTitle, colors, ButtonGroup, ExtraText } from "../components/Styles";
import Logo from './../assets/logo.png'

// formik
import { Formik, Form } from "formik";
import { TextInput } from "../components/FormLib";
import * as Yup from 'yup'

//icons
import {FiMail, FiLock, FiUser, FiCalendar} from 'react-icons/fi'

//loader
import {ThreeDots} from 'react-loader-spinner'

//auth and redux
import {connect} from 'react-redux'
import { signupUser } from "../auth/actions/userActions";
import { useNavigate } from 'react-router-dom'

const Signup = ({signupUser}) => {
    const history = useNavigate();
    return (
        <StyledContainer>
        <div>
            <StyledFormArea>
                <Avatar image={Logo} />
                <StyledTitle color={colors.theme} size={30}> Member Signup</StyledTitle>

                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                        repeatPassword: "",
                        dateOfBirth: "",
                        name: ""
                    }}
                    
                    validationSchema = {
                        Yup.object({
                            email: Yup.string().email("Invalid email address")
                            .required("Required"),
                            password: Yup.string().min(8, "Password is too short").max(30, "Password is too long")
                            .required("Required"),
                            name: Yup.string().required("Required"),
                            dateOfBirth: Yup.date().required("Required"),
                            repeatPassword: Yup.string(). required("Required")
                            .oneOf([Yup.ref("password")], "Password must match")

                        })
                    }

                    onSubmit={(values, {setSubmitting, setFieldError}) => {
                        signupUser(values, history, setFieldError, setSubmitting)
                    }}
                >
                {({isSubmitting}) => (
                    <Form>
                        <TextInput 
                            name="name"
                            type="text"
                            label="Full Name"
                            placeholder="Simpson"
                            icon={<FiUser/>}
                        />

                        <TextInput 
                            name="email"
                            type="text"
                            label="Email Address"
                            placeholder="xyz@gmail.com"
                            icon={<FiMail/>}
                        />

                        <TextInput 
                            name="dateOfBirth"
                            type="date"
                            label="Date of Birth"
                            icon={<FiCalendar/>}
                        />

                        <TextInput 
                           name="password"
                           type="password"
                           label="Password"
                           placeholder="*********" 
                           icon={<FiLock/>}
                        />

                        <TextInput 
                           name="repeatPassword"
                           type="password"
                           label="Repeat Password"
                           placeholder="*********" 
                           icon={<FiLock/>}
                        />

                        <ButtonGroup>
                            {!isSubmitting &&<StyledFromButton
                            type="submit">Signup    
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
                Already a member? <TextLink to='/login'>Login</TextLink> 
            </ExtraText>
            </StyledFormArea>
        </div>
        </StyledContainer>
    );
};

export default connect(null, {signupUser})(Signup);