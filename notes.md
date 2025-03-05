# LinkList

## 单向

只能从一个固定的节点往下遍历

## 双向

可以结合 hash map 从任意节点向上向下操作  O(1)

# binarySearch

模版：

```
   while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (check(mid)) {
            result = mid;
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
```
