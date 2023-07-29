import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = `places__card-like ${
    isLiked && "places__card-like_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <figure className="places__card">
      <img
        className="places__card-picture"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="places__basket-button"
          type="button"
          aria-label="Удалить карточку"
          onClick={handleDeleteClick}
        />
      )}

      <figcaption className="places__card-text">
        <h2 className="places__card-title">{card.name}</h2>
        <div className="card__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            onClick={handleLikeClick}
          />
          <p className="places__card-likes">{card.likes.length}</p>
        </div>
      </figcaption>
    </figure>
  );
};

export default Card;
