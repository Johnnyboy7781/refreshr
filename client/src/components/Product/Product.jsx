import { Link } from "react-router-dom";
import styled from "styled-components";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useMutation } from "@apollo/client";

import { ADD_TO_CART } from "../../utils/mutations";
import Auth from '../../utils/auth';

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #c2f8fa;
  position: relative;

  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.75);
  }
`;

const Product = ({ drink }) => {
  const [addToCart, { error }] = useMutation(ADD_TO_CART);

  const handleAddToCart = e => {
    const { data } = Auth.getProfile();
    
    if (!Auth.loggedIn()) {
      return;
    }

    try {
      e.preventDefault();
      addToCart({
        variables: { userId: data._id, drinkId: drink._id }
      })
    } catch (err) {
      console.log(err);
    }
  }
  
  return (
    <Container>
      <Circle />
      <Image src={require(`../../assets/${drink.image}.png`)} alt="A drink" />
      <Info>
        <Icon>
          <AddShoppingCartIcon onClick={handleAddToCart} />
        </Icon>
        <Icon>
          <Link to={`/drink/${drink._id}`}>
          <InfoIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;