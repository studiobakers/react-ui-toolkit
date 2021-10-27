function isMobileDevice() {
  const userAgent = navigator.userAgent || navigator.vendor;
  const devices = [/Android/i, /iPhone/i, /iPad/i];

  return devices.some((device) => userAgent.match(device));
}

export {isMobileDevice};
