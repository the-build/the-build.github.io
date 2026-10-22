---
title: 'Prometheus rate() vs increase()'
description: ''
date: '2026-10-18'
banner:
  src: ''
  alt: ''
  caption: ''
categories: 
  - 'Computer Science'
keywords: 
  - 'Thanos'
  - 'Prometheus'
  - 'PromQL'
  - 'TimeSeries'
---

# Prometheus `rate()` 함수 완벽 가이드: 실전 활용과 `increase()` 비교

Prometheus에서 메트릭을 분석할 때 `rate()`와 `increase()`는 가장 많이 사용하는 함수 중 하나입니다. 하지만 이 둘을 혼동하거나 잘못 사용하면 원하는 결과를 얻지 못할 수 있습니다. 이번 글에서는 `rate()`의 개념과 활용법, 그리고 `increase()`와의 차이점을 정리하고 실전에서 자주 사용하는 패턴을 추천해보겠습니다.

---

## 1. `rate()` 함수란?

### 개념

- `rate()`는 **Counter 타입**의 메트릭이 일정한 시간 동안 얼마나 증가했는지를 초당 비율(rate)로 변환하는 함수입니다.
- 주로 **CPU 사용량, 네트워크 트래픽, 요청 수 등의 변화율을 분석**할 때 사용됩니다.
- **변화율 기반의 그래프를 그릴 때** 유용합니다.

### 기본 사용법

```
rate(http_requests_total[5m])
```

- `http_requests_total`은 증가만 하는 Counter 타입 메트릭입니다.
- `[5m]`는 5분 동안의 데이터를 기반으로 변화율을 계산하겠다는 의미입니다.

---

## 2. `increase()` 함수와의 차이점

### 개념

- `increase()`는 특정 시간 동안 Counter가 증가한 총량을 반환하는 함수입니다.
- **누적 증가량을 알고 싶을 때 유용**합니다.

### 기본 사용법

```
increase(http_requests_total[5m])
```

- 지난 5분 동안 요청이 몇 번 발생했는지 총합을 반환합니다.
- `rate()`와 달리 **절대적인 증가량**을 보여줍니다.

### `rate()` vs `increase()` 비교

| 함수 | 반환 값 | 주요 사용 사례 |
|---|---|---|
| `rate()` | 초당 증가율 | 변화율을 모니터링할 때 (예: CPU 사용량, 네트워크 트래픽) |
| `increase()` | 누적 증가량 | 일정 기간 동안 총 증가량이 필요할 때 (예: 총 요청 수, 총 데이터 처리량) |

---

## 3. `avg_over_time()`과 함께 사용하기

### 문제 상황

`rate()`를 사용할 때 `avg_over_time()`과 함께 쓰면 벡터 타입이 맞지 않아 오류가 발생할 수 있습니다.

### 해결 방법

정확한 벡터 타입을 맞추기 위해서는 `rate()`를 직접 `sum()`이나 `avg()`와 결합하는 것이 좋습니다.

```
avg(rate(cpu_usage_seconds_total[5m]))
```

- 여러 개의 `cpu_usage_seconds_total`을 평균 내어 CPU 사용률을 계산합니다.

```
sum(rate(http_requests_total[1m])) by (job)
```

- `job`별로 요청 수 증가율을 합산하여 모니터링할 수 있습니다.

---

## 4. 실전에서 자주 사용하는 패턴 추천

### (1) CPU 사용률 모니터링

```
sum(rate(node_cpu_seconds_total{mode!="idle"}[5m])) by (instance)
```

- `mode!="idle"`을 제외하여 실제 사용된 CPU 시간을 계산합니다.

### (2) 네트워크 트래픽 분석

```
sum(rate(node_network_receive_bytes_total[5m])) by (instance)
```

- 초당 네트워크 수신량을 모니터링하는 쿼리입니다.

### (3) 애플리케이션 요청 수 분석

```
sum(increase(http_requests_total[10m])) by (job)
```

- 지난 10분 동안 각 `job`에서 처리한 HTTP 요청 수를 계산합니다.

---

## 5. 정리

| 주요 개념 | 설명 |
|---|---|
| `rate()` | 초당 변화율을 계산하는 함수, 변화량을 시각화할 때 유용 |
| `increase()` | 특정 기간 동안의 총 증가량을 계산하는 함수, 총합이 필요할 때 사용 |
| `avg_over_time()` | 일정 기간 동안 평균을 계산하는 함수, 벡터 타입을 맞춰야 함 |
| `sum(rate(...))` | 여러 개의 메트릭을 합산하여 분석할 때 유용 |

`rate()`와 `increase()`를 적절히 활용하면 Prometheus에서 더욱 정확한 모니터링과 분석이 가능합니다. 위에서 소개한 패턴을 참고하여 실제 운영 환경에서도 효율적으로 사용해보세요!
