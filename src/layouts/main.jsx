import React from 'react'
// 引入 useLoaderData，用於取得 loader 返回的資料
// 引入 Outlet，用來設置子路由
import { useLoaderData,Outlet } from 'react-router-dom'
// 引入 local storage
import { fetchData } from '../helper'
// 引入組件
import Nav from '../components/Nav'
// 引入背景圖片
import wave_pic from '../assets/wave.svg'

export function mainLoader(){
    const userName = fetchData('userName');
    return {userName}
}

export default function Main() {
    const {userName} = useLoaderData() // 透過 useLoaderData 取得 mainLoader 返回的物件

    return (
        <div className='layout'>
            <Nav userName={userName}/>
                <main>
                    <Outlet />
                </main>
            <img src={wave_pic} alt="wave_pic" />
        </div>
    )
}