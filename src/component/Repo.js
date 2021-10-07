import React, { useState, useEffect } from 'react';
import "./paginationstyle.css";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';



const link = <FontAwesomeIcon icon={faLink} />

const renderData = (data) => {

    return (
        data.map((resitem, id) => {
            return (
                <div className="user-respo-card" key={id}>
                    <h1>{resitem.name}</h1>
                    <p>{resitem.description}</p>
                    <div className="topics">
                      <a href="/">{(resitem.language === "" ? "No not language property of the repo"  : `${resitem.language}`)}</a>
                    </div>
                </div>
            )
        })
    )
}


function Repo() {
    const [data, setData] = useState([]);

    const [currentPage, setcurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const [pageNumberLimit] = useState(10);
    const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(10);
    const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

    const startPage = 1;

    const handleClick = (event) => {
        setcurrentPage(Number(event.target.id));
    };

    const pages = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages  = Math.ceil(data.length / itemsPerPage);


    const renderPageNumbers = pages.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
                <li
                    key={number}
                    id={number}
                    onClick={handleClick}
                    className={currentPage === number ? "active" : null}
                >
                    {number}
                </li>
            );
        } else {
            return null;
        }
    });
    useEffect(() => {
        const fetchrepo = async () => {
            const res = await axios.get('https://api.github.com/users/johnpapa/repos?per_page=134');
            setData(res.data);
            console.log(res.data)
        };

        fetchrepo();
    }, []);

const handleLastbtn = () => {
    setcurrentPage(totalPages);
}

let pageLastbtn = null;
pageLastbtn = <li onClick={handleLastbtn}> &#8592; Older </li>;


const handleFirstbtn = () => {
    setcurrentPage(startPage);
}

let pageFirtstbtn =null;
pageFirtstbtn = <li onClick={handleFirstbtn}> Newer &#8594; </li>;

    const handleNextbtn = () => {
        setcurrentPage(currentPage + 1);

        if (currentPage + 1 > maxPageNumberLimit) {
            setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
    };

    const handlePrevbtn = () => {
        setcurrentPage(currentPage - 1);

        if ((currentPage - 1) % pageNumberLimit === 0) {
            setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
    };

    let pageIncrementBtn = null;
    if (pages.length > maxPageNumberLimit) {
        pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
    }

    let pageDecrementBtn = null;
    if (minPageNumberLimit >= 1) {
        pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
    }


    return (
        <div className="main">
       <div className="container">
       <div className="row">
       <div className="respo-details">
       <div className="respo">
           <h1>{link}</h1>
           <h1>https://github.com/johnpapa</h1>
       </div>
      
       <div className="user-respo">
           {renderData(currentItems)}
       </div>
       <ul className="pageNumbers">
           <li>
               <button
                   onClick={handlePrevbtn}
                   disabled={currentPage === pages[0] ? true : false}
               >
                   &#8810;
               </button>
           </li>
           {pageDecrementBtn}
           {renderPageNumbers}
           {pageIncrementBtn}

           <li>
               <button
                   onClick={handleNextbtn}
                   disabled={currentPage === pages[pages.length - 1] ? true : false}
               >
                   &#8811;
               </button>
           </li>
       </ul>
   </div>
       </div>
       </div>
            <div className="new-old">
            {pageLastbtn}
            {pageFirtstbtn}
            </div>
        </div>
    );
}

export default Repo;