/**
 * @param {number[]} nums
 */
var NumArray = function(nums) {
    this.n = nums.length;
    this.nums = nums;
    this.tree = new Array(4 * this.n).fill(0);
    
    if (this.n > 0) {
        this.buildTree(0, 0, this.n - 1);
    }
};

NumArray.prototype.buildTree = function(node, start, end) {
    // 리프 노드: 원본 배열 값 저장
    if (start === end) {
        this.tree[node] = this.nums[start];
        return;
    }
    
    // 구간을 반으로 나눔
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;
    
    // 왼쪽, 오른쪽 서브트리 구성
    this.buildTree(leftChild, start, mid);
    this.buildTree(rightChild, mid + 1, end);
    
    // 현재 노드 = 자식들의 합
    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
};

/** 
 * @param {number} index 
 * @param {number} val
 * @return {void}
 */
NumArray.prototype.update = function(index, val) {
    this.nums[index] = val;
    this.updateTree(0, 0, this.n - 1, index, val);
};

NumArray.prototype.updateTree = function(node, start, end, index, val) {
    // 범위 밖이면 무시
    if (index < start || index > end) {
        return;
    }
    
    // 리프 노드 도달: 값 업데이트
    if (start === end) {
        this.tree[node] = val;
        return;
    }
    
    // 자식 노드로 내려가서 업데이트
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;
    
    if (index <= mid) {
        this.updateTree(leftChild, start, mid, index, val);
    } else {
        this.updateTree(rightChild, mid + 1, end, index, val);
    }
    
    // 자식들이 변경되었으므로 현재 노드도 재계산
    this.tree[node] = this.tree[leftChild] + this.tree[rightChild];
};

/** 
 * @param {number} left 
 * @param {number} right
 * @return {number}
 */
NumArray.prototype.sumRange = function(left, right) {
    return this.queryTree(0, 0, this.n - 1, left, right);
};

NumArray.prototype.queryTree = function(node, start, end, left, right) {
    // 케이스 1: 현재 구간이 [left, right] 완전히 밖
    if (right < start || left > end) {
        return 0;
    }
    
    // 케이스 2: 현재 구간이 [left, right] 완전히 안
    if (left <= start && end <= right) {
        return this.tree[node];
    }
    
    // 케이스 3: 부분 겹침 - 양쪽 자식 탐색
    const mid = Math.floor((start + end) / 2);
    const leftChild = 2 * node + 1;
    const rightChild = 2 * node + 2;
    
    const leftSum = this.queryTree(leftChild, start, mid, left, right);
    const rightSum = this.queryTree(rightChild, mid + 1, end, left, right);
    
    return leftSum + rightSum;
};

/** 
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * obj.update(index,val)
 * var param_2 = obj.sumRange(left,right)
 */