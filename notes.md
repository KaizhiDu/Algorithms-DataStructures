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

# two pointer
遇到 “字符串反转” 或 “单词顺序调整” 时，优先考虑： ✅ 整体反转 + 局部反转
✅ 双指针法
✅ 原地修改 (in-place)
