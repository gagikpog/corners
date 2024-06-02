const ITEMS_ARRAY = Array(8 * 9).fill(null);

export default function Board() {
    return (
        <>
            {
                ITEMS_ARRAY.map((_, index): JSX.Element => {
                    return <div className="item" key={index}></div>
                })
            }
        </>
    );
}
