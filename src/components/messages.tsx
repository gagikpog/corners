import { useContext } from 'react';
import { Context } from '../context';

export function Messages() {
    const { messages } = useContext(Context);
    return (
        <div className='cg-messages'>
            {
                messages.map((message) => {
                    return <div key={message.id} className={`cg-message cg-message-${message.type}`}>{message.text}</div>
                })
            }
        </div>
    );
}
