import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');

class ScrollButton extends Component {
  scrollToTop() {
    window.scrollTo(0, 0)
  }
  render() {
    return <button title='Back to top' className='scroll'
      onClick={() => { this.scrollToTop(); }}>
      <FontAwesome name="angle-double-up " size="2x" className="arrow-up" />
    </button>;
  }
}
export default ScrollButton  