/**
 * All queries should be imported and exported to and from this file.
 * */

// Wine
import {
  GET_FOODS,
  GET_SEASONS,
  GET_TASTES,
  GET_WINE,
  GET_WINE_BODIES,
  GET_WINE_COLOURS,
  GET_WINE_COUNTRIES,
  GET_WINE_PRICE_POINTS,
  GET_WINE_PRODUCTIONS,
  GET_WINE_SWEETNESSES,
  GET_WINE_TANNINS,
  GET_WINE_TYPES,
  GET_WINES,
} from './resolvers/wine';

// Shopping cart
import { GET_MEMBER, GET_SHOPPING_CART } from './resolvers/member';

// Quiz
import { GET_QUIZ_QUESTIONS } from './resolvers/quiz';

// Special Pack
import { GET_ALL_SPECIAL_PACKS, GET_SPECIAL_PACK_DETAILS } from './resolvers/specialPack';

// Badge
import { GET_MEMBER_BADGES_BY_CATEGORY } from './resolvers/badge';

export {
  GET_ALL_SPECIAL_PACKS,
  GET_FOODS,
  GET_MEMBER,
  GET_MEMBER_BADGES_BY_CATEGORY,
  GET_QUIZ_QUESTIONS,
  GET_SEASONS,
  GET_SHOPPING_CART,
  GET_SPECIAL_PACK_DETAILS,
  GET_TASTES,
  GET_WINE,
  GET_WINES,
  GET_WINE_BODIES,
  GET_WINE_COLOURS,
  GET_WINE_COUNTRIES,
  GET_WINE_PRICE_POINTS,
  GET_WINE_PRODUCTIONS,
  GET_WINE_SWEETNESSES,
  GET_WINE_TANNINS,
  GET_WINE_TYPES,
};
