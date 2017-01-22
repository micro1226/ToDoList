//index.js
//获取应用实例
var app = getApp()

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
    var todoList = []
    var finishedList = []
    for (let i = 0; i < this.data.allList.length; ++i) {
      var item = this.data.allList[i]
      if (!item.isFinished) {
        todoList.push(item)
      } else {
        finishedList.push(item)
      }
    }
    this.setData({
      todoList: todoList,
      finishedList: finishedList
    })
    this.updateStorage()
  },
  updateStorage: function() {
    wx.setStorageSync('todoList', this.data.todoList)
    wx.setStorageSync('finishedList', this.data.finishedList)
    wx.setStorageSync('allList', this.data.allList)
  },
  //事件处理函数
  cilckCircle: function (e) {
    const index = e.currentTarget.id - 1
    this.data.allList[index].isFinished = !this.data.allList[index].isFinished
    wx.setStorageSync('allList', this.data.allList)
    this.setData({
      allList: this.data.allList
    })
    this.refresh()
  },
  addNewDemo: function () {
    const nextIndex = this.data.allList.length + 1
    this.data.allList = this.data.allList.concat([{ sid: nextIndex, text: this.data.newMsg, isFinished: false }])
    this.setData({
      allList: this.data.allList,
      inputText: ''
    })
    this.refresh()
  },
  deleteDemo: function (e) {
    const deleteId = e.currentTarget.id - 1
    this.data.allList.splice(deleteId, 1)
    const length = this.data.allList.length
    for (let i = deleteId; i < length; i++) {
      this.data.allList[i].sid -= 1
    }
    this.setData({
      allList: this.data.allList
    })
    this.refresh()
  },
  inputNewMsg: function (e) {
    var text = e.detail.value
    this.setData({
      newMsg: text
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    that.setData({
      allList: wx.getStorageSync('allList')
    })
    that.refresh()
  }
})