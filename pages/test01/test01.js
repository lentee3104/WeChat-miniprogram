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
  chooseImage: function(){
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res){
        //判断用户是否选择了文件
        if(res.tempFiles && res.tempFiles.length > 0){
          // 选择成功后，获取图片本地路径
          var imagePath = res.tempFiles[0].tempFilePath;
          // 根据图片路径创建一个canvas对象
          //画布大小初始化
          wx.createSelectorQuery()
            .select('myCanvas') // 在 WXML 中填入的 id
            .fields({ node: true, size: true })
            .exec((res) => {
              // Canvas 对象
              var canvas = res[0].node
              // Canvas 画布的实际绘制宽高
              var renderWidth = res[0].width
              var renderHeight = res[0].height
              // Canvas 绘制上下文
              var ctx = canvas.getContext('2d')

              // 初始化画布大小
              var dpr = wx.getWindowInfo().pixelRatio
              canvas.width = renderWidth * dpr
              canvas.height = renderHeight * dpr
              ctx.scale(dpr, dpr)
            })
          // 绘制上传的图片到canvas中
          var ctx = canvas.createImage()
          ctx.onload = () => {
            context.drawImage(ctx,0,0,150,100,)
          }
          ctx.src = '/pages/test01/tempFile/test01.jpg'
          // 对图片进行处理，比如添加滤镜
          ctx.filter = 'grayscale(100%)';
          // 将处理后的图片导出为本地临时文件
          ctx.draw(false, function() {
            wx.canvasToTempFilePath({
              canvasId: 'myCanvas',
              success: function (res) {
                // 导出成功后，展示处理后的图片
                wx.saveImageToPhotosAlbum({
                  filePath: res.tempFilePath,
                  success: function() {
                    wx.showToast({
                      title: '保存成功',
                      icon: 'success'
                    })
                  },
                  fail: function() {
                    wx.showToast({
                      title: '保存失败',
                      icon: 'none'
                    })
                  }
                })
              }
            });
          });
        }else{
          // 用户取消了选择文件的操作，不进行任何处理
          console.log('用户取消了选择文件的操作');
        }
      },
      fail: function(res) {
        console.log(res);
      }
    })
  }

})