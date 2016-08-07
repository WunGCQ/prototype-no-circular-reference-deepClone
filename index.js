;(function () {
  var hasObjectDefinePropertyFunction = !!Object.defineProperty

  Array.prototype.$deepClone =
    hasObjectDefinePropertyFunction
      ?
      function (visited) {
        var len = this.length
        var visited = visited || []
        var thisLevelFirstVisited = []
        var ret = new Array(len)
        for (var i = 0; i < len; ++i) {
          var t = this[i]
          var type = getType(t)
          if (type === 'array' || type === 'object' || type === 'window') {
            // 分为两种逻辑
            // |_之前的调用中未标记visited，则标记visited和thisLevelFirstVisited, 对当前进行deep clone
            // |_之前调用中已标记visited, 则不标记thisLevelFirstVisited, 同时检查thisLevelFirstVisited,
            //   |- 若已标记 证明为本层调用首次记录到，执行深拷贝
            //   |- 若未标记 证明非本层调用首次记录到，为上层调用的历史，执行浅拷贝 
            if (visited.indexOf(t) == -1) {
              visited.push(t)
              thisLevelFirstVisited.push(t)
              ret[i] = t.$deepClone(visited)
            } else {
              if (thisLevelFirstVisited.indexOf(t) > -1) {
                ret[i] = t.$deepClone(visited)
              } else {
                ret[i] = t
              }
              console.error('property ' + i + ' points to some object which may make circular references')
            }
          }
          else if (type === 'date') {
            ret[i] = Object.deepClone(t)
          } else {
            ret[i] = t
          }
        }
        return ret
      }
      :
      function (visited) {
        var len = this.length
        var ret = new Array(len)
        var visited = visited || []
        var thisLevelFirstVisited = []
        for (var i = 0; i < len; ++i) {
          var t = this[i]
          var type = getType(t)
          if (type === 'array' || type === 'window' || type === 'date') {
            // 分为两种逻辑
            // |_之前的调用中未标记visited，则标记visited和thisLevelFirstVisited, 对当前进行deep clone
            // |_之前调用中已标记visited, 则不标记thisLevelFirstVisited, 同时检查thisLevelFirstVisited,
            //   |- 若已标记 证明为本层调用首次记录到，执行深拷贝
            //   |- 若未标记 证明非本层调用首次记录到，为上层调用的历史，执行浅拷贝 
            if (visited.indexOf(t) == -1) {
              visited.push(t)
              thisLevelFirstVisited.push(t)
              ret[i] = t.$deepClone(visited)
            } else {
              if (thisLevelFirstVisited.indexOf(t) > -1) { // previos level has not visited  but this level has visited 
                ret[i] = t.$deepClone(visited)
              } else {
                ret[i] = t
              }
              console.error('property ' + i + ' points to some object which may make circular references.the visited objects will warn under this line, I will stop clone deeply')
              console.warn(visited)
            }
          }else if (type === 'object') {
            // 分为两种逻辑
            // |_之前的调用中未标记visited，则标记visited和thisLevelFirstVisited, 对当前进行deep clone
            // |_之前调用中已标记visited, 则不标记thisLevelFirstVisited, 同时检查thisLevelFirstVisited,
            //   |- 若已标记 证明为本层调用首次记录到，执行深拷贝
            //   |- 若未标记 证明非本层调用首次记录到，为上层调用的历史，执行浅拷贝 
            if (visited.indexOf(t) == -1) {
              visited.push(t)
              thisLevelFirstVisited.push(t)
              ret[i] = Object.$deepClone(t, visited)
            } else {
              if (thisLevelFirstVisited.indexOf(t) > -1) { // previos has not visited  
                ret[i] = Object.$deepClone(t, visited)
              } else {
                ret[i] = t
              }
              console.error('property ' + i + ' points to some object which may make circular references.the visited objects will warn under this line, I will stop clone deeply')
              console.warn(visited)
            }
          } else {
            ret[i] = t
          }
        }
        return ret
    }

  function prototypeClone (visited) {
    var ret = {}
    var keys = Object.keys(this)
    var len = keys.length
    var visited = visited || []
    var thisLevelFirstVisited = []
    for (var j = 0; j < len; ++j) {
      var i = keys[j]
      var value = this[i]
      var t = this[i]
      var type = getType(t)
      if (type === 'array' || type === 'object' || type === 'date') {
        // 分为两种逻辑
        // |_之前的调用中未标记visited，则标记visited和thisLevelFirstVisited, 对当前进行deep clone
        // |_之前调用中已标记visited, 则不标记thisLevelFirstVisited, 同时检查thisLevelFirstVisited,
        //   |- 若已标记 证明为本层调用首次记录到，执行深拷贝
        //   |- 若未标记 证明非本层调用首次记录到，为上层调用的历史，执行浅拷贝 
        if (visited.indexOf(t) == -1) {
          visited.push(t)
          thisLevelFirstVisited.push(t)
          ret[i] = t.$deepClone(visited)
        } else {
          if (thisLevelFirstVisited.indexOf(t) > -1) {
            ret[i] = t.$deepClone(visited)
          } else {
            ret[i] = t
          }
          console.error('property ' + i + ' points to some object which may make circular references.the visited objects will warn under this line, I will stop clone deeply')
          console.warn(visited)
        }
      } else {
        ret[i] = t
      }
    }
    return ret
  }

  function objectClone (obj, visited) {
    var ret = {}
    var visited = visited || []
    var thisLevelFirstVisited = []
    for (var i in obj) {
      var t = obj[i]
      var type = getType(t)
      if (type === 'array' || type === 'date' || type == 'window') {
        // 分为两种逻辑
        // |_之前的调用中未标记visited，则标记visited和thisLevelFirstVisited, 对当前进行deep clone
        // |_之前调用中已标记visited, 则不标记thisLevelFirstVisited, 同时检查thisLevelFirstVisited,
        //   |- 若已标记 证明为本层调用首次记录到，执行深拷贝
        //   |- 若未标记 证明非本层调用首次记录到，为上层调用的历史，执行浅拷贝 
        if (visited.indexOf(t) == -1) {
          visited.push(t)
          thisLevelFirstVisited.push(t)
          ret[i] = t.$deepClone(visited)
        } else {
          if (thisLevelFirstVisited.indexOf(t) > -1) { // previos level has not visited  but this level has visited 
            ret[i] = t.$deepClone(visited)
          } else {
            ret[i] = t
          }
          console.error('property ' + i + ' points to some object which may make circular references.the visited objects will warn under this line, I will stop clone deeply')
          console.warn(visited)
        }
      } else if (type === 'object') {
        if (visited.indexOf(t) == -1) {
          visited.push(t)
          thisLevelFirstVisited.push(t)
          ret[i] = Object.$deepClone(t, visited)
        } else {
          if (thisLevelFirstVisited.indexOf(t) > -1) { // previos level has not visited  but this level has visited 
            ret[i] = t.$deepClone(visited)
          } else {
            ret[i] = t
          }
          console.error('property ' + i + ' points to some object which may make circular references.the visited objects will warn under this line, I will stop clone deeply')
          console.warn(visited)
        }
      } else {
        ret[i] = t
      }
    }
    return ret
  }

  Date.prototype.$deepClone = function () {
    return new Date(this)
  }

  function getType (obj) {
    return Object.prototype.toString.call(obj).split(' ')[1].slice(0, -1).toLowerCase()
  }

  if (hasObjectDefinePropertyFunction) {
    Object.defineProperty(Object.prototype,
      '$deepClone',
      {value: prototypeClone, enumerable: false}
    )
    Object.defineProperty(Object,
      '$deepClone',
      {value: objectClone, enumerable: false}
    )
  } else {
    Object.$deepClone = objectClone
  }
})()
