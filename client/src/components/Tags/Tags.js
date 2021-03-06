import React from 'react';
import { Tag } from 'antd';

function log(e) {
  // console.log(e);
}

function preventDefault(e) {
  e.preventDefault();
  // console.log('Clicked! But prevent default.');
}

const tags = () => (
  <div>

    <Tag>
      <a href="https://github.com/ant-design/ant-design/issues/1862">Link</a>
    </Tag>
    <Tag closable onClose={log}>
    Tag 2
    </Tag>
    <Tag closable onClose={preventDefault}>
    Prevent Default
    </Tag>
  </div>
);

export default tags;
