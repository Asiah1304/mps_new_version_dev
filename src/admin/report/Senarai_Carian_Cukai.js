import React,{ useState, useEffect } from 'react'

function capitalizeTheFirstLetterOfEachWord(words) {
    var separateWord = words.toLowerCase().split(' ');
    for (var i = 0; i < separateWord.length; i++) {
       separateWord[i] = separateWord[i].charAt(0).toUpperCase() +
       separateWord[i].substring(1);
    }
    return separateWord.join(' ');
 }
export default function SenaraiCarianCukai({result, currentPage, resultPerPage, total}){
    
    return (
        <>
        {
            result.map((res,index) => 
            <tr key={index}>
                <td className="border text-sm text-center py-2">{index+1+((currentPage-1)*resultPerPage)}</td>
                {/* <td className="border px-8 py-4">{res.email}</td> */}
                <td className="border text-sm md:table-cell text-left py-2">{capitalizeTheFirstLetterOfEachWord(res.name)}</td>
                <td className="border text-sm hidden md:table-cell text-left py-2">{res.username}</td>
                <td className="border text-sm text-left py-2">{res.account}</td>
                <td className="border text-sm hidden lg:table-cell text-left py-2">{res.invoice}</td>
                <td className="border text-sm hidden md:table-cell text-left py-2">{res.receipt}</td>
                <td className="border text-sm hidden lg:table-cell text-left py-2">{res.date}</td>
                <td className="border text-sm text-left py-2">RM&nbsp;{res.amount}</td>
            </tr>
        )
        }
        <tr>
                <td className="border-t-2 border-b-2 border-l-2 text-sm text-center py-2">{}</td>
                {/* <td className="border px-8 py-4">{res.email}</td> */}
                <td className="border-t-2 border-b-2 text-sm hidden md:table-cell text-center py-2">{}</td>
                <td className="border-t-2 border-b-2 text-sm md:table-cell text-center py-2">{}</td>
                <td className="border-t-2 border-b-2 text-sm hidden lg:table-cell text-center py-2">{}</td>
                <td className="border-t-2 border-b-2 font-bold text-sm hidden lg:table-cell text-center py-2">{}</td>
                <td className="border-t-2 border-b-2 text-sm hidden md:table-cell text-center py-2">{}</td>
                <td className="border-t-2 border-b-2 text-sm font-bold text-center py-2">{"Jumlah"}</td>
                <td className="border-2 text-sm text-left font-bold py-2">RM&nbsp;{total.toFixed(2)}</td>
            </tr>
        </>
    );
}