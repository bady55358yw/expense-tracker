import React from 'react'
import { Link, useRouteError,useNavigate } from 'react-router-dom'
// 引入 icon
import { HomeIcon,ArrowUturnLeftIcon } from '@heroicons/react/24/solid'

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className='error'>
      <h1>Oops...你可能迷路了</h1>
      <p>{error.message}</p>
      <div className='flex-md'>
        <button className="btn btn--dark" onClick={()=>navigate(-1)}>
          <span>回上一頁</span>
          <ArrowUturnLeftIcon width={26}/>
        </button>
        <Link className="btn btn--dark" to="/">
          <span>回主畫面</span>
          <HomeIcon width={26}/>
        </Link>
      </div>
    </div>
  )
}
