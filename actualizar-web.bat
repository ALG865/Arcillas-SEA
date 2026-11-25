@echo off
chcp 65001 >nul
title Actualizar la web de la SEA
cd /d "%~dp0"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
echo.
echo  Actualizando noticias, publicaciones de los socios y citas.
echo  Hace falta conexion a Internet. Puede tardar entre 5 y 15 minutos.
echo.

set "PY="
py -3 --version >nul 2>nul && set "PY=py -3"
if not defined PY python --version >nul 2>nul && set "PY=python"
if not defined PY goto sinpython

%PY% tools\actualizar.py
echo.
pause
exit /b

:sinpython
echo  No se ha encontrado Python en este ordenador.
echo.
echo  Instalalo una sola vez (es gratuito):
echo   1. Se abrira la pagina de descarga de python.org.
echo   2. Descarga e instala Python 3.
echo   3. En la primera pantalla del instalador marca
echo      "Add python.exe to PATH" y pulsa "Install Now".
echo   4. Vuelve a hacer doble clic en este fichero.
echo.
start "" https://www.python.org/downloads/windows/
pause
