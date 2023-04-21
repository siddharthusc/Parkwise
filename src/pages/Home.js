import { StyledTitle, StyledSubTitle, Avatar, StyledButton, ButtonGroup, StyledContainer} from "../components/Styles";

//logo
import Logo from './../assets/logo.png'

const Home = () => {
    return (
        <StyledContainer>
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
            <StyledTitle size={65}>
                Welcome to Parking Wise
            </StyledTitle>
            <StyledSubTitle size={27}>
                Get the best solutions for your parking problems
            </StyledSubTitle>
            
            <ButtonGroup>
            <StyledButton to='/login'>Login</StyledButton>
            <StyledButton to='/signup'>Signup</StyledButton>
            </ButtonGroup>
        </div>
        </StyledContainer>
    );
}

export default Home;