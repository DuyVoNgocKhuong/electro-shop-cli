import React from "react";
import "./Search.scss";
import ProductStyle1 from "../ProductStyle1/ProductStyle1";
import { useSelector } from "react-redux";
import Navigation from "../Navigation/Navigation";
import { Col, Row } from "antd";
import { StopOutlined } from "@ant-design/icons";
const Search = () => {
  const searchitem = useSelector((state) => state.productReducer.search);
  return (
    <div className="Search">
      <Navigation />
      <div className="container">
        {searchitem.length ? (
          <Row style={{ width: "100%" }}>
            {searchitem.map((pro) => (
              <Col span={6}>
                <ProductStyle1
                  id={pro._id}
                  name={pro.name}
                  img={pro.img}
                  retailPrice={pro.retailPrice}
                  type={pro.subCategory}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <div className="one">
            <StopOutlined />
            <h1>404 Not found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;