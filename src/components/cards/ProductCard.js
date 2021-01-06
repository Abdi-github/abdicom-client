import React, { useState } from "react";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import Meta from "antd/lib/card/Meta";
import { Link, useHistory } from "react-router-dom";
import { averageRating } from "../../functions/rating";
import defaultImage from "../../images/defaultImage.jpg";
// import "./productCard.css";
import _ from "lodash";
import { useDispatch } from "react-redux";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");
  const [tooltipColor, setTooltipColor] = useState("#2db7f5");

  const dispatch = useDispatch();

  // destructure
  const { images, title, price, slug } = product;
  const history = useHistory();
  const handleImageClick = (e) => {
    e.preventDefault();
    // console.log(history);
    history.push(`/product/${slug}`);
  };

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });

      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      // save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));

      // add tooltip
      setTooltip("Product added");
      setTooltipColor("#f50");

      // add to redux

      dispatch({
        type: "ADD_TO_CART",
        // payload: cart,
        payload: unique,
      });
    }
  };

  return (
    <Card
      style={{ width: "100%", flexDirection: "column" }}
      bordered={false}
      className="ant-card mb-3 h-100 d-flex"
      cover={
        <img
          src={images && images.length ? images[0].url : defaultImage}
          alt="product"
          style={{
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={handleImageClick}
        />
      }
      // actions={[
      //   <Link to={`/product/${slug}`}>
      //     <EyeOutlined style={{ fontSize: "24px", color: "#e84f25" }} />
      //   </Link>,
      //   <Tooltip title={tooltip} color={tooltipColor}>
      //     {product.quantity === 0 ? (
      //       <Tooltip title={tooltipNoStock} color={tooltipNoStockColor}>
      //         <div className="text-danger">Out of stock</div>
      //       </Tooltip>
      //     ) : (
      //       <Link onClick={handleAddToCart}>
      //         <ShoppingCartOutlined
      //           style={{ fontSize: "24px", color: "#e84f25" }}
      //         />
      //       </Link>
      //     )}
      //   </Tooltip>,
      // ]}

      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined style={{ fontSize: "24px", color: "#e84f25" }} />
        </Link>,
        <Tooltip title={tooltip} color={tooltipColor}>
          <a onClick={handleAddToCart} disabled={product.quantity < 1}>
            <ShoppingCartOutlined
              style={{ fontSize: "24px", color: "#e84f25" }}
            />{" "}
            <br />
            {product.quantity < 1 ? "Out of stock" : ""}
          </a>
        </Tooltip>,
      ]}
    >
      <Meta className="text-center" title={title} />

      <div className="lead pt-2 text-center font-weight-bold font-italic">
        {product && product.ratings && product.ratings.length > 0 ? (
          averageRating(product)
        ) : (
          <div className="text-center pt-1 pb-3 text-muted">
            <small>"No rating yet"</small>
          </div>
        )}
        <span>{price} CHF</span>
      </div>
    </Card>
  );
};

export default ProductCard;
