const createCounter = (prefix: string) => {
    let index = 0;
    return () => `${prefix}-${++index}`;
};

export const getFigureId = createCounter('figure');
export const getMessageId = createCounter('message');
