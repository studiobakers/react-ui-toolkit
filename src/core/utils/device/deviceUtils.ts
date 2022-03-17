function isMobileDevice() {
  const userAgent =
    // eslint-disable-next-line no-negated-condition
    typeof navigator !== "undefined" ? navigator.userAgent || navigator.vendor : "";
  const devices = [/Android/i, /iPhone/i, /iPad/i];

  return devices.some((device) => userAgent.match(device));
}

export {isMobileDevice};
