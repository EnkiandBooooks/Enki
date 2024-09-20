param (
    [switch]$b,   # Opción para backend
    [switch]$f    # Opción para frontend
)

# Cambia al directorio del script
Set-Location (Split-Path $MyInvocation.MyCommand.Path)

# Variables para las rutas
$frontPath = "./front"
$backPath = "./back/js"
$frontCommand = "ng serve -o"
$backCommand = "npm run dev"
$frontendUrl = "http://localhost:4200"
# Función para iniciar el frontend
function Start-Frontend {
    try {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location $frontPath; $frontCommand"
        Write-Host "Servidor frontend iniciado en nueva ventana."
    } catch {
        Write-Host "Error al iniciar el servidor frontend en una nueva ventana." -ForegroundColor Red
    }
}

# Función para iniciar el backend
function Start-Backend {
    try {
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location $backPath; $backCommand"
        Write-Host "Servidor backend iniciado en nueva ventana."
    } catch {
        Write-Host "Error al iniciar el servidor backend en una nueva ventana." -ForegroundColor Red
    }
}

# Verificación del argumento recibido
if ($b) {
    Write-Host "Modo backend seleccionado (-b)"
    Start-Frontend
    # Ejecutar backend en la ventana actual y frontend en una nueva ventana
    try {
        Set-Location $backPath
        & npm run dev
        Write-Host "Servidor backend iniciado en la ventana actual."
    } catch {
        Write-Host "Error al iniciar el servidor backend en la ventana actual." -ForegroundColor Red
    }
} elseif ($f) {
    Write-Host "Modo frontend seleccionado (-f)"
    Start-Backend
    # Ejecutar frontend en la ventana actual y backend en una nueva ventana
    try {
        Set-Location $frontPath
        & ng serve -o
        Write-Host "Servidor frontend iniciado en la ventana actual."
    } catch {
        Write-Host "Error al iniciar el servidor frontend en la ventana actual." -ForegroundColor Red
    }
} else {
    Write-Host "Argumento no válido. Usa '-b' para backend o '-f' para frontend." -ForegroundColor Yellow
    exit
}
