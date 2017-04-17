import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Tetronimo from './Tetronimo'
import { SHAPES } from '../constants/tetronimo'

const { arrayOf, string } = PropTypes

const LogoTetronimo = styled(Tetronimo)`
  top: 25%
  left: 12.5%
`

LogoTetronimo.propTypes = {
  grid: arrayOf(arrayOf(string)).isRequired,
  color: string
}

const Logo = (props) => {
  const { tetronimo } = props
  const grid = SHAPES[tetronimo]
  const color = '#34495f'
  return (<div><LogoTetronimo color={color} grid={grid} /></div>)
}

const StyledLogo = styled(Logo)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #fff;
`

StyledLogo.propTypes = {
  tetronimo: string.isRequired
}

StyledLogo.defaultProps = {
  tetronimo: 'Z'
}

export default StyledLogo
