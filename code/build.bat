@echo off
D:
cd "D:\Visual Studio\VC\Auxiliary\Build"
call vcvarsall.bat x64
cd ..\..\..\..
cd CODE\code
cl -FC -Zi win32_handmade.cpp user32.lib gdi32.lib
echo "AIE"
cmd /k