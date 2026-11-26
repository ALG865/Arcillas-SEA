@echo off
chcp 65001 >nul
title Instalar el actualizador de la web de la SEA
cd /d "%~dp0"
echo.
echo  INSTALAR EL ACTUALIZADOR (solo la primera vez en cada ordenador)
echo  ----------------------------------------------------------------
echo.
set "PY="
py -3 --version >nul 2>nul && set "PY=py -3"
if not defined PY python --version >nul 2>nul && set "PY=python"
if defined PY goto conpython

echo  1. Falta Python. Se va a abrir la pagina de descarga de python.org.
echo     - Descarga e instala Python 3 (boton amarillo "Download Python").
echo     - MUY IMPORTANTE: en la primera pantalla del instalador marca
echo       la casilla "Add python.exe to PATH" y pulsa "Install Now".
echo     - Cuando termine, vuelve a hacer doble clic en este archivo.
echo.
start "" https://www.python.org/downloads/windows/
pause
exit /b

:conpython
echo  1. Python encontrado.
echo.
echo  2. Instalando los componentes (Excel, fotos, traductor)...
%PY% -m pip install --upgrade --quiet openpyxl pillow pillow-heif ctranslate2 sentencepiece
if errorlevel 1 goto error
echo     Hecho.
echo.
echo  3. Descargando el traductor espanol-ingles (unos 100 MB, solo esta vez)...
%PY% programa\instalar_traductor.py
if errorlevel 1 goto error
echo.
echo  TODO LISTO. Ya puedes usar "ACTUALIZAR-WEB.bat".
echo.
pause
exit /b

:error
echo.
echo  Algo ha fallado. Comprueba la conexion a Internet y vuelve a intentarlo.
echo  Si sigue fallando, envia una captura de esta ventana a quien mantiene la web.
pause
