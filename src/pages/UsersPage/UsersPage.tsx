import { useContext, useEffect, useState } from 'react'
import style from './UsersPage.module.css'
import { ContextProvider } from '../../components/Context/Context'
import type { CSSType, IUser } from '../../types'
import { UserQueries } from '../../statics/DBQueries'
import UserCard from './UserCard'
import SelectedUser from './SelectedUser'
import FilterButton from './FilterButton'

export default function UsersPage() {
    const { currentColors, showMessage } = useContext(ContextProvider)!
    const [users, setUsers] = useState<IUser[]>([])
    const [selectedUser, setSelectedUser] = useState<IUser | undefined>()
    const [filterAction, setFilterAction] = useState<string>()

    const styleProvider: CSSType = {
        "--main-bg": currentColors.window,
        "--item-bg": currentColors.windowItem,
        color: currentColors.textColor,
        "--pointer-event": selectedUser ? "none" : "all",
        "--inputs-color": currentColors.input.background,
        "--inputs-text-color": currentColors.input.text,
        "--inputs-border": `1px solid ${currentColors.input.border}`,
        "--inputs-placeholder-color": currentColors.input.placeholder,
        "--button-text": currentColors.button.text,
        "--button-hover-bg": currentColors.button.hoveredBackground,
        "--button-bg": currentColors.button.background
    }

    const filterButtons: [string, keyof IUser][]=[
        [
            "Lastname",
            "last_name"
        ],
        [
            "Login",
            "user_login"
        ],
        [
            "Department",
            "depart_id"
        ]
    ]

    const getUsers = async () => {
        try {
            const dbUsers = await UserQueries.read()
            if (!dbUsers) throw new Error('Ошибка загрузки пользователей')
            setUsers(dbUsers)
        } catch (err) {
            if (err instanceof Error)
                showMessage(err.message, 'error')
        }
    }

    const selectUser = (user: IUser | undefined) => {
        setSelectedUser(user)
    }

    useEffect(() => {
        if (!selectedUser)
            getUsers()
    }, [selectedUser])

    return (
        <div style={styleProvider} className={style.container}>
            {users.length > 0 ? <>
                <div className={style["filter-container"]}>
                    <div className={style['searchbar-container']}>
                        <input type="text" placeholder='Search' />
                        <button>Search</button>
                    </div>
                    <div className={style["filter-buttons-container"]}>
                        {filterButtons && filterButtons.map((item, id)=><FilterButton setAction={setFilterAction} action={item[1]} text={item[0]} key={id}/>)}
                    </div>
                </div>
                <div className={style['cards-container']}>
                    {users.map(item => <UserCard selectUser={selectUser} user={item} style={style} key={`${item.user_id}_${item.depart_id}`} />)}
                </div>
            </> : null}
            {selectedUser ? <SelectedUser style={style} user={selectedUser} selectUser={selectUser} /> : null}
        </div>
    )
}