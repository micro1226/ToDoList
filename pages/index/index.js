//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')

Page({
  data: {
    newMsg: '',
    inputText: '',
    userInfo: {},
    allList: [],
    todoList: [],
    finishedList: []
  },
  //数据处理函数
  refresh: function () {
    this.setData({
      todoList: wx.getStorageSync('todoList'),
      finishedList: wx.getStorageSync('finishedList'),
      allList: wx.getStorageSync('allList')
    })
  },

  //事件处理函数
  cilckCircle: function (e) {
    const index = e.currentTarget.id - 1
    util.changeMemoState(index)
    this.refresh()
  },
  addNewDemo: function () {
    var message = this.data.newMsg
    if (message == '') {
      wx.showToast({
        title: '请输入新任务',
        icon: 'success',
        duration: 2000
      })
    } else {
      util.addMemo(message)
      this.refresh()
      this.setData({
        inputText: '',
        newMsg: ''
      })
    }
  },
  deleteDemo: function (e) {
    const deleteId = e.currentTarget.id - 1
    util.deleteMemo(deleteId)
    this.refresh()
    wx.showToast({
        title: '删除成功',
        icon: 'success',
        duration: 2000
      })
  },
  inputNewMsg: function (e) {
    var text = e.detail.value
    this.setData({
      newMsg: text
    })
  },
  checkAllFinished: function () {
    wx.navigateTo({
      url: '../index/finished'
    })
  },
  onShow: function () {
    var that = this
    that.setData({
      allList: wx.getStorageSync('allList')
    })
    that.refresh()
  },
  onLoad: function () {
  }
})