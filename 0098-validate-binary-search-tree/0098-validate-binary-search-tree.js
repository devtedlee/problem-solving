/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {
    function validate(node, min, max) {
        // 기저 조건: null 노드는 유효
        if (node === null) return true;
        
        // 현재 노드가 범위를 벗어나면 false
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        // 왼쪽 서브트리: 모든 값이 node.val보다 작아야 함
        // 오른쪽 서브트리: 모든 값이 node.val보다 커야 함
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
};