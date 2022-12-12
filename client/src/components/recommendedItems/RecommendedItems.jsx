/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ls from 'local-storage';
import API_KEY from '../../../config';
import { RICenterContainer, RIMasterContainer } from './Styles/RecommendedItems.styles';
import RelatedProducts from './RelatedProducts';
import YourOutfit from './YourOutfit';
import Card from './Card';

function RecommendedItems({ product, cardClicked }) {
  const [relatedProductsIds, setRelatedProductsIds] = useState([]);
  const [ratingObj, setRatingObj] = useState(null);
  const [yourOutfitIds, setYourOutfitIds] = useState([]);
  const [styles, setStyles] = useState(null);
  const [ready, setReady] = useState(false);

  const getRatingObject = (ratingsObj) => {
    if (JSON.stringify(ratingsObj) === '{}') return { percentage: 'no rating' };
    let ratingTotal = 0;
    let ratingCount = 0;
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const rating in ratingsObj) {
      ratingTotal += parseInt(ratingsObj[rating], 10) * rating;
      ratingCount += parseInt(ratingsObj[rating], 10);
    }
    return { percentage: `${(ratingTotal / ratingCount) * 20}%`, totalReviews: ratingCount };
  };

  useEffect(() => {
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/related`, { headers: { Authorization: API_KEY } })
      .then((response) => {
        setRelatedProductsIds(response.data);
      })
      .catch((err) => console.log(err.message));
    axios.get('https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/reviews/meta', { headers: { Authorization: API_KEY }, params: { product_id: product.id } })
      .then((response) => {
        setRatingObj(getRatingObject(response.data.ratings));
      })
      .catch(err => console.log(err.message));
    axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${product.id}/styles`, { headers: { Authorization: API_KEY } })
      .then((response) => {
        setStyles(response.data.results);
      })
      .catch(err => console.log(err.message));
    if (ls('outfits') === null) {
      ls('outfits', '[40964, 40364, 40436, 40913, 41347]');
    }
    setYourOutfitIds(JSON.parse(ls('outfits')));
  }, []);
  useEffect(() => {
    if (ratingObj !== null && styles !== null) {
      setReady(true);
    }
  }, [ratingObj, styles]);

  const handleActionClick = (event, type, callback, cardItemId) => {
    event.stopPropagation();
    if (type === 'related') {
      callback(true);
    } else if (type === 'outfit') {
      const currentOutfits = [...yourOutfitIds];
      if (currentOutfits.includes(cardItemId)) {
        currentOutfits.splice(currentOutfits.indexOf(cardItemId), 1);
        ls('outfits', JSON.stringify(currentOutfits));
        setYourOutfitIds(currentOutfits);
      }
    }
  };
  const addToOutfits = () => {
    const currentOutfits = [...yourOutfitIds];
    if (!currentOutfits.includes(product.id)) {
      currentOutfits.unshift(product.id);
      ls('outfits', JSON.stringify(currentOutfits));
      setYourOutfitIds(currentOutfits);
    }
  }

  const renderListFromIds = (type) => {
    const itemList = type === 'related' ? relatedProductsIds : yourOutfitIds;
    return itemList.map((item) => <Card key={item} cardItemId={item} pageItem={product} type={type} handleCardClick={cardClicked} handleActionClick={handleActionClick} getRatingObject={getRatingObject} ratingObj={ratingObj} styles={styles} />);
  };

  return !ready ? null : (
    <RIMasterContainer>
      <RICenterContainer>
        <RelatedProducts renderListFromIds={renderListFromIds} />
        <YourOutfit renderListFromIds={renderListFromIds} addToOutfits={addToOutfits} />
      </RICenterContainer>
    </RIMasterContainer>
  );
}

export default RecommendedItems;
