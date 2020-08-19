/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItem from './components/TodoItem';
import checkAll from './imgs/all.svg';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      todoItems: [],
      flagSelectAll: true,
      currentFilter: 'All',
      filter: [
        { value: 'All', isSelected: true },
        { value: 'Active', isSelected: false },
        { value: 'Complete', isSelected: false },
      ],
    };
    this.onChange = this.onChange.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  onItemClicked(item) {
    return () => {
      const { isComplete } = item;
      const { todoItems } = this.state;
      const index = todoItems.indexOf(item);
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      let text = event.target.value;
      const { todoItems } = this.state;
      if (!text) {
        return;
      }

      text = text.trim();
      if (!text) { return; }
      this.setState({
        newItem: '',
        todoItems: [
          { title: text, isComplete: false },
          ...todoItems,
        ],
      });
    }
  }

  onChange(event) {
    this.setState({
      newItem: event.target.value,
    });
  }

  selectAll() {
    const { flagSelectAll } = this.state;
    if (flagSelectAll) {
      this.setState((prevState) => ({
        todoItems: prevState.todoItems.map((item) => ({ ...item, isComplete: true })),
        flagSelectAll: false,
      }));
    } else {
      this.setState((prevState) => ({
        todoItems: prevState.todoItems.map((item) => ({ ...item, isComplete: false })),
        flagSelectAll: true,
      }));
    }
  }

  filter(item) {
    return () => {
      const { filter } = this.state;
      const index = filter.indexOf(item);
      this.setState((prevState) => ({
        filter: prevState.filter.map((ele) => ({ ...ele, isSelected: false })),
      }));
      this.setState((prevState) => ({
        filter: [
          ...prevState.filter.slice(0, index),
          {
            ...item,
            isSelected: true,
          },
          ...prevState.filter.slice(index + 1),
        ],
        currentFilter: item.value,
      }));
    };
  }

  destroy(item) {
    return () => {
      const { todoItems } = this.state;
      this.setState({
        todoItems: todoItems.filter((ele) => item !== ele),
      });
    };
  }

  render() {
    const {
      todoItems, newItem, filter, currentFilter,
    } = this.state;
    const shownTodos = todoItems.filter((ele) => {
      switch (currentFilter) {
        case 'Active':
          return !ele.isComplete;
        case 'Complete':
          return ele.isComplete;
        default:
          return true;
      }
    });
    return (
      <div className="App">
        <div className="Header">
          <img onClick={this.selectAll} src={checkAll} alt="" />
          <input value={newItem} type="text" placeholder="Add a new item" onKeyUp={this.onEnter} onChange={this.onChange} />
        </div>
        {
          shownTodos.map((item, index) => (
            <TodoItem
              onClick={this.onItemClicked(item)}
              key={index}
              item={item}
              destroy={this.destroy(item)}
            />
          ))
        }
        <div className="Footer">
          <p>
            {todoItems.length}
            <span> items left</span>
          </p>
          <div className="filter">
            {
              filter.map((ele, index) => (
                <button
                  key={index}
                  className={classNames('filter_btn', { 'filter_btn--selected': ele.isSelected })}
                  onClick={this.filter(ele)}
                >
                  {ele.value}
                </button>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
