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
      bangers: require('./assets/fonts/bangers.ttf'),
      'Antonio-Regular': require('./assets/fonts/Antonio-Regular.ttf'),
      'Antonio-Light': require('./assets/fonts/Antonio-Light.ttf')
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
