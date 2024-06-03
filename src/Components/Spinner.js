import React from 'react'
import loading from './Spinner.gif'

// export default class Spinner extends Component {
export default function Spinner() {
  // render() {
    return (
      <div className='text-center'>
        <img src={loading} alt="" />
      </div>
    );
  // }
}
