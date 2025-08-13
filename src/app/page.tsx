

import fs from "fs";
import path from "path";
import { Book } from "./api/books/route";
import BooksTable from "@/components/BooksTable";


export default function Home() {
  // Leer data.json al renderizar
  const filePath = path.join(process.cwd(), "data.json");
  let books: Book[] = [];
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, "utf-8");
    books = JSON.parse(data);
  }

  return (
    <main className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Libros</h1>
      <BooksTable initialBooks={books} />
    </main>
  );
}
