// import React from 'react'

// const Index = () => {
//     const currentFileName = path.basename(__filename);
//     console.log(currentFileName);
//     const name = 'asdfjasdf';
//     return (
//         <div>user</div>
//     )
// }


// export default Index

// export default function singlPage({ products1 }: any) {
//     return (
//         <div>
//             {products1}
//         </div>
//     )
// }

// export async function getServerSideProps(context: any) {
//     console.log(context.query.user)
//     try {

//         const req = await fetch(`https://fakestoreapi.com/products/${context.query.user}`)
//         const products1 = await req.json();
//         return {
//             props: { products1 }
//         }
//     }
//     catch (error) {
//         console.log(error)
//     }
// }



import path from 'path';

const YourComponent = ({ currentFileName }: any) => {
    
    return <div>The current file name is: {currentFileName}</div>;
};




export async function getServerSideProps(context: any) {
    // const currentFileName = path.basename(__filename);
    const currentFileName = context.query.user;

    return {
        props: {
            currentFileName,
        },
    };
}

export default YourComponent;