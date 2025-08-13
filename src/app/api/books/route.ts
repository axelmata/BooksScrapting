import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import fs from "fs";
import path from "path";

export interface Book {
  title: string;
  price: string;
  author: string;
}

const BASE_URL = "https://books.toscrape.com/catalogue/";

export async function POST() {
  try {
    const books: Book[] = [];

    for (let page = 1; page <= 2; page++) {
      const url = `${BASE_URL}page-${page}.html`;
      const res = await axios.get(url, { responseType: "text" });
      const $ = cheerio.load(res.data as string);

      $("article.product_pod").each((_, el) => {
        const title = $(el).find("h3 a").attr("title") || "Sin título";
        const price = $(el).find(".price_color").text() || "Sin precio";
        const author = "N/A";
        books.push({ title, price, author });
      });
    }

    // Guardar en json
    const filePath = path.join(process.cwd(), "src/data/data.json");
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2), "utf-8");

    return NextResponse.json(books);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "No se pudieron obtener los libros." }, { status: 500 });
  }
}
