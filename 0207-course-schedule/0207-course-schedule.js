/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function(numCourses, prerequisites) {
    // 1. 그래프 구성: 인접 리스트로 표현
    // graph[i] = i번 과목을 듣기 위해 먼저 들어야 할 과목들
    const graph = Array.from({ length: numCourses }, () => []);
    
    for (const [course, prereq] of prerequisites) {
        // prereq → course 방향의 간선
        // "course를 듣기 위해 prereq이 필요"
        graph[course].push(prereq);
    }
    
    // 2. 방문 상태 배열 초기화
    // 0: WHITE (미방문), 1: GRAY (탐색중), 2: BLACK (완료)
    const state = new Array(numCourses).fill(0);
    
    // 3. DFS로 사이클 탐지
    function hasCycle(course) {
        // CASE 1: 이미 탐색 중인 노드를 다시 만남 → 사이클!
        if (state[course] === 1) return true;
        
        // CASE 2: 이미 탐색 완료된 노드 → 안전, 더 볼 필요 없음
        if (state[course] === 2) return false;
        
        // CASE 3: 처음 방문하는 노드
        // 탐색 시작: WHITE → GRAY
        state[course] = 1;
        
        // 인접 노드(선수과목들) 탐색
        for (const prereq of graph[course]) {
            if (hasCycle(prereq)) {
                return true;  // 하나라도 사이클이면 즉시 종료
            }
        }
        
        // 모든 선수과목 탐색 완료: GRAY → BLACK
        state[course] = 2;
        return false;
    }
    
    // 4. 모든 노드에 대해 DFS 실행
    // (연결되지 않은 컴포넌트가 있을 수 있으므로)
    for (let i = 0; i < numCourses; i++) {
        if (state[i] === 0) {  // 아직 방문하지 않은 노드만
            if (hasCycle(i)) {
                return false;  // 사이클 발견 즉시 종료
            }
        }
    }
    
    // 모든 노드 탐색 완료, 사이클 없음
    return true;
};