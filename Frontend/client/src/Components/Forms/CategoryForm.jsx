import { useState } from 'react';
import { addCategory } from '../../Services/category/CategoryServices';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import '../../Styles/FormStyles.css';

const CategoryForm = ({ onCategoryAdded }) => {
    const queryClient = useQueryClient();
    const [data, setData] = useState({
        categoryName: '',
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const mutation = useMutation({
        mutationFn: (categoryData) => addCategory(categoryData.categoryName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            toast.success('Category added successfully');
            setData({ categoryName: '' });
            if (onCategoryAdded) onCategoryAdded();
        },
        onError: () => toast.error('Unable to add category')
    });

    const onSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(data);
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                    type="text"
                    name="categoryName"
                    className="form-control"
                    placeholder="Enter category name"
                    onChange={onChange}
                    value={data.categoryName}
                    required
                />
            </div>

            <button type="submit" className="form-submit-btn" disabled={mutation.isPending}>
                {mutation.isPending ? 'Adding...' : 'Add Category'}
            </button>
        </form>
    );
};

export default CategoryForm;