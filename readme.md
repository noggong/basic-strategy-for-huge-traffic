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
artillery run ./artillery/api-test.yml -o ./artillery/results/api-test.json
```

### 부하테스트 결과 확인 (시각화)
```bash
# artillery report [결과 파일]
artillery report ./artillery/results/api-test.json
```

# 대용량 트래픽을 위한 기본 전략
## 작은 음식점을 운영하는데, 백종원형님이 방문해서 손님이 폭발적으로 늘어난다면 어떤 조치를 취할 수 있을까?
- DB 튜닝 
- 캐시
- 스케일 아웃
- 스케일 업
## 자주 사용 하는 것은 책상위에 두어라 a.k,a Cache
- 자주 요청 되는 데이터는 캐시에 저장하여 빠르게 응답
### Cache 에 넣을 데이터의 특징은?
- 휘발성
- 일정 기간 시간 동안 정적 
- 빠른 응답
- 상대적으로 작은 공간
### Cache 를 적용 할 수 있는 곳
- API 응답
- 메인페이지 데이터
- DB
- 함수
- 토큰 
- 기타 등등..
## 주문과 요리, 서빙을 분업화하고, 요청 채널을 하나로 하라. a.k.a Event Driven  
- 처리가 오래 걸리고 즉시 처리해야 하는 요청
- 상태를 전달 해야하는 경우 

## Redis
- Key-value 구조로 저장
- In-memory 데이터베이스로서 빠른 응답 속도
### 제공 자료구조
#### Strings
### 명령어
```bash
set [key] [value]
get [key]
# Multiple Strings
mset [key1] [value1] [key2] [value2]
get [key1] [key2]
```

#### List
- 선형 탐색 O(n)
```bash
# Push
- queue 처리 구현에 유리
lpush [key] [value]
rpUSH [key] [value]
# Pop
lpop [key]
rpop [key]
## Get by range
lrange [key] [start] [end]

## blocking (데이터가 없을때 존재할때까지 대기)
brpop [key] [timeout]
blpop [key] [timeout]
```
#### Set
- 유일한 값들만 있는 집합
```bash
sadd [key] [value]
sisemember [key] [value]
srem [key] [value]
smembers [key]
```
#### Hash
```bash
hset [key] [field] [value]
hget [key] [field]
hmset [key] [field1] [value1] [field2] [value2]
hmget [key] [field1] [field2]
hgetall [key]
```
#### Sorted Set
- 스코어를 가지는 Set 자료구조
- 아이템들의 랭킹을 가지는데 사용
- 스코어는 Double type -> 정수값을 사용할 수 없음
- skiplist 자료구조
```bash
## 랭킹값 추가
zadd [key] [score] [value]
## 오름 차순 랭킹 가져오기
zrange [key] [start] [end]
## 내림 차순 랭킹 가져오기
zrevrange [key] [start] [end]
## 스코어 범위로 랭킹 가져오기
zrangebyscore [key] [min] [max]
```

>  Redis VS Memcached
> Redis 는 많은 자료구조를 제공하며, replication 을 통해 더 안정적인 서비스를 제공한다, 또한 Cluster 모드를 제공한다.
> Memcached 는 단순한 key-value store 이다. 또한, slab Allocator 를 이용해 chunk 관리를 통해 Redis 보다 더 빠른 응답속도를 제공한다. (쉬운말로 메모리 파편화관리에 유리하다.)

