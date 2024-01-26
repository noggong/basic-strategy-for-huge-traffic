## 시작하기 전에
### 부하테스트 도구 artillery 설치
```bash
npm install -g artillery
```

### 부하테스트 atillery 시나리오 작성
```text
./atillery/api-test.yml
```

### 부하테스트 실행

```bash
# artillery run [시나리오 파일] -o [결과 파일]
artillery run ./artillery/api-test.yml -o ./artillery/no-cache/result.json
```

### 부하테스트 결과 확인 (시각화)
```bash
# artillery report [결과 파일]
artillery report ./artillery/no-cache/result.json
```
