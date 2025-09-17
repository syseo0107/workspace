# 📚 Storybook을 GitHub Pages로 온라인 배포하기

> 💡 **사전 요구사항**: Storybook과 GitHub 저장소가 이미 설정되어 있어야 합니다.  
> 🔗 **연관 문서**: [Storybook & GitHub 초기 설정](https://uxdbea.notion.site/Storybook-8a97980ea3d54c5297aa45d6e3332fed)

---

## 🎯 **이 가이드로 달성할 수 있는 것**

✅ **온라인 Storybook URL 획득**  
✅ **팀원들과의 쉬운 공유**  
✅ **자동 배포 시스템 구축**  
✅ **모바일에서도 확인 가능**  

---

## 📋 **Table of Contents**

1. [사전 준비사항 체크](#사전-준비사항-체크)
2. [GitHub Pages 배포하기](#github-pages-배포하기)
3. [배포 URL 확인하기](#배포-url-확인하기)  
4. [자동화 설정 (고급)](#자동화-설정-고급)
5. [업데이트 및 재배포](#업데이트-및-재배포)
6. [문제해결 가이드](#문제해결-가이드)

---

## ✅ **사전 준비사항 체크**

### **필수 확인 항목**

- [ ] 로컬에서 `npm run storybook`이 정상 작동
- [ ] GitHub 저장소에 프로젝트가 푸시되어 있음
- [ ] 터미널에서 프로젝트 접근 가능

### **프로젝트 구조**

```
📁 your-project/
├── 📁 storybook/
│   ├── 📁 .storybook/
│   ├── 📁 stories/
│   ├── 📄 package.json
│   └── ...
└── 📄 README.md
```

> ⚠️ **중요**: Storybook이 별도 폴더에 있는지 확인하세요!

---

## 🚀 **GitHub Pages 배포하기**

### **Step 1: 터미널 준비**

```bash
# Storybook 디렉토리로 이동
cd your-project/storybook
```

### **Step 2: 배포 도구 설치**

```bash
npm install --save-dev gh-pages
```

> 💡 **gh-pages**: GitHub Pages에 쉽게 배포할 수 있게 해주는 마법의 도구!

### **Step 3: 배포 스크립트 추가**

`📄 package.json` 파일의 `scripts` 부분에 추가:

```json
{
  "scripts": {
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build",
    "deploy-storybook": "gh-pages -d storybook-static"  // ← 이 줄 추가!
  }
}
```

### **Step 4: 빌드 & 배포 실행**

```bash
# 1. Storybook 빌드
npm run build-storybook

# 2. GitHub Pages에 배포  
npm run deploy-storybook
```

> ⏳ **기다려주세요!** "Published" 메시지가 나오면 성공! 🎉

### **Step 5: 변경사항 저장**

```bash
# 프로젝트 루트로 이동
cd ..

# Git에 변경사항 저장
git add .
git commit -m "feat: GitHub Pages 배포 설정 추가 🚀"
git push origin main
```

---

## 🔗 **배포 URL 확인하기**

### **URL 공식**

```
https://[GitHub사용자명].github.io/[저장소명]/
```

### **예시**

| GitHub 정보 | URL |
|------------|-----|
| 사용자명: `johndoe` | `https://johndoe.github.io/` |
| 저장소명: `storybook-project` | `my-storybook-project/` |
| **완성 URL** | **`https://johndoe.github.io/storybook-project/`** |

### **GitHub에서 URL 확인하는 방법**

1. 🔗 **GitHub 저장소** → **Settings**
2. 📄 **Pages** 메뉴 클릭  
3. 🌐 **Your site is published at: [URL]** 확인

> 🕒 **배포 완료까지 5-10분** 정도 걸릴 수 있어요!

---

## ⚙️ **자동화 설정 (고급)**

### **GitHub Actions로 자동 배포하기**

매번 수동으로 배포하기 번거로우시다면, 코드 푸시할 때마다 자동 배포되도록 설정해보세요!

**📁 `.github/workflows/deploy-storybook.yml` 파일 생성:**

```yaml
name: 🚀 Storybook 자동 배포

on:
  push:
    branches: [ main ]  # main 브랜치에 푸시할 때 실행

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: 📥 코드 가져오기
        uses: actions/checkout@v4

      - name: 🔧 Node.js 설정
        uses: actions/setup-node@v4
        with:
          node-version: 'lts/*'
          cache: 'npm'
          cache-dependency-path: storybook/package-lock.json

      - name: 📦 의존성 설치
        run: |
          cd storybook
          npm ci

      - name: 🔨 Storybook 빌드
        run: |
          cd storybook  
          npm run build-storybook

      - name: 🚀 GitHub Pages 배포
        run: |
          cd storybook
          npm run deploy-storybook
```

---

## 🔄 **업데이트 및 재배포**

### **컴포넌트 수정 후 재배포 과정**

```bash
# 1. Storybook 폴더로 이동
cd storybook

# 2. 새로 빌드
npm run build-storybook  

# 3. 다시 배포
npm run deploy-storybook

# 4. 코드 저장 (선택사항)
cd ..
git add .
git commit -m "update: 새로운 컴포넌트 추가 ✨"  
git push origin main
```

> 💡 **팁**: 자동화를 설정했다면 4번만 하면 자동으로 배포돼요!

---

## 🛠️ **문제해결 가이드**

### **🚨 자주 발생하는 문제들**

| 문제 | 해결방법 |
|------|---------|
| **404 에러 발생** | GitHub Pages 설정에서 `gh-pages` 브랜치 선택 확인 |
| **CSS가 안 보여요** | 5-10분 기다려보기 (전파 시간) |  
| **빌드 실패** | `rm -rf node_modules && npm install` 후 재시도 |
| **URL이 안 열려요** | 저장소가 Public인지 확인 |

### **🔧 고급 문제 해결**

**CSS/이미지 경로 문제:**
```javascript
// .storybook/main.js
module.exports = {
  // 다른 설정들...
  managerWebpack: (config) => {
    config.output.publicPath = '/your-repository-name/';
    return config;
  },
};
```

---

## 💡 **유용한 팁들**

### **🎨 더 나은 사용자 경험을 위해**

- 📱 **모바일 테스트**: 스마트폰에서도 URL 확인해보기
- 🔖 **북마크 추가**: 자주 사용하는 URL을 북마크에 저장  
- 👥 **팀 공유**: Slack이나 Teams에 URL 공유하기
- 📊 **사용량 추적**: GitHub Insights에서 방문자 확인 가능

### **🚀 성능 최적화**

```bash
# 프로덕션 모드로 빌드 (더 빠름!)
NODE_ENV=production npm run build-storybook
```

---

## ✅ **완료 체크리스트**

배포 후 다음 항목들을 확인해보세요:

- [ ] 📍 온라인 URL에서 Storybook 정상 로드
- [ ] 🎨 모든 컴포넌트가 올바르게 표시됨  
- [ ] 🖱️ 클릭/호버 인터랙션 정상 동작
- [ ] 📱 모바일에서도 접근 가능
- [ ] 👥 팀원들에게 URL 공유 완료
- [ ] 🔗 북마크 추가 완료

---

## 🎉 **축하합니다!**

🎊 **성공적으로 Storybook을 온라인에 배포했습니다!**

이제 다음과 같은 것들이 가능해졌어요:

✨ **언제 어디서나** 브라우저로 컴포넌트 확인  
✨ **팀원들과 쉽게** 디자인 시스템 공유  
✨ **클라이언트에게** 실시간으로 진행상황 보여주기  
✨ **포트폴리오로** 활용 가능  

---

## 📞 **지원 및 피드백**

💬 **질문이 있으시면** 언제든지 문의해주세요!  
🐛 **문제가 발생하면** 스크린샷과 함께 알려주세요!  
💡 **개선 아이디어가 있으면** 공유해주세요!

> 🚀 **함께 더 나은 개발 환경을 만들어가요!**

---

## 🔗 **관련 링크**

- 📖 [Storybook 공식 문서](https://storybook.js.org/docs)
- 🔧 [GitHub Pages 가이드](https://pages.github.com/)  
- 📦 [gh-pages 패키지](https://www.npmjs.com/package/gh-pages)
- 🎨 [Storybook 예시 사이트들](https://storybook.js.org/showcase)