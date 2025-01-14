const hashMap = () => {
    // 使用 Map 实现哈希表
    const map = new Map();
    map.set('name', 'Alice');
    map.set('age', 25);
    console.log(map.get('name')); // 'Alice'
    map.delete('age');
    console.log(map.size); // 1

    // 使用对象字面量实现哈希表
    const obj = {};
    obj['name'] = 'Bob';
    console.log(obj['name']); // 'Bob'
    delete obj['name'];
}

hashMap();

