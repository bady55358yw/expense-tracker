import React from 'react'
import { Form } from 'react-router-dom'
// 引入 icon
import { UserPlusIcon } from '@heroicons/react/24/solid'
// 引入背景
import illustration from '../../assets/illustration.jpg'

export default function Intro() {
  return (
    <div className='intro'>
        <div>
            <h1>
                你還在煩惱如何 <br />
                <span className="accent">管理金錢？</span>
            </h1>
            <p>讓記帳小幫手一步一步帶你開始記帳存錢，在下方輸入名字就開始吧！</p>
            <Form method='post'>
                <input type="text" name='userName' required placeholder='輸入你的名字'/>
                {/* action 判斷點 */}
                <input type="hidden" name='_action' value="newUser" />
                <button type='submit' className="btn btn--dark">
                    <span>新增帳戶</span>
                    <UserPlusIcon width={26}/>
                </button>
            </Form>
        </div>
        <img src={illustration} alt="intro_background" />
    </div>
  )
}
