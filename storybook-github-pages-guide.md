# Storybook을 GitHub Pages로 온라인 배포하기 📚✨

> 💡 **사전 요구사항**: Storybook과 GitHub 저장소가 이미 설정되어 있어야 합니다.
> 참고: [Storybook 설정 가이드](https://uxdbea.notion.site/Storybook-8a97980ea3d54c5297aa45d6e3332fed)

---

## 📋 **목차**

1. [개요](#개요)
2. [사전 준비사항](#사전-준비사항)
3. [배포 방법](#배포-방법)
4. [자동화 설정](#자동화-설정)
5. [문제 해결](#문제-해결)
6. [추가 팁](#추가-팁)

---

## 🎯 **개요**

이 가이드는 로컬에서 개발한 Storybook을 GitHub Pages를 통해 온라인으로 배포하여, 팀원들과 쉽게 공유하고 확인할 수 있도록 하는 방법을 설명합니다.

### **완료 후 얻는 것들:**
- 🌐 온라인에서 접근 가능한 Storybook URL
- 🔄 자동 배포 시스템
- 👥 팀원들과의 쉬운 공유
- 📱 모바일에서도 확인 가능

---

## ✅ **사전 준비사항**

### 1. **필수 확인 사항**
- [ ] Storybook 프로젝트가 로컬에서 정상 동작
- [ ] GitHub 저장소에 프로젝트가 업로드됨
- [ ] Node.js와 npm이 설치됨
- [ ] Git이 설정되어 있고 GitHub와 연동됨

### 2. **프로젝트 구조 확인**
```
your-project/
├── storybook/
│   ├── .storybook/
│   ├── stories/
│   ├── package.json
│   └── ...
└── README.md
```

---

## 🚀 **배포 방법**

### **Step 1: 터미널에서 Storybook 디렉토리로 이동**

```bash
cd your-project/storybook
```

### **Step 2: gh-pages 패키지 설치**

```bash
npm install --save-dev gh-pages
```

> 💡 **gh-pages란?** GitHub Pages에 정적 파일을 쉽게 배포할 수 있게 해주는 도구입니다.

### **Step 3: package.json에 배포 스크립트 추가**

`package.json` 파일을 열고 `scripts` 섹션에 다음 라인을 추가:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "deploy-storybook": "gh-pages -d storybook-static"
  }
}
```

### **Step 4: Storybook 빌드**

```bash
npm run build-storybook
```

### **Step 5: GitHub Pages에 배포**

```bash
npm run deploy-storybook
```

> ⏳ 배포가 완료되면 "Published" 메시지가 나타납니다.

### **Step 6: GitHub 저장소에 변경사항 커밋**

```bash
# 프로젝트 루트로 이동
cd ..

# 변경사항 스테이징
git add .

# 커밋
git commit -m "feat: GitHub Pages 배포 설정 추가"

# 푸시
git push origin main
```

---

## 🔗 **배포된 Storybook 확인**

### **URL 패턴:**
```
https://[your-github-username].github.io/[repository-name]/
```

### **예시:**
- GitHub 사용자명: `johndoe`
- 저장소명: `my-storybook-project`
- 배포 URL: `https://johndoe.github.io/my-storybook-project/`

---

## ⚙️ **자동화 설정 (선택사항)**

### **GitHub Actions를 사용한 자동 배포**

프로젝트 루트에 `.github/workflows/deploy-storybook.yml` 파일 생성:

```yaml
name: Deploy Storybook to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'
          cache-dependency-path: storybook/package-lock.json

      - name: Install dependencies
        run: |
          cd storybook
          npm ci

      - name: Build Storybook
        run: |
          cd storybook
          npm run build-storybook

      - name: Deploy to GitHub Pages
        run: |
          cd storybook
          npm run deploy-storybook
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

---

## 📱 **GitHub Pages 설정 확인**

### **1. GitHub 저장소 설정**
1. GitHub 저장소로 이동
2. **Settings** 탭 클릭
3. 좌측 메뉴에서 **Pages** 선택

### **2. Pages 설정 확인**
- **Source**: "Deploy from a branch" 선택
- **Branch**: "gh-pages" 선택
- **Folder**: "/ (root)" 선택
- **Save** 버튼 클릭

### **3. 배포 상태 확인**
- Actions 탭에서 배포 진행 상황 확인 가능
- 녹색 체크마크가 뜨면 배포 완료

---

## 🔄 **업데이트 프로세스**

### **로컬 변경 후 재배포 절차:**

```bash
# 1. Storybook 디렉토리로 이동
cd storybook

# 2. 새로운 빌드 생성
npm run build-storybook

# 3. GitHub Pages에 배포
npm run deploy-storybook

# 4. 변경사항 커밋 (선택사항)
cd ..
git add .
git commit -m "update: Storybook 컴포넌트 업데이트"
git push origin main
```

---

## 🛠️ **문제 해결**

### **Q1: 배포 후 404 에러가 발생해요**
**A1:** 
- GitHub Pages 설정에서 소스 브랜치가 `gh-pages`로 설정되었는지 확인
- 배포 후 5-10분 정도 대기 (전파 시간 필요)

### **Q2: CSS나 이미지가 로드되지 않아요**
**A2:**
- `.storybook/main.js`에서 `base` 경로 설정:
```javascript
module.exports = {
  // ... 다른 설정들
  managerWebpack: (config) => {
    config.output.publicPath = '/repository-name/';
    return config;
  },
};
```

### **Q3: 빌드가 실패해요**
**A3:**
- `node_modules` 삭제 후 재설치: `rm -rf node_modules && npm install`
- Node.js 버전 확인 (LTS 버전 권장)

### **Q4: GitHub Pages URL이 작동하지 않아요**
**A4:**
- 저장소가 Public으로 설정되어 있는지 확인
- GitHub Actions에 적절한 권한이 있는지 확인

---

## 💡 **추가 팁**

### **1. 커스텀 도메인 설정**
GitHub Pages 설정에서 커스텀 도메인을 연결할 수 있습니다.

### **2. 브랜치 전략**
- `main`: 개발 브랜치
- `gh-pages`: 배포 전용 브랜치 (자동 생성)

### **3. 성능 최적화**
```bash
# 빌드 최적화를 위한 환경 변수 설정
NODE_ENV=production npm run build-storybook
```

### **4. 팀 협업 시 권장사항**
- 배포 권한을 특정 팀원에게만 부여
- PR 승인 후에만 배포하는 워크플로우 구축
- 배포 시 버전 태그 추가

---

## 📚 **관련 리소스**

### **공식 문서**
- [Storybook 공식 문서](https://storybook.js.org/docs)
- [GitHub Pages 공식 가이드](https://pages.github.com/)
- [gh-pages 패키지 문서](https://www.npmjs.com/package/gh-pages)

### **추가 참고자료**
- [Storybook 배포 가이드](https://storybook.js.org/docs/react/sharing/publish-storybook)
- [GitHub Actions 워크플로우](https://docs.github.com/en/actions/using-workflows)

---

## ✅ **체크리스트**

배포 완료 후 다음 항목들을 확인해보세요:

- [ ] 온라인 URL에서 Storybook이 정상 로드됨
- [ ] 모든 컴포넌트가 올바르게 표시됨
- [ ] 인터랙션(클릭, 호버 등)이 정상 동작함
- [ ] 모바일에서도 접근 가능함
- [ ] 팀원들과 URL 공유 완료

---

## 🎉 **축하합니다!**

이제 여러분의 Storybook이 온라인에 배포되었습니다. 
팀원들과 디자인 시스템을 쉽게 공유하고, 언제 어디서나 컴포넌트를 확인할 수 있게 되었습니다!

> 💬 **질문이 있으시면** 언제든지 문의해주세요. 함께 더 나은 개발 환경을 만들어가요! 🚀