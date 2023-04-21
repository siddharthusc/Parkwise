import { StyledTitle,  Avatar, StyledButton, ButtonGroup, StyledFormArea, colors} from "../components/Styles";

//logo
import Logo from './../assets/logo.png'

// auth and redux
import { connect } from "react-redux";
import { logoutUser } from "../auth/actions/userActions";

import {useNavigate} from 'react-router-dom';


const Dashboard = ({logoutUser}) => {
    const history = useNavigate();
    return (
        <div>
            <div style={{
                position: "absolute",
                top: 0,
                left: 60,
                backgroundColor: "transparent",
                padding: "15px",
                display: "flex",
                justifyContent: "flex-start",
            }}>
                <Avatar image={Logo} />
            </div>
            <StyledFormArea bg={colors.dark2}>
                <StyledTitle size={65}>
                    Welcome, User
                </StyledTitle>
                
                <ButtonGroup>
                <StyledButton to="#" onClick={logoutUser(history)}>Logout</StyledButton>
                </ButtonGroup>
            </StyledFormArea>           
        </div>
    );
}

// export default Dashboard;
export default connect(null, {logoutUser})(Dashboard);