import { useContext, useEffect, useState } from "react"
import { DepartmentQueries } from "../../statics/DBQueries"
import type { IDepartment, IUser } from "../../types"
import { ContextProvider } from "../../components/Context/Context"

interface IUserCardProps {
    user: IUser,
    style: CSSModuleClasses,
    selectUser: (user: IUser | undefined) => void,
}

export default function UserCard({ user, style, selectUser }: IUserCardProps) {
    const { showMessage } = useContext(ContextProvider)!
    const [depart, setDepart] = useState<IDepartment>()

    const getDepartment = async () => {
        try {
            const department = await DepartmentQueries.readOne(user.depart_id)
            if (!department) throw new Error('Ошибка чтения пользователя!')
            setDepart(department)
        } catch (err) {
            if (err instanceof Error) showMessage(err.message, 'error')
        }
    }

    const handleClick = () => {
        selectUser(user)
    }

    useEffect(() => {
        getDepartment()
    }, [])

    return (
        <div onClick={() => handleClick()} className={style['user-card']}>
            {depart ? <>
                <h3 style={{ color: user.deleted ? 'red' : 'inherit' }}>{`${user.last_name} ${user.first_name[0]}.${user.surname ? user.surname[0] + "." : ""}`}</h3>
                <h3>{user.user_login}</h3>
                <h3>{depart.depart_name}</h3>
            </> : null}
        </div>
    )
}