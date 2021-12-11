const fs = require("fs");
fs.writeFile(
  "./build/_redirects",
  "/socket.io/* http://192.168.1.130:3001/:splat 200!",
  () => {
      console.log('_redirects文件写入完成')
  }
);
