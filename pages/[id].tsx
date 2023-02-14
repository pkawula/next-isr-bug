import { GetStaticProps, InferGetStaticPropsType,GetStaticPaths } from "next";
import { useRouter } from "next/router"
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    validateStatus: (status ) => status >= 200 && status < 300
})



export default function ProductPage({ fetchedProductSuccessFully }: InferGetStaticPropsType<typeof getStaticProps>) {
    const {query} = useRouter();

    return (
        <div>
            <h1>You are currently on product page with id {query.id}</h1>
            <pre>{JSON.stringify({fetchedProductSuccessFully}, undefined, 4)}</pre>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking"
    }
}

export const getStaticProps: GetStaticProps<{fetchedProductSuccessFully: boolean}> = async ({ params }) =>  {
    const id = params?.id;

    let fetchedProductSuccessFully = false;

    try {
        await axiosInstance.get(`/product?id=${id}`, { maxRedirects: 0 });

        fetchedProductSuccessFully = true;
    } catch (err) {
        if (axios.isAxiosError(err)) {
            if (err.response?.status && [301,302,307,308].includes(err.response.status)) {
                console.log("Redirecting", err.response.headers.location);

                return {
                    redirect: {
                        destination: err.response.headers.location,
                        statusCode: err.response.status
                    },
                    props: {
                        fetchedProductSuccessFully
                    }
                }
            }
        }

        fetchedProductSuccessFully = false;
    }

    return {
        props: {
            fetchedProductSuccessFully
        },
        revalidate: 20
    }
}