import { CircleUser } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

interface IUserProfileProps{
    style: CSSModuleClasses;
    setButtonHovered: Dispatch<SetStateAction<boolean>>
}

export default function UserProfile({style, setButtonHovered}: IUserProfileProps){
    const [settingsVisibility, setSettingsVisibility] = useState(false)
    
    const handleClick = () => setSettingsVisibility(!settingsVisibility)
    
    return <>
        <CircleUser onClick={handleClick}/>
        {settingsVisibility ? <div className={style["settings-container"]}>
            <div>

            </div>
            <button onMouseLeave={()=>setButtonHovered(false)} onMouseEnter={()=>setButtonHovered(true)}>Exit</button>
        </div> : null}
    </>
}