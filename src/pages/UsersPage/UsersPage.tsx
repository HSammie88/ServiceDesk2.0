import { useContext, useEffect, useState } from 'react'
import style from './UsersPage.module.css'
import { ContextProvider } from '../../components/Context/Context'
import type { CSSType, IUser } from '../../types'
import { UserQueries } from '../../statics/DBQueries'
import UserCard from './UserCard'

export default function UsersPage(){
    const {currentColors, showMessage} = useContext(ContextProvider)!
    const [users, setUsers] = useState<IUser[]>([])

    const styleProvider: CSSType = {
        "--main-bg": currentColors.window,
        "--item-bg": currentColors.windowItem,
        color: currentColors.textColor,
    }

    const getUsers = async() =>{
        try{
            const dbUsers = await UserQueries.read()
            if(!dbUsers) throw new Error('Ошибка загрузки пользователей')
            setUsers(dbUsers)
        }catch(err){
            if(err instanceof Error)
            showMessage(err.message, 'error')
        }
    }

    useEffect(()=>{
        getUsers()
    },[])
    
    return (
        <div style={styleProvider} className={style.container}>
            {users?<>
                <div></div>
                {users.map((item, id)=><UserCard fullName={`${item.last_name} ${item.first_name[0]}.${item.surname ? item.surname[0]+'.': ""}`} departID={item.depart_id} isDeleted={item.deleted} userLogin={item.user_login} style={style} key={id}/>)}
            </> : null}
        </div>
    )
}