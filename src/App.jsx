import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

// 引入 toast 視窗
import { ToastContainer } from 'react-toastify'

// 引入 toast 樣式
import 'react-toastify/dist/ReactToastify.css';
import Main,{mainLoader} from './layouts/main'

// 引入路由組件、loader、action
import Dashboard, {dashboardLoader,dashboardAction} from './pages/Dashboard'
import CategoryPage, {categoryLoader,categoryAction} from './pages/CategoryPage'
import ExpensePage, {expenseLoader,expenseAction} from './pages/ExpensePage'
import Error from './pages/Error'

// 引入登出、刪除類別的 action (會重新導向到主畫面)
import { logoutAction } from './actions/logout'
import { deleteCategoryAction } from './actions/deleteCategory'

// 引入 css
import './App.css'

// --- 底下開始撰寫 ---

const router = createBrowserRouter([
    {
        path: "/", // 代表一進入主畫面時，會導向的路徑
        element: <Main/>, // 版面組件：用來設置 header 和 footer
        loader: mainLoader, // loader：取出表單資料
        children: [
            {
                index: true, // 默認子路由
                element: <Dashboard/>, // 路由組件：主體內容
                loader: dashboardLoader, // loader：取出表單資料
                action: dashboardAction, // action：存入/刪除表單資料(使用者、類別、項目)
                errorElement: <Error/>
            },
            {
                path: "category/:id", // 路由組件：類別總覽
                element: <CategoryPage/>,
                loader: categoryLoader, 
                action: categoryAction,
                errorElement: <Error/>,
                children: [
                    {
                        path: "deleteCategory",
                        action: deleteCategoryAction,
                        errorElement: <Error/>
                    }
                ]
            },
            {
                path: "expense", 
                element: <ExpensePage/>, // 路由組件：項目明細總覽
                loader: expenseLoader, // loader：取出表單資料
                action: expenseAction, // action：刪除表單資料(項目)
                errorElement: <Error/>
            },
            {
                path: "logout",
                action: logoutAction, // action：刪除表單資料(使用者、類別、項目)
                errorElement: <Error/>
            }
        ]
    },
   
    {
        path: '*', // 代表當路徑是未定義時，會導向的路徑
        element: <Error/> // 渲染錯誤畫面的組件
    }
])

export default function App() {
  return (
    <div>
        <RouterProvider router={router}/>
        {/* 使用 react-toastify 套件，最外面一定要包 ToastContainer */}
        <ToastContainer /> 
    </div>
  )
}

