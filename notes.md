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

# BFS
## 基本知识
1. 我们基本上一定是要有一个 visited 去记录已经访问的节点
2. 需要用到queue来控制bfs的执行
3. 如果题目设计到最短路径，则需要同时间处理queue里面所有的信息(一般来说visited也要在进queue的时候就mark)，之后才能让path++

## 多源 BFS 的典型特征
题目目标： 找到每个点到「最近的特定点」的最短距离。

数据特点： 题目中存在多个「起点」，且它们都拥有相同的初始值或状态。

搜索特征： 以多个起点同时出发，像波浪一样向外扩展，天然满足最短路径的条件。

Key Word: 最短路径、蔓延传播、多个起点扩散
