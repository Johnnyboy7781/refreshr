import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    display: flex; 
    width: 100%;
    position: fixed;
    padding: 10px 10px 0px 10px;
    bottom: 0;
    height: auto;
    background: teal; 
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    padding: 10px;
    align-items: center;

    > * {
        margin: 0 0 0 10px;
    }
`;

const Logo = styled.h1``;

const Desc = styled.p`
    // margin: 20px 0px;
`;

const Center = styled.div`
    flex: 1;
    padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`;

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`;

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    color: black;
    &:hover {
        text-decoration: underline;
    }
`;

const RouterLink = styled(Link)`
    width: 50%;
    margin-bottom: 10px;
    color: black;
    &:hover {
        text-decoration: underline;
    }
`

const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>REFRESHR.</Logo>
                <Desc>
                    Drink Up.
                </Desc>
            </Left>
            {/* <Center>
                <Title>Useful Links</Title>
                <List>
                    <RouterLink to="/">
                        <ListItem>Home</ListItem>
                    </RouterLink>
                    <RouterLink to="/cart">
                        <ListItem>Cart</ListItem>
                    </RouterLink>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <RouterLink to="/favorites">
                        <ListItem>Favorites</ListItem>
                    </RouterLink>
                    <ListItem>Terms and Conditions</ListItem>
                </List>
            </Center> */}
        </Container>
    );
};

export default Footer;
