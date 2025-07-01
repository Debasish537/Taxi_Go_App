import { NextResponse } from "next/server";
const BASE_URL = "https://api.mapbox.com/search/searchbox/v1/suggest"
export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const searchText = searchParams.get('q');
    const sessionToken = crypto.randomUUID()
    console.log('Using session token:', sessionToken)
    const res = await fetch(
        `${BASE_URL}?q=${searchText}&language=en&limit=2&session_token=${sessionToken}&country=IN,US,GB` + "&access_token=" + process.env.MAPBOX_ACCESS_TOKEN,
        {
            headers: {
                "Content-Type": "application/json"
            }
        })
    const searchResult = await res.json();
    // return NextResponse.json({ data: searchText })
    // console.log('Autocomplete results:', searchResult)
    return NextResponse.json(searchResult)

}