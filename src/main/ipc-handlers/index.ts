import { registerTestIpcHandlers } from './test'

/**
 * 注册所有的主进程IPC处理程序
 */
export function registerIpcHandlers(): void {

    // 注册测试IPC处理程序
    registerTestIpcHandlers()
}


