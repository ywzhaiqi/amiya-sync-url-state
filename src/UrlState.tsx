import React from 'react'
import useUrlState from '@ahooksjs/use-url-state';

function UrlState() {
  const [state, setState] = useUrlState({ count: '1' });

  return (
    <>
     <button
        style={{ marginRight: 8 }}
        type="button"
        onClick={() => setState({ count: Number(state.count || 0) + 1 })}
      >
        add
      </button>
      <button type="button" onClick={() => setState({ count: undefined })}>
        clear
      </button>
      <div>state: {state?.count}</div>
    </>
  )
}

export default UrlState
