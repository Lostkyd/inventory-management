import InventoryForm from "../../Components/Forms/InventoryForm";
import InventoryList from "../../Components/List/InventoryList";
import "./InventoryManagement.css";

const InventoryManagement = () => {
    return (
        <div>
            <div className="category-container text-light">
                <div className="left-column">
                    <InventoryList/>
                </div>
                <div className="right-column">
                    <InventoryForm />
                </div>
            </div>
        </div>
    )
}

export default InventoryManagement;