/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function(grid) {
    // 예외 처리
    if (!grid || grid.length === 0) return 0;
    
    const rows = grid.length;
    const cols = grid[0].length;
    let islandCount = 0;
    
    // DFS 함수 정의
    const dfs = (r, c) => {
        // 경계 조건 체크
        if (r < 0 || r >= rows || c < 0 || c >= cols) return;
        
        // 물이거나 이미 방문한 곳
        if (grid[r][c] === '0') return;
        
        // 방문 처리 (중요!)
        grid[r][c] = '0';
        
        // 상하좌우 4방향 탐색
        dfs(r - 1, c);  // 위
        dfs(r + 1, c);  // 아래
        dfs(r, c - 1);  // 왼쪽
        dfs(r, c + 1);  // 오른쪽
    };
    
    // 모든 칸 순회
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            // 땅을 발견하면
            if (grid[r][c] === '1') {
                islandCount++;  // 새로운 섬 발견!
                dfs(r, c);      // 연결된 모든 땅 탐색
            }
        }
    }
    
    return islandCount;
};