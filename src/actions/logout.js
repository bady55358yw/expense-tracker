import { redirect } from 'react-router-dom'
// 引入 toast 視窗
import { toast } from 'react-toastify'
import { deleteItem } from '../helper'

export async function logoutAction(){
    // 刪除使用者，key 必須是字串
    deleteItem({key_name:'userName'})
    deleteItem({key_name:'category'})
    deleteItem({key_name:'expense'})
    toast.success('成功刪除帳戶！')
    // 重新導向到主頁面
    return redirect("/")
}