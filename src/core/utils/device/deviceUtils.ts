function isAndroid() {
  const userAgent = navigator.userAgent || navigator.vendor;

  return /android/i.test(userAgent);
}

export {isAndroid};
