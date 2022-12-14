import { Card, Col, Image, Row } from "react-bootstrap";
import { FC, ReactElement } from "react";

import { CartItem } from "../../interfaces/cart";
import { Product } from "../../interfaces/product";

type ProductCardProps = {
  product: Product;
  addToCart: (product_id: number) => void;
  removeFromCart: (product_id: number) => void;
  incrementProduct: (product_id: number) => void;
  decrementProduct: (product_id: number) => void;
  existsInCart: (product_id: number) => boolean;
  getCartItemDetails: (product_id: number) => CartItem | undefined;
};

export const ProductCard: FC<ProductCardProps> = ({
  product,
  addToCart,
  removeFromCart,
  incrementProduct,
  decrementProduct,
  existsInCart,
  getCartItemDetails,
}): ReactElement => {
  const { id, price, name, colour, img } = product;
  const cartItem = getCartItemDetails(id);
  return (
    <section>
      <Row className="py-3">
        <Col>
          <Card>
            <Row>
              <Col>
                <Image src={img} alt={colour} className="p-3" height={300} />
              </Col>
              <Col md={8} className="d-flex justify-content-between">
                <div className="card-details w-75">
                  <h2>{name}</h2>
                  <p className="color">{colour}</p>
                  <p className="price">
                    £<span>{price}</span>
                  </p>
                </div>
                <div className="w-25 d-flex align-items-center justify-content-center flex-column">
                  {existsInCart(id) ? (
                    <div className="counter w-75 d-flex justify-content-between">
                      <button
                        className="pr-2 cursor-pointer user-select-none"
                        onClick={() => decrementProduct(id)}
                        disabled={cartItem?.quantity === 1}
                      >
                        -
                      </button>
                      {cartItem?.quantity}
                      <button
                        className="pl-2 cursor-pointer user-select-none"
                        onClick={() => incrementProduct(id)}
                      >
                        +
                      </button>
                    </div>
                  ) : null}
                  {!existsInCart(id) ? (
                    <div
                      className="counter cursor-pointer user-select-none"
                      onClick={() => addToCart(id)}
                    >
                      Add
                    </div>
                  ) : null}
                  {existsInCart(id) ? (
                    <div
                      className="counter text-sm cursor-pointer user-select-none"
                      onClick={() => removeFromCart(id)}
                    >
                      Remove
                    </div>
                  ) : null}
                </div>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </section>
  );
};
