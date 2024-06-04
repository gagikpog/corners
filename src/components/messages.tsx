import { useContext } from 'react';
import { Context } from '../context';

export function Messages() {
    const { messages } = useContext(Context);
    return (
        <div className='messages'>
            {
                messages.map((message) => {
                    return <div className={`message message-${message.type}`}>{message.text}</div>
                })
            }
        </div>
    );
}
