import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import './pagination-component.scss';

function PaginatedItems({ itemsPerPage, changePage, totalCount }: any) {
    const items = [];
    for(let i = 0; i < totalCount; i++) {
      items.push(i + 1);
    }
    const [itemOffset, setItemOffset] = useState(0);
    const pageCount = Math.ceil(items.length / itemsPerPage);

    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % items.length;
        setItemOffset(newOffset);
        const endOffset2 = itemOffset + itemsPerPage;
        changePage(event.selected + 1);
  };

  return (
    <div className='pagination-container'>
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={undefined}
        disabledClassName={'truncked'}
      />
    </div>
  );
}

export default PaginatedItems;


// import React, { useEffect, useState } from 'react';
// import ReactPaginate from 'react-paginate';
// import './pagination-component.scss';

// // Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

// function Items({ currentItems }: any) {
//   return (
//     <>
//       {currentItems &&
//         currentItems.map((item: any) => (
//           <div>
//             <p className='px-2'>{item}</p>
//           </div>
//         ))}
//     </>
//   );
// }

// function PaginatedItems({ itemsPerPage, changePage }: any) {
//     const NewItems = ({ currentItems }: any) => {
//         return (
//           <>
//             {currentItems &&
//               currentItems.map((item: any, index: number) => (
//                 <div key={index}>
//                   <p className='px-2'>{item}</p>
//                 </div>
//               ))}
//           </>
//         );
//     }
//     // Here we use item offsets; we could also use page offsets
//     // following the API or data you're working with.
//     const [itemOffset, setItemOffset] = useState(0);

//     // Simulate fetching items from another resources.
//     // (This could be items from props; or items loaded in a local state
//     // from an API endpoint with useEffect and useState)
//     const endOffset = itemOffset + itemsPerPage;
//     //   console.log(`Loading items from ${itemOffset} to ${endOffset}`);
//     const currentItems = items.slice(itemOffset, endOffset);
//     const pageCount = Math.ceil(items.length / itemsPerPage);

//     // Invoke when user click to request another page.
//     const handlePageClick = (event: any) => {
//         const newOffset = (event.selected * itemsPerPage) % items.length;
//         console.log(
//         `User requested page number ${event.selected}, which is offset ${newOffset}`
//         );
//         setItemOffset(newOffset);
//         const endOffset2 = itemOffset + itemsPerPage;
//         changePage({pageIndex: event.selected, page: event.selected + 1, formerPage: endOffset2});
//   };

//   return (
//     <div className='pagination-container'>
//       <NewItems currentItems={currentItems} />
//       <ReactPaginate
//         breakLabel="..."
//         nextLabel="Next"
//         onPageChange={handlePageClick}
//         pageRangeDisplayed={1}
//         marginPagesDisplayed={1}
//         pageCount={pageCount}
//         previousLabel="Prev"
//         renderOnZeroPageCount={undefined}
//         disabledClassName={'truncked'}
//       />
//     </div>
//   );
// }

// export default PaginatedItems;