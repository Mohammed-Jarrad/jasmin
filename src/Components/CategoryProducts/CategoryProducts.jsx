import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../Loader/Loader'
import './CategoryProducts.css'

const CategoryProducts = ({ categoryId }) => {
	const [category, setCategory] = useState({})
	const [products, setProducts] = useState([])
	// const [products, setProducts] = useState([])
	const [loading, setLaoding] = useState(true)

	async function getCategoryInfo() {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${categoryId}`)
			if (data.message == 'success') {
				setCategory(data.category)
			}
		} catch (error) {
			toast.error(error.response.data.message || 'Error to load your data :(')
		} finally {
			setLaoding(false)
		}
	}
	async function getCategroyProducts() {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${categoryId}`)
			if (data.message == 'success') {
				setProducts(data.products)
			}
		} catch (error) {
			toast.error(error.response.data.message || 'Error to load your data :(')
		} finally {
			setLaoding(false)
		}
	}

	useEffect(() => {
		getCategoryInfo()
		getCategroyProducts()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (loading) return <Loader />

	return (
		<div className="category-products">
			{/* Title */}
			<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
				<h3>Products for category {category.name}</h3>
				<img src={category?.image?.secure_url || ''} alt="" width={50} />
			</div>

			{/* Products */}
			<div className="products">
				{products.length > 0 ? (
					<>
						{products.map(pro => (
							<div key={pro._id} className="product">
								<img src={pro.mainImage.secure_url} alt={pro.name} />
								<h6>{pro.name}</h6>
								<p>${pro.price}</p>
								<Link to={`/product/${pro._id}`}>
									<button>Show More</button>
								</Link>
							</div>
						))}
					</>
				) : (
					<p>No Products</p>
				)}
			</div>
		</div>
	)
}

export default CategoryProducts
