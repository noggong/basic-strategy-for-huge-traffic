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