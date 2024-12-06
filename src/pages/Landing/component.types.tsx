import { ReactElement } from "react"

export interface NavbarItem {
    icon: ReactElement
    label: string
    value: string
}

export interface NavbarSubItem {
    icon: ReactElement
    label: string
    value: string
}

export interface ComponentProps {
    children?: ReactElement
    navbarItems: Array<NavbarItem>
    navbarSubItems: Array<NavbarSubItem>
    logo: string | null
    decorationBody: string | null
}