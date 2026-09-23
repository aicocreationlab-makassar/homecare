param([int]$Port = 5500)
# Static development server only. No application backend or API.
$ErrorActionPreference = 'Stop'
$siteRoot = [System.IO.Path]::GetFullPath($PSScriptRoot)
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "SA3 Home Care: http://localhost:$Port/index.html"
Write-Host 'Press Ctrl+C to stop.'
$mimeTypes = @{ '.html'='text/html; charset=utf-8'; '.js'='text/javascript; charset=utf-8'; '.css'='text/css; charset=utf-8'; '.webp'='image/webp'; '.png'='image/png'; '.svg'='image/svg+xml'; '.ttf'='font/ttf'; '.md'='text/plain; charset=utf-8' }
try {
  while ($listener.IsListening) {
    $context = $listener.GetContext()
    try {
      $urlPath = [Uri]::UnescapeDataString($context.Request.Url.AbsolutePath).TrimStart('/')
      if (!$urlPath) { $urlPath = 'index.html' }
      $targetPath = [System.IO.Path]::GetFullPath((Join-Path $siteRoot $urlPath))
      if (!$targetPath.StartsWith($siteRoot + [System.IO.Path]::DirectorySeparatorChar, [StringComparison]::OrdinalIgnoreCase) -or !(Test-Path -LiteralPath $targetPath -PathType Leaf)) {
        $context.Response.StatusCode = 404
        $bytes = [Text.Encoding]::UTF8.GetBytes('Not found')
      } else {
        $extension = [System.IO.Path]::GetExtension($targetPath)
        $context.Response.ContentType = if ($mimeTypes.ContainsKey($extension)) { $mimeTypes[$extension] } else { 'application/octet-stream' }
        $context.Response.Headers.Add('Cache-Control','no-cache')
        $bytes = [System.IO.File]::ReadAllBytes($targetPath)
      }
      $context.Response.ContentLength64 = $bytes.Length
      $context.Response.OutputStream.Write($bytes,0,$bytes.Length)
    } catch { $context.Response.StatusCode = 500 }
    finally { $context.Response.Close() }
  }
} finally { $listener.Stop(); $listener.Close() }
