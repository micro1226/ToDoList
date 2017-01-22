function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function refresh() {
  var todoList = []
  var finishedList = []
  var allList = wx.getStorageSync('allList')
  for (let i = 0; i < allList.length; ++i) {
    var item = allList[i]
    if (!item.isFinished) {
      todoList.push(item)
    } else {
      finishedList.push(item)
    }
  }
  wx.setStorageSync('todoList', todoList)
  wx.setStorageSync('finishedList', finishedList)
  wx.setStorageSync('allList', allList)
}

function addMemo(message) {
  var allList = wx.getStorageSync('allList')
  const nextIndex = allList.length + 1
  allList = allList.concat([{ sid: nextIndex, text: message, isFinished: false }])
  wx.setStorageSync('allList', allList)
  this.refresh()
}

function deleteMemo(index) {
  var allList = wx.getStorageSync('allList')
  allList.splice(index, 1)
  const length = allList.length
  for (let i = index; i < length; i++) {
    allList[i].sid -= 1
  }
  wx.setStorageSync('allList', allList)
  this.refresh()
}

function changeMemoState(index) {
  var allList = wx.getStorageSync('allList')
  allList[index].isFinished = !allList[index].isFinished
  wx.setStorageSync('allList', allList)
  this.refresh()
}

module.exports = {
  formatTime: formatTime,
  refresh: refresh,
  deleteMemo: deleteMemo,
  changeMemoState: changeMemoState,
  addMemo: addMemo
}
