import { NextApiRequest,NextApiResponse } from "next";

const returnValues = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
}

export default async function ProductHandler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") return res.status(405).json({ message: "Method not allowed" });

    const { id } = req.query;

    const product = returnValues[Number(id) as keyof typeof returnValues];

    if (product) {
        return res.writeHead(302, {
            Location: `/${Number(id) + 1}`
        }).end();
    } else {
        returnValues[Number(id) as keyof typeof returnValues] = true;

        return res.status(200).end();
    }

}