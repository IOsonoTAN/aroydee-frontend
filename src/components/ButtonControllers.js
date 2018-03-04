import React from 'react'
import { Link } from 'react-router-dom'
import { RaisedButton, RefreshIndicator } from 'material-ui'

const ButtonControllers = ({ loading, backUrl, backLabel, submitLabel }) => {
  backUrl = (!backUrl ? '/' : backUrl)
  backLabel = (!backLabel ? 'Back to list' : backLabel)
  submitLabel = (!submitLabel ? 'Save data' : submitLabel)

  return (
    <div className="row">
      <div className="col-xs-12">
        <div className="pull-left">
          <RaisedButton label={backLabel} containerElement={<Link to={backUrl} />} />
        </div>
        <div className="pull-right">
          <RefreshIndicator
            size={30}
            left={-10}
            top={7}
            status="loading"
            style={{
              display: (loading ? 'inline-block' : 'none'),
              position: 'relative',
            }}
          />
          <RaisedButton
            type="submit"
            label={submitLabel}
            primary={true}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  )
}

export default ButtonControllers
