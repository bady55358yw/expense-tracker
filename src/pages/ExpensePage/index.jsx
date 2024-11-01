import React from 'react'
import { useLoaderData } from 'react-router-dom'

// 引入 helper
import { fetchData,deleteItem } from '../../helper'

// 引入一般組件
import ExpenseDetail from '../../components/ExpenseDetailTable'

// 引入 toast 視窗
import { toast } from 'react-toastify'

// loader
export function expenseLoader(){
  const expense = fetchData('expense')||[];
  return {expense}
}

// action
export async function expenseAction({request}){
    // 取得表單提交的資料
    // 因為用 request.formData() 要等待資料返回，為非同步方法，所以要寫async、await
    const data = await request.formData()
    // 用 Object.fromEntries() 取出表單的資料，除了_action，其他資料以物件形式放入values內
    const {_action, ...values} = Object.fromEntries(data)

    if (_action === 'deleteExpense'){
      try {
        deleteItem({key_name:'expense',id:values.expenseId})
        return toast.success('刪除項目成功')
      }
      catch(error) {
          throw new Error('刪除項目出現問題...QQ')
      }
    }

}

export default function ExpensePage() {
  // 因在 loader 的 return 用物件的形式，所以取出時也要用物件的形式去解構
  const {expense} = useLoaderData()
  return (
    <div className='grid-lg'>
      <h2>項目總覽表</h2>
      {
        expense!=null && expense.length > 0 ?
        (
          <div className='grid-md"'>
            <h3>全部明細 <small>( 共 {expense.length} 項 )</small></h3>
            <ExpenseDetail expense={expense.sort((a,b)=>new Date(b.createDate_expense) - new Date(a.createDate_expense))}/>
          </div>
        ):
        (
          <p>目前沒有項目明細:D</p>
        )
      }
    </div>
  )
}
