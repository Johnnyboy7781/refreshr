import { React } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useQuery } from '@apollo/client';
import styled from 'styled-components';

import { QUERY_USER } from '../utils/queries';
import Product from '../components/Product/Product';

const FavList = styled.div`
    display: flex;
    margin: 0 auto;
    flex-wrap: wrap;
    padding: 10px
`

const FavContainer = styled.div`
    margin: 0 auto;
    max-width: 1250px;
    padding: 30px;
`

const Favorites = () => {
    const { data: userData } = useQuery(QUERY_USER);
    let favorites;

    if (userData) {
        favorites = userData.user.favorites;
    }
    
    return (
        <div>
            <Navbar />
                <FavContainer>
                    {userData ? <h2 style={{textDecorationLine: 'underline'}}>Favorites</h2> : <h2>Loading . . .</h2>}
                    <FavList>
                        {userData && favorites.map((drink) => (
                            <Product drink={drink} key={drink._id} />
                        ))}
                    </FavList>
                </FavContainer>
            <Footer />
        </div>
    )
}

export default Favorites;