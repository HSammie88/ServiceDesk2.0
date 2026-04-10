import type { Dispatch, SetStateAction } from "react"

interface IFilterButtonProps{
    text: string,
    action: string,
    setAction: Dispatch<SetStateAction<string | undefined>>
}

export default function FilterButton({text}: IFilterButtonProps){
    return (
        <button>{text}</button>
    )
}