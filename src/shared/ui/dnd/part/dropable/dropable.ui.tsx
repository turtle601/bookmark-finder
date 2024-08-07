import { css } from '@emotion/react';
import React, { forwardRef, ReactNode, Ref } from 'react';

import { useDropable } from '@/shared/ui/dnd/hooks';

import type { CSSObject } from '@emotion/react';
import type { AsyncVoidFunction } from '@/shared/ui/util.type';

interface IDropableProps {
  children: (props: { isDragEnter: boolean }) => ReactNode;
  dropAction: VoidFunction | AsyncVoidFunction;
  etcStyles?: CSSObject;
}

const DropableComponent = (
  { dropAction, children, etcStyles = {}, ...attribute }: IDropableProps,
  ref: Ref<HTMLDivElement>,
) => {
  const { isDragEnter, handleDragEnter, handleDragLeave, handleDrop } =
    useDropable({ action: dropAction });

  const handleDragOver: React.DragEventHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      ref={ref}
      onDragEnter={handleDragEnter}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      css={css({
        ...etcStyles,
      })}
      {...attribute}
    >
      {children({ isDragEnter })}
    </div>
  );
};

export type DropableFC = React.ForwardRefExoticComponent<
  IDropableProps & React.RefAttributes<HTMLDivElement>
>;

const Dropable: DropableFC = forwardRef(DropableComponent);

export default Dropable;
