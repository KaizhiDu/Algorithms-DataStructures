// 225. Implement Stack using Queues


var MyStack = function() {
    this.res = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
    this.res.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
    return this.res.pop();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
    const length = this.res.length;
    return this.res[length - 1];
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
    return this.res.length === 0;
};

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */

const myStack = new MyStack();
myStack.push(1);
myStack.push(2);
console.log(myStack.top()) // return 2
console.log(myStack.pop()) // return 2
console.log(myStack.empty()) // return False
