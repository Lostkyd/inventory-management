import { useEffect, useState, useContext , useMemo} from "react";
import { assets } from "../../assets/assets";
import { addCategory } from "../../Service/CategoryServices";
import { AppContext } from "../../Context/Context";
import toast from "react-hot-toast";

const CategoryForm = ({ onCategoryAdded }) => {
    const { setCategories, categories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        categoryName: "",
        categoryDescription: "",
        imgUrl: ""
    });
    const imagePreview = useMemo(() => {
        return image ? URL.createObjectURL(image) : assets.upload;
    }, [image]);
    useEffect(() => {
        console.log(data);
    }, [data]);

    const onChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Please select an image for the category");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("data", new Blob([JSON.stringify({
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription
        })], { type: "application/json" }));
        formData.append("file", image);

        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added successfully");
                setData({ categoryName: "", categoryDescription: "", imgUrl: "" });
                setImage(false);
                if (onCategoryAdded) onCategoryAdded();
            }
        } catch (error) {
            console.error("Status:", error.response?.status);
            console.error("Data:", error.response?.data);
            toast.error("Unable to add category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    <img src={imagePreview} alt="Category" width={48} />
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
                <label htmlFor="categoryName" className="form-label">
                    Category Name
                </label>
                <input
                    type="text"
                    id="categoryName"
                    name="categoryName"
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={onChange}
                    value={data.categoryName}
                    required
                />
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Description
                </label>
                <textarea
                    id="description"
                    name="categoryDescription"
                    className="form-control"
                    rows="3"
                    placeholder="Optional description"
                    onChange={onChange}
                    value={data.categoryDescription}
                />
            </div>

            <button type="submit" className="btn btn-success w-100" disabled={loading}>
                {loading ? "Adding..." : "Submit"}
            </button>
        </form>
    );
};

export default CategoryForm;