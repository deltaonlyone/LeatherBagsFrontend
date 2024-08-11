export function bagPrice(type, size, keyHolder) {
    let price;
    if (type === 1) {
        price = 650;

        if (size === 'XL') {
            price += 100;
        }
    } else {
        price = 750;
    }

    if (keyHolder) {
        price += 200;
    }

    return price;
}

export function bagPriceFull(type, size, keyHolder) {
    let price = bagPrice(type, size, keyHolder);
    price = Math.floor(price / 0.65 / 10) * 10;
    return price;
}