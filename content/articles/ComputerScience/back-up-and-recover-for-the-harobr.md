---
title: 'Harbor 백업 및 복원 작업'
description: ''
date: '2024-10-04'
banner:
  src: ''
  alt: ''
  caption: ''
categories: 
  - 'Computer Science'
keywords: 
  - 'Harbor'
  - 'back up'
  - 'recover'
---

## Overview

- 회사에서 운영하는 배포 파이프 라인이 있었지만, 
접근할 수 있는 권한이 많지 않고, 회사에서 사용하는 구성을 개인적으로 학습하고자 동일하게 구성해둔 파이프 라인이 있는데 그곳을 다른 환경으로 이사 시키기 위해 작성해보았다.
- 설치도 간단했지만, 백업도 간단하다

## 절차

harbor 서비스 종류 → 백업 → 새로운 서버에 harbor 설치 → 새로운 harbor 서비스 종료 → 백업한 자료로 /data 디렉토리 덮어쓰기

## 백업

- 참고할 디렉토리 위치 및 설정파일
    - 데이터 관련 디렉토리: /data
    - 환경설정 관련 디렉토리: /opt/harbor 또는 /usr/local/harbor
        - harbor.yml
            - hostname
            - http.port
            - harbor_admin_password: Harbor12345
            - database.password: root123
            - data_volume: /data
            - upload_purging.enabled: true
            - upload_purging.age: 168h
            - upload_purging.interval: 24h
            - cache.enabled: false   #이건 서버성능에 따라

## 정상확인

### 서비스 확인

`docker compose watch`
 

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4af44c55-bb9f-4a14-af4e-55648b227811/81786e00-d54c-4fbf-b29c-f347f93b8bad/image.png)

### DB 연결 확인

- 속성정보
    - Database: registry
    - User: postgres
    - Password: harbor.yml 참조
- 설계를 살짝 추측 해볼 수 있는 구성이다

![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/4af44c55-bb9f-4a14-af4e-55648b227811/23e59fdb-f9f6-4467-9e2c-bd2513c8070e/image.png)

## 회고

- 검색한 결과나 chatGPT도 크게 다르지 않았어서 어렵지 않았다.
- 설치할 때는 관심이 안 갔지만, 관리하려고 보니 DB구성을 보게 되고 설정과 구성을 보아 설계를 가늠할 수 있어서 또 다른 재미도 있었다.