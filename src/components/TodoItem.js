import React, { Component } from 'react';
import './TodoItem.css';
import classNames from 'classnames';
import imgComplete from '../imgs/complete.svg';
import imgUncomplete from '../imgs/uncomplete.svg';

class TodoItem extends Component {
  render() {
    const { item, onClick, destroy } = this.props;
    const { title } = item;
    let url = imgUncomplete;
    if (item.isComplete) {
      url = imgComplete;
    }
    return (
      <div className={classNames('TodoItem', { 'TodoItem-complete': item.isComplete })}>
        <img onClick={onClick} src={url} alt="" />
        <p>{title}</p>
        <span onClick={destroy}>x</span>
      </div>
    );
  }
}

export default TodoItem;
