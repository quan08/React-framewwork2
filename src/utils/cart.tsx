// eslint-disable-next-line no-unused-vars
import { message } from "antd";

export const setLocalStorage = (key: any, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
// eslint-disable-next-line consistent-return
export const getLocalStorage = (key: any) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) || '{}');
    }
};


// eslint-disable-next-line import/prefer-default-export
export const addToCart = (newItem: any, next: any) => {
    let cart: any = [];
    if (localStorage.getItem("cart")) {
        cart = getLocalStorage("cart");
    }
    const existItem = cart.find((item: any) => item.id === newItem.id);
    if (!existItem) {
        cart.push(newItem);
        message.success("Thêm vào giỏ hàng thành công");
    } else {
        // eslint-disable-next-line no-plusplus
        existItem.quantity += newItem.quantity;
        message.success("Sản phẩm này đã có trong giỏ, tăng số lượng lên" + newItem.quantity);
    }
    setLocalStorage("cart", cart);
    next();
};
