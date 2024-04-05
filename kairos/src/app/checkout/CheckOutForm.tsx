export default function CheckoutForm() {
    
    
    return (
        <form onSubmit={(e) => {e.preventDefault(); setCheckedout(true); }}>
                <div className="flex flex-row justify-center items-center gap-3">
                    <input
                        type="text"
                        required
                        name="name"
                        placeholder="Name"
                        className="input input-bordered mb-3 w-full"
                    />
                    <input
                        type="text"
                        required
                        name="surname"
                        placeholder="Surname"
                        className="input input-bordered mb-3 w-full"
                    />
                </div>
                <input
                    type="text"
                    required
                    name="address"
                    placeholder="Address"
                    className="input input-bordered mb-3 w-full"
                />
                <div className="flex flex-row justify-center items-center gap-3">
                    <input
                        type="text"
                        required
                        name="zipcode"
                        placeholder="Zip code"
                        className="input input-bordered mb-3 w-full"
                    />
                    <select className="select select-bordered mb-3 w-full">
                        <option disabled selected>Select a country</option>
                        <option>USA</option>
                        <option>France</option>
                        <option>UAE</option>
                        <option>Singapore</option>
                    </select>
                </div>

                <div className="divider mb-3"></div>

                <input
                    type="text"
                    required
                    name="cardNumber"
                    placeholder="Card number"
                    className="input input-bordered mb-3 w-full"
                />
                <div className="flex flex-row justify-center items-center gap-3">
                    <input
                        type="month"
                        required
                        name="expiryDate"
                        min={new Date().toISOString().slice(0,7)}
                        defaultValue={new Date().toISOString().slice(0,7)}
                        className="input input-bordered mb-3 w-full"
                    />
                    <input
                        type="text"
                        required
                        name="cvv"
                        placeholder="CVV"
                        className="input input-bordered mb-3 w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                    Checkout
                </button>
            </form>
    )
}