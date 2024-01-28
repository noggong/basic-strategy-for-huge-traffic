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

## 화장실 청소는 한시간에 한번 깨끗히 한다. a.k.a 스케쥴 배치
- 음식점에 오는 손님들이 화장실을 사용할때마다 화장실 청소를 한다면??
- 주방장이 주기마다 화장실 청소를 하러 간다면??

## 가게의 규모가 커져서 프렌차이즈를 내고 재료들을 저장 하는 창고가 필요하다면? a.k.a DB
- stateful 한 데이터를 저장하는 곳
- API 서버는 stateless
- RDBMS vs NoSQL
- 데이터를 분리 저장할때는 전략이 필요하다.
  - 노드 증가, 축소에 의한 데이터 이동
  - 데이터를 찾아가는 방법..등등
- auto increment, UUID (Universally Unique Identifier), GUID (globally unique identifier)
  - 파티셔닝 - 수직, 수평 파티셔 
  - 데이터의 식별값은 유일 해야한다.
  - 데이터의 이동이 자유로워야 한다.
- 창고의 규모, 분리, 관리자 전략이 필요해! 
- 
## 면접팁
- 모든것을 사용해보고 알아야 된다는 생각은 버리자.
- 금지어 
  - "편해서요" -> "생산성이 좋다 왜?"
  - "제가 안했어요" -> "그럼 이력서에 왜 쓴겨?"
- 기술 선택 이유, 시도했고, 그 결과, 배운것, 아쉬운것. 정리
- 면접시간을 긍정적인 대화의 장으로 만들자.

## 결론
- 대용량 트래픽의 기본 전략은 "돈" 
- 하지만 돈을 "잘" 쓰는 법을 알아야 한다.