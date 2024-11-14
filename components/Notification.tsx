import React from 'react'
import { Snippet } from '@nextui-org/snippet';

interface NotificationProps {
    text: string;
    type: "success" | "error" ;
}


export const Notification : React.FC<NotificationProps> = ({text, type}) => {
  return (
    <Snippet hideSymbol size='sm' variant='flat' color={type === "success" ? 'success':'danger'} >
        {text}
    </Snippet>
  )
}

