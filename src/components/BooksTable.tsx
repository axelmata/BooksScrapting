"use client";

import { useState } from "react";

export interface Book {
    title: string;
    price: string;
    author: string;
}

interface Props {
    initialBooks: Book[];
}

export default function BooksTable({ initialBooks }: Props) {
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [asc, setAsc] = useState(true);
    const [loading, setLoading] = useState(false);

    const refreshBooks = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/books", { method: "POST" });
            const data: Book[] = await res.json();
            setBooks(data);
        } catch (err) {
            console.error("Error al cargar libros:", err);
        }
        setLoading(false);
    };

    const sortTable = (key: "title" | "price") => {
        const sorted = [...books].sort((a, b) => {
            if (key === "price") {
                const aPrice = parseFloat(a.price.replace("£", ""));
                const bPrice = parseFloat(b.price.replace("£", ""));
                return asc ? aPrice - bPrice : bPrice - aPrice;
            } else {
                return asc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
            }
        });
        setBooks(sorted);
        setAsc(!asc);
    };

    return (
        <div className="overflow-x-auto">
            <button
                onClick={refreshBooks}
                className="mt-4 px-6 py-2 bg-emerald-500 text-white font-semibold rounded hover:bg-emerald-600 transition"
                disabled={loading}
            >
                {loading ? "Actualizando..." : "Cargar libros"}
            </button>
            {loading && <p className="mb-2 text-gray-700">Cargando libros...</p>}
            <table className="min-w-full border border-gray-300 rounded-lg shadow-md">
                <thead className="bg-gray-100">
                    <tr>
                        <th onClick={() => sortTable("title")} className="px-6 py-3 text-left font-medium text-gray-700 cursor-pointer">Título</th>
                        <th onClick={() => sortTable("price")} className="px-6 py-3 text-left font-medium text-gray-700 cursor-pointer">Precio</th>
                        <th className="px-6 py-3 text-left font-medium text-gray-700">Autor</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                            <td className="px-6 py-3">{book.title}</td>
                            <td className="px-6 py-3">{book.price}</td>
                            <td className="px-6 py-3">{book.author}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}
