# Builds the final logo kit (brand\nexa-logo-kit) and the website icons (assets\img\brand).
# Needs Node and Microsoft Edge:  powershell -File tools\logo\render-kit.ps1
$S = $PSScriptRoot
node "$S\kit.cjs"
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }
$jobs = Get-Content "$S\html\jobs.json" -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($j in $jobs) {
  $prof = "$env:TEMP\nexa-kit-$([IO.Path]::GetFileNameWithoutExtension($j.out))"
  $url = "file:///" + $j.html.Replace([char]92, '/')
  $common = @('--headless=new','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files',"--user-data-dir=$prof",'--virtual-time-budget=8000')
  if ($j.pdf) { $a = $common + @('--no-pdf-header-footer',"--print-to-pdf=$($j.out)",$url) }
  else { $a = $common + @('--default-background-color=00000000',"--window-size=$($j.w),$($j.h)","--screenshot=$($j.out)",$url) }
  Start-Process -FilePath $edge -ArgumentList $a -Wait -WindowStyle Hidden
}
Remove-Item -Recurse -Force "$S\html"
Get-ChildItem "$S\..\..\brand\nexa-logo-kit" -Recurse -File | Select-Object @{n='File';e={$_.FullName.Substring($_.FullName.IndexOf('nexa-logo-kit'))}}, Length
