// 用于控制应用程序寿命和创建本机浏览器窗口的模块
const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
  // 创建一个浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // 在app上加载 index.html
  mainWindow.loadFile("index.html");

  // 打开开发者工具
  // mainWindow.webContents.openDevTools()
}

/*
当Electron完成初始化并准备创建浏览器窗口时，
将调用他的方法。
某些API只能在此事件发生后使用。
*/
app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    // 在macOS上，当单击dock图标并且没有其他窗口打开时，通常会在应用程序中重新创建一个窗口。
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 关闭所有窗口（macOS上除外）时退出。
// 在那里，应用程序及其菜单栏通常保持活动状态，直到用户使用Cmd+Q明确退出。
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

// 在此文件中，您可以包含应用程序特定主流程代码的其余部分。
// 您也可以将它们放在单独的文件中，并在此处要求它们。
