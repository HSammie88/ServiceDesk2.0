import { useContext, useEffect, useState } from "react"
import { DepartmentQueries } from "../../statics/DBQueries"
import type { IDepartment } from "../../types"
import { ContextProvider } from "../../components/Context/Context"

interface IUserCardProps{
    fullName: string,
    userLogin: string,
    departID: number,
    isDeleted: boolean,
    style: CSSModuleClasses,
}

export default function UserCard({fullName,userLogin,departID,isDeleted, style}: IUserCardProps){
    const {showMessage} = useContext(ContextProvider)!
    const [depart, setDepart] = useState<IDepartment>()

    const getDepartment = async ()=>{
        try{
            const department = await DepartmentQueries.readOne(departID)
            if(!department) throw new Error('Ошибка чтения пользователя!')
            setDepart(department)
        }catch(err){
            if(err instanceof Error) showMessage(err.message, 'error')
        }
    }
    
    useEffect(()=>{
        getDepartment()
    },[])
    
    return(
        <div className={style['user-card']}>
            {depart ? <>
                <h3>{fullName}</h3>
                <h3>{userLogin}</h3>
                <h3>{depart.depart_name}</h3>
                {isDeleted?<h3>Deleted</h3>:null}
            </>:  null}
        </div>
    )
}