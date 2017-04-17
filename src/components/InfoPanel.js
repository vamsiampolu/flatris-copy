import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

const P = styled.p`
  margin: 1em;
  line-height: 1.5em;
`

const A = styled.a`
  color: #34495f;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const InfoPanel = (props) => {
  const { styles } = props
  return (<div style={styles.root}>
    <P>
      <A href='https://github.com/skidding/flatris'>Flatris</A>
      {' '}
      is a mobile-friendly implementation of Tetris, built using React & Redux.
    </P>
    <P>
      Use the arrow keys or buttons below to play.
    </P>
    <P>
      The game state is preserved between visits, so you can safely kill this tab when your employer is approaching and resume afterwards–including
      {' '}
      <A href='http://caniuse.com/#feat=serviceworkers'>offline</A>
      !
    </P>
    <P>
      Check out the{' '}
      <A href='https://github.com/skidding/flatris'>source code</A>
      {' '}when you're done playing.
    </P>
    <P>
      Built by <A href='https://twitter.com/skidding'>@skidding</A>.
    </P>
  </div>)
}

const StyledInfoPanel = styled(InfoPanel)`
  color: #34495f
`

const mapStateToProps = state => {
  const { layout } = state
  const { fontSize } = layout
  const { text } = fontSize
  const styles = {
    root: {
      fontSize: text
    }
  }
  return { styles }
}

export default connect(mapStateToProps)(StyledInfoPanel)
