# Redis 설치 feat. docker
## docker 설치
- windows : https://docs.docker.com/docker-for-windows/install/
- mac : https://docs.docker.com/docker-for-mac/install/

## docker 를 통한 redis 설치
참고 링크 : https://hub.docker.com/_/redis
```bash
docker run --name=redis-devel --publish=6379:6379 --hostname=redis --restart=on-failure --detach redis:latest
```

## npm redis 설치
```bash
npm install redis
```

## Case1: 캐시 없이 실행

```bash
artillery run ../artillery/api-test.yml -o ../artillery/no-cache/result.json
```
```bash
artillery report ../artillery/no-cache/result.json
```

## case2 : TTL 없는 캐시 적용 후 부하테스트
```bash
artillery run ../artillery/api-test.yml -o ../artillery/no-expiry-cache/result.json
```
```bash
artillery report ../artillery/no-expiry-cache/result.json
```

## case3 : TTL 없는 캐시 적용 후 캐시 갱신되어야 하는 값 테스트
```bash
artillery run ../artillery/api-test.yml -o ../artillery/no-expiry-error-cache/result.json
```
```bash
artillery report ../artillery/no-expiry-error-cache/result.json
```

## case4 : TTL 설정 캐시 적용 후 캐시 갱신되어야 하는 값 테스트
```bash
artillery run ../artillery/api-test.yml -o ../artillery/expiry-cache/result.json
```
```bash
artillery report ../artillery/expiry-cache/result.json
```

## case5 : 외부에서 캐시 갱신
```bash
artillery run ../artillery/api-test.yml -o ../artillery/external-refresh-cache/result.json
```
```bash
artillery report ../artillery/external-refresh-cache/result.json
```