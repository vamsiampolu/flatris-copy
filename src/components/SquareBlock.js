import React from 'react'
import PropTypes from 'prop-types'
// import styled from 'styled-components'

const { string } = PropTypes

// square-block css can be re-written as a styled-component
// const SquareBlock = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: ${props => props.color};
// `

// const SquareBlock = props => {
// const { color } = props
  // color is undefined
  // console.log(color)
  // return (<div style={{
  // width: '100%',
  // height: '100%',
  // backgrounColor: color
  // }} />)
  // }

  // SquareBlock.propTypes = {
  // color: string
  // }

  // export default SquareBlock

export default class SquareBlock extends React.Component {
  render () {
    const { color } = this.props
    const style = {
      width: '100%',
      height: '100%',
      backgroundColor: color
    }

    return (<div style={style} />)
  }
}

SquareBlock.propTypes = {
  color: string
}
