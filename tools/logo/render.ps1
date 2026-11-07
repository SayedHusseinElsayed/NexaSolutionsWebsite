# Builds the logo options into brand\logo-options (SVG icons, PNG files, preview sheet index.html).
# Needs Node and Microsoft Edge:  powershell -File tools\logo\render.ps1
$S = $PSScriptRoot
node "$S\build.cjs"
$edge = "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe"
if (-not (Test-Path $edge)) { $edge = "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe" }
$jobs = Get-Content "$S\html\jobs.json" -Raw -Encoding UTF8 | ConvertFrom-Json
foreach ($j in $jobs) {
  $prof = "$env:TEMP\nexa-logo-$([IO.Path]::GetFileNameWithoutExtension($j.out))"
  $url = "file:///" + $j.html.Replace([char]92, '/')
  $a = @('--headless=new','--disable-gpu','--hide-scrollbars','--allow-file-access-from-files','--default-background-color=00000000',"--user-data-dir=$prof","--window-size=$($j.w),$($j.h)",'--virtual-time-budget=8000',"--screenshot=$($j.out)",$url)
  Start-Process -FilePath $edge -ArgumentList $a -Wait -WindowStyle Hidden
}
Remove-Item -Recurse -Force "$S\html"
Get-ChildItem "$S\..\..\brand\logo-options" -Recurse -File | Select-Object @{n='File';e={$_.FullName.Substring($_.FullName.IndexOf('logo-options'))}}, Length
