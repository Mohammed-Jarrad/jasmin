import { useParams } from 'react-router-dom'
import CategoryProducts from '../../Components/CategoryProducts/CategoryProducts'

const SingleCategory = () => {
	const { _id } = useParams()

	return (
		<div>
			<CategoryProducts categoryId={_id} />
		</div>
	)
}

export default SingleCategory
