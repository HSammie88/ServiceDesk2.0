import { useContext, useEffect, useRef, useState } from "react";
import type { CSSType, IDepartment, IPosition, IUser } from "../../types";
import { ContextProvider } from "../../components/Context/Context";
import { DepartmentQueries, PositionQueries, UserQueries } from "../../statics/DBQueries";

interface ISelectedUserProps {
    selectUser: (user: IUser | undefined) => void,
    user: IUser,
    style: CSSModuleClasses,
}

export default function SelectedUser({ selectUser, user, style }: ISelectedUserProps) {
    const { currentColors, showMessage } = useContext(ContextProvider)!
    const [departments, setDepartments] = useState<IDepartment[]>()
    const [positions, setPositions] = useState<IPosition[]>()
    const [currentDepartment, setCurrentDepartment] = useState<number>()
    const [currentPosition, setCurrentPosition] = useState<number>()
    const [isAdmin, setIsAdmin] = useState<boolean>()
    const firstnameRef = useRef<HTMLInputElement>(null)
    const lastnameRef = useRef<HTMLInputElement>(null)
    const surnameRef = useRef<HTMLInputElement>(null)
    const pwdRef = useRef<HTMLInputElement>(null)

    const styleProvider: CSSType = {
        backgroundColor: currentColors.transparentWindow,
        "--button-bg-color": currentColors.button.background,
        "--button-bg-color-hovered": currentColors.button.hoveredBackground,
        color: currentColors.textColor,
        "--button-text": currentColors.button.text
    }

    const handleSave = async () => {
        try {
            const updatedData: Partial<IUser> = {
                first_name: firstnameRef.current?.value,
                last_name: lastnameRef.current?.value,
                surname: surnameRef.current?.value,
                user_password: pwdRef.current?.value,
                depart_id: currentDepartment,
                position_id: currentPosition,
                user_is_admin: isAdmin,
            }
            if (!updatedData.first_name || !updatedData.last_name || !updatedData.user_password) throw new Error("Заполните все поля")
            await UserQueries.update(user.user_id, updatedData)
            showMessage("Успешное обновление пользователя: " + user.user_login, 'success')
            selectUser(undefined)
        } catch (err) {
            if (err instanceof Error) showMessage(err.message, 'error')
        }
    }

    const handleClose = () => {
        selectUser(undefined)
    }

    const handleDelete = async () => {
        try {
            await UserQueries.softRemove(user.user_id)
            showMessage(`Успешн${user.deleted ? "ая активация" : "ое удаление"}`, "success")
            selectUser(undefined)
        } catch (err) {
            if (err instanceof Error)
                showMessage(err.message, "error")
        }
    }
    const handleFirstLoad = async () => {
        try {
            const dbDepart = await DepartmentQueries.read()
            const dbPositions = (await PositionQueries.read()).filter(item => item.depart_id === user.depart_id)
            if (!dbDepart) throw new Error("Отдела не существует")
            setCurrentDepartment(user.depart_id)
            setCurrentPosition(user.position_id)
            setIsAdmin(user.user_is_admin)
            setDepartments(dbDepart)
            setPositions(dbPositions)
        } catch (err) {
            if (err instanceof Error) showMessage(err.message, 'error')
        }

    }

    const handleDepartmentChange = async () => {
        try {
            const dbPositions = (await PositionQueries.read()).filter(item => item.depart_id === currentDepartment)
            setPositions(dbPositions)
        } catch (err) {
            if (err instanceof Error) showMessage(err.message, "error")
        }
    }

    useEffect(() => {
        handleFirstLoad()
    }, [])

    useEffect(() => {
        handleDepartmentChange()
    }, [currentDepartment])

    return (
        <div style={styleProvider} className={style["selected-user-container"]}>
            <div className={style["user-info-container"]}>
                <div className={style["input-container"]}>
                    <label htmlFor="firstname-input">First Name:</label>
                    <input defaultValue={user.first_name} ref={firstnameRef} type="text" id="firstname-input" />
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="lastname-input">Last Name:</label>
                    <input defaultValue={user.last_name} ref={lastnameRef} type="text" id="lastname-input" />
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="surname-input">Surname (optional):</label>
                    <input defaultValue={user.surname} ref={surnameRef} type="text" id="surname-input" />
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="pwd-input">Password:</label>
                    <input defaultValue={user.user_password} ref={pwdRef} type="password" id="pwd-input" />
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="department-select">Department</label>
                    <select value={currentDepartment} onChange={(e) => setCurrentDepartment(Number(e.target.value))} id="department-select">
                        {departments && departments.map((item, id) => <option key={id} value={item.depart_id}>{item.depart_name}</option>)}
                    </select>
                </div>
                <div className={style["input-container"]}>
                    <label htmlFor="position-select">Position</label>
                    <select value={currentPosition} onChange={(e) => setCurrentPosition(Number(e.target.value))} id="position-select">
                        {positions && positions.map((item, id) => <option key={id} value={item.position_id}>{item.position_name}</option>)}
                    </select>
                </div>
                <div className={style["checkbox-container"]}>
                    <input checked={isAdmin} onChange={() => setIsAdmin(!isAdmin)} type="checkbox" id="is-admin-checkbox" />
                    <label htmlFor="is-admin-checkbox">User is administrator</label>
                </div>
            </div>
            <div className={style["buttons-container"]}>
                <button onClick={() => handleSave()}>Save</button>
                <button onClick={() => handleClose()}>Close</button>
                <button onClick={() => handleDelete()}>{!user.deleted ? "Delete" : "Activate"}</button>
            </div>
        </div>
    )
}