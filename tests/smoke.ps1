$ErrorActionPreference = 'Stop'

$htmlPath = Join-Path $PSScriptRoot '..\index.html'
$html = Get-Content -Raw $htmlPath
$stylesPath = Join-Path $PSScriptRoot '..\styles.css'
$styles = if (Test-Path $stylesPath) { Get-Content -Raw $stylesPath } else { '' }
$failures = [System.Collections.Generic.List[string]]::new()

function Assert-Contains([string]$pattern, [string]$message) {
  if ($html -notmatch $pattern) {
    $failures.Add($message)
  }
}

function Assert-StyleContains([string]$pattern, [string]$message) {
  if ($styles -notmatch $pattern) {
    $failures.Add($message)
  }
}

Assert-Contains '<html[^>]+lang="fa"[^>]+dir="rtl"' 'The document must be Persian and right-to-left.'
Assert-Contains '<meta\s+name="description"' 'The meta description is missing.'
Assert-Contains '<a[^>]+class="[^"]*skip-link[^"]*"[^>]+href="#main-content"' 'The skip link must target the main content.'
Assert-Contains '<main[^>]+id="main-content"' 'The main content landmark must have the main-content identifier.'
Assert-Contains '<div[^>]+id="toast"[^>]+aria-live="polite"' 'The toast must announce updates politely.'
Assert-Contains '<label[^>]+for="newsletter-email"[^>]*>' 'The newsletter email input must have a matching label.'
Assert-Contains '<input[^>]+id="newsletter-email"[^>]*>' 'The newsletter email input must use the newsletter-email identifier.'
Assert-Contains '<button(?=[^>]*id="menu-toggle")(?=[^>]*type="button")[^>]*aria-expanded=' 'The mobile menu control must be a button with aria-expanded.'
Assert-Contains '<button(?=[^>]*id="theme-toggle")(?=[^>]*type="button")[^>]*aria-pressed=' 'The theme toggle must be a button with aria-pressed.'
Assert-Contains '<button(?=[^>]*id="language-toggle")(?=[^>]*type="button")[^>]*>' 'The language control must be an explicit button.'

if (-not (Test-Path $stylesPath)) {
  $failures.Add('The stylesheet is missing.')
}

foreach ($contract in @(
  @{ Pattern = ':root'; Message = 'The stylesheet must define root design tokens.' },
  @{ Pattern = '\[data-theme="dark"\]'; Message = 'The stylesheet must define dark theme tokens.' },
  @{ Pattern = '@media\s*\(max-width:\s*760px\)'; Message = 'The stylesheet must define the mobile breakpoint.' },
  @{ Pattern = 'prefers-reduced-motion'; Message = 'The stylesheet must respect reduced-motion preferences.' },
  @{ Pattern = '\.course-grid'; Message = 'The stylesheet must define the course grid.' },
  @{ Pattern = '\.course-card:focus-within'; Message = 'The stylesheet must visibly support focused course cards.' },
  @{ Pattern = '#hero-title\s*\{[^}]*font-size:\s*clamp\(1rem,\s*3vw,\s*3rem\)[^}]*max-width:\s*none[^}]*white-space:\s*nowrap'; Message = 'The hero title must be smaller and stay on one line.' },
  @{ Pattern = '\.js-ready\s+#menu-toggle\[aria-expanded="true"\]\s*\+\s*\.nav-links'; Message = 'The ready mobile menu must reveal navigation when expanded.' },
  @{ Pattern = '#toast:empty\s*\{\s*display:\s*none'; Message = 'The empty toast must be hidden until it has content.' }
)) {
  Assert-StyleContains $contract.Pattern $contract.Message
}

foreach ($id in 'courses', 'resources', 'newsletter', 'theme-toggle', 'language-toggle', 'menu-toggle', 'toast', 'newsletter-form') {
  Assert-Contains "id=`"$id`"" "The $id identifier is missing."
}

Assert-Contains '<button[^>]+id="language-toggle"[^>]*>انگلیسی</button>' 'The language control must use Persian visible copy.'

foreach ($title in 'مسیر حرفه‌ای Senior در', 'راهنمای طراحی سیستم', 'آزمون رایگان مصاحبه', 'دورهٔ ایمیلی Claude Code') {
  Assert-Contains ([regex]::Escape($title)) "The course title is missing: $title"
}

$courseCardCount = ([regex]::Matches($html, '<article[^>]+class="[^"]*course-card')).Count
if ($courseCardCount -ne 4) {
  $failures.Add("Expected 4 course cards; found $courseCardCount.")
}

$headerMatch = [regex]::Match($html, '<header\b[\s\S]*?</header>', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase)
if (-not $headerMatch.Success) {
  $failures.Add('The page header is missing.')
} elseif ($headerMatch.Value -match 'Login|ورود|ثبت‌نام') {
  $failures.Add('The header must not contain login or registration copy.')
}

if ($failures.Count) {
  $failures | ForEach-Object { Write-Error $_ }
  exit 1
}

Write-Host 'Static smoke checks passed.'
