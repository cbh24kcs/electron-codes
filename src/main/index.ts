import { app, BrowserWindow, ipcMain } from 'electron'
import { electronApp, optimizer} from '@electron-toolkit/utils'
import {createMainWindow} from './main-window'
import { registerIpcHandlers } from './ipc-handlers'

// 当Electron完成初始化并准备创建浏览器窗口时调用此方法
// 某些API只能在此事件发生后使用
app.whenReady().then(() => {
  // 设置Windows的应用程序用户模型ID
  electronApp.setAppUserModelId('com.electron')

  // 在开发环境中默认使用F12打开或关闭开发者工具
  // 在生产环境中忽略 CommandOrControl + R
  // 参见 https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC测试
  ipcMain.on('ping', () => console.log('pong'))

  // 注册所有主进程IPC处理程序
  registerIpcHandlers()

  // 创建浏览器窗口
  createMainWindow()


  app.on('activate', function () {
    // 在macOS上，当点击dock图标且没有其他窗口打开时，
    // 通常会在应用程序中重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow()
  })
})

// 当所有窗口都被关闭时退出应用，但在macOS上除外
// 在macOS上，应用程序及其菜单栏通常会保持活动状态，
// 直到用户使用Cmd + Q显式退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，你可以包含应用程序主进程的其余特定代码
// 你也可以将它们放在单独的文件中，并在此处引入
