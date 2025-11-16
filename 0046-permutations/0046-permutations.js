/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
    const result = [];
    const current = [];
    const used = new Array(nums.length).fill(false);

    const backtrack = () => {
        if (current.length === nums.length) {
            result.push([...current]);
            return;
        }

        for (let i = 0; i < nums.length; ++i) {
            if (used[i]) {
                continue;
            }

            // 선택
            current.push(nums[i]);
            used[i] = true;

            //탐색
            backtrack();

            // 복구
            current.pop();
            used[i] = false;
        }
    };

    backtrack();
    return result;
};