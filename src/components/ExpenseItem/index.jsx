import React from 'react'
import { Link, useFetcher } from 'react-router-dom'

// 引入 helper
import { formatDate,getMatchCategory } from '../../helper'

// 引入 Icon
import { TrashIcon } from '@heroicons/react/24/solid'

// --- 底下開始撰寫 ---

export default function ExpenseItem(props) {
    const expense = props.expense
    const date = formatDate(expense.createDate_expense) // 轉換日期形式
    const category = getMatchCategory(expense.id_expense_of_category)||{}

    const fetcher = useFetcher()

    // 如果 showCategory 為 true 就顯示；false 就不顯示
    const {showCategory} = props

    return (
        <>
            <td>{expense.name_expense}</td>
            <td>{expense.amount_expense}</td>
            <td>{date}</td>
            <td>
                {
                    showCategory && (
                        <Link to={`category/${category.id_category}`} style={{"--accent": category.color_category}}>
                            {category.name_category}
                        </Link>
                    )
                }
            </td>
            <td>
                <fetcher.Form method="post">
                    {/* action 判斷點 */}
                    <input type="hidden" name='_action' value="deleteExpense"/>
                    <input type="hidden" name='expenseId' value={expense.id_expense}/>
                    
                    <button type="submit" className='btn btn--warning'> 
                        <TrashIcon width={26}/>
                    </button>
                </fetcher.Form>
            </td>
        </>
    )
}
