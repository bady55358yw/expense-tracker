import React, {useEffect, useRef} from 'react'
import { Form, useFetcher } from 'react-router-dom'

// 引入 icon
import { CurrencyDollarIcon } from '@heroicons/react/24/solid'

// --- 底下開始撰寫 ---

export default function CategoryForm() {

  // useFetcher 會判斷表單目前提交請求的狀態
  // 正在提交請求的話，state 會是 submitting，所以 isSubmitting 會是 true
  // 提交請求成功的話，state 會是 success，所以 isSubmitting 會是 false
  const fetcher = useFetcher()
  const isSubmitting = fetcher.state === "submitting"

  const formRef = useRef()
  const focusRef = useRef()

  useEffect(()=>{
    if (isSubmitting === false) {
      formRef.current.reset()
      focusRef.current.focus()
    }
  },[isSubmitting])

  return (
    <div className='form-wrapper'>
       <h2 className='h3'>新增類別</h2> 
       <fetcher.Form method='post' className='grid-sm' ref={formRef}>
          <div className="grid-xs">
            <label htmlFor="categoryName">類別名稱</label>
            <input  type="text" 
                    id="categoryName" name='categoryName'
                    ref={focusRef} 
                    placeholder='如：食物類、交通類...' 
                    required/>
          </div>
          <div className="grid-xs">
            <label htmlFor="categoryAmount">類別預算</label>
            <input  type="number" 
                    min={0} step={1} 
                    id="categoryAmount" name='categoryAmount' 
                    placeholder='如：$100、$500...' 
                    required/>
          </div>

          {/* action 判斷點 */}
          <input type="hidden" name='_action' value="newCategory"/>

          <button type='submit' className='btn btn--dark' disabled={isSubmitting}>
            {
              isSubmitting ? <span>處理中...</span> 
              : (
                <>
                  <span>新增類別</span>
                  <CurrencyDollarIcon width={28}/>
                </>
              )
            }
          </button>
       </fetcher.Form>
    </div>
  )
}
