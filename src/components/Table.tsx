'use client'

import React from 'react'
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
    ColumnDef,
} from '@tanstack/react-table'
import { cn } from '@/utils'

type Props<T> = {
    data: T[]
    columns: ColumnDef<T, any>[]
    pageIdx: number
    setPageIdx: (x: number) => void
    count: number
    isLoading: boolean
    minWidth?: number
}

export default function Table<T>({
    data,
    columns,
    pageIdx,
    setPageIdx,
    count,
    isLoading,
    minWidth = 800,
}: Props<T>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })

    const pageCount = Math.ceil(count / 15)

    return (
        <div className="flex h-full w-full flex-col justify-between gap-6 overflow-hidden">
            <div className="flex-grow overflow-y-scroll overflow-x-auto custom-scrollbar">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center border">
                        <p>Loading Transactions...</p>
                    </div>
                ) : (
                    <table
                        className="table-auto w-full"
                        style={{
                            minWidth: `${minWidth}px`,
                        }}
                    >
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
                )}
            </div>
            <div className="flex justify-center">
                <div className="flex gap-2 w-fit px-2 py-1 rounded-md bg-secondary">
                    <button
                        onClick={() => setPageIdx(0)}
                        disabled={pageCount === 1}
                        className={cn(pageIdx === 0 && 'opacity-50')}
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => setPageIdx(pageIdx - 1)}
                        disabled={pageIdx === 0}
                        className={cn(pageIdx === 0 && 'opacity-50')}
                    >
                        {'<'}
                    </button>
                    <span>
                        {pageIdx + 1} / {pageCount}
                    </span>
                    <button
                        onClick={() => setPageIdx(pageIdx + 1)}
                        disabled={pageIdx === pageCount}
                        className={cn(pageIdx === pageCount && 'opacity-50')}
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() => setPageIdx(pageCount - 1)}
                        disabled={pageIdx === pageCount}
                        className={cn(pageIdx === pageCount && 'opacity-50')}
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    )
}
