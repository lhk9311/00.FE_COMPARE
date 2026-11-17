# 프론트엔드 6종 비교: 같은 "할 일 CRUD"

같은 기능(추가 / 조회 / 수정 / 완료 체크 / 삭제 / 남은 개수)을 6가지 방식으로 만들었다.
**두 파일을 나란히 띄워놓고 같은 기능이 어떻게 다른지 보는 게** 공부 포인트다.

## 추천 읽는 순서

1. `01-vanilla` → DOM을 직접 조작하는 게 얼마나 손이 많이 가는지 체감
2. `02-react` → 같은 걸 "데이터만 바꾸는" 방식으로 바꾸면 뭐가 사라지는지
3. `03-vue` → React와 거의 같은데 문법이 더 HTML/JSP스러움
4. `04-angular` → Spring이랑 구조가 제일 닮음 (클래스, 데코레이터, 서비스 주입)
5. `05-websquare`, `06-nexacro` → SI 현장 툴. 데이터셋 + 그리드 중심

## 실행 방법

| 폴더 | 실행 | 주소 | 검증 |
|---|---|---|---|
| 01-vanilla | `index.html` 더블클릭 | - | ✅ |
| 02-react | `npm install` → `npm run dev` | http://localhost:5173 | ✅ 빌드 확인 |
| 03-vue | `npm install` → `npm run dev` | http://localhost:5174 | ✅ 빌드 확인 |
| 04-angular | `npm install` → `npm start` | http://localhost:4200 | ✅ 빌드 확인 |
| 05-websquare | WebSquare Studio 필요 (라이선스) | - | ❌ 미검증, 구조 참고용 |
| 06-nexacro | Nexacro Studio 필요 (60일 체험판) | - | ❌ 미검증, 구조 참고용 |

> Node.js(LTS) 설치 필요. `npm install`은 package.json을 보고 `node_modules`에 라이브러리를 받는다 (= Maven이 pom.xml 보고 .m2에 받는 것).
> React와 Vue의 `npm run dev`가 바로 **Vite**를 실행하는 명령이다. 따로 Vite 실습 안 해도 이게 Vite 실습이다.

## 한눈에 비교

| | 바닐라 | React | Vue | Angular | WebSquare | Nexacro |
|---|---|---|---|---|---|---|
| 상태(데이터) | 일반 변수 | `useState` | `ref` | `signal` | DataList / DataMap | Dataset |
| 값 바꾸기 | 바꾸고 `render()` 직접 호출 | `setTodos(새배열)` | `todos.value.push()` 그냥 수정 | `todos.update()` | `setCellData()` | `setColumn()` |
| 화면 자동 갱신 | ❌ | ✅ | ✅ | ✅ | ✅ (바인딩) | ✅ (바인딩) |
| 양방향 바인딩 | ❌ | ❌ (value+onChange) | `v-model` | `[(ngModel)]` | `ref="data:..."` | `bind:컬럼` |
| 반복 | `forEach` + createElement | `map()` | `v-for` | `@for` | 그리드가 알아서 | 그리드가 알아서 |
| 화면 만드는 방식 | 코드 | 코드(JSX) | 코드(template) | 코드(template) | Studio 드래그 → XML | Studio 드래그 → XML(좌표) |
| 서버 통신 | fetch | axios | axios | HttpClient (서비스) | submission | transaction() |
| 비용 | 무료 | 무료 | 무료 | 무료 | 상용 | 상용 |
| 주로 쓰는 곳 | 소규모 | 스타트업·서비스 기업 | 국내 중견·SI 일부 | 대기업·금융 일부 | 금융·공공 SI | 공공·제조 SI |

## 백엔드 개발자 관점에서 보는 비유

- **바닐라** = JDBC (전부 직접)
- **React / Vue** = JPA (상태만 바꾸면 반영은 자동)
- **Angular** = Spring 그 자체 (클래스 + 어노테이션 + DI + 서비스 레이어)
- **WebSquare / Nexacro** = 그리드와 데이터셋 중심. 행 상태값(C/U/D)을 서버로 보내서 한 번에 저장하는 패턴이 핵심

## 직접 해볼 것 (선택)

- [ ] React와 Vue를 동시에 띄우고 F12 > Elements에서 목록 추가할 때 DOM이 바뀌는 걸 보기
- [ ] `npm run build` 해보고 `dist/` 폴더 열어보기 (JSX와 .vue가 평범한 JS로 바뀐 걸 확인)
- [ ] 각 예제 하단의 `[실무 메모]` 주석대로 Spring `@RestController`와 붙여보기
