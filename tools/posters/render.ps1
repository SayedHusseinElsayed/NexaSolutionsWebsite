# Regenerates the share posters (1080x1350) and link previews (1200x630) into assets/img/share.
# Needs Node and Microsoft Edge. Run from anywhere:  powershell -File tools\posters\render.ps1
$S = $PSScriptRoot
$site = (Resolve-Path "$S\..\..").Path
Push-Location $site; if (-not (Test-Path node_modules\qrcode)) { npm install --no-audit --no-fund | Out-Null }; Pop-Location
node "$S\make-posters.cjs"
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }
$out = "$site\assets\img\share"; New-Item -ItemType Directory -Force $out | Out-Null
foreach ($k in 'bexa','foodexa','storexa') {
  foreach ($t in @(@('poster',1080,1350), @('og',1200,630))) {
    $name = "$k-$($t[0])"; $prof = "$env:TEMP\nexa-poster-$name"
    $a = @('--headless=new','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files',"--user-data-dir=$prof","--window-size=$($t[1]),$($t[2])",'--virtual-time-budget=6000',"--screenshot=$out\$name.png","file:///$($S.Replace([char]92, '/'))/html/$name.html")
    Start-Process -FilePath $edge -ArgumentList $a -Wait -WindowStyle Hidden
  }
}
Remove-Item -Recurse -Force "$S\html"
Get-ChildItem $out | Select-Object Name, Length
