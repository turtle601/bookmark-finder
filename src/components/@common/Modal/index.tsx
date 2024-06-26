import { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

import WindowCommand from '@/components/@shared/WindowCommand';

import {
  getModalContentStyle,
  getModalOverlayStyle,
  getModalWrapperStyle,
} from '@/components/@common/Modal/style';

import {
  useModalDispatch,
  useModalState,
} from '@/components/@common/Modal/context/hooks';

import { IModalProps } from '@/components/@common/Modal/type';

function Modal({ name }: IModalProps) {
  const state = useModalState();
  const dispatch = useModalDispatch();
  const { isOpen, content, zIndex } = state[name];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.removeProperty('overflow');
    };
  }, [isOpen]);

  const close = useCallback(() => {
    dispatch({
      type: 'CLOSE_MODAL',
      modalType: name,
    });
  }, [dispatch, name]);

  return (
    <>
      {isOpen &&
        createPortal(
          <WindowCommand cmdKeys={['esc']} action={close}>
            <div css={getModalWrapperStyle(zIndex)}>
              <div css={getModalOverlayStyle(zIndex)} onClick={close}></div>
              <div css={getModalContentStyle(zIndex)}>{content}</div>
            </div>
          </WindowCommand>,
          document.getElementById(name) as HTMLElement,
        )}
    </>
  );
}

export default Modal;
