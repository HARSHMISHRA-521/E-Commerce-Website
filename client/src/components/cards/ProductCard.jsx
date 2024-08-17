import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress, Rating } from "@mui/material";
import styled from "styled-components";
import {
  AddShoppingCartOutlined,
  FavoriteBorder,
  FavoriteRounded,
} from "@mui/icons-material";
import {
  addToCart,
  addToFavourite,
  deleteFromFavourite,
  getFavourite,
} from "../../api";
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/snackbarSlice";

const Card = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: all 0.3s ease-out;
  cursor: pointer;
  @media (max-width: 600px) {
    width: 170px;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 320px;
  border-radius: 6px;
  object-fit: cover;
  transition: all 0.3s ease-out;
  @media (max-width: 600px) {
    height: 240px;
  }
`;
const Menu = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  top: 14px;
  right: 14px;
  display: none;
  flex-direction: column;
  gap: 12px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-radius: 6px;
  transition: all 0.3s ease-out;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }

  &:hover ${Image} {
    opacity: 0.9;
  }
  &:hover ${Menu} {
    display: flex;
  }
`;
const MenuItem = styled.div`
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background: white;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 200;
`;

const Rate = styled.div`
  position: absolute;
  z-index: 10;
  color: ${({ theme }) => theme.text_primary};
  bottom: 8px;
  left: 8px;
  padding: 4px 8px;
  border-radius: 4px;
  background: white;
  display: flex;
  align-items: center;
  opacity: 0.9;
`;

const Details = styled.div`
import { useDispatch } from "react-redux";
import { openSnackbar } from "../../redux/reducers/snackbarSlice";
  display: flex;
  gap: 6px;
  flex-direction: column;
  padding: 4px 10px;
`;
const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 16px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Span = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_secondary + 60};
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.text_secondary + 50};
`;
const Percent = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: green;
`;


/**
 * Renders a product card component with the given product data.
 * The component displays the product image, title, description, price, and rating.
 * It also includes buttons to add the product to favorites, add it to the shopping cart,
 * and navigate to the product details page.
 *
 * @param {Object} product - The product data to be displayed.
 * @return {JSX.Element} The rendered product card component.
 */
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [favorite, setFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  /**
   * Adds the current product to the user's favorites by making an asynchronous request to the server.
   * If successful, sets the 'favorite' state to true and sets the 'favoriteLoading' state to false.
   * If an error occurs, sets the 'favoriteLoading' state to false and displays an error message using the 'openSnackbar' action.
   *
   * @return {Promise<void>} A promise that resolves when the request is complete.
   */
  const addFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await addToFavourite(token, { productID: product?._id })
      .then((res) => {
        setFavorite(true);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  /**
   * Removes the current product from the user's favorites by making an asynchronous request to the server.
   * If successful, sets the 'favorite' state to false and sets the 'favoriteLoading' state to false.
   * If an error occurs, sets the 'favoriteLoading' state to false and displays an error message using the 'openSnackbar' action.
   *
   * @return {Promise<void>} A promise that resolves when the request is complete.
   */
  const removeFavorite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await deleteFromFavourite(token, { productID: product?._id })
      .then((res) => {
        setFavorite(false);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  /**
   * Asynchronously adds the current product to the user's cart by making an API request.
   *
   * @return {Promise<void>} A promise that resolves when the request is complete.
   */
  const addCart = async () => {
    const token = localStorage.getItem("krist-app-token");
    await addToCart(token, { productId: product?._id, quantity: 1 })
      .then((res) => {
        navigate("/cart");
      })
      .catch((err) => {
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  /**
   * Checks if the current product is a favorite for the user by making an asynchronous request to the server.
   * If successful, sets the 'favorite' state to true or false and sets the 'favoriteLoading' state to false.
   * If an error occurs, sets the 'favoriteLoading' state to false and displays an error message using the 'openSnackbar' action.
   *
   * @return {Promise<void>} A promise that resolves when the request is complete.
   */
  const checkFavourite = async () => {
    setFavoriteLoading(true);
    const token = localStorage.getItem("krist-app-token");
    await getFavourite(token, { productId: product?._id })
      .then((res) => {
        const isFavorite = res.data?.some(
          (favorite) => favorite._id === product?._id
        );
        setFavorite(isFavorite);
        setFavoriteLoading(false);
      })
      .catch((err) => {
        setFavoriteLoading(false);
        dispatch(
          openSnackbar({
            message: err.message,
            severity: "error",
          })
        );
      });
  };

  useEffect(() => {
    checkFavourite();
  }, []);
  return (
    <Card>
      <Top>
        <Image src={product?.img} />
        <Menu>
          <MenuItem
            onClick={() => (favorite ? removeFavorite() : addFavorite())}
          >
            {favoriteLoading ? (
              <CircularProgress sx={{ fontSize: "20px" }} />
            ) : (
              <>
                {favorite ? (
                  <FavoriteRounded sx={{ fontSize: "20px", color: "red" }} />
                ) : (
                  <FavoriteBorder sx={{ fontSize: "20px" }} />
                )}
              </>
            )}
          </MenuItem>{" "}
          <MenuItem onClick={() => addCart(product?.id)}>
            <AddShoppingCartOutlined
              sx={{ color: "inherit", fontSize: "20px" }}
            />
          </MenuItem>
        </Menu>
        <Rate>
          <Rating value={3.5} sx={{ fontSize: "14px" }} />
        </Rate>
      </Top>
      <Details onClick={() => navigate(`/shop/${product._id}`)}>
        <Title>{product?.title}</Title>
        <Desc>{product?.name}</Desc>
        <Price>
          ${product?.price?.org} <Span>${product?.price?.mrp}</Span>
          <Percent>${product?.price?.off}% Off</Percent>
        </Price>
      </Details>
    </Card>
  );
};

export default ProductCard;
