import React, { Component } from 'react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: '' }

  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error) {
    console.log('I caught a big one!', error)
  }

  render() {
    if (this.state.hasError) {
      return <h1>Error! {this.state.error}</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary