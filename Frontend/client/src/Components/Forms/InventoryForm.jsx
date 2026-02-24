import {useState, useContext, useMemo } from "react";
import { AppContext } from "../../Context/Context";
import { assets } from "../../assets/assets";
import toast from "react-hot-toast";
import { addProduct } from "../../Services/product/ProductServices";

const InventoryForm = () => {
    const {categories, setProducts, products} = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
            category: "",
            productName: "",
            productQuantity: "",
            productPrice: "",
            productDescription: ""
        });

    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : assets.upload;
    }, [image]);

    const onChangeProductHandler = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    }

    const onChangeSubmitProductHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("product", JSON.stringify(data));
        formData.append("file", image);
        try{
            if(!image){
                toast.error("Please select an image for the product");
                return;
            }
            const response = await addProduct(formData);
            if(response.status === 201){
                setProducts([...products, response.data]);
                toast.success("Product added successfully");
                setData({
                    categoryId: "",
                    productName: "",
                    productQuantity: "",
                    productPrice: "",
                    productDescription: ""
                });
                setImage(false);
            }else{
                toast.error("Unable to add product");
            }
        }catch(error){
            toast.error("Unable to add product");
        }finally{
            setLoading(false);
        }
    }
    return (
        <form onSubmit={onChangeSubmitProductHandler}>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    <img src={imagePreview} alt="Product" width={48} />
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    hidden
                    onChange={(e) => setImage(e.target.files[0])}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="category" className="form-label" >
                    Category
                </label>
                <select className="form-control" name="categoryId" id="category" onChange={onChangeProductHandler} value={data.categoryId} required>
                    <option value="">Select a category</option>
                    {categories.map(((category, index) => (
                        <option key={index} value={category.categoryId}>
                            {category.categoryName}
                        </option>
                    )))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                    Product Name
                </label>
                <input
                    type="text"
                    name="productName"
                    id="productName"
                    className="form-control"
                    placeholder="Enter product name"
                    onChange={onChangeProductHandler}
                    value={data.productName}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                    Quantity
                </label>
                <input
                    type="number"
                    id="productQuantity"
                    name="productQuantity"
                    className="form-control"
                    placeholder="Enter quantity"
                    onChange={onChangeProductHandler}
                    value={data.productQuantity}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="price" className="form-label">
                    Price
                </label>
                <input
                    type="number"
                    id="productPrice"
                    name="productPrice"
                    className="form-control"
                    placeholder="Enter price"
                    onChange={onChangeProductHandler}
                    value={data.productPrice}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    id="productDescription"
                    name="productDescription"
                    className="form-control"
                    rows="3"
                    placeholder="Product description"
                    onChange={onChangeProductHandler}
                    value={data.productDescription}
                />
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? "Saving..." : "Save Product"}
            </button>
        </form>
    )
}

export default InventoryForm;
