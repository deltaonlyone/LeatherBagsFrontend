export function getType(type) {
    typeOptions().find(option => option.value === type);
}

export function typeOptions() {
    return [{
        title: 'Сумка бананка з натуральної шкіри',
        value: 1
    }, {
        title: 'Сумка бананка з натуральної шкіри зі срібним замком',
        value: 2
    }];
}

export function sizeOptions(type) {
    const arr = [{
        title: 'Стандартний L',
        value: 'L'
    }]

    if (type === 1) {
        arr.push({
            title: 'Великий XL',
            value: 'XL'
        })
    }

    return arr;
}

export function colorOptions(type, size) {
    return [{
        title: 'Чорний',
        value: 'Чорний'
    }, {
        title: 'Синій',
        value: 'Синій'
    }, {
        title: 'Червоний',
        value: 'Червоний'
    }, {
        title: 'Коричневий',
        value: 'Коричневий'
    }];
}

export function keyHolderOptions() {
    return [{
        title: 'З ключницею',
        value: true
    }, {
        title: 'Без ключниці',
        value: false
    }];
}
