import React from 'react'
import { LinearProgress } from 'material-ui'

const Loading = ({ open, message, autoHideDuration }) => {
  message = (!message ? "<h1>..please wait a few seconds..</h1>" : message)
  autoHideDuration = (!autoHideDuration ? 4000 : autoHideDuration)

  const styles = {
    linearProgress: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 9999
    }
  }

  return (
    <div>
      {open &&
        <LinearProgress
          mode="indeterminate"
          color="red"
          style={styles.linearProgress}
        />
      }
    </div>
  )
}

export default Loading
