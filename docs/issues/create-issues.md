# GitHub 이슈 생성 스크립트

이 스크립트는 `docs/issues/` 폴더의 모든 이슈 파일을 읽어서 GitHub CLI를 통해 이슈를 생성합니다.

## 사용법

### 전제 조건

1. GitHub CLI 설치: https://cli.github.com/
2. GitHub 인증: `gh auth login`
3. 올바른 저장소에 위치

### 모든 이슈 생성 (Windows PowerShell)

```powershell
# PowerShell 스크립트
$issuesPath = "docs\issues"
$files = Get-ChildItem -Path $issuesPath -Filter "*.md" | Where-Object { $_.Name -ne "README.md" }

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # GitHub CLI 명령어 추출
    if ($content -match '<!-- gh create issue(.*?)-->') {
        $command = $matches[1].Trim()

        Write-Host "Creating issue from: $($file.Name)" -ForegroundColor Green
        Write-Host "Command: gh issue create $command" -ForegroundColor Gray

        try {
            # 실제 이슈 생성
            Invoke-Expression "gh issue create $command"
            Write-Host "✅ Issue created successfully" -ForegroundColor Green
            Start-Sleep -Seconds 1
        }
        catch {
            Write-Host "❌ Failed to create issue: $($_.Exception.Message)" -ForegroundColor Red
        }

        Write-Host "----------------------------------------" -ForegroundColor Gray
    }
    else {
        Write-Host "⚠️  No GitHub CLI command found in: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "🎉 Issue creation process completed!" -ForegroundColor Cyan
```

### 모든 이슈 생성 (Linux/macOS)

```bash
#!/bin/bash

issues_path="docs/issues"

echo "Creating GitHub issues from markdown files..."

for file in "$issues_path"/*.md; do
    filename=$(basename "$file")

    # README.md 건너뛰기
    if [[ "$filename" == "README.md" ]]; then
        continue
    fi

    echo "Processing: $filename"

    # GitHub CLI 명령어 추출
    if grep -q "<!-- gh create issue" "$file"; then
        command=$(grep -oP '<!-- gh create issue \K.*?(?= -->)' "$file")

        echo "Creating issue with command: gh issue create $command"

        if gh issue create $command; then
            echo "✅ Issue created successfully"
        else
            echo "❌ Failed to create issue"
        fi

        echo "----------------------------------------"
        sleep 1
    else
        echo "⚠️  No GitHub CLI command found in: $filename"
    fi
done

echo "🎉 Issue creation process completed!"
```

### 개별 이슈 생성

특정 이슈만 생성하려면:

```bash
# 예시: 프로젝트 설정 이슈만 생성
gh issue create --title "프로젝트 초기 설정 및 환경 구성" --body-file "docs/issues/001-project-setup.md" --label "epic,setup,priority-high"

# 예시: 디자인 시스템 이슈만 생성
gh issue create --title "디자인 시스템 및 기본 UI 컴포넌트 구축" --body-file "docs/issues/002-design-system.md" --label "feature,ui/ux,priority-high"
```

## 이슈 라벨 사전 생성

이슈 생성 전에 필요한 라벨들을 미리 생성해주세요:

```bash
# 우선순위 라벨
gh label create "priority-high" --description "높은 우선순위" --color "d73a4a"
gh label create "priority-medium" --description "중간 우선순위" --color "fbca04"
gh label create "priority-low" --description "낮은 우선순위" --color "0052cc"

# 카테고리 라벨
gh label create "epic" --description "대형 기능 세트" --color "5319e7"
gh label create "feature" --description "새로운 기능" --color "a2eeef"
gh label create "enhancement" --description "기존 기능 개선" --color "84b6eb"
gh label create "bug" --description "버그 수정" --color "d73a4a"
gh label create "documentation" --description "문서 관련" --color "0075ca"
gh label create "testing" --description "테스트 관련" --color "d4c5f9"
gh label create "performance" --description "성능 개선" --color "e99695"
gh label create "setup" --description "프로젝트 설정" --color "c2e0c6"
gh label create "ui/ux" --description "사용자 인터페이스/경험" --color "f9d0c4"
```

## 생성될 이슈 목록

1. **프로젝트 초기 설정 및 환경 구성** (Epic, High Priority)
2. **디자인 시스템 및 기본 UI 컴포넌트 구축** (Feature, High Priority)
3. **데이터 모델 및 타입 정의** (Feature, High Priority)
4. **로컬 스토리지 및 데이터 지속성** (Feature, High Priority)
5. **주식 CRUD 기능 구현** (Feature, High Priority)
6. **포트폴리오 차트 및 시각화** (Feature, Medium Priority)
7. **라우팅 및 내비게이션 구현** (Feature, Medium Priority)
8. **테스트 시스템 구축** (Testing, Medium Priority)
9. **성능 최적화 및 번들 분석** (Performance, Low Priority)
10. **문서화 및 개발자 가이드 완성** (Documentation, Low Priority)

## 주의사항

- GitHub CLI가 올바르게 설치되고 인증되어 있는지 확인
- 저장소의 이슈 생성 권한이 있는지 확인
- 라벨이 미리 생성되어 있어야 함
- 대량 이슈 생성 시 GitHub API rate limit 주의

## 문제 해결

### 일반적인 오류

- **"gh: command not found"**: GitHub CLI 설치 필요
- **"authentication required"**: `gh auth login` 실행 필요
- **"label not found"**: 라벨을 미리 생성해야 함
- **"permission denied"**: 저장소 이슈 생성 권한 확인
