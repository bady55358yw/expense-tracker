import React from 'react'

// 引入組件
import ExpenseItem from '../ExpenseItem'

// --- 底下開始撰寫 ---

export default function ExpenseDetailTable(props) {
  const expense_arr = props.expense
  // 如果 showCategory 有值 ( 即 none )會返過來變成 false；沒值為 true
  const showCategory = !props.showCategory 

  return (
    <div className='table'>
      <table>
        <thead>
          <tr>
            {
              ["項目","金額","日期",showCategory?"類別":"","刪除"].map((item,index)=>{
                return <th key={index}>{item}</th>
              })
            }
          </tr>
        </thead>

        <tbody>
            {
              expense_arr.map((item)=>{
                return <tr key={item.id_expense}><ExpenseItem expense={item} showCategory={showCategory}/></tr>
              })
            }
        </tbody>
      </table>
    </div>
  )
}
