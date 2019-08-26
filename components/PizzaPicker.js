import React, { Component } from 'react'
import { Dimensions, Animated } from 'react-native'
import styled from 'styled-components'
import { ModalCont } from './Modal'
import { BlurView } from 'expo-blur'
import data from '../data.json'

const { width, height } = Dimensions.get('window')

export class PizzaPicker extends Component {
  constructor (props) {
    super(props)
    this.state = {
      fontLoaded: false
    }
    this.scrollAnimatedValue = new Animated.Value(0)
    this.modalAnimation = new Animated.Value(0)
    this.pieModalAnimation = new Animated.Value(0)
    this.pieModalSize = new Animated.Value(1)
    this.pieMoveright = new Animated.Value(1)
    this.intensity = new Animated.Value(0)
  }

  async componentDidMount () {
    console.log(data)
  }

  startModalAnimation () {
    Animated.timing(this.intensity, {
      duration: 500,
      toValue: 100
    }).start()
    Animated.spring(this.modalAnimation, {
      toValue: -(height + 100),
      duration: 500,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieModalAnimation, {
      toValue: width / 2.7,
      duration: 700,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieModalSize, {
      toValue: 1.1,
      duration: 700,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieMoveright, {
      toValue: 1.55,
      duration: 700,
      useNativeDriver: true
    }).start()
  }

  endModalAnimation () {
    Animated.timing(this.intensity, {
      duration: 100,
      toValue: 0
    }).start()
    Animated.spring(this.modalAnimation, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieModalAnimation, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieModalSize, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start()
    Animated.spring(this.pieMoveright, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true
    }).start()
  }

  render () {
    const rotation = this.scrollAnimatedValue.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '90deg']
    })

    const PizzaScrollCalc = this.scrollAnimatedValue.interpolate({
      inputRange: [0, width],
      outputRange: [width, 0]
    })

    const modalAnimation = {
      transform: [
        {
          translateY: this.modalAnimation
        }
      ]
    }

    const pieModalAnim = {
      transform: [
        { translateX: this.pieModalAnimation },
        { scale: this.pieModalSize },
        { rotate: rotation }
      ]
    }

    const pieScroll = {
      transform: [{ translateX: PizzaScrollCalc }]
    }

    const containerPizzaAnim = {
      transform: [{ scale: this.pieMoveright }]
    }

    return (
      <Container>
        <AnimatedBlurView
          tint='dark'
          intensity={this.intensity}
          style={{ width: width, alignItems: 'center' }}
        >
          <BlurPieContainer>
            <Pie
              source={require('../assets/isotipo.png')}
              blurRadius={2}
            />
          </BlurPieContainer>
        </AnimatedBlurView>
        <AnimatedScrollContainerPizza style={containerPizzaAnim}>
          <AnimatedScrollPizza style={pieScroll}>
            <AnimatedMovePizza>
              <AnimatedPieContainer style={pieModalAnim}>
                <MiniPie source={require('../assets/pizzas/jamon-peppe.png')} />
              </AnimatedPieContainer>
            </AnimatedMovePizza>
            <AnimatedMovePizza>
              <AnimatedPieContainer style={pieModalAnim}>
                <MiniPie source={require('../assets/pizzas/pollo.png')} />
              </AnimatedPieContainer>
            </AnimatedMovePizza>
            <AnimatedMovePizza>
              <AnimatedPieContainer style={pieModalAnim}>
                <MiniPie source={require('../assets/pizzas/carne.png')} />
              </AnimatedPieContainer>
            </AnimatedMovePizza>
          </AnimatedScrollPizza>
        </AnimatedScrollContainerPizza>
        <ScrollContainerText>
          <AnimatedScrollText
            horizontal
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: { x: this.scrollAnimatedValue }
                  }
                }
              ],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={1}
            decelerationRate={0}
            snapToInterval={width}
            snapToAlignment='center'
            showsHorizontalScrollIndicator={false}
          >
            <TextContainer>
              <>
                <HeaderText style={{ fontFamily: 'bangers' }}>
                  Pepperoni
                </HeaderText>
                <ContentText style={{ fontFamily: 'Antonio-Light' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </ContentText>
              </>
            </TextContainer>
            <TextContainer>
              <>
                <HeaderText style={{ fontFamily: 'bangers' }}>
                  Pollo
                </HeaderText>
                <ContentText style={{ fontFamily: 'Antonio-Light' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </ContentText>
              </>
            </TextContainer>
            <TextContainer>
              <>
                <HeaderText style={{ fontFamily: 'bangers' }}>
                  Carne
                </HeaderText>
                <ContentText style={{ fontFamily: 'Antonio-Light' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </ContentText>
              </>
            </TextContainer>
          </AnimatedScrollText>
        </ScrollContainerText>
        <ButtonContainer>
          <Button onPress={() => this.startModalAnimation()}>
            <WhiteText style={{ fontFamily: 'bangers' }}>Seleccionar</WhiteText>
          </Button>
        </ButtonContainer>
        <AnimatedModal style={modalAnimation}>
          <ModalCont close={() => this.endModalAnimation()} />
        </AnimatedModal>
      </Container>
    )
  }
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  background-color: #D7CF07;
`
const TextContainer = styled.View`
  width: ${width};
  align-items: center;
`

const ScrollPizza = styled.View`
  flex-direction: row;
`
const AnimatedBlurView = Animated.createAnimatedComponent(BlurView)

const AnimatedScrollPizza = Animated.createAnimatedComponent(ScrollPizza)

const ScrollText = styled.ScrollView``

const AnimatedScrollText = Animated.createAnimatedComponent(ScrollText)

const MovePizza = styled.View`
  elevation: 8;
`

const AnimatedMovePizza = Animated.createAnimatedComponent(MovePizza)

const ScrollContainerText = styled.View`
  top: -200px;
  max-height: 200px;
  elevation: 4;
`

const ScrollContainerPizza = styled.View`
  top: -200px;
  max-height: 250px;
  elevation: 8;
`

const AnimatedScrollContainerPizza = Animated.createAnimatedComponent(
  ScrollContainerPizza
)

const WhiteText = styled.Text`
  font-size: 22px;
  color: white;
  margin: auto;
  width: 100%;
  text-align: center;
`

const ButtonContainer = styled.View`
  top: -130px;
  elevation: 4;
`

const HeaderText = styled.Text`
  font-size: 28px;
  color: #010101;
  margin-bottom: 10px;
  padding: 15px;
  width: 100%;
  text-align: center;
`

const ContentText = styled.Text`
  font-size: 16px;
  width: ${width - width * 0.2}px;
  color: #010101;
  margin-bottom: 5px;
`

const Button = styled.TouchableOpacity`
  text-align: center;
  width: ${width - width * 0.2}px;
  height: 50px;
  background-color: #E71D36;
  border-radius: 5px;
  elevation: 11;
  box-shadow: -10px 10px 8px rgba(0, 0, 0, 0.25);
`

const PieContainer = styled.View`
  width: ${width - width * 0.45};
  height: ${width - width * 0.45};
  margin-left: ${width / 2 - (width - width * 0.45) / 2}px;
  margin-right: ${width / 2 - (width - width * 0.45) / 2}px;
  box-shadow: -10px 10px 8px rgba(0, 0, 0, 0.25);
  border-radius: ${width - width * 0.45};
  elevation: 7;
  overflow: hidden;
  margin-top: 10px;
  margin-bottom: 80px;
`

const AnimatedPieContainer = Animated.createAnimatedComponent(PieContainer)

const Pie = styled.Image`
  width: 100%;
  height: 100%;
`

const MiniPie = styled.Image`
  width: 102%;
  height: 102%;
`

const BlurPieContainer = styled.View`
  width: ${width};
  height: ${width};
  top: -50px;
  opacity: 0.3;
  box-shadow: -10px 10px 8px rgba(0, 0, 0, 0.25);
  border-radius: ${width - width * 0.05};
  align-items: center;
`

// modal container styles

const Modal = styled.View`
  elevation: 5;
  align-items: center;
  height: ${height + 50};
`

const AnimatedModal = Animated.createAnimatedComponent(Modal)
