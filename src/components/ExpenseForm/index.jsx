import React, { useEffect, useRef } from 'react'
import { Form,useFetcher } from 'react-router-dom'

// 引入 icon
import { PlusCircleIcon } from '@heroicons/react/24/solid'

// --- 底下開始撰寫 ---

export default function ExpenseForm(props) {
    const category = props.category

    const fetcher = useFetcher()
    const isSubmitting = fetcher.state === 'submitting'

    const formRef = useRef()
    const focusRef = useRef()

    useEffect(()=>{
        if (!isSubmitting){
            formRef.current.reset()
            focusRef.current.focus()
        }
    },[isSubmitting])

    return (
        <div className='form-wrapper'>
            <h2 className='h3'>新增
                <span className='accent'>
                    {
                        (category.length === 1 && category.map(item=>item.name_category))
                    }
                </span>
                項目
            </h2> 
            <fetcher.Form method='post' className='grid-sm' ref={formRef}>
                <div className='expense-inputs'>
                    <div className="grid-xs">
                        <label htmlFor="expenseName">項目名稱</label>
                        <input  type="text" 
                                id="expenseName" name='expenseName'
                                ref={focusRef} 
                                placeholder='如：咖啡、火車票...' 
                                required/>
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="expenseAmount">項目金額</label>
                        <input  type="number" 
                                min={0} step={1} 
                                id="expenseAmount" name='expenseAmount' 
                                placeholder='如：$50、$100、$300...' 
                                required/>
                    </div>
                </div>
                
                <div className="grid-xs">
                    <label htmlFor="expenseCategory">項目類別</label>
                    <select name="expenseCategory" id="expenseCategory">
                        {
                            category.map((obj)=>{
                                return <option key={obj.id_category} value={obj.id_category}>{obj.name_category}</option>
                            })
                        }
                    </select>
                </div>

                {/* action 判斷點 */}
                <input type="hidden" name='_action' value="newExpense"/>

                <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
                    {
                        isSubmitting? <span>處理中...</span>
                        : (
                            <>
                                <span>新增項目</span>
                                <PlusCircleIcon width={28}/>
                            </>
                        )
                    }
                </button>
            </fetcher.Form>
        </div>
    )
}
