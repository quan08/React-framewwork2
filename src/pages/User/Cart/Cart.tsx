import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { ProductTye } from '../../../types/product'
import { getLocalStorage, setLocalStorage } from '../../../utils/cart'
import { formatCash } from '../../../utils/formatCash'
import { CloseOutlined } from "@ant-design/icons";
import { PageHeader, Space } from "antd";
import { Button } from "antd/lib/radio";
import styled from "styled-components";
import { Link } from 'react-router-dom'

type Props = {
    removeCartItem: () => void
}

function Cart(props: Props) {
    const [productCart, setProductsCart] = useState<ProductTye[]>([])
    const getPro = () => {
        const data = getLocalStorage("cart");
        if (data != undefined) {
            setProductsCart(data)
        }
    }
    useEffect(() => {
        getPro()
    }, [])

    const handleRemoveItemCart = (e: any) => {
        const idPro = e.target.getAttribute("set-data");
        const Cart = productCart;
        const CartNew = Cart.splice(idPro, 1)
        console.log(Cart)
        localStorage.removeItem('cart')
        setLocalStorage("cart", Cart);
        message.success('Xóa thành công')
        getPro()
        props.removeCartItem();
    }

    const totalCart = () => {
        let count = 0;
        productCart.map((item) => {
            count += item.originalPrice * item.quantity
        })
        return count
    }
    const handleIncreanQuantity = (e: any) => {
        const index = e.target.getAttribute('set-data')
        if (productCart[index].quantity <= 49) {
            let Cart = productCart;
            Cart[index].quantity += 1
            console.log(Cart)
            localStorage.removeItem('cart')
            setLocalStorage("cart", Cart);
            getPro()
        } else {
            message.warning("Đạt số lượng tối đa")
        }

    }

    const handleDecreanQuantity = (e: any) => {
        console.log(e.target.getAttribute('set-data'));

        const index = e.target.getAttribute('set-data')
        if (productCart[index].quantity > 1) {
            let Cart = productCart;
            Cart[index].quantity -= 1
            console.log(Cart)
            localStorage.removeItem('cart')
            setLocalStorage("cart", Cart);
            getPro()
        } else {
            message.warning("Đạt số lượng tối thiếu")
        }
    }
    return (
        <Cartt>
            <PageHeader
                ghost={false}
                onBack={() => window.history.back()}
                title="Trở về"
                subTitle="Giỏ hàng"
            ></PageHeader>

            <div className="list-cart">
                {productCart.map((item: any, index: number) => {
                    return (
                        <div key={index} className="cart-item">
                            <div className="cart-img">
                                <Link to={"/products/"+item.id}><img width="200px" src={item.image} alt="" /></Link>
                            </div>

                            <div className="cart-content">
                                <Link to={"/products/"+item.id}><h3 className="product-name">{item.name}</h3>{" "}</Link>
                                <div className="price-product">
                                    <p className="price saleOffPrice">
                                        <span>
                                            {item.saleOffPrice.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </p>

                                    <p className="price originalPrice">
                                        <span>
                                            {item.originalPrice.toLocaleString("it-IT", {
                                                style: "currency",
                                                currency: "VND",
                                            })}
                                        </span>
                                    </p>
                                </div>
                                <div>
                                    <strong>Chọn số lương: </strong>
                                    <div className="quantity">
                                        <div className="input-group-btn">
                                            <button set-data={index} onClick={handleDecreanQuantity} className="btn btn-sm btn-primary btn-minus">
                                                <i set-data={index} className="fa fa-minus"></i>
                                            </button>
                                        </div>
                                        <div className="qtt">{item.quantity}</div>
                                        <div className="input-group-btn">
                                            <button set-data={index} onClick={handleIncreanQuantity} className="btn btn-sm btn-primary btn-plus">
                                                <i set-data={index} className="fa fa-plus"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                <Button
                  className="remove-item-cart"
                  set-data={index} onClick={handleRemoveItemCart} 
                >
                  <CloseOutlined />
                </Button>
              </div>
                        </div>
                    );
                })}
            </div>

            <div className="total">
                <div>Tổng tiền tạm tính: </div>
                <div className="total-text">
                    {totalCart().toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                    })}
                </div>
            </div>

            <div className="action">
                <Button className="butt red">Tiến hành đặt hàng</Button>
                <Button className="butt white">Chọn thêm sản phẩm khác</Button>
            </div>
        </Cartt>
    )
}

const Cartt = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  .ant-page-header-heading-title {
    color: red;
  }
  .ant-page-header-heading-sub-title {
    font-size: 24px;
    color: red;
    margin-left: 410px;
    font-weight: 500;
  }
  .total,
  .action,
  .list-cart {
    max-width: 680px;
    margin: 50px auto;
  }
  .cart-item {
    display: flex;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 10%),
      0 2px 6px 2px rgb(60 64 67 / 15%);
    border-radius: 10px;
  }
  .cart-img {
    margin-right: 50px;
    padding: 20px 0;
  }
  .product-name {
    margin-top: 20px;
  }
  .remove-item-cart {
    margin-top: 20px;
    border: none;
    font-weight: 700;
    margin-left: 70px;
  }
  .saleOffPrice {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
    margin-right: 8px;
    color: #d70018;
  }
  .originalPrice {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #707070;
  }
  .price {
    display: inline-block;
  }
  .quantity {
    display: inline-flex;
    align-items: center;
  }
  .qtt {
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    line-height: 30px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .total-text {
    color: red;
    font-size: 18px;
  }
  .butt {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    height: 50px;
    background: #d70018;
    border: 1px solid #dc3545;
    border-radius: 4px;
    margin: 10px 0;
  }
  .red {
    color: #fff;
  }
  .white {
    color: red;
    background: #fff;
  }
`;

export default Cart