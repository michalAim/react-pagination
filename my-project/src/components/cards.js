import React, { useEffect, useState } from "react";
import Card from "./card";
import ReactPaginate from "react-paginate";

const Cards = () => {

    useEffect(() => {
        fetch("https://api.airtable.com/v0/appMNz0VlyQH8GXQJ/Content?api_key=keyUZDjf0DlxSP5qQ")
          .then((res) => res.json())
          .then((data) => {
            setCards(data.records);
            //console.log(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);

  const [cards, setCards] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  //pagination
  const screenSize = window.innerWidth;
  const cardsPerPage = (screenSize> 767)? 6 : cards.length;
  const pagesVisited = pageNumber * cardsPerPage;
  const pageCount = Math.ceil(cards.length / cardsPerPage);

  const changePage = ({selected}) => {
    setPageNumber(selected);
  }

  //items
  const displayCards = cards
    .slice(pagesVisited, pagesVisited + cardsPerPage) 
    .map(
        (record,key) =>
        {
            return <Card key={record.id} 
            description={record.fields["Sub-headline"]} 
            link={
                (record.fields["Header image"]) === undefined? undefined : record.fields["Header image"][0].url 
            } 
            title={record.fields.Headline}/>
        }
    );


  return (
    <>
      {
      cards.length > 0 ? 
      (
        <>
            <div className="cards-container grid lg:grid-cols-3 gap-4 mx-6 p-10 sm:grid-cols-1 md:grid-cols-1">
                {displayCards}
            </div>

            <div className="pagination-section hidden sm:block md:block">
                <ReactPaginate
                    previousLabel = {"<"}
                    nextLabel = {">"}
                    pageCount = {pageCount}
                    onPageChange = {changePage}
                    containerClassName = {"pagination-btns h-36 flex-1 justify-center"}
                    previousLinkClassName = {"previous-btn"}
                    nextLinkClassName = {"next-btn"}
                    disabledClassName = {"pagination-disabled"}
                    activeClassName = {"pagination-active"}
                />
            </div>
        </>

      ) : (
        <p>Fetching Data...</p>
      )
      }
    </>
  );
}

export default Cards;