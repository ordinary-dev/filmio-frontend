import { ReactElement } from 'react'

type InfoPanelProps = {
    icon: ReactElement,
    text: string
}

const InfoPanel = (props: InfoPanelProps) => (
    <div className="flex align-center text-xs font-mono bg-gray-100 p-1.5 rounded-lg">
        {props.icon}
        <div>{props.text}</div>
    </div>
)

export default InfoPanel
