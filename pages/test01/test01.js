// pages/test/test01.js
Page({
  redirectToIndex: function(){
    wx.redirectTo({
      url: '/pages/index/index',
    })
  }
  /**
   * 页面的初始数据
   */
  ,data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 选择图片
  // 选择图片
  pictureProcessing: function(){
  // 选择图片
wx.chooseImage({
  count: 1,
  sizeType: ['original', 'compressed'],
  sourceType: ['album', 'camera'],
  success: function (res) {
    // 判断是否选择了文件
    if (res.tempFiles && res.tempFiles.length > 0) {
      // 获取图片本地路径
      var imagePath = res.tempFilePaths[0];
      // 创建一个离屏 canvas
      var offscreenCanvas = wx.createCanvasContext('myCanvas');
      // 获取图片信息
      wx.getImageInfo({
        src: imagePath,
        success: function (imageInfo) {
          // 将选择的图片绘制到离屏 canvas 上
          offscreenCanvas.drawImage(imageInfo.path, 0, 0, offscreenCanvas.width, offscreenCanvas.height);
          // 对图片进行处理，比如添加滤镜
          offscreenCanvas.filter = 'grayscale(100%)';
          // 将处理后的图片绘制到屏幕上
          offscreenCanvas.draw(false, function() {
            // 生成处理后的图片，并将其展示在小程序上
            wx.canvasToTempFilePath({
              x: 0,
              y: 0,
              width: offscreenCanvas.width,
              height: offscreenCanvas.height,
              canvasId: 'myCanvas',
              success: function(res) {
                wx.previewImage({
                  urls: [res.tempFilePath]
                });
              }
            });
          });
        },
        fail: function (res) {
          console.log(res);
        }
      });
    } else {
      // 用户取消了选择文件的操作，不进行任何处理
      console.log('用户取消了选择文件的操作');
    }
  },
  fail: function (res) {
    console.log(res);
  }
})
  }
})