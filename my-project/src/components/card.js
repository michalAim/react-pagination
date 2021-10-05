// import React, { Component } from 'react';

const Card = ({ description, link, title }) => {
        
    const noImageSrc = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg';

    return (
            <div className="card-container p-10">  
                <div className=" card-wrap rounded overflow-hidden shadow-lg h-full">           
                    {
                        (!{link} === undefined)?
                        <img className="w-full h-64" src={noImageSrc} alt={title} />
                        : 
                        <img className="w-full h-64" src={link} alt={title} />
                    }

                    <div className="text-wrap px-6 py-4">
                        <div className="font-bold text-xl mb-2">{title}</div>
                        <p className="text-gray-700">
                        {description = ''? 'No Description' : description}
                        </p>
                    </div>
                </div>
          </div>

        )
}
export default Card;