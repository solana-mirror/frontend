import React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
    PaginationState,
} from '@tanstack/react-table'
import { FormattedTx } from '@/utils/app/formatTxsToProvideTheTable'
import { cn } from '@/utils/style/cn'

type TableProps = {
    data: FormattedTx[]
    columns: ColumnDef<FormattedTx>[]
}

const Table = ({ data, columns }: TableProps) => {
    const [{ pageIndex, pageSize }, setPagination] =
        React.useState<PaginationState>({
            pageIndex: 0,
            pageSize: 8,
        })

    const table = useReactTable({
        data,
        columns,
        state: {
            pagination: { pageIndex, pageSize },
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
    })

    return (
        <div className="flex h-full w-full flex-col justify-between">
            <div className="overflow-x-auto no-scrollbar">
                <table className="table-auto w-full">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="text-left text-sm opacity-50"
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id} className="py-3">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center">
                <div className="flex gap-2 w-fit px-2 py-1 rounded-md bg-type_bg">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(
                            table.getPageCount() === 1 && 'opacity-50'
                        )}
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={cn(
                            table.getPageCount() === 1 && 'opacity-50'
                        )}
                    >
                        {'<'}
                    </button>
                    <span>
                        {pageIndex + 1} / {table.getPageCount()}
                    </span>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={cn(
                            table.getPageCount() === 1 && 'opacity-50'
                        )}
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() =>
                            table.setPageIndex(table.getPageCount() - 1)
                        }
                        disabled={!table.getCanNextPage()}
                        className={cn(
                            table.getPageCount() === 1 && 'opacity-50'
                        )}
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Table
