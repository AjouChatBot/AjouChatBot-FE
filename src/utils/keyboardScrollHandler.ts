interface KeyboardScrollOptions {
  onFocus?: () => void;
  onBlur?: () => void;
}

let isFocus = false;
let scrollElement: HTMLDivElement | null = null;

const appendScrollElement = () => {
  if (!scrollElement) {
    scrollElement = document.createElement('div');
    scrollElement.id = 'make-scrollable';
    scrollElement.style.cssText = `
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 0;
      transition: height 0.25s ease;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(scrollElement);
  }
};

const removeScrollElement = () => {
  if (scrollElement && scrollElement.parentNode) {
    scrollElement.parentNode.removeChild(scrollElement);
    scrollElement = null;
  }
};

const handleFocus = () => {
  isFocus = true;
  appendScrollElement();
  if (scrollElement) {
    scrollElement.style.height = '300px';
  }
  document.body.style.overflow = 'hidden';
};

const handleBlur = () => {
  isFocus = false;
  if (scrollElement) {
    scrollElement.style.height = '0';
  }
  document.body.style.overflow = '';
};

const triggerKeyboardOpen = () => {
  if (isFocus) {
    handleFocus();
  } else {
    handleBlur();
  }
};

export const setupKeyboardScrollHandler = (
  options: KeyboardScrollOptions = {}
) => {
  const { onFocus, onBlur } = options;

  const handleViewportResize = () => {
    triggerKeyboardOpen();
  };

  const handleInputFocus = () => {
    handleFocus();
    onFocus?.();
  };

  const handleInputBlur = () => {
    handleBlur();
    onBlur?.();
  };

  if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', handleViewportResize);
  }

  return {
    handleInputFocus,
    handleInputBlur,
    cleanup: () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener(
          'resize',
          handleViewportResize
        );
      }
      removeScrollElement();
    },
  };
};
