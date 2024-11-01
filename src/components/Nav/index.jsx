import React from 'react'
import {Form, NavLink} from 'react-router-dom'
// 引入 icon
import { TrashIcon } from '@heroicons/react/24/solid'
// 引入 logo圖片
import logomark from '../../assets/logomark.svg'

export default function Nav(props) {

  const {userName} = props

  function checkDeleteUser(e){
    if (!window.confirm("確定要刪除帳戶？")) {
      e.preventDefault()
    }
  }

  return (
    <nav>
      <NavLink to='/'>
        <img src={logomark} alt="logomark" height={30}/>
        <span>記帳小幫手</span>
      </NavLink>
      {
        userName && (
          <Form method="post" action="/logout" onSubmit={checkDeleteUser}>
            <button type="submit" className='btn btn--warning'>
                <span>刪除帳戶</span>
                <TrashIcon width={26}/>
            </button>
          </Form>
        )
      }
    </nav>
  )
}