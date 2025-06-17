import React from 'react';

const CaretakerCard = ({ caretaker, onBookNow }) => {
    return (
        <div className="card">
            <img src={caretaker.image} alt={caretaker.name} className="card-image" />
            <div className="card-content">
                <h3 className="card-title">{caretaker.name}</h3>
                <p className="card-specialty">{caretaker.specialty}</p>
                <button onClick={onBookNow} className="btn-book">
                    Book Now
                </button>
            </div>
        </div>
    );
};

export default CaretakerCard;