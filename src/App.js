import React, { Component } from 'react';
import { evaluate } from 'mathjs';
import { MdOutlineKeyboardBackspace } from 'react-icons/md'; // Backspace icon
import { FaSun, FaMoon } from 'react-icons/fa'; // Icons for theme toggle
import './App.css';

class App extends Component {
   state = {
      input: '',
      result: '',
      theme: 'light', // default theme is light
    };
  

  handleClick = (value) => {
    const { input } = this.state;

    if (value === 'C') {
      this.setState({ input: '', result: '' });
    } else if (value === 'Backspace') {
      this.setState({ input: input.slice(0, -1) }); // Remove the last character
    } else if (value === '=') {
      try {
        const result = evaluate(input); // Safely evaluate the expression
        this.setState({ result });
      } catch {
        this.setState({ result: 'Error' });
      }
    } else if (value === '√') {
      this.setState({ result: Math.sqrt(parseFloat(input)) });
    } else if (value === 'x²') {
      this.setState({ result: Math.pow(parseFloat(input), 2) });
    } else if (value === '%') {
      this.setState({ result: parseFloat(input) / 100 });
    } else {
      this.setState({ input: input + value });
    }
  };

  toggleTheme = () => {
    this.setState((prevState) => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light',
    }));
  };

  render() {
    const { input, result, theme } = this.state;

    const buttons = [
      '7', '8', '9', '/', '4', '5', '6', '*',
      '1', '2', '3', '-', '0', '.', '=', '+', 'C',
      '√', 'x²', '%',
    ];

    return (
      <div className={`calculator ${theme}`}>
        <div className="title-cont">
          <h1>Calculator</h1>
          <button className="theme-toggle" onClick={this.toggleTheme}>
            {theme === 'light' ? <FaMoon size={24} /> : <FaSun size={24} />}
          </button>
        </div>

        <div className="display">
          <input type="text" value={input} readOnly />
          <div className="result">{result}</div>
        </div>

        <div className="buttons">
          {buttons.map((btn, index) => (
            <button key={index} onClick={() => this.handleClick(btn)}>
              {btn}
            </button>
          ))}
          {/* Backspace button with icon */}
          <button onClick={() => this.handleClick('Backspace')}>
            <MdOutlineKeyboardBackspace size={24} />
          </button>
        </div>
      </div>
    );
  }
}

export default App;
