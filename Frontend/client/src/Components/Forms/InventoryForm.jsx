const InventoryForm = () => {
    return (
        <div className="item-form-container" style={{height:'100vh', overflowY: 'auto', overflowX: 'hidden'}}>
            <div className="mx-2 mt-2">
                <div className="row">
                    <div className="card col-ml-8 form-container">
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">
                                        <img src ="https://placehold.co/48x48" alt="" width={48}/>
                                    </label>
                                    <input type="file" name="image" id="image" className="form-control" hidden/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Product name</label>
                                    <input type="text" 
                                            name="name" 
                                            id="name" 
                                            className="form-control" 
                                            placeholder="Product name"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">
                                        Category
                                    </label>
                                    <select name="category" id="category" className="form-control">
                                        <option value="">Select category</option>
                                        <option value="category 1">----Test 1----</option>
                                        <option value="category 2">----Test 2----</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">Quantity</label>
                                    <input type="number" 
                                            name="quantity" 
                                            id="quantity" 
                                            className="form-control" 
                                            placeholder="0"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Price</label>
                                    <input type="number" 
                                            name="price" 
                                            id="price" 
                                            className="form-control" 
                                            placeholder="&#8369; 99.00"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Product description</label>
                                    <textarea 
                                            rows="5"
                                            name="description" 
                                            id="description" 
                                            className="form-control" 
                                            placeholder="Product description"
                                    />
                                </div>
                                <button type="submit" className="btn btn-warning w-100" >Save</button>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryForm;