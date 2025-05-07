import { shell, BrowserWindow} from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

export function createMainWindow(): void {
    // 创建浏览器窗口
    const mainWindow = new BrowserWindow({
      width: 900,
      height: 670,
      show: false,
      autoHideMenuBar: true,
      ...(process.platform === 'linux' ? { icon } : {}),
      webPreferences: {
        // 预加载脚本
        preload: join(__dirname, '../preload/index.js'),
        sandbox: false,
        // remote 模块
        
        // nodeIntegration: true, // 允许在渲染进程中使用Node.js
      }
    })
  
    mainWindow.on('ready-to-show', () => {
      mainWindow.show()
    })
  
    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  
    // 基于 electron-vite cli 的渲染器热重载
    // 开发环境加载远程URL，生产环境加载本地HTML文件
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }
  }
