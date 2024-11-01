// 引入 nanoid
import { nanoid } from 'nanoid';

// --- 底下開始撰寫 ---

// 延遲執行：提交表單時延遲數秒，提升 UI/UX
export const waitSec = () => {
    // 產生一個 0 到 800 毫秒之間的隨機延遲時間
    new Promise((res)=>setTimeout(res, Math.random()*800))
}

// 取出資料：從 local storage 取出
export const fetchData = ((key_name)=>{
    return JSON.parse(localStorage.getItem(key_name));
})

// 建立使用者：在 local storage 新增
export const createUser = ((name)=>{
    // localStorage.setItem() 的語法：localStorage.setItem('key', 'value');
    // localStorage.setItem('car', JSON.stringify({name:'toyoto',price:100}))
    return localStorage.setItem("userName", JSON.stringify(name))
})

// 建立類別：在 local storage 新增
export const createCategory = (({name,amount})=>{
    const newCategory = {
        id_category: nanoid(),
        name_category: name,
        amount_category: Number(amount),
        createDate_category: new Date(),
        color_category: createRandomColor()
    }
    
    const existingCategory = fetchData("category")?? [];
    return localStorage.setItem("category", JSON.stringify([...existingCategory,newCategory]))
})

// 建立項目：在 local storage 新增
export const createExpense = ({name,amount,id_cate}) =>{
    const newExpense = {
        id_expense: nanoid(),
        name_expense: name,
        amount_expense: amount,
        createDate_expense: new Date(),
        id_expense_of_category: id_cate
    }

    const existingExpense = fetchData("expense")?? []
    return localStorage.setItem("expense", JSON.stringify([...existingExpense,newExpense]))
}

// 刪除使用者、類別、項目：在 local storage 刪除
export const deleteItem = ({key_name, id})=>{
    const existingData = fetchData(key_name)?? []
    console.log('@@--existingData',existingData,key_name);

    if(id) {
        const idKey = key_name === 'expense'? 'id_expense' : 'id_category'
        const newData = existingData.filter(item => item[idKey] !== id)
        
        return localStorage.setItem(key_name, JSON.stringify(newData))
    }
    else {
        return localStorage.removeItem(key_name)
    }
}

// 隨機生成顏色
function createRandomColor(){
    const hue = Math.floor(Math.random()*34) // 34 是 360 的質因數，所以可降低重複率
    const saturation = '50%'
    const lightness = '65%'
    
    return `${hue} ${saturation} ${lightness}`
}

// 計算該類別的所有項目花費加總
export const calculateCurrentSpent = (id_category) => {
    const expenses = fetchData("expense")?? []

    const categorySpend = expenses.reduce((acc, item)=>{
        if (item.id_expense_of_category != id_category){
            return acc
        }
        else {
            return acc = acc + Number(item.amount_expense)
        }
    },0)
    return categorySpend
} 

// 轉換日期格式
export const formatDate = (isoDate) => {
    const dateTime = new Date(isoDate)

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, '0'); // 月份+1，補0
    const day = String(dateTime.getDate()).padStart(2, '0');
    const hours = String(dateTime.getHours()).padStart(2, '0');
    const minutes = String(dateTime.getMinutes()).padStart(2, '0');
    const seconds = String(dateTime.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day}  ${hours}:${minutes}:${seconds}`
}

// 找到 Expense 對應的 Category
export const getMatchCategory = (id) => {
    const categories = fetchData("category")?? [];
    // 用 find 去找對應的 id，找到會將該 item(物件) 回傳出來
    const match_obj = categories.find(item => item.id_category === id)

    if (match_obj){
        return ({
            id_category: match_obj.id_category,
            name_category: match_obj.name_category,
            amount_category: match_obj.amount_category,
            color_category: match_obj.color_category
        })
    }
}

// 找到對應的 Expense
export const getMacthExpense = (id) => {
    const expenses = fetchData("expense")?? [];
    const match_arr = expenses.filter(item => item.id_expense_of_category === id)

    if (match_arr){
        return match_arr
    }
}

/* 
    1. local storage 是一個網頁 API，就像是一個小的資料庫，可以在使用者的瀏覽器中儲存資料，
        下次使用者重新打開瀏覽器時依舊會有先前的資料(不用從伺服器拿) 
    2. 用 setItem 方法來儲存資料，用 getItem 方法來取出資料
    3. setItem 只能儲存的資料型別為字串，所以要靠 JSON.stringify 將物件轉成字串
    4. getItem 只能取出的資料型別為字串，所以要靠 JSON.parse 將字串轉成物件
*/