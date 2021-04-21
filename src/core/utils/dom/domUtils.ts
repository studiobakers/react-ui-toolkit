function computeScrollAmountToMakeChildVisible(parent: HTMLElement, child: HTMLElement) {
  const {clientHeight: parentHeight, scrollTop: parentScrollTop} = parent;
  const {clientHeight: childHeight, offsetTop: childOffsetTop} = child;
  let visibilityBoundary = 0;
  let scrollSize = 0;

  visibilityBoundary = parentHeight - (childOffsetTop - parentScrollTop);

  if (visibilityBoundary < childHeight) {
    scrollSize = childHeight - visibilityBoundary;
  }

  if (visibilityBoundary > parentHeight) {
    scrollSize = parentHeight - visibilityBoundary;
  }

  return scrollSize;
}

export {computeScrollAmountToMakeChildVisible};
