# 技巧总结
## 递归
1> 确定 递归出口
2> 确定 何时递归
3> 分治需要的话可以返回任何东西所以不用担心，需要额外处理空节点的返回也就是递归出口

# LinkList

## 单向

只能从一个固定的节点往下遍历

## 双向

可以结合 hash map 从任意节点向上向下操作  O(1)

# binarySearch

## 模版

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

## 场景
最短路径，多源点，层序遍历

## 基本知识
1. 我们基本上一定是要有一个 visited 去记录已经访问的节点
2. 需要用到queue来控制bfs的执行
3. 如果题目设计到最短路径，则需要同时间处理queue里面所有的信息(一般来说visited也要在进queue的时候就mark)，之后才能让path++

## 多源 BFS 的典型特征
题目目标： 找到每个点到「最近的特定点」的最短距离。

数据特点： 题目中存在多个「起点」，且它们都拥有相同的初始值或状态。

搜索特征： 以多个起点同时出发，像波浪一样向外扩展，天然满足最短路径的条件。

Key Word: 最短路径、蔓延传播、多个起点扩散

## topological sort
DAG Directed Acyclic Graph（有向无环图）
是否是 DAG ? 判断出队的节点是否等于总结点，如果相等则是DAG 否则则不是
Kahn's Algorithm 采用入度 (In-degree) 的概念来完成拓扑排序。（即指向它的边的数量）

a -> b inDegree b , graph { a: [b] }

key words: 顺序  唯一
「唯一性」 + 「部分顺序」 → 图论问题 → 拓扑排序 → 保证每步仅有一个入度为 0 的节点

# DFS

## 场景
二叉树的前/中/后序遍历, 全排列/组合, 回溯, 路径(是否存在一条路，找出所有路，找出最长的路)

## 二叉树

### 二叉树的直径
根节点左子树的最大深度 + 根节点右子树的最大深度

### 二叉搜索树 BST
✅ 每个节点都满足：
左子树所有节点的值 < 当前节点的值
右子树所有节点的值 > 当前节点的值
每棵子树也都是一个 BST
基本上需要使用到中序遍历
```
    // 中序遍历：先访问左子树，再访问根节点，最后访问右子树。    8, 4, 9, 2, 5, 1, 6, 3, 7
    midOrderTraversal(node = this.root, result = []) {
        if (node.left) this.midOrderTraversal(node.left, result);
        if (node) {
            result.push(node.value);
        }
        if (node.right) this.midOrderTraversal(node.right, result);
        if (node === this.root) return result;
    }
```

## graph

基于图的DFS: 和BFS一样一般需要一个set来记录访问过的节点，避免重复访问造成死循环;
Word XXX 系列面试中非常常见，例如word break，word ladder，word pattern，word search。

## DFS + Memoization Search

当你遇到：

明显的 子问题重叠（重复子结构）
有多个选择，每个选择都可能递归下去（典型：字符串拆分、走迷宫、匹配路径）
暂时不确定最终解法，但可以尝试所有可能（“试探法”）
你不关心 具体路径，而只关心 能不能走通 / 有多少种方式

```
    const memo = new Map();
    const dfs = (state1, state2, ...) => {
        const key = `${state1}-${state2}`; // ⬅️ 定义唯一状态 key
        if (memo.has(key)) return memo.get(key);
    
        // base case
        if (满足结束条件) return true / value;
    
        let result = 计算子问题结果（如 dfs(nextState1, ...)）
    
        memo.set(key, result); // ✅ 不管结果 true 还是 false 都缓存
        return result;
    };

```
