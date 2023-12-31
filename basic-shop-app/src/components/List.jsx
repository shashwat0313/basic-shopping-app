import ListHeading from "./ListHeading"

export default function List({ itemArray, sortByPrice, sortByQty, addToCart }) {
    return (
        <ul className="list">

            <ListHeading sortByPrice={sortByPrice} sortByQty={sortByQty} />
            <p></p>
            {itemArray.map((x, idx) => {
                return <li key={idx}>
                    <span className="name-col">{x.name}</span>
                    <span className="qty-col">{x.quantity}</span>
                    <span className="price-col">{x.price}</span>
                    <span className="sort-marker"></span>
                    <button value={x.name} onClick={addToCart}>A</button>
                </li>
            })}

        </ul>
    )
}