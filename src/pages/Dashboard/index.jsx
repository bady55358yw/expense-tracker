import React, {useState, useEffect} from 'react'
import { Link, useLoaderData } from 'react-router-dom'

// 引入 helper 函數
import { 
    fetchData,
    createCategory,createUser,createExpense,
    deleteItem,
    waitSec 
} from '../../helper'

// 引入組件
import Intro from '../../components/Intro'
import CategoryForm from '../../components/CategoryForm'
import ExpenseForm from '../../components/ExpenseForm'
import CategoryItem from '../../components/CategoryItem'
import ExpenseDetailTable from '../../components/ExpenseDetailTable'

// 引入 toast 視窗
import { toast } from 'react-toastify'

// --- 底下開始撰寫 ---

// loader
export function dashboardLoader(){
    const userName = fetchData('userName');
    const category = fetchData('category');
    const expense = fetchData('expense');
    return {userName, category, expense}
}

// action
export async function dashboardAction({request}){
    // 當 waitSec() 被 await 時，會在數秒之後繼續執行接下來的程式碼
    await waitSec() 

    // 在 React Router 的 action 或 loader 函數中使用 request，表示發送請求
    // 因為用 request.formData() 取得表單提交的資料，要等待資料返回，為非同步方法，所以要寫async、await
    const data = await request.formData()

    // 用 Object.fromEntries() 取出表單的資料，除了_action，其他資料以「物件」形式放入values內
    const {_action, ...values} = Object.fromEntries(data)

    /* 
        // 【 Object.fromEntries 的替放方式，寫法較冗長 】
        const data_userName = data.get("userName")
        const data_action = data.get("_action")
        const data_categoryName = data.get("categoryName")
        const data_budgetAmount = data.get("budgetAmount") 
    */

    if (_action === 'newUser'){
        // 用 try catch 去捕捉當錯誤情況發生的錯誤訊息
        try{
            createUser(values.userName)
            return toast.success(`${values.userName}，歡迎使用！`)
        }
        catch(error){
            throw new Error('建立帳戶出現問題...QQ')
        }
    }
    else if (_action === 'newCategory'){
        try {
            createCategory({name:values.categoryName, amount:values.categoryAmount})
            return toast.success('新增類別成功！')
        }
        catch(error){
            throw new Error('新增類別出現問題...QQ')
        }
    }
    else if (_action === 'newExpense'){
        try {
            createExpense({name:values.expenseName, amount:values.expenseAmount, id_cate:values.expenseCategory})
            return toast.success('新增項目成功')
        }
        catch(error) {
            throw new Error('新增項目出現問題...QQ')
        }
    }
    else if (_action === 'deleteExpense'){
        try {
            deleteItem({key_name:'expense',id:values.expenseId})
            return toast.success('刪除項目成功')
        }
        catch(error) {
            throw new Error('刪除項目出現問題...QQ')
        }
    }
}

export default function Dashboard() {
    const {userName,category,expense} = useLoaderData() // 取得 loader 返回的資料
    const [categoryLen,setCategoryLen] = useState(0)

    useEffect(()=>{
        // 確保 category 不是 null
        if(category) {
            setCategoryLen(category.length)
        }
    },[category])
    
    return (
        <>
            { userName? (
                <div className='dashboard'>
                    <h2>您好！
                        <span className='accent'>{userName}</span>
                    </h2>
                    <div className="grid-sm">
                        {
                            category!=null && categoryLen > 0 ? 
                            (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <CategoryForm />
                                        <ExpenseForm category={category}/>
                                    </div>

                                    <h2>目前類別佔比</h2>
                                    <div className='budgets'>
                                        {category.map((item)=>{
                                            return <CategoryItem key={item.id_category} category={item} showDelete={false}/>
                                        })}
                                    </div>

                                    {expense!=null && expense.length > 0 && (
                                        <div className="grid-md">
                                            <h2>項目花費明細</h2>
                                            <ExpenseDetailTable expense={
                                                expense
                                                 // 要用 new Date 轉換日期格式，才有辦法做 sort
                                                .sort((a,b)=>new Date(b.createDate_expense) - new Date(a.createDate_expense))
                                                // 最多顯示七項
                                                .slice(0,7)
                                            }/>
                                            
                                            {expense.length > 7 &&(
                                                <Link to="expense" className='btn btn--dark'>點我看更多</Link>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ) :
                            (
                                <div className="grid-sm">
                                    <p>先從新增一個類別試試看吧！</p>
                                    <CategoryForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            )
            :<Intro/>}
        </>
    )
}
