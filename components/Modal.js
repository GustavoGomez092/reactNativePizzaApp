import React, { Component } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components'
import { Ionicons } from '@expo/vector-icons'

const { width, height } = Dimensions.get('window')

export class ModalCont extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  close () {
    this.props.close()
  };

  render () {
    return (
      <ParentContainer>
        <Modal />
        <CloseContainer onPress={() => this.close()}>
          <Ionicons
            name='ios-close-circle'
            size={56}
            color='#E8252B'
            style={{ top: -6, left: 9.9, width: 65, height: 65 }}
          />
        </CloseContainer>
      </ParentContainer>
    )
  }
}

// styles for the modal
const Modal = styled.View`
  background-color: #fff;
  top: 250px;
  width: ${width};
  height: ${height};
  align-items: center;
`

const ParentContainer = styled.View`
  width: ${width};
  height: ${height};
  top: 0;
  left: 0;
  align-items: center;
`

const CloseContainer = styled.TouchableOpacity`
  top: -25px;
  background-color: #fff;
  border-radius: 50px;
  width: 45px;
  height: 45px;
  top: -${height - 225};
  align-items: center;
  align-content: center;
`
