//进行持久化存储

function setItem(key,value){
    window.localStorage.setItem(key,JSON.stringify(value))
}

function getItem(key) {
  const result= window.localStorage.getItem(key);
  return JSON.stringify(result)
}
function removeItem(key) {
    window.localStorage.removeItem(key);
}

export{
    getItem,
    setItem,
    removeItem
}