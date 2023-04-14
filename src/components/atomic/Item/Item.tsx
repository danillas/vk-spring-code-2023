import { classNames } from '@vkontakte/vkjs';
import { Caption, Subhead } from '@vkontakte/vkui';
import React from 'react';

interface ItemProps {
  className?: string;
  top: string;
  header: string;
  src: string;
  onClick: VoidFunction;
}

export function Item(props: ItemProps) {
  const { className, top, header, src, onClick } = props;

  return (
    <div className={classNames('Item', className)} onClick={onClick}>
      <img src={src} alt="" />
      <Caption style={{ color: 'var(--vkui--color_text_secondary)' }} level="1">
        {top}
      </Caption>
      <Subhead weight="1" size={14}>
        {header}
      </Subhead>
    </div>
  );
}
