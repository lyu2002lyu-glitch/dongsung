# 매장 기록 GitHub 보관

워크플로는 `lyu2002lyu-glitch/dongsung` 저장소의 `main`에서만 실행됩니다. 공개 대시보드의 활성 매장 정보를 읽어 별도 브랜치 `store-archive-data`의 `data/store-archive/`에 JSON과 이미지 원본을 커밋합니다. 사이트에서 등록한 자료와 GitHub 사본의 동기화에는 시간이 걸릴 수 있습니다. 저장소가 공개되어 있으므로 보관한 JSON·사진·커밋 이력은 GitHub에서도 공개됩니다.

## 설치와 확인

1. `store-archive-data` 브랜치를 생성하세요. `main`에 `.github/workflows/store-archive.yml`과 `store-archive-tools/sync.py`를 함께 커밋합니다.
2. GitHub Actions를 활성화하고 해당 워크플로에서 기본 제공되는 `GITHUB_TOKEN`이 데이터 브랜치에 일반 push를 할 수 있도록 저장소 정책을 설정하세요.
3. 설치 커밋·수동 실행 외에 매시간 07, 22, 37, 52분(UTC)에 실행을 예약합니다. GitHub Actions 대기열에 따라 실제 실행 시각은 달라집니다. Actions의 ‘매장 데이터 동기화’에서 성공 여부를 확인하세요. 동일한 내용으로는 새 커밋을 만들지 않습니다.
4. 기본 원본은 `https://ddm-store-log-lyu.vercel.app`입니다. 같은 공개 API를 제공하는 새 HTTPS origin은 저장소 변수 `STORE_ARCHIVE_ORIGIN`으로 설정할 수 있습니다. 기존 보관본의 원본 주소가 다르면 자동 교체하지 않으므로 새 보관소를 초기화하거나 검토 후 원본 변경을 마이그레이션하세요.

## 보관 데이터

- `manifest.json`에 내용이 바뀐 마지막 동기화 시각, 매장·사진 수, 스냅샷 SHA-256을 기록합니다.
- `stores/<등록ID>/record.json`에 매장명, 호수, 동·층, 등록·수정 시각, 버전과 사진 파일 경로·SHA-256을 기록합니다.
- 같은 매장의 `photos/`에 사이트가 실제 제공하는 이미지 바이트를 저장합니다. 512KiB 단위 HTTP 범위를 확인하며 다운로드합니다.
- 관리자가 삭제한 매장은 다음 정상 실행 때 최신 트리에서 제거됩니다. 이전 Git 커밋에는 기록과 사진이 남습니다. 비공개 휴지통 데이터는 조회하지 않습니다.
- 공개 목록 전체를 처음과 마지막에 페이지 단위로 읽어 버전과 사진 정보를 비교합니다. 페이지 건수 불일치, 중복, 파일 손상, HTTP 오류가 있으면 실행을 실패 처리하며 기존 커밋을 유지합니다. 동시 실행을 직렬화하고 일반 push만 사용합니다.

로컬 시험은 `python3 -m unittest discover -s tests`로 실행합니다. 저장소 쓰기는 워크플로가 맡습니다. 스크립트에 개인 액세스 토큰(PAT), 관리자 키, Sites 서비스 자격 증명을 전달하지 마세요.
