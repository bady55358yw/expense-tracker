import React from 'react'
import { calculateCurrentSpent } from '../../helper'
import { Form, Link } from 'react-router-dom'

// 引入 Icon
import { TrashIcon,BanknotesIcon } from '@heroicons/react/24/solid'

// --- 底下開始撰寫 ---

export default function CategoryItem(props) {
    const {amount_category, color_category, id_category,name_category} = props.category
    const spend = calculateCurrentSpent(id_category)
    
    // 如果 showDelete 沒有值，則會直接給 false；有值的話，就一樣是原本的值
    const {showDelete = true} = props

    function checkDeleteCategory(e) {
        if (!window.confirm("確定要刪除類別？")) {
            e.preventDefault()
        }
    }

    return (
        <div className='budget' style={{"--accent":color_category}}>
            <div className='progress-text'>
                <h3>{name_category}</h3>
                <p>預算：{amount_category}</p>
            </div>
            
            <progress value={spend} max={amount_category}></progress>

            <div className='progress-text'>
                <small>已花費：{spend}</small>
                <small>剩餘可用：{amount_category-spend}</small>
            </div>
            {!showDelete ?
                (
                    <div className='flex-sm'>
                        <Link to={`category/${id_category}`} className='btn'>
                            <span>類別總覽</span>
                            <BanknotesIcon width={26}/>
                        </Link>
                    </div>
                    
                    
                ):
                (
                    <Form method='post' action='deleteCategory' onSubmit={checkDeleteCategory} >
                        <button type="submit" className='btn'>
                            <span>刪除類別</span>
                            <TrashIcon width={26}/>
                        </button>
                    </Form>
                )
            }
        </div>
    )
}
