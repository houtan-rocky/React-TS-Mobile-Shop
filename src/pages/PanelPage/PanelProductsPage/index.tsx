import Helmet from "../../../components/Helmet";
import ProductsTable from "./CrudTable";
import './index.css'

export const PanelProductsPage = () => {
    return <main className={'main'} >
        <Helmet title={'مدیریت محصولات'}>
            <ProductsTable/>
        </Helmet>
    </main>
}