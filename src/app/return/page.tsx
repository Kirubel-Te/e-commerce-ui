import Link from "next/link"

const ReturnPage = async({searchParams}:{searchParams:Promise<{session_id:string}> | undefined}) => {
    const session_id = (await searchParams)?.session_id
    if(!session_id){
        return(
            <div>There is no Session Id</div>
        )

    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_PAYMENT_SERVICE_URL}/session/${session_id}`)
    const data = await res.json()

    return(
        <div>
            <h1>Payment {data.status}</h1>
            <p>Payment status: {data.paymentStatus}</p>
            <Link href="/orders">see Orders</Link>
        </div>
    )

}

export default ReturnPage