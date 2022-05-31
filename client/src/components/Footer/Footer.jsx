import styled from "styled-components";


const Container = styled.div`
    display: flex; 
    position: fixed;
    padding: 10px 10px 0px 10px;
    bottom: 0;
    width: 100%;
    height: auto;
    background: teal;
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
    margin: 20px 0px;
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
`;



const Footer = () => {
    return (
        <Container>
            <Left>
                <Logo>REFRESHR.</Logo>
                <Desc>
                    Drink Up.
                </Desc>
            </Left>
            <Center>
                <Title>Useful Links</Title>
                <List>
                    <ListItem>Home</ListItem>
                    <ListItem>Cart</ListItem>
                    <ListItem>My Account</ListItem>
                    <ListItem>Order Tracking</ListItem>
                    <ListItem>Favorites</ListItem>
                    <ListItem>Terms and Conditions</ListItem>
                </List>
            </Center>
        </Container>
    );
};

export default Footer;
