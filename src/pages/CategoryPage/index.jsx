import React from 'react'
import { useLoaderData } from 'react-router-dom'

// 引入 helper
import { 
    getMatchCategory,getMacthExpense,
    waitSec,
    deleteItem,
    createExpense } from '../../helper'

// 引入一般組件
import CategoryItem from '../../components/CategoryItem'
import ExpenseForm from '../../components/ExpenseForm'
import ExpenseDetailTable from '../../components/ExpenseDetailTable'

// 引入 toast 視窗
import { toast } from 'react-toastify'

// --- 底下開始撰寫 ---

export function categoryLoader({params}) {
    // 因為 useParams() 只能在自己的函數使用，所以其他一般函數要取 params，要在參數用 {params} 去取
    const category = getMatchCategory(params.id)
    const expense = getMacthExpense(params.id)

    if (!category) {
        throw new Error('此類別不存在哦...QQ')
    }
    else if (!expense) {
        throw new Error('項目為空哦...QQ')
    }

    return {category,expense}
}

export async function categoryAction({request}){
    await waitSec() 

    const data = await request.formData()
    const {_action,...values} = Object.fromEntries(data)

    if (_action === 'newExpense'){
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

export default function CategoryPage() {

    const {category,expense} = useLoaderData()

    return (
        <div className='grid-lg' style={{"--accent": category.color_category}}>
            <h1 className='h2'>
                <span className='accent'>{category.name_category}</span>總覽
            </h1>
            <div className='flex-lg'>
                <CategoryItem category={category}/>
                <ExpenseForm category={[category]}/>
            </div>
            { expense && expense.length > 0 && (
                <div className='grid-md"'>
                    <h2><span className='accent'>{category.name_category}</span>項目</h2>
                    <ExpenseDetailTable expense={expense} showCategory={'none'}/>
                </div>
            )}
            
        </div>
    )
}
