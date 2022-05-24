export function canIUseNextTick() {
  return wx.canIUse('nextTick');
}

export function nextTick(cb) {
  if (canIUseNextTick()) {
    wx.nextTick(cb);
  } else {
    setTimeout(() => {
      cb();
    }, 1000 / 30);
  }
}