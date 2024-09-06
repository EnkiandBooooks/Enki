# Cambia al directorio del script
Set-Location (Split-Path $MyInvocation.MyCommand.Path)

# Ejecutar ng serve en ./front en una nueva ventana de terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ./front; ng serve"

# Ejecutar npm run dev en ./back/js en otra nueva ventana de terminal
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ./back/js; npm run dev"

# Esperar unos segundos para asegurarse de que el servidor frontend esté activo
Start-Sleep -Seconds 5

# Abrir el navegador en localhost:4200
Start-Process "http://localhost:4200"
