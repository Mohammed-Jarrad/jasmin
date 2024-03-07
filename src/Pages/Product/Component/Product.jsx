import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Loader from '../../../Components/Loader/Loader'

function Product() {
	const { _id } = useParams()
	const [product, setProduct] = useState({})
	const [loader, setLoader] = useState(true)

	async function getSingleProduct() {
		try {
			const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/products/${_id}`)
			if (data.message == 'success') {
				setProduct(data.product)
			}
		} catch (error) {
			toast.error(error.response.data.message || 'Error to load your data :(')
		} finally {
			setLoader(false)
		}
	}

	useEffect(() => {
		getSingleProduct()
	}, [])

	if (loader) {
		return <Loader />
	}

	return <div>Product with id - {_id}</div>
}

export default Product
