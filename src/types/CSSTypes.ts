import type { CSSProperties } from "react";

type CSSType = CSSProperties & {
    [key: `--${string}`]: string
}

export {type CSSType}