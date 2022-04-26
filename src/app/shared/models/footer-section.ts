import { IconProp } from "@fortawesome/fontawesome-svg-core"

export interface FooterSection {
    title: string,
    items: {
        value: string,
        url: string,
        icon: string
    }[],
} 