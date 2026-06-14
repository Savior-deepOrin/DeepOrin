@echo off
chcp 65001 >/dev/null
title deepOrin 卸载

echo ========================================
echo         deepOrin 卸载程序
echo ========================================
echo.
echo 此操作将删除 deepOrin 及所有用户数据：
echo   - E:\deepOrin\ 目录（程序文件）
echo   - %%APPDATA%%\deeporin\ 目录（配置与会话）
echo.

set /p CONFIRM="确认卸载？输入 Y 继续: "
if /i not "%CONFIRM%"=="Y" (
    echo 已取消。
    pause
    exit /b
)

echo.
echo 正在关闭 deepOrin 进程...
taskkill /f /im deeporin-desktop.exe >/dev/null 2>&1
taskkill /f /im deeporin.exe >/dev/null 2>&1
echo   已尝试关闭

echo.
echo 正在删除用户数据...
if exist "%APPDATA%\deeporin" (
    rmdir /s /q "%APPDATA%\deeporin" 2>/dev/null
    echo   已删除: %%APPDATA%%\deeporin
) else (
    echo   无需删除: %%APPDATA%%\deeporin (不存在)
)

echo.
echo 正在删除程序文件...
echo   请确保已关闭所有 deepOrin 窗口！
pause
cd /d E:\
rmdir /s /q "E:\deepOrin" 2>/dev/null
if exist "E:\deepOrin" (
    echo   部分文件可能被占用，请手动删除 E:\deepOrin
) else (
    echo   已删除: E:\deepOrin
)

echo.
echo ========================================
echo   deepOrin 卸载完成！
echo ========================================
pause
