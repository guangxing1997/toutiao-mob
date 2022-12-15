// 封装本地存储操作模块 增 读 删
// typeof() 输出结果为string类型
// 添加数据
export const setItem = (key, value) => {
  // 考虑对象类型，进行分别存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}
// 读取数据
export const getItem = (key) => {
  // 考虑对象类型，进行分别读取
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    return localStorage.getItem(key)
  }
}
// 删除数据
export const removeItem = (key) => {
  localStorage.removeItem(key)
}
