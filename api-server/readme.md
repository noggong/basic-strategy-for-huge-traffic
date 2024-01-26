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

## case2 : 유효기간 없는 캐시 적용 후 부하테스트
```bash
artillery run ../artillery/api-test.yml -o ../artillery/no-expiry-cache/result.json
```
```bash
artillery report ../artillery/no-expiry-cache/result.json
```