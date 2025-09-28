/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {
    // 두개의 포인터. start, end
    // recursive 함수 시작 -> recursive 함수 말고 stack으로 처리하자
    // input validator
    // 1. 숫자
        // 숫자가 있으면 무조건 recursive
        // 대신 start와 end를 지정해줘야함. start는 숫자 바로 다음 문자고
        // end는 뒤에서부터 찾아서 닫는 ']' 괄호여야함
        // recursive의 결과는 문자열임. 그래서 이 결과에 숫자를 곱해서 리턴해주면 끝
    // 2. 나머지
        // 출력 문자열을 리턴하는 로직
    // 최종 결과 리턴 return result;

    const stack = [];
    let currentNum = 0;
    let currentStr = '';
    
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        
        if (char >= '0' && char <= '9') {
            // 숫자 처리 (여러 자리 수 가능)
            currentNum = currentNum * 10 + parseInt(char);
            
        } else if (char === '[') {
            // 스택에 현재 상태 저장
            stack.push({
                num: currentNum,
                str: currentStr
            });
            
            // 초기화
            currentNum = 0;
            currentStr = '';
            
        } else if (char === ']') {
            // 스택에서 이전 상태 복원
            const prev = stack.pop();
            
            // 현재 문자열을 prev.num번 반복해서 이전 문자열에 추가
            currentStr = prev.str + currentStr.repeat(prev.num);
            
        } else {
            // 일반 문자
            currentStr += char;
        }
    }
    
    return currentStr;
};