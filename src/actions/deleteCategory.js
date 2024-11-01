import React from 'react'
import { redirect } from 'react-router-dom'

// 引入 helper
import { deleteItem,getMacthExpense } from '../helper'

// 引入 toast
import { toast } from 'react-toastify'


// --- 底下開始撰寫 ---

export async function deleteCategoryAction({params}) {
    // 刪除類別
    deleteItem({key_name:'category', id:params.id})

    // 刪除該類別內所有的項目
    const filterExpneses = getMacthExpense(params.id)
    filterExpneses.forEach(item => {
        deleteItem({key_name:'expense', id:item.id_expense})
    })

    toast.success('成功刪除類別！')
    return redirect('/')
}
