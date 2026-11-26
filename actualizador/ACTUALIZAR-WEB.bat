@echo off
chcp 65001 >nul
title Actualizar la web de la SEA
cd /d "%~dp0"
set PYTHONUTF8=1
set PYTHONIOENCODING=utf-8
echo.
echo  ACTUALIZAR LA WEB DE LA SEA
echo  ---------------------------
echo  Fotos, noticias, premios, publicaciones de los socios y trabajos destacados.
echo  Hace falta conexion a Internet. Tarda unos minutos.
echo.
set "PY="
py -3 --version >nul 2>nul && set "PY=py -3"
if not defined PY python --version >nul 2>nul && set "PY=python"
if not defined PY goto sinpython
%PY% programa\actualizar.py %*
echo.
echo  Pulsa una tecla para cerrar esta ventana.
pause >nul
exit /b

:sinpython
echo  Falta Python en este ordenador.
echo  Haz doble clic primero en "INSTALAR (una sola vez).bat".
echo.
pause
