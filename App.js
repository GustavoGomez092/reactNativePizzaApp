import React, { Component } from 'react'
import * as Font from 'expo-font'
import { PizzaPicker } from './components/PizzaPicker'

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
  }

  async componentDidMount () {
    await Font.loadAsync({
      'poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'poppins-extraLight': require('./assets/fonts/Poppins-ExtraLight.ttf')
    })

    this.setState({ fontLoaded: true })
  }

  render () {
    return (
      <>
        {
          this.state.fontLoaded
            ? <PizzaPicker />
            : null
        }
      </>
    )
  }
}
