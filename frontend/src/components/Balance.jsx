import { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import { UserAtom } from '../store/user'
import axios from 'axios'
export const Balance = () => {
  const [balance,setBalance] = useState('')
  const user = useRecoilValue(UserAtom)
  useEffect(()=>{
    async function getBalance(){
      try {
        const config = {
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        }
        const {data} = await axios.get('/api/v1/account/balance',config)
        console.log(data)
        setBalance(data.balance)

        
      } catch (error) {
        console.log(error)
      }
    }
    getBalance()
  } ,[user.token])
    return <div className="flex">
        <div className="font-bold text-lg">
            Your balance
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}

