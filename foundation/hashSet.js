const hashSet = () => {
    const set = new Set();
    set.add(1);
    set.add(2);
    set.add(2); // 重复不算
    console.log(set.has(1)); // true
    set.delete(2);
    console.log(set.size); // 1
    set.clear();
    console.log(set.size); // 0
    console.log(Array.from(set)) // 转成array
}

hashSet();

