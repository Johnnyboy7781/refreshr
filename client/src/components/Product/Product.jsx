import { Link } from "react-router-dom";
import styled from "styled-components";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import InfoIcon from '@mui/icons-material/Info';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useMutation, useQuery } from "@apollo/client";

import { ADD_TO_CART, TOGGLE_FAVORITE } from "../../utils/mutations";
import Auth from '../../utils/auth';
import { QUERY_USER } from "../../utils/queries";

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

const ColoredFavoriteIcon = styled(FavoriteIcon)`
  filter: invert(37%) sepia(95%) saturate(1522%) hue-rotate(336deg) brightness(102%) contrast(87%);
`

const ColoredInfoIcon = styled(InfoIcon)`
  color: black;
`

const Product = ({ drink }) => {
  const [addToCart] = useMutation(ADD_TO_CART);
  const [toggleFav] = useMutation(TOGGLE_FAVORITE);
  const { data: userData } = useQuery(QUERY_USER);

  let isFav = false;

  if (userData) {
    isFav = userData.user.favorites.some(fav => {
      return fav._id === drink._id
    })
  }

  const handleFormSubmit = type => {
    if (!Auth.loggedIn()) {
      alert(`You must be logged in to add to ${type}!`);
    }

    const { data } = Auth.getProfile();

    try {
      if (type === "cart") {
        addToCart({
          variables: { userId: data._id, drinkId: drink._id }
        })
      } else {
        toggleFav({
          variables: { userId: data._id, drinkId: drink._id }
        })
      }
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
          <AddShoppingCartIcon onClick={() => handleFormSubmit("cart")} />
        </Icon>
        <Icon>
          <Link to={`/drink/${drink._id}`}>
          <ColoredInfoIcon />
          </Link>
        </Icon>
        <Icon>
          {isFav
            ? <ColoredFavoriteIcon onClick={() => handleFormSubmit("favorite")} />
            : <FavoriteBorderIcon onClick={() => handleFormSubmit("favorite")} />
          }
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;