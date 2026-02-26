import { AdminTitle } from "@/admin/components/AdminTitle"
import { CustomFullScreenLoading } from "@/components/custom/CustomFullScreenLoading"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { currencyFormatter } from "@/lib/currency-formatter"
import { useProducts } from "@/shop/hooks/useProducts"
import { PencilIcon, PlusIcon } from "lucide-react"
import { Link } from "react-router"

export const AdminProductsPage = () => {
    const { data, isLoading } = useProducts();

    console.log({ data });


    if (isLoading) {
        return <CustomFullScreenLoading />
    }

    return (
        <>
            <div className="flex justify-between items-center">
                <AdminTitle title="Products" subtitle="Here you can view and manage your products." />

                <div className="flex justify-end mb-10 gap-4">
                    <Link to='/admin/products/new'>
                        <Button>
                            <PlusIcon />
                            New product
                        </Button>
                    </Link>
                </div>
            </div>


            <Table className="bg-white p-10 shadow-xs border border-gray-200 mb-10">
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-25">ID</TableHead>
                        <TableHead className="font-bold">Image</TableHead>
                        <TableHead className="font-bold">Name</TableHead>
                        <TableHead className="font-bold">Price</TableHead>
                        <TableHead className="font-bold">Category</TableHead>
                        <TableHead className="font-bold">Inventory</TableHead>
                        <TableHead className="font-bold">Sizes</TableHead>
                        <TableHead className="font-bold text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {data?.products.map((product) => (
                        <TableRow key={product.id}>
                            <TableCell className="font-medium">{product.id.slice(0, 8)}</TableCell>
                            <TableCell>
                                <img src={product.images[0]} alt={product.title} className="w-20 h-20 object-cover rounded-md" />
                            </TableCell>
                            <TableCell>{product.title}</TableCell>
                            <TableCell>{currencyFormatter(product.price)}</TableCell>
                            <TableCell>
                                <span className="bg-blue-400 text-white text-xs  font-medium px-2.5 py-1.5 rounded">{product.gender}</span>
                            </TableCell>
                            <TableCell>{product.stock}</TableCell>
                            <TableCell className="font-300">{product.sizes.join(', ')}</TableCell>
                            <TableCell>
                                <Link to={`/admin/products/${product.id}`} className="w-4 h-4 text-blue-500  ">
                                    <PencilIcon />
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>

            {/* Pagination */}
            <CustomPagination totalPages={data?.pages || 0} />
        </>
    )
}